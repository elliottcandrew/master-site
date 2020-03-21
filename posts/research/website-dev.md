---
title: Website development
date: 2020-03-15T00:00:00.000Z
summary: Future reference for site builds
tags:
  - site
  - development
  - utilities
  - process log
---
A rolling log of updates, changes and improvements made to this site as they happen.

This page will serve primarily as a reference for later builds.

### Git-lfs and Netlify Large Media

[Git lfs](https://git-lfs.github.com/) in conjunction with [Netlify large media](https://docs.netlify.com/large-media/overview/) to serve responsive images for different device screen sizes.

### Reframe.js

Add responsive behaviour to videos with the [reframe.js](https://dollarshaveclub.github.io/reframe.js/) iframe wrapper

### Eleventy with node build tools, Github and Netlify

Using this [boiler plate](https://github.com/danurbanowicz/eleventy-netlify-boilerplate) as a base

### Responsive images with Netlify large media, Git-lfs and Eleventy shortcodes to create picture tag

```js
module.exports = (url, alt = "Missing alt text") => {
    return `<picture>
        <source srcset="/assets/imgs/${url}?nf_resize=fit&w=700" media="(min-width: 1200px)">
        <source srcset="/assets/imgs/${url}?nf_resize=fit&w=600" media="(min-width: 740px)">
        <img src="/assets/imgs/${url}?nf_resize=fit&w=500" alt="${alt}" />
    </picture>`;
};
```

[source](https://example-nlm-picture.netlify.com/)
[source](https://docs.netlify.com/large-media/transform-images/#smartcrop)

### Known bugs
    - Netlify LM transforms break gif animation

### To-do
    - thumb resImg.js
    - mobile version
    - responsive video iframes
    - code block syntax highlighting plugin