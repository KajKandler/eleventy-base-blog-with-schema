---
title: My tools to validate schema markup.
description: To verify that schema is applied correctly, you need tools.
date: "2025-06-05T08:00:00+02:00"
tags: ["second tag", "posts with two tags"]
eleventyComputed:
  schemaorg:
    "@graph":
    - "@type": "Article"
      "@id": "{{ page.url | constructID(metadata.url, '#article') }}"
      about:
      - "@type": "Thing"
        "@id": "https://entitygarden.com/glossary/schema_markup/"
        name: "Schema Markup"
        url: "https://entitygarden.com/glossary/schema_markup/"
        sameAs:
        - "https://entitygarden.com/glossary/schema_markup/"
      - "@type": "Thing"
        "@id": "{{ page.url | constructID(metadata.url, '#concept_validation_tool') }}"
        name: "Validation Tool"
        description: "Validation tools are used to check the quality, accuracy, and consistency of data, software, processes, or even web pages."
        sameAs:
        - "https://www.google.com/search?q=validation+tools"
      mentions:
      - "@type": "Thing"
        "@id": "https://validator.schema.org/"
        name: "Schema.org Validator"
        url: "https://validator.schema.org/"
        sameAs:
        - "https://validator.schema.org/"
      - "@type": "Thing"
        "@id": "https://search.google.com/test/rich-results"
        name: "Google Rich Results Tester"
        url: "https://search.google.com/test/rich-results"
        sameAs:
        - "https://search.google.com/test/rich-results"
      - "@type": "SoftwareApplication"
        "@id": "https://chromewebstore.google.com/detail/seo-schema-visualizer/obabcjddknfnjjeblajgnlflppnpgdhi"
        name: "SEO Schema Visualizer"
        url: "https://chromewebstore.google.com/detail/seo-schema-visualizer/obabcjddknfnjjeblajgnlflppnpgdhi"
        sameAs:
        - "https://chromewebstore.google.com/detail/seo-schema-visualizer/obabcjddknfnjjeblajgnlflppnpgdhi"
        - "https://www.shtros.com/seo-schema-visualizer/"
        applicationCategory: "Chrome Extension"
        applicationSubCategory: "Web Development"
        installUrl: "https://chromewebstore.google.com/detail/seo-schema-visualizer/obabcjddknfnjjeblajgnlflppnpgdhi"
        creator:
          "@type": Person
          "@id": "https://www.shtros.com/about/"
        aggregateRating:
          "@type": AggregateRating
          itemReviewed:
            "@type": Thing
            "@id": "https://chromewebstore.google.com/detail/seo-schema-visualizer/obabcjddknfnjjeblajgnlflppnpgdhi"
          ratingValue: 5
          ratingCount: 12
        offers:
          "@type": Offer
          availability: "https://schema.org/InStock"
          price: "0.00"
          priceCurrency: "USD"
        operatingSystem: "Any where the Chrome Browser is available"

    - "@type": Person
      "@id": "https://www.shtros.com/about/"
      name: "Ziggy Shtrosberg"
      url: "https://www.shtros.com/about/"
      sameAs:
      - "https://www.google.com/search?kgmid=/g/11kbdlscn0"
      - "https://www.shtros.com/about/"
      - "https://www.shtros.com/"
      - "https://www.linkedin.com/in/ziggyshtrosberg/"
      - "https://github.com/ziggyshtrosberg"

---
When applying schema, we want to validate that is appears and is correct.

## Validate with the Browser Developer Tools

The simplest method is to validate the existence of your schema tags by looking at the source code of the page.

Right click anywhere in your page and select "View Page Source."

In the new tab search for the `type="application/ld+json"`.

## Use the schema.org Validator

The schema.org website offers a [schema validator](https://validator.schema.org/) for testing your schema.

As we are working on a local development site, we can paste a URL into the validator.

Therefore we'll have to copy the entire source code and pas it into the snippet tab. Then click "Run Test"

> Note: Make sure you see only one entity with nested entities inside. 
> If that is not the case, you are missing some connections between the entities in the graph.
> 
> You want to double check your `"@id"` attributes if they are corresponding with each other.

### Schema Markup Valdiator Bookmarklet

To valdiate schema markup on public websites, you can use the [Schema Markup Validator Bookmarklet](https://sitebulb.com/resources/guides/schema-markup-validator-bookmarklet/) by Sitebulb.

It offers one click validation of the schema on the current page. The bookmarklet takes the URL of the current page as input to the schema.org validator tool.

> Note: Unfortunately, you can not use this for local development.

## Use Google Rich Results Tester

Google offers a schema validator that is more opinionated than the schema.org validator. You should use it if you are aiming for rich results in Google's results.

### How to use the Rich Results Tester

First of all, [Google's Rich Results Tester (RTT)](https://search.google.com/test/rich-results) only shows entities that it is interested in. That includes sometimes sub-entities of such as "MedicalOrganization" which is by definition also an "Organization", but Google chooses to ignore this.

Yet, Google also shows errors, such as required properties within an entity. Schema.org does not define such things, but Google apparently cares.

## Use the SEO Schema Visualizer for Development

To me the most useful tool in development is the [SEO Schema Visualizer](https://www.shtros.com/seo-schema-visualizer/) by [Ziggy Shtrosberg](https://www.shtros.com/). 

This tool quickly draws a graph of your schema entities. That way you can easily see of they are connected the way you want them to be. It also offers a clear display of the JSON-LD content in a nice format.

It is my day to day tool, despite the fact that I tried my hand on a [Chrome Markup Sidebar](https://entitygarden.com/tools/chrome_extension_eg_sidebar/). Maybe some day I get around to fix that thing.

## Other Chrome Extensions

There are many Chrome extensions that also show schema. However, non is as useful and reliable as the SEO Schema Visualizer.

## My Recommendations for Schema Validation

Use all the tools available.

For development I recommend the SEO Schema Visualizer Extension

For validating published websites I recommend to use both the schema.org validator and the Google Rich Results Tester as they show different omissions and errors.
