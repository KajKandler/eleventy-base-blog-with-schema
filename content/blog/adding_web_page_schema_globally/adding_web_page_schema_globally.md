---
title: How to Add WebPage Schema to All Pages on the Website
description: Instructions how to add WebPage Schema globally and build a utility to construct schema '@id' URLs.
date: "git Last Modified"
tags: second tag
---
All pages on a Website are WebPages. Let's reflect this in our schema.

But first lets talk about how to generate systematically URLs for `"@id"` attributes.

## Generating ID attributes for schema entities

Generating `"@id"` attributes systematically is important because you need them to link different entities in the JSON-LD `"@graph"` together.

Ideally you want a system to generate unique IDs that you can remember as a human.

Uniqueness is important because otherwise it will cause parsing errors. `"@id"` values need to only be unique in the context of the document in our case the the web page.

> Note: Many Schema gurus claim that `"@id"` attributes need tg be unique in the scope of a website or even world global. 
> 
> The JSON-LD spec says otherwise.

The easiest system for IDs is to generate URLs.

I use for most IDs the URL that is the entities "home" + a URL fragment indicating the type. For example 

- The Website gets the URL of the home page + "#website", i.e. `https://example.com/#website`
- A WebPage gets the URL of the page + "#webpage", i.e. `https://example.com/#webpage` or `https://example.com/blog/important_announcement_may_2025/#webpage`
- The breadcrumb on a page gets the URL of the page + "#breacrumb", i.e. `https://example.com/#breacrumb` or `https://example.com/blog/important_announcement_may_2025/#breacrumb`
- A publishing organization on a website gets the URL of the home page + "#organization", i.e. `https://example.com/#organization`
- A publishing person on a website gets the URL of the home page + "#person_first-name_last-name", i.e. `https://example.com/#person_kaj_kandler`


I mix things up for entities that have an "About ..." page on the website. There I use for example `https://example.com/about_aaa_corp/#organization` or `https://example.com/authors/Kaj_kandler/#person`

There is no hard rule, you can use what ever you want I just developed these as best practice and it served me well over many websites.

## Utility Function to Generate ID-URLs for Schema

As we need to create ID-URLs in many places I created myself a small utility function.

It constructs URLs from the base URL of your (11ty) website, the context of your page and a fragment.

I placed this utility function in `_data/schemaOrg.js`

```
export
  /**
   * Creates URL for the purpose of a schema.org ID from the parts
   *
   * @param {string} relativeUrl - The context relative to the base url, i.e. 'about/authors/john_doe/'.
   * @param {string} base - The base URL of the website, i.e. 'https://example.com/'.
   * @param {string} fragment - A url fragment the part including the '#' hash sign, i.e. '#breadcrumb'.
   * @returns {string} The URL as string.
   */
  function constructID (relative_url, base, fragment) {
		var url = new URL(relative_url, base);
	
		url.hash = fragment;
		return url.href; 
	}
```
I import the function like this, where needed.

```
import { constructID } from './schemaOrg.js';
```

With this import in `_data/eleventycomputed.js` we can add a Website definition like this

```
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
```

Best to also change the other IDs to be constructed with the new utility function. Now eleventyComputed looks like:

```
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
					"@id": (data) => `${data.metadata.url}/#person_kaj_kandler`
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
```

## Do Not Forget to Validate your Schema

A reminder to [validate with every step your schema markup](/blog/tools_to_validate_schema.md).

> Note: Pay attention to the connecting IDs. 
> Best practice is to copy paste the `"@type"` and `"@id"` lines from the definition of an object to the reference.