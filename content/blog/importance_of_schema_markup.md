---
title: Why is Schema Markup Important for any Website or Blog
description: This articles describes the influence of structured data on SEO and optimizing your digital persona hub.
date: "git Created"
tags: 
- Concept
eleventyComputed:
  schemaorg:
    "@graph":
    - "@type": "Article"
      "@id": "{{ page.url | constructID(metadata.baseURL, '#article') }}"
      about:
      - "@type": "Thing"
        "@id": "https://entitygarden.com/glossary/schema_markup/"
        name: "Schema Markup"
        url: "https://entitygarden.com/glossary/schema_markup/"
        sameAs:
        - "https://entitygarden.com/glossary/schema_markup/"
      - "@type": "Thing"
        "@id": "https://en.wikipedia.org/wiki/Website"
        name: "Website"
        url: "https://en.wikipedia.org/wiki/Website"
        sameAs:
        - "https://en.wikipedia.org/wiki/Website"
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
      - "@type": "Thing"
        "@id": "https://schema.org/"
        name: "schema.org"
        description: "Schema.org is an initiative by the major search engines to collaboratively create and maintain structured data on the Internet."
        url: "https://schema.org/"
        sameAs:
        - "https://schema.org/docs/about.html"
      - "@type": "Thing"
        "@id": "https://en.wikipedia.org/wiki/Search_engine_optimization"
        name: "Search Engine Optimization"
        alternateName:
        - "SEO"
        url: "https://en.wikipedia.org/wiki/Search_engine_optimization"
        sameAs:
        - "https://www.google.com/search?kgmid=/m/019qb_"
        - "https://en.wikipedia.org/wiki/Search_engine_optimization"
      - "@type": "Thing"
        "@id": "https://entitygarden.com/glossary/digital_persona_optimization/"
        name: "Digital Persona Optimization"
        alternateName:
        - "DPO"
        url: "https://entitygarden.com/glossary/digital_persona_optimization/"
        mainEntityOfPage: "https://entitygarden.com/glossary/digital_persona_optimization/"
        sameAs:
        - "https://entitygarden.com/glossary/digital_persona_optimization/"
      - "@type": "Thing"
        "@id": "https://entitygarden.com/glossary/digital_persona_hub/"
        name: "Digital Persona Hub"
        url: "https://entitygarden.com/glossary/digital_persona_hub/"
        mainEntityOfPage: "https://entitygarden.com/glossary/digital_persona_hub/"
        sameAs:
        - "https://entitygarden.com/glossary/digital_persona_hub/"
---
Search engines like Google have evolved from matching words to matching based on meaning of the words. That way Google can distinguish apple the company from apple the fruit. It also allows a search engine to take semantics into account.

Starting in 2012, the largest search engines in the world asked website publishers to mark up their semantic entities. They founded schema.org to build a common vocabulary of "things". Things can be classified in a taxonomy, such as "Organization", "Corporation", "Person", "Creative Work", "Book", "Website", "Webapge", or "Article".

## Why are schema.org Annotations Important for SEO?

Schema.org annotations are important for SEO because Google admittedly supports some of its rich results with structured data.

For its rich results, such as Featured Snippet or Knowledge Panel, Google uses a subset of the schema.org defined entity types and properties.

Google also emphasizes that it prefers helpful content and content that is published by reputable people or organizations (EEAT). Schema.org annotations can make it clear who is responsible for the content, as well as how to contact the publisher.

## Why are schema.org Annotations Important for Digital Persona Optimization?

[Digital Persona Optimization](https://entitygarden.com/glossary/digital_persona_optimization/) is the process to educate search engines about profiles and appearances of a single [digital persona](https://entitygarden.com/glossary/digital_persona/). It aims to create a network of information, so search engines understand the entity. 

Schema markup makes it clear that a persona or organization has different profiles where content is  published. Schema.org annotations can further specify weather a person is the host or was a guest in a podcast. Such structured data can even specify if a person (or thing) is the subject of a podcast or merely mentioned in an episode.

Google, Bing, OpenAI, Anthropic, Grok, and other crawlers extract facts about people, organizations, locations, events and creative works. They want to understand the semantic relationships between them. Structured data in form of schema.org annotations helps them to build a knowledge graph. That knowledge graph grounds the current flavor of Large Language Models in reality.

The most powerful tool to optimize your digital persona is a [digital persona hub](https://entitygarden.com/glossary/digital_persona_hub/) based on a personal website. On your own website, you can leverage  schema markup to make your links even more meaningful.

> "Image how much more powerful the [IndieWeb](https://indieweb.org/) would become when all links would be annotated with schema.org entity types."
>
> &mdash; Kaj Kandler

## Best Practices for Schema Markup

### 1. Annotate Your Website with Global Information

Annotate your website with information such as who is the publisher and how can the publisher be contacted.

Use the entities Website, Webpage together with Organization or Person as the publisher. Include information how to contact the publisher. Either per form, email or phone address. The more contact information the better it is for your reputation in Google's eyes.

Further more, add any public identifier of your organization, such as tax IDs or industry classifications.

Post this global information on all pages of the website.

### 2. Annotate the About Page(s)

Create About pages for the publisher and describe the organization or person and the purpose of the website. Publish all the identifiable information mentioned above.

Describe more details than in the global information, such as former employment or affiliation with other organizations.

Publish in the text what the annotations say. When possible link to the things you describe and annotate.

If you have authors separate from the author, create About pages for the authors as well. Don't just have the author and the list of his or her articles. Use the opportunity to have an extended author bio with a photo and links to social profiles.

### 3. Annotate Articles in a Blog

For Blog articles annotate the author with the author's about page as url.

Also annotate the main topics the article is about as well as major mentions.

### 4. Add a Breadcrumbs Hierarchy to the Schema Markup

Breadcrumbs are a common feature on many content management systems. They help users to navigate and search engines to understand the structure of the content.

You can add the breadcrumb to a Webpage annotation.

### 4. Annotations Should Match the Content on the Page

Don't make things up in the schema markup. You want the schema markup to confirm what is written on the page.

### 5. Connect the Schema Markup to a Single Graph

It is important that you mark up the different entities but connect them either through nested schema and or through proper "@id" connections.

Three or four disconnected graphs erode the power of the schema markup.

## Final Thoughts

Schema Markup helps search engines and modern AI Models to understand the content of your website with more precision. If you want to rank your content, schema markup is an easy addition to your website.

Schema Markup also raises the search engines' trust in your content. Because you can declare who you are and what business you stand for. Schema Markup is necessary for many rich results in the Google Search results. Schema Markup is particularly powerful for triggering knowledge panels for your name or brand.