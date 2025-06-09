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

// return a Date a file was first committed
export function DateGitFirstAdded(inputPath) {
    let timestamp = getGitFirstAddedTimeStamp(inputPath);
    if (timestamp) {
        return new Date(timestamp);
    }
}

// return a Date a file was last committed to git
export function DateGitLastUpdated(inputPath) {
    let timestamp = getGitLastUpdatedTimeStamp(inputPath);
    if (timestamp) {
        return new Date(timestamp);
    }
}
