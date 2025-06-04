import { constructID } from './schemaOrg.js';

export default {
	schemaorg: {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebSite",
				"@id": (data) => constructID("/", data.metadata.baseURL, "#website"),
				name: (data) => data.metadata.title,
				description: (data) => data.metadata.description,
				url: (data) => data.metadata.url,
				publisher: {
					"@type": "Person",
					"@id": (data) => constructID("/", data.metadata.baseURL, "#person_kaj_kandler")
				},
			},
			{
				"@type": "WebPage",
				"@id": (data) => constructID(data.page.url, data.metadata.baseURL, "#webpage"),
				name: (data) => data.title,
				description: (data) => data.description,
				url: (data) => new URL(data.page.url, data.metadata.baseURL),
				isPartOf: {
					"@type": "WebSite",
					"@id": (data) => constructID("/", data.metadata.baseURL, "#website"),
				},
				author: {
					"@type": "Person",
					"@id": (data) => constructID("/", data.metadata.baseURL, "#person_kaj_kandler")
				},
			},
			{
				"@type": "Person",
				"@id": (data) => constructID("/", data.metadata.baseURL, "#person_kaj_kandler"),
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
