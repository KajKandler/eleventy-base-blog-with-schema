export default {
	schemaorg: {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebSite",
				"@id": '{{ "/" | constructID(metadata.url, "#website") }}',
				name: (data) => data.metadata.title,
				description: (data) => data.metadata.description,
				url: '{{ "/" | constructID(metadata.url, "") }}',
				publisher: {
					"@type": "Person",
					"@id": '{{ "/" | constructID(metadata.url, "#person_kaj_kandler") }}'
				},
			},
			{
				"@type": "Person",
				"@id": '{{ "/" | constructID(metadata.url, "#person_kaj_kandler") }}',
				"name": "Kaj Kandler",
				"url": "https://kajkandler.com/",
				"givenName": "Kaj",
				"familyName": "Kandler",
				"jobTitle": "Entrepreneur",
				"sameAs": [
					"https://www.linkedin.com/in/kajkandler/",
					"https://github.com/KajKandler",
					"https://medium.com/@kajkandler",
					"https://entitygarden.com/about_kaj_kandler/"
				]
			}
		]
	}
}
