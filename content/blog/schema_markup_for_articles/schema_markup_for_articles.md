---
title: "Schema Markup for Blog Articles"
description: This articles teaches how to add schema to pages that are articles such as in a blog.
date: "git Last Modified"
tags: another tag

eleventyComputed:
  "schemaorg": 
    "@graph":
    - "@type": "Article"
      "@id": "{{ page.url | constructID(metadata.url, '#article') }}"
      about:
      - "@type": "Thing"
        "@id": "{{ page.url | constructID(metadata.url, '#concept_article_schema') }}"
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
        -  "https://bsky.app/profile/11ty.dev"
      mentions:
      - "@type": "Person"
        "@id": "https://www.zachleat.com/"
        name: "Zach Leatherman"
        description: "Zach is the creator and maintainer of the Eleventy (11ty) static site generator"
        url: "https://www.zachleat.com/"
        mainEntityOfPage: "https://www.zachleat.com/about/"
        sameAs:
        - "https://www.zachleat.com/about/"
        - "https://www.google.com/search?kgmid=/g/11gbhswntq"
        - "https://github.com/zachleat/"
        - "https://fediverse.zachleat.com/@zachleat"
        - "https://bsky.app/profile/zachleat.com"
      
---

Every blog post is best marked up as an article.

## Adding Article Schema to All Posts in the Blog

To add `Article` schema to all blog posts we add the section under `eleventyComputed` in the `content/blog/blog.11tydata.js` file

{% raw %}
```js
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
		}
	}
```
{% endraw %}

> Note: Don't forget to import the `constructID` utility function.

> Note: I added the `author` here, because I'm the sole author of this blog.
>
> With multiple authors, you may want to only define the author in the article

## Adding Markup in the Front Matter of the Article

Some information is specific to this article and can't be abstracted away. Therefore we'll add this to the front matter of the article, for example:

### What Schmea Markup should I Add to an Article?

To an Article you should add the headline, the abstract, the URL, the reference of the webpage as `mainEntityOf` and the author.

I highly recommend to add `about` and `mentions`. For these you can nest the topics with type and id. Most importantly add `sameAs` as an array of URLs to pages that represent the same topic. These URLs should be authoritative, such as Wikipedia, Wikidata, or home pages of organizations or people.

{% raw %}
```js
eleventyComputed:
  "schemaorg": 
    "@graph":
    - "@type": "Article"
      "@id": "{{ page.url | constructID(metadata.url, '#article') }}"
      about:
      - "@type": "Thing"
        "@id": "{{ page.url | constructID(metadata.url, '#concept_article_schema') }}"
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
        -  "https://bsky.app/profile/11ty.dev"
      mentions:
      - "@type": "Person"
        "@id": "https://www.zachleat.com/"
        name: "Zach Leatherman"
        description: "Zach is the creator and maintainer of the Eleventy (11ty) static site generator"
        url: "https://www.zachleat.com/"
        mainEntityOfPage: "https://www.zachleat.com/about/"
        sameAs:
        - "https://www.zachleat.com/about/"
        - "https://www.google.com/search?kgmid=/g/11gbhswntq"
        - "https://github.com/zachleat/"
        - "https://fediverse.zachleat.com/@zachleat"
        - "https://bsky.app/profile/zachleat.com"
```
{% endraw %}

> **Note:** 
> 
>  I prefer using the YAML front matter. I have yet to figure out how to add the createID function in Java Script base front matter. I you kno how, [please let me know](https://bsky.app/profile/kajkandler.bsky.social)

## A Thank You to Zach Leatherman

At this place it is appropriate for me to thank [Zach Leatherman](https://www.zachleat.com/) for creating [eleventy](https://github.com/11ty/eleventy/). My gratitude to him for incorporating this great concept of the Data Cascade which dovetails nicely with how schema markup in JSON-LD works.

This also gives me a chance to markup Zach as a mention in the article schema above.

Besides, did you see [Zach's impressive Google Knowledge Panel](https://www.google.com/search?kgmid=/g/11gbhswntq&hl=en&gl=US)

![A screenshot of Zach Leatherman's Google Knowledge Panel in the US](./20250605Zach_Leatherman_g_11gbhswntq(Hi%20Res%20Screenshot).png)
