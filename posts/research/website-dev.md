---
title: Website Development
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
  - implement postcss - [article](https://medium.com/@im.simonecorsi/moving-from-sass-to-postcss-why-what-and-how-f68b1bc760dc), [sugarss](https://github.com/postcss/sugarss)

### General tips
  - [Single direction margins](https://csswizardry.com/2012/06/single-direction-margin-declarations/) (best practice)

## Tools

### Mapping
  - [Leaflet.js]() - web maps
  - [Mappbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/#scalecontrol)

### Coding tools
  - [Observable HQ](https://observablehq.com/) - notebook js playground
  - [Gitbook](https://www.gitbook.com/) - documenting process
  - [VSCode Tasks - running cli within workspace](https://code.visualstudio.com/docs/editor/tasks)
  - [Wox Python Plugin](http://doc.wox.one/en/plugin/python_plugin.html)

### Image transformations
  - Remove bg white to transparent: ```convert in.format -fuzz 10% -transparent White out.format```

### Visualization
  - [D3.js](https://d3js.org/) - data visualisation >[Voroni labels](https://observablehq.com/@d3/voronoi-labels)
  - [Paper.js](http://paperjs.org/showcase/) - 2D canvas library
  - [Pixi.js](https://pixijs.download/dev/docs/index.html) - WebGL 2D canvas library

### Point Clouds
  - Point Cloud Visualizer, Blender Plugin - [video](https://www.youtube.com/watch?v=eXct_7k779Q), [github](https://www.youtube.com/redirect?q=https%3A%2F%2Fgithub.com%2Fuhlik%2Fbpy%23point-cloud-visualizer-for-blender-280&redir_token=sbAkwNzM1ef6RP0BuGxr39HBSVt8MTU4ODI0NTM2OUAxNTg4MTU4OTY5&event=video_description&v=eXct_7k779Q)
  - [WebGL Point clouds](http://potree.org/)

### Baseline typography

Tools for review:
  - [Sassline](https://medium.com/@jakegiltsoff/sassline-v2-0-e424b2881e7e) (sass mixins)
  - [Gutenberg](http://matejlatin.github.io/Gutenberg/) - [article](https://betterwebtype.com/articles/2018/10/15/rhythm-in-web-typography/) (sass mixins)
  - [Plumber](https://jamonserrano.github.io/plumber-sass/) (postcss)
  - [postcss-baseline-vertical-rhythm](https://www.npmjs.com/package/postcss-baseline-vertical-rhythm) - experimental, looks like the simplest setup and most dynamic
  - [Font-Inspector](https://opentype.js.org/font-inspector.html) - js lib for font metrics
  - [Typographist](https://www.npmjs.com/package/@typographist/postcss) (postcss) - modern evolution of sassline and gutenberg, integrated with css grids, possibly complicated setup
  - [typography.js](https://github.com/KyleAMathews/typography.js) ([postcss](https://github.com/BarryThePenguin/postcss-typography)) - theming, baseline aligned?