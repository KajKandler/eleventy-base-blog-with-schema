export default {
	layout: "layouts/home.njk",
	eleventyComputed: {
		schemaorg: {
			"@context": "https://schema.org",
			"@graph": [
				{
					"@type": "WebPage",
					"@id": '{{ page.url | constructID(metadata.url, "#webpage") }}',
					name: (data) => data.title,
					description: (data) => data.description,
					url: '{{ page.url | constructID(metadata.url, "") }}',
					isPartOf: {
						"@type": "WebSite",
						"@id": '{{ "/" | constructID(metadata.url, "#website") }}',
					},
					author: {
						"@type": "Person",
						"@id": '{{ "/" | constructID(metadata.url, "#person_kaj_kandler") }}'
					}
				}
			]
		}
	}
};
