import { DateGitFirstAdded, DateGitLastUpdated } from "../../_data/gitDates.js";
import { constructID } from '../../_data/schemaOrg.js';

export default {
	tags: [
		"posts"
	],
	"layout": "layouts/post.njk",
	eleventyComputed: {
		schemaorg: {
			"@graph": [
				{
				"@type": "Article",
				"@id": (data) => constructID(data.page.url, data.metadata.baseURL, "#article"),
				name: (data) => data.title,
				headline: (data) => data.title,
				abstract: (data) => data.description,
				url: (data) => new URL(data.page.url, data.metadata.baseURL),
				datePublished: (data) => { return DateGitFirstAdded(data.page.inputPath) },
				dateModified: (data) => { return DateGitLastUpdated(data.page.inputPath) },				
				mainEntityOfPage: {
					"@type": "WebPage",
					"@id": (data) => constructID(data.page.url, data.metadata.baseURL, "#webpage"),
				},
				author: {
					"@type": "Person",
					"@id": (data) => constructID("/", data.metadata.baseURL, "#person_kaj_kandler")
				},
			}
			]
		}
	}
};
