---
title: How to Add WebPage Schema to All Pages on the Website
description: Instructions how to add WebPage Schema globally and build a utility to construct schema '@id' URLs.
date: "git Last Modified"
tags: 
- GlobalLevel
- WebPage
- Article
eleventyComputed:
  schemaorg:
    "@graph":
      - "@type": "Article"
        "@id": "{{ page.url | constructID(metadata.url, '#article') }}"
        about:
          - "@type": "Thing"
            "@id": "https://schema.org/Article"
            name: "Article (schema.org)"
            url: "https://schema.org/Article"
            sameAs:
              - "https://schema.org/Article"
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
All pages on a website are WebPages. Let's reflect this in our schema.

But first lets talk about how to generate systematically URLs for `"@id"` attributes.

## Generating ID attributes for schema entities

Generating `"@id"` attributes systematically is important because you need them to link different entities in the JSON-LD `"@graph"` together.

Ideally you want a system to generate unique IDs that you can remember as a human.

Uniqueness is important because otherwise it will cause parsing errors. `"@id"` values need to only be unique in the context of the document in our case the web page.

> **Note:**
>
> Many Schema gurus claim that `"@id"` attributes need tg be unique in the scope of a website or even world globally. 
> 
> The JSON-LD spec says otherwise!

I recommend to use URLs for IDs in schema markup. More specifically, I use absolute URLs, not just fragments.

For most IDs I use the URL that is the entity's "home" + a URL fragment indicating the type. For example I use:

- The Website uses the home page URL + "#website", i.e. `https://example.com/#website`
- Any WebPage gets the URL of the page + "#webpage", i.e. `https://example.com/blog/important_announcement_may_2025/#webpage` or `https://example.com/#webpage`
- The breadcrumb on a page gets the URL of the page + "#breacrumb", i.e. `https://example.com/blog/important_announcement_may_2025/#breacrumb`
- An organization publishing a website gets the URL of the home page + "#organization", i.e. `https://example.com/#organization`
- A person publishing the website or authoring an article gets the URL of the home page + "#person_<first-name>_<last-name>", i.e. `https://example.com/#person_kaj_kandler`
- For external entities I use their about page or home page, i.e. `https://wikipedia.org/`
I mix things up for entities that have an "About ..." page on the website. There I use for example `https://example.com/about_aaa_corp/#organization` or `https://example.com/authors/Kaj_kandler/#person`

There is no hard rule, you can use what ever you want I just developed these as best practice and it served me well over many websites.

## A Helper filter to generate these IDs

To make generating the absolute URLs for `"@id"` attributes simpler and less error prone, I use the following filter function.

{% raw %}
```js
	eleventyConfig.addFilter("constructID", (relative_url, base, fragment) => {
		var u = new URL( HtmlBasePlugin.applyBaseToUrl(fragment, base, {
			pathPrefix: eleventyConfig.pathPrefix,
			pageUrl: relative_url
		}));
		return u.href;
	});
```
{% endraw %}

I define the URLs by via the preprocessing of the front matter with Nunjucks. For example:

{% raw %}
```js
	'{{ page.url | constructID(metadata.url, "#webpage") }}'
```
{% endraw %}

I added the WebPage schema into  `content/content.11data.js` as the most appropriate place.

{% raw %}
```js
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
```
{% endraw %}

As you can see I connect all "WebPage" entities to the []"WebSite" entity created as global schema](/blog/adding_global_schema_to_eleventy.md).

Furthermore, I reuse the person already declared globally as the author of all pages. You can adjust this to your needs.

## Do Not Forget to Validate your Schema

As a reminder, do not forget to [validate every step your schema markup](/blog/tools_to_validate_schema.md).

> **Note:**
>
> Pay attention to the connecting "@id" attributes!
> Best practice is to copy paste the `"@type"` and `"@id"` lines from the definition of an object to the reference.
