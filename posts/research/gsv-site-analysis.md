---
title: Google Streetview site analysis
date: 2020-02-21T00:00:00.000Z
summary: Analyzing the colour palette of cities from Streetview data
thumb: san720.gif
tags:
  - streetview
  - tech
  - environment
  - analysis
  - deep learning
sources:
  - [istreetview, https://istreetview.com/]
  - [colorgram.py, https://github.com/obskyr/colorgram.py]
  - [Tensorflow, https://github.com/tensorflow/tensorflow]
  - [Coco API, https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd]
  - [Streetview Coverage URL, https://www.youtube.com/watch?v=ZOAl6GUc6vc]
---
{% resImg "ant720.gif", "" %}
{% resImg "san720.gif", "" %}
{% resImg "cph720.gif", "" %}
{% resImg "ber720.gif", "" %}

Google Streetview of my site in San Pedro de Atacama compared to other cities

Tools used:
[[istreetview]](https://istreetview.com/)
[[colorgram.py]](https://github.com/obskyr/colorgram.py)


# Object Detection

[[Tensorflow]](https://github.com/tensorflow/tensorflow)
[[COCO api]](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd)

I also ran tensorflow object detection on some of the images using the COCO pre-trained library. This needs some work as the network clearly struggled to identify many of the objects and people in the scene with high certainty, while evidently struggling with the 360deg pano images leading to mis-identify a building as a boat. 

{% resImg "gsv-tf01.png", "" %}
{% resImg "gsv-tf02.png", "" %}
