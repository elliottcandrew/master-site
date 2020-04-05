---
title: Website development
date: 2020-03-15T00:00:00.000Z
summary: Future reference for site builds
thumb: web-dev-01.png
tags:
  - code
  - dev
  - utilities
  - process
sources:
  - [Git lfs, https://git-lfs.github.com/]
  - [reframe.js, https://dollarshaveclub.github.io/reframe.js/]
  - [Site Boiler Plate, https://github.com/danurbanowicz/eleventy-netlify-boilerplate]
  - [Netlify Large Media, https://example-nlm-picture.netlify.com/]
  - [Netlify Transform, https://docs.netlify.com/large-media/transform-images/#smartcrop]
  - [Leaflet.js, https://leafletjs.com/]
  - [D3 examples, https://observablehq.com/@d3]
  - [D3.js, https://d3js.org/]
  - [Voroni labels, https://observablehq.com/@d3/voronoi-labels]
  - [Paper.js, http://paperjs.org/showcase/]
---

{% resImg "web-dev-01.png", "" %}

A rolling log of updates, changes and improvements made to this site as they happen.

This page will serve primarily as a proprietary reference for later builds.

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

### Known bugs
  - Netlify LM transforms break gif animation

### To-do
  - thumb resImg.js
  - mobile version
  - responsive video iframes
  - code block syntax highlighting plugin

## Tools

### Mapping
  - [Leaflet.js]() - web maps
  - [Mappbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/#scalecontrol)

### Coding tools
  - [Observable HQ](https://observablehq.com/) - notebook js playground
  - [Gitbook](https://www.gitbook.com/) - documenting process
  - [VSCode Tasks - running cli within workspace](https://code.visualstudio.com/docs/editor/tasks)
  - [Wox Python Plugin](http://doc.wox.one/en/plugin/python_plugin.html)

### Visualization
  - [D3.js](https://d3js.org/) - data visualisation >[Voroni labels](https://observablehq.com/@d3/voronoi-labels)
  - [Paper.js](http://paperjs.org/showcase/) - 2D canvas library
  - [Pixi.js](https://pixijs.download/dev/docs/index.html) - WebGL 2D canvas library