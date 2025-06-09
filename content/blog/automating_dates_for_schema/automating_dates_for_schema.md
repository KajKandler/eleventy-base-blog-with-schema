---
title: "How to Automate 'datePublished' and 'dateModified' in Eleventy"
description: DatePublished and dateModified are a pain to keep updated correctly in schema. This automation takes out the chore and reduces work to publish content.
date: "git Last Modified"
tags: number 2
eleventyComputed:
  schemaorg:
    "@graph":
    - "@type": "Article"
      "@id": "{{ page.url | constructID(metadata.baseURL, '#article') }}"
      about:
      - "@type": "Thing"
        "@id": "https://schema.org/WebSite"
        name: "WebSite (schema.org)"
        url: "https://schema.org/WebSite"
        sameAs:
        - "https://schema.org/WebSite"
      - "@type": "Thing"
        "@id": "https://schema.org/WebPage"
        name: "WebPage (schema.org)"
        url: "https://schema.org/WebPage"
        sameAs:
        - "https://schema.org/WebPage"
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
        "@id": "https://schema.org/publisher"
        name: "Publisher - Property (schema.org)"
        url: "https://schema.org/publisher"
        sameAs:
        - "https://schema.org/publisher"
      - "@type": "Thing"
        "@id": "https://schema.org/Person"
        name: "Person (schema.org)"
        url: "https://schema.org/Person"
        sameAs:
        - "https://schema.org/Person"
      - "@type": "Thing"
        "@id": "https://schema.org/Organization"
        name: "Organization (schema.org)"
        url: "https://schema.org/Organization"
        sameAs:
        - "https://schema.org/Organization"

---
The schema of WebPages and Articles have two important attributes datePublished and dateModified.

I it is all too easy to forget updating these attributes with the final publish or any update. Therefore I set out to reasonably automate setting these attributes.

## How to Update 'datePublished' Automatically?

In eleventy the first commit of a file into git roughly corresponds with datePublished for WebPages and Articles.

> Note: [Cris from A Pleasant View](https://www.apleasantview.com/) on the [eleventy discord server](https://www.11ty.dev/blog/discord/) suggested to import the eleventy internal function(s) that allow to [setting date: in the front matter](https://www.11ty.dev/docs/dates/#setting-a-content-date-in-front-matter) to "git Created", etc. 
> 
> However, eleventy does not export these functions.

Hence, I copied the code into a global file `_data/gitDates.js`

```js
/** Copied this from "@11ty/eleventy/src/Util/DateGitFirstAdded.js" because
 * it was not exported there, Thanks to Cris for pointing me to this Idea.
 * MIT license: https://github.com/11ty/eleventy/blob/main/LICENSE
 */

import spawn from "cross-spawn";

function getGitFirstAddedTimeStamp(filePath) {
    return (
        parseInt(
            spawn
                .sync(
                    "git",
                    // Formats https://www.git-scm.com/docs/git-log#_pretty_formats
                    // %at author date, UNIX timestamp
                    ["log", "--diff-filter=A", "--follow", "-1", "--format=%at", filePath],
                )
                .stdout.toString("utf-8"),
        ) * 1000
    );
}

// return a Date a file was first committed
export function DateGitFirstAdded(inputPath) {
    let timestamp = getGitFirstAddedTimeStamp(inputPath);
    if (timestamp) {
        return new Date(timestamp);
    }
}
```

You can use this in `_data/eleventycomputed.js` to compute the datePublished property on every WebPage.

```js
import { DateGitFirstAdded, DateGitLastUpdated } from "./gitDates.js";

...
				datePublished: (data) => { return DateGitFirstAdded(data.page.inputPath) },
...
```

To add it to an Article you'd add the corresponding code to the `blog/blog.11tydata.js` file with an adjusted relative import.

```js
import { constructID } from '../../_data/schemaOrg.js';

...
				datePublished: (data) => { return DateGitFirstAdded(data.page.inputPath) },
...
```

### When Not to Set the Published Date Based on Git?

There are cases where the first commit may not correspond with the published date. 

For example if you create many drafts and only finish much later your articles for publishing. 

In those cases you can still overwrite your published date.

## How to Set the dateModified property Automatically?

In eleventy the last commit of a file in git roughly corresponds with dateModified for WebPages and Articles.

Google values freshness of content. Stating the lastModified date may be beneficial for your SEO game.

To capture the last commit date I copied the internal function to my `_data/gitDates.js`

```js
/* Thank you to Vuepress!
 * https://github.com/vuejs/vuepress/blob/89440ce552675859189ed4ab254ce19c4bba5447/packages/%40vuepress/plugin-last-updated/index.js
 * MIT licensed: https://github.com/vuejs/vuepress/blob/89440ce552675859189ed4ab254ce19c4bba5447/LICENSE
 */
function getGitLastUpdatedTimeStamp(filePath) {
    return (
        parseInt(
            spawn
                .sync(
                    "git",
                    // Formats https://www.git-scm.com/docs/git-log#_pretty_formats
                    // %at author date, UNIX timestamp
                    ["log", "-1", "--format=%at", filePath],
                )
                .stdout.toString("utf-8"),
        ) * 1000
    );
}

// return a Date a file was last committed to git
export function DateGitLastUpdated(inputPath) {
    let timestamp = getGitLastUpdatedTimeStamp(inputPath);
    if (timestamp) {
        return new Date(timestamp);
    }
}
```

Then I use it in `_data/eleventycomputed.js` to compute the dateModified on the WebPage entity.

```js
import { DateGitFirstAdded, DateGitLastUpdated } from "./gitDates.js";

...
				datePublished: (data) => { return DateGitFirstAdded(data.page.inputPath) },
				dateModified: (data) => { return DateGitLastUpdated(data.page.inputPath) },
...
```

You can also use it to compute dateModified: on the the Article schema in `blog/blog.11tydata.js`.

```js
import { constructID } from '../../_data/schemaOrg.js';
...
				datePublished: (data) => { return DateGitFirstAdded(data.page.inputPath) },
				dateModified: (data) => { return DateGitLastUpdated(data.page.inputPath) },
...
```

## Should You Include Both Dates in the HTML?

The word on the street is that Google gets confused by two dates on a WebPage. It considers any (or the first) date on  page as the last modified date. 

So if you modify your page you should adjust your date. It does not matter whether you call it "date:", "published:", or "last updated:" in the HTML for your readers.

I'd highly recommend to make the date on the page the same date as the lastModified in your schema.

### When Not to set the modifiedDate based on the last git commit?

If you edit pages often with minor edits, Google might not like you to also change the dateModified. However, that happens usually not too often.

Also, pages that depend heavily on data feeds may change in content, but not at the time of the template commit, but when data feed changes or the page gets regenerated.

However, for my purposes of a few static pages and a blog the first commit is close enough to the actual publishDate. Also, the last commit to the template is close enough to stand in for the lastModified date in the schema.

## Setting the dates on WebPages vs (Blog-) Articles?

In my schema annotations all pages are WebPages. Even my HomePage or the AboutPage gets a Webpage annotation. Yet these pages don't show a modification date in the HTML.

In contrast, Blog Article are WebPages soi it seems a duplication of information between the WebPage schema and the Article schema.

I personally decided to set them on both, especially as they are the same thanks to the automation implemented here.

