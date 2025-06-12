---js
const title = "Schema Markup for Blog Articles";
const date = "git Created";
const tags = [ "Article", "FolderLevel" ]

const schemaorg = { // no eleventy computed required, because we are working with JS directly
    "@graph": [
        {
            "@type": "Article",
            "@id": (data) => constructID(data.page.url, data.metadata.baseURL, "#article"),
            about: [
                {
                    "@type": "Thing",
                    "@id": (data) => constructID(data.page.url, data.metadata.baseURL, "#concept_article_schema"),
                    name: "Article (schema.org)",
                    url: "https://schema.org/Article",
                    sameAs: [
                        "https://schema.org/Article"
                    ]
                },
                {
                    "@type": "Thing",
                    "@id": "https://www.11ty.dev/",
                    name: "Eleventy",
                    alternateName: [
                        "11ty"
                    ],
                    url: "https://www.11ty.dev/",
                    sameAs: [
                        "https://github.com/11ty/eleventy/",
                        "https://www.youtube.com/c/EleventyVideo",
                        "https://neighborhood.11ty.dev/@11ty",
                        "https://bsky.app/profile/11ty.dev"
                    ]
                }
            ],
            mentions: [
                {
                    "@type": "Person",
                    "@id": "https://www.zachleat.com/",
                    name: "Zach Leatherman",
                    description: "Zach is the creator and maintainer of the Eleventy (11ty) static site generator",
                    url: "https://www.zachleat.com/",
                    mainEntityOfPage: "https://www.zachleat.com/about/",
                    sameAs: [
                        "https://www.zachleat.com/about/",
                        "https://www.google.com/search?kgmid=/g/11gbhswntq",
                        "https://github.com/zachleat/",
                        "https://fediverse.zachleat.com/@zachleat",
                        "https://bsky.app/profile/zachleat.com"
                    ]
                }
            ]
        }
    ]
}
---

Every blog post is best marked up as an article.

## Adding Article Schema to All Posts in the Blog

To add `Article` schema to all blog posts we add the section under `eleventyComputed` in the `content/blog/blog.11tydata.js` file

```js
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
                mainEntityOf: {
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
```

> Note: Don't forget to import the `constructID` utility function.

> Note: I added the `author` here, because I'm the sole author of this blog.
> 
> With multiple authors, you may want to only define the author in the article

## Adding Markup in the Front Matter of the Article

Some information is specific to this article and can't be abstracted away. Therefore we'll add this to the front matter of the article, for example:


### What Schmea Markup should I Add to an Article?

To an Article you should add the headline, the abstract, the URL, the reference of the webpage as `mainEntityOf` and the author.

I highly recommend to add `about` and `mentions`. For these you can nest the topics with type and id. Most importantly add `sameAs` as an array of URLs to pages that represent the same topic. These URLs should be authoritative, such as Wikipedia, Wikidata, or home pages of organizations or people.

```js
const schemaorg = {
    "@graph": [
        {
            "@type": "Article",
            "@id": (data) => constructID(data.page.url, data.metadata.baseURL, "#article"),
            dateModified: "{{ date }}",
            about: [
                {
                    "@type": "Thing",
                    "@id": (data) => constructID(data.page.url, data.metadata.baseURL, "#concept_article_schema"),
                    name: "Article (schema.org)",
                    url: "https://schema.org/Article",
                    sameAs: [
                        "https://schema.org/Article"
                    ]
                },
                {
                    "@type": "Thing",
                    "@id": "https://www.11ty.dev/",
                    name: "Eleventy",
                    alternateName: [
                        "11ty"
                    ],
                    url: "https://www.11ty.dev/",
                    sameAs: [
                        "https://github.com/11ty/eleventy/",
                        "https://www.youtube.com/c/EleventyVideo",
                        "https://neighborhood.11ty.dev/@11ty",
                        "https://bsky.app/profile/11ty.dev"
                    ]
                }
            ],
            mentions: [
                {
                    "@type": "Person",
                    "@id": "https://www.zachleat.com/",
                    name: "Zach Leatherman",
                    description: "Zach is the creator and maintainer of the Eleventy (11ty) static site generator",
                    url: "https://www.zachleat.com/",
                    mainEntityOfPage: "https://www.zachleat.com/about/",
                    sameAs: [
                        "https://www.zachleat.com/about/",
                        "https://www.google.com/search?kgmid=/g/11gbhswntq",
                        "https://github.com/zachleat/",
                        "https://fediverse.zachleat.com/@zachleat",
                        "https://bsky.app/profile/zachleat.com"
                    ]
                }
            ]
        }
    ]
}
```


## A Thank You to Zach Leatherman

At this place it is appropriate for me to thank [Zach Leatherman](https://www.zachleat.com/) for creating [eleventy](https://github.com/11ty/eleventy/). My gratitude to him for incorporating this great concept of the Data Cascade which dovetails nicely with how schema markup in JSON-LD works.

This also gives me a chance to markup Zach as a mention in the article schema above.

Besides, did you see [Zach's impressive Google Knowledge Panel](https://www.google.com/search?kgmid=/g/11gbhswntq&hl=en&gl=US)

![A screenshot of Zach Leatherman's Google Knowledge Panel in the US](./20250605Zach_Leatherman_g_11gbhswntq(Hi%20Res%20Screenshot).png)

