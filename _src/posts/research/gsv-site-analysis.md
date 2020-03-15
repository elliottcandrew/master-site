---
title: Google Streetview site analysis
date: 2020-02-21T00:00:00.000Z
summary: Analyzing the colour palette of cities from Streetview data
thumb: /static/img/san720.gif
tags:
  - streetview
  - tech
  - environment
---
Google Streetview of my site in San Pedro de Atacama compared to other cities

Tools used:
[[istreetview]](https://istreetview.com/)
[[colorgram.py]](https://github.com/obskyr/colorgram.py)

![](/static/img/ant720.gif)
![](/static/img/san720.gif)
![](/static/img/cph720.gif)
![](/static/img/ber720.gif)

# Object Detection

[[Tensorflow]](https://github.com/tensorflow/tensorflow)
[[COCO api]](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd)

I also ran tensorflow object detection on some of the images using the COCO pre-trained library. This needs some work as the network clearly struggled to identify many of the objects and people in the scene with high certainty, while evidently struggling with the 360deg pano images leading to mis-identify a building as a boat. 

![](/static/img/gsv-tf01.png)
![](/static/img/gsv-tf02.png)
