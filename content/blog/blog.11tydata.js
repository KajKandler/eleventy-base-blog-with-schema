import { DateGitFirstAdded, DateGitLastUpdated } from "../../_data/gitDates.js";

export default {
	tags: [
		"posts"
	],
	layout: "layouts/post.njk",
	eleventyComputed: {
		schemaorg: {
			"@graph": [
				{
				"@type": "Article",
				"@id": '{{ page.url | constructID(metadata.url, "#article") }}',
				name: (data) => data.title,
				headline: (data) => data.title,
				abstract: (data) => data.description,
				url: '{{ page.url | constructID(metadata.url, "") }}',
				datePublished: (data) => { return DateGitFirstAdded(data.page.inputPath) },
				dateModified: (data) => { return DateGitLastUpdated(data.page.inputPath) },				
				mainEntityOfPage: {
					"@type": "WebPage",
					"@id": '{{ page.url | constructID(metadata.url, "#webpage") }}',
				},
				author: {
					"@type": "Person",
					"@id": '{{ "/" | constructID(metadata.url, "#person_kaj_kandler") }}'
				},
			}
			]
		},
		eleventyNavigation: {
            key: (data) => { var title = data.title || "undefined"; return title.replace(' ', ''); },
            parent: "Archive",
            title: (data) => data.title
        },
	}
};
