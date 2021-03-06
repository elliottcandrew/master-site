const { DateTime } = require("luxon"),
  CleanCSS = require("clean-css"),
  UglifyJS = require("uglify-es"),
  htmlmin = require("html-minifier"),
  eleventyNavigationPlugin = require("@11ty/eleventy-navigation"),
  pluginSass = require("eleventy-plugin-sass"); // remove
  syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
  
  // for archive images
  fg = require("fast-glob")
  archiveThumbs = fg.sync("assets/imgs/ucn-museum-archive/thumbs/*")
  archiveOriginals = fg.sync("assets/imgs/ucn-museum-archive/originals/*")

module.exports = function(eleventyConfig) {

  // Eleventy Navigation https://www.11ty.dev/docs/plugins/navigation/
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Eleventy syntax highlighting https://www.11ty.dev/docs/plugins/syntaxhighlight/
  eleventyConfig.addPlugin(syntaxHighlight);

  // Remap post layout aliases - https://www.11ty.dev/docs/layouts/#layout-aliasing 
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  // Date formatting (human readable)
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  // Date formatting (default)
  eleventyConfig.addFilter("defaultDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("dd.MM.yy");
  });

  // Date formatting (machine readable)
  eleventyConfig.addFilter("machineDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });

  // Minify CSS
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Minify JS
  eleventyConfig.addFilter("jsmin", function(code) {
    let minified = UglifyJS.minify(code);
    if (minified.error) {
      console.log("UglifyJS error: ", minified.error);
      return code;
    }
    return minified.code;
  });

  // Minify HTML output
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if (outputPath.indexOf(".html") > -1) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  // A responsive image helper using Netlify Large Media - image transformation
  eleventyConfig.addShortcode("resImg", require("./utils/js/resImg.js"));
  eleventyConfig.addShortcode("resThumb", require("./utils/js/resThumb.js"));

  // only content in the `posts/` directory
  eleventyConfig.addCollection("logbook", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item.inputPath.match(/^\.\/posts\/logbook\//) !== null;
    });
  });
  eleventyConfig.addCollection("research", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item.inputPath.match(/^\.\/posts\/research\//) !== null;
    });
  });
  
  // for archive images
  eleventyConfig.addCollection("archiveThumb", function(collection) {
    return archiveThumbs
  });
  eleventyConfig.addCollection("archiveOriginal", function(collection) {
    return archiveOriginals
  });

  // Universal slug filter strips unsafe chars from URLs
  eleventyConfig.addFilter("slugify", function(str) {
    return slugify(str, {
      lower: true,
      replacement: "-",
      remove: /[*+~.·,()'"`´%!?¿:@]/g
    });
  });

  // Don't process folders with static assets e.g. images
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("static/img");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("_includes/");
  eleventyConfig.addPassthroughCopy("assets/css/master.css");
  eleventyConfig.addPassthroughCopy("assets/js/");
  eleventyConfig.addPassthroughCopy("assets/imgs/");
  eleventyConfig.addPassthroughCopy("assets/fonts/");

  /* Markdown Plugins */
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let markdownItEmoji = require("markdown-it-emoji");
  let markdownItFootnote = require("markdown-it-footnote");
  let options = {
    html: true,
    breaks: true,
    linkify: true,
  };
  let opts = {
    permalink: false
  };

  eleventyConfig.setLibrary("md", markdownIt(options)
    .use(markdownItAnchor, opts)
    .use(markdownItEmoji, opts)
    .use(markdownItFootnote, opts)
  );

  return {
    templateFormats: ["md", "njk", "html", "liquid"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
