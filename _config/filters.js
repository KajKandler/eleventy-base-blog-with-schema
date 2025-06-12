import { DateTime } from "luxon";
import { HtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if (!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if (n < 0) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return the keys used in an object
	eleventyConfig.addFilter("getKeys", target => {
		return Object.keys(target);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "posts"].indexOf(tag) === -1);
	});

	eleventyConfig.addFilter("sortAlphabetically", strings =>
		(strings || []).sort((b, a) => b.localeCompare(a))
	);

	eleventyConfig.addFilter("constructID", (relative_url, base, fragment) => {
		var u = new URL( HtmlBasePlugin.applyBaseToUrl(fragment, base, {
			pathPrefix: eleventyConfig.pathPrefix,
			pageUrl: relative_url
		}));
		return u.href;
	});

	function getUrlFilter(eleventyConfig) {
		// eleventyConfig.pathPrefix was first available in Eleventy 2.0.0-canary.15
		// And in Eleventy 2.0.0-canary.15 we recommend the a built-in transform for pathPrefix
		if (eleventyConfig.pathPrefix !== undefined) {
			return function (url) {
				return url;
			};
		}

		if ("getFilter" in eleventyConfig) {
			// v0.10.0 and above
			return eleventyConfig.getFilter("url");
		} else if ("nunjucksFilters" in eleventyConfig) {
			// backwards compat, hardcoded key
			return eleventyConfig.nunjucksFilters.url;
		} else {
			// Theoretically we could just move on here with a `url => url` but then `pathPrefix`
			// would not work and it wouldn’t be obvious why—so let’s fail loudly to avoid that.
			throw new Error("Could not find a `url` filter for the eleventy-navigation plugin in eleventyNavigationToHtml filter.");
		}
	}

	function breadcrumbToSchemaOrgElements(breadcrumbs, config) {
		// let childDepth = 1 + options.childDepth;
		// options.childDepth++;

		let urlFilter = getUrlFilter(config);

		// let indent = (new Array(childDepth)).join("  ") || "";
		// return pages.length ? `${pages.map(entry => {
		// 	return `[${entry.title}](${urlFilter(entry.url)})${options.showExcerpt && entry.excerpt ? `: ${entry.excerpt}` : ""}\n${entry.children ? navigationToMarkdown.call(this, entry.children, options)
		// 		 : ""}`;
		// }).join("")}` : "";
		let elements = [];
		breadcrumbs.forEach((element, index) => {
			elements.push({
				"@type": "ListItem",
				position: index + 1,
				name: element.title,
				item: {
					"@type": "WebPage",
					"@id": urlFilter(element.url),
					name: element.title,
					url: urlFilter(element.url)
				}
			})
		});
		return elements;
	}

	eleventyConfig.addFilter("eleventyNavigationToSchemaOrg", function navigationToSchemaOrg(breadcrumbs, website, options = {}) {
		options = Object.assign({
			showExcerpt: false,
			childDepth: 0
		}, options);

		let childDepth = 1 + options.childDepth;
		options.childDepth++;

		let urlFilter = getUrlFilter(eleventyConfig);

		if (breadcrumbs.length && breadcrumbs[0].pluginType !== "eleventy-navigation") {
			throw new Error("Incorrect argument passed to eleventyNavigationToMarkdown filter. You must call `eleventyNavigation` or `eleventyNavigationBreadcrumb` first, like: `collection.all | eleventyNavigation | eleventyNavigationToMarkdown | safe`");
		}
		// console.log(breadcrumbs);
		// let indent = (new Array(childDepth)).join("  ") || "";
		// return breadcrumbs.length ? `${breadcrumbs.map(entry => {
		// 	return `${indent}* [${entry.title}](${urlFilter(entry.url)})${options.showExcerpt && entry.excerpt ? `: ${entry.excerpt}` : ""}\n${entry.children ? navigationToMarkdown.call(this, entry.children, options) : ""}`;
		// }).join("")}` : "";
		// console.log(eleventyConfig);
		if (breadcrumbs.length) {
			let id = breadcrumbs[breadcrumbs.length - 1].url + "#breadcrumb";
			let name = breadcrumbs[breadcrumbs.length - 1].title + " Breadcrumb";
			return {
				"@context": "https://schema.org",
				"@graph": [
					{
						"@type": "BreadcrumbList",
						"@id": id,
						name: name,
						numberOfItems: breadcrumbs.length,
						itemListElement: breadcrumbToSchemaOrgElements(breadcrumbs, eleventyConfig)
					}
				]
			}
		} else {
			return "";
		}
	});
};
