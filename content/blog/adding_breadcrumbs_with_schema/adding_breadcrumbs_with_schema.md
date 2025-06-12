---
title: How to Add Breadcrumbs with Schema to All Pages
description: Instructions how to add Breadcrumbs as navigation with BreadcrumbList Schema globally. Build the navigation leveraging the eleventy Navigation plugin.
date: "git Last Modified"
tags: second tag
eleventyComputed:
  schemaorg:
    "@graph":
      - "@type": "Article"
        "@id": "{{ page.url | constructID(metadata.url, '#article') }}"
        about:
          - "@type": "Thing"
            "@id": "https://en.wikipedia.org/wiki/Breadcrumb_navigation"
            name: "Breadcrumb Navigation"
            url: "https://en.wikipedia.org/wiki/Breadcrumb_navigation"
            sameAs:
              - "https://en.wikipedia.org/wiki/Breadcrumb_navigation"
          - "@type": "Thing"
            "@id": "https://schema.org/BreadcrumbList"
            name: "BreadcrumbList (schema.org)"
            url: "https://schema.org/BreadcrumbList"
            sameAs:
              - "https://schema.org/BreadcrumbList"
          - "@type": "Thing"
            "@id": "https://www.11ty.dev/"
            name: "Eleventy"
            alternateName: 
              - "11ty"
            url: "https://www.11ty.dev/"
            sameAs:
              - "https://github.com/11ty/eleventy/"
              - "https://www.youtube.com/c/EleventyVideo"
              - "https://neighborhood.11ty.dev/@11ty"
              - "https://bsky.app/profile/11ty.dev"
        mentions:

                  
---
Breadcrumbs are a common form of navigation on Blogs and Websites.

They help users to orient themselves with regards to the information hierarchy of the website.

## Adding Breadcrumb Navigation Based on the Eleventy Navigation Plugin

Eleventy maintains a navigation plugin, which we can leverage also for a breadcrumb trail.

### 1. Add Parent Keys to the eleventyNavigation

To form a hierarchy of pages, we need to add parent information to the front matter in the pages already tagged for navigation. Here is an example for the "Bog Archive" in file `blog.njk`

```js
---js
const eleventyNavigation = {
	key: "Archive",
	parent: "Home",
	order: 2
};
---

```

### 2. Adjust the Menu Navigation

We need to make slight adjustments to the menu navigation, because we want to only have the Children that point to the "Home" page in the global menu. Here are the changes to `_includes/layouts/base.njk`

{% raw %}
```html
{#- Read more about `eleventy-navigation` at https://www.11ty.dev/docs/plugins/navigation/ #}
<nav>
    <h2 class="visually-hidden">Top level navigation menu</h2>
    <ul class="nav">
        <li class="nav-item"><a href="/"{% if '/' == page.url %} aria-current="page"{% endif %}>Home</a></li>
    {%- for entry in collections.all | eleventyNavigation("Home") %}
        <li class="nav-item"><a href="{{ entry.url }}"{% if entry.url == page.url %} aria-current="page"{% endif %}>{{ entry.title }}</a></li>
    {%- endfor %}
    </ul>
</nav>
```
{% endraw %}

### 3. Add A Breadcrumb to the Navigation Header

To make the changes visible we need to add a section to the navigation header. Apply this code to `_includes/layouts/base.njk`

{% raw %}
```html
<nav>
    <div class="container" id="breadcrumb">
        {% set breadcrumb = collections.all | eleventyNavigationBreadcrumb(eleventyNavigation.key, { allowMissing: true, includeSelf: true } ) %}
        {{ breadcrumb | eleventyNavigationToHtml | safe }}    
    </div>
</nav>
```
{% endraw %}

Also add corresponding CSS to `content/css/index.css`

```css
/* Breadcrumbs added by Kaj Kandler */
.breadcrumb-item.active {
  color: var(--primary-color);
}

#breadcrumb ol,ul {
  margin: 0;
  padding: 0;
}

#breadcrumb li {
  display: inline;
}

#breadcrumb li:not(:last-child)::after {
  content: " ˃"
}
```

### 4. Add Page Level to the Breadcrumb for All Blog Posts

In the blog articles we want navigation items as well. Therefore we add this code to `content/blog/blog.11tydata.js`

```js
eleventyComputed: {
    schemaorg: {
        ...
    },
    eleventyNavigation: {
        key: (data) => { var title = data.title || "undefined"; return title.replace(' ', ''); },
        parent: "Archive",
        title: (data) => data.title
    },
```

This constitutes the changes required to have breadcrumb navigation in your website.

Better styling of the breadcrumbs and other details we leave up to the reader.

## Adding Breadcrumb Schema Based on The Eleventy Navigation

Not only users like to understand the information hierarchy of a website but search engines find this useful too.

While search engines can determine this from global menues or internal links on the website, they prefer to have help in form of breadcrumbs in the schema markup.

### 1. Add Breadcrumb Schema to Every Page

We will generate our breadcrumbs based on the navigation hierary we built with eleventy Navigation. For this we have to add some calculations and an output to the `_includes/layouts/base.njk` file

{% raw %}
```html
{# Add schema.org breadcrumb as JSON-LD #}
{%- set breadcrumb = collections.all | eleventyNavigationBreadcrumb(eleventyNavigation.key, { allowMissing: true, includeSelf: true } ) %}

{%- set breadcrumbSchema = [] %}
{%- for b in breadcrumb %}
    {%- set absolutePostUrl %}{{ b.url | htmlBaseUrl(metadata.url) }}{% endset %}
    {%- set bb = { key: b.key, title: b.title, url: absolutePostUrl, pluginType: b.pluginType } %}
    {%- set breadcrumbSchema = (breadcrumbSchema.push(bb), breadcrumbSchema) %}
{% endfor %}
<script eleventy:ignore type="application/ld+json">{{ breadcrumbSchema | eleventyNavigationToSchemaOrg | dump(\t) | safe }}</script>
```
{% endraw %}

In this code we use a custom filter `eleventyNavigationToSchemaOrg` which we defined in `_config/filters.js` as follows

```js
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
```

You can already validate that the schema is generated. However in the SEO Schema Vizualizer it is obvious that there are two distinct graphs. They are not connected. We'll do this in the next step.

### 2. Connect the BreadcrumbList to Every Page

To connect the `BreadcrumbList` entity with every page we need to add a property breadcrumb to the global `WebPage` definition in `_data/eleventyComputed.js`

```js
export default {
	schemaorg: {
		"@context": "https://schema.org",
		"@graph": [
            ...
			{
				"@type": "WebPage",
				"@id": (data) => constructID(data.page.url, data.metadata.url, "#webpage"),
				name: (data) => data.title,
				description: (data) => data.description,
			    ...
                breadcrumb: {
                    "@type": "BreadcrumbList",
                    "@id": (data) => constructID(data.page.url, data.metadata.url, "#breadcrumb")
                }
			},
```

Now we can validate our schema on all pages and it will (hopefully) be one connected graph again.

