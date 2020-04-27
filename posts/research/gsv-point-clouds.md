---
title: Google Streetview Point Clouds
date: 2020-04-15
summary: 
thumb: gsv-open3d-thumb.png
tags:
    - streetview
    - mapping
    - code
    - analysis
    - data
sources:
    - 
---

# Extracting the depth map from Google Streetview

I used this great little python utility, [gsv_depth_scraper](https://github.com/ksteinfe/gsv_depth_scraper) by [Kyle Steinfeld](https://twitter.com/ksteinfe/) to fetch panorama tiles from Streetview, assemble them into seamless 360 images and then extract the hidden xml depth data from the XML to create depth images. This tool is a non-official use of the Google Streetview Static API.

In order to increase efficiency with API requests, I used the js util DepthToLatLng from Lionel Tardy's [Roadtrip Script](https://github.com/harkle/roadtrip). This script uses the Google Maps Direction API to generate valid streetview coordinates along a route between a start and end point, with waypoints along the way. By tweaking the output coordinates to a geojson format, I can now feed the resulting locations into the gsv_depth_scraper avoiding failed panoid requests and missed streetview panoramas.

{% resImg "gsv-site-research/gsv-scrape-vscode.png", "VSCode window showing gsv_depth_scraper" %}
{% resImg "gsv-scrape-map.png", "" %}
{% resImg "gsv-site-research/directions-to-lat-lng.png", "VSCode window showing gsv_depth_scraper" %}

Streetview coverage XYZ Gis layer URL: https://mts2.google.com/mapslt?lyrs=svv&x={x}&y={y}&z={z}&w=256&h=256&hl=en&style=40,18

Using the information provided in [this article](https://medium.com/@nocomputer/creating-point-clouds-with-google-street-view-185faad9d4ee), it is possible to retrieve depth map data from GSV using the latitude and longitude. A result for San Pedro is shown below:

```xml
This XML file does not appear to have any style information associated with it. The document tree is shown below.
<panorama>
<data_properties image_width="13312" image_height="6656" tile_width="512" tile_height="512" image_date="2012-08" pano_id="M0zT0mYKzPobhRw0G3AXQg" imagery_type="1" num_zoom_levels="5" lat="-22.909412" lng="-68.198628" original_lat="-22.909432" original_lng="-68.198666" elevation_wgs84_m="2486.307625" best_view_direction_deg="238.27942" elevation_egm96_m="2447.094238">
<copyright>© 2020 Google</copyright>
<text>San Pedro de Atacama - Guatín - Linzor</text>
<region>San Pedro de Atacama, Antofagasta</region>
<country>Chile</country>
</data_properties>
<projection_properties projection_type="spherical" pano_yaw_deg="333.91998" tilt_yaw_deg="83.63" tilt_pitch_deg="2.33"/>
<annotation_properties>
<link yaw_deg="155.09" pano_id="h-bTdJL7Y3582auAROSgqg" road_argb="0x80fdf872">
<link_text>San Pedro de Atacama - Guatín - Linzor</link_text>
</link>
<link yaw_deg="333.44998" pano_id="TQSoRUzRpsAnQaAXh1BvIQ" road_argb="0x80fdf872">
<link_text>San Pedro de Atacama - Guatín - Linzor</link_text>
</link>
</annotation_properties>
<model>
<depth_map>
eJzt2Hl4E2UCx3E6LRYqSC0ILWdbSlsoVluw1CaTTIIcVnQBKXKsyiHwuCCs0MplOygKrOKui4DwcAqrVB6Xm0XpDC-yj8qlPj541BUVXFkFVGBXQaDC5mqaY5KZJHMknd_nH_WRNO-b7y8h0GxwkyZUk7hmTQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC8xNtofQbQTrwPrc8D6vLtjx3oS6D-WIE-BO-PETR2EvpjA42YxP7YQCMVQn9soBEKsT820MiE0R8baETC7I8JNBLh98cEGoOI-mMDMS_i_phATJOjPyYQu2TqjwXEKNn6YwIxSc7-mEDskbk_FhBjZO-PCcQUJfpjAbFDmf6YQKxQrD8W4C8vT-sT-FGwv_4WkJsb9H_ntczLi7YJKNpfZwPIdfTPbTDgri6e7P2t9gkUFxdrfdZ66C8f8f4t3f2jZQAa9C8oUPmOSmvjKysry1Y_q6_tnz79WyrXv4XNnSE_St3-bZ062P61g50c99aeUP96fQcO9OrvLYInbSEkuvsXtG2M_UtLg_Uvcfrd3XffM8gvfwASnlSwfhT3z09PTy9o6F8v5ONqpp2QHJtUB-H-vXo0SLGxWCz2h5RIHULgOcRK_8LCdLv8_HxN-7fyJfmRXYU4kgsuwnMZOQ3zSE290aZPgx5-enkLPocA-aOuf6G0_kVFRbd6kH76Zi60zS2B-MUX7X-zmBvdBKfhyW8Rtzt5_aI7fNi34jpL4-7fv8gp9PRe_QWF0z85uXlHfzc5ic7Cbx2e3LHvu80fY-MzEIcAx2ws_fv1cw7Aq3v3BmKnl7N_sr_mToEX4SW8WYQuyBBiob_R4V77k5ttetplZmYaDPXRe_fu5Mvv2AkJCdk2Qfs3C9qfCkhgCA1b8CBpFJ7Cqt3Nl-NHdW7QvHmGww1eKCpOgNb9e7pk1nNX7y1QPUFAtovt23RaWlq4_RMTEwP3l7IGgTmIcw_Br2l91sC8grsIdXekp4TrO3hdrn17Zfu7O3t2Nxic1Xs7iAX3re7oXk9af4pq6mJ_ARLrSV2AfIsQ-4AQqt3Z76cEyO5OH6y-3wKU7e_1XrdJSHA3D9jaN3qKi0f2NNevaB28f5Kd45ae_WVYQOjjcO7DP65A3gCCVPdKL1bfZwHK9jfZiIf2KZ7iSaC6PbyLaH_XLb3yK7yAIKS2lhzdLz0lob7XApTt7xvY2bQ-dkoggs29wtvZrkEH7---pW9_jwWoOQHJycWKB0hPSazvMQFl-_uG9VyBcPEAnwze2RsE7d_wqvj31-ZDIKLWIuWpUOK7F6Bsf9-MzueV_htCoOwu7e18HyO5vwYLCLO1eHm7EOs7F6Bsf8EnDSG6YPXA6RMSHF_5JPdXfQEKlbcLo75dVPSXElw0fX39pCT_Fydgf5UXoER4hzDrq93fHinsowYrH7S-zx__fKn4VVD27k4RvKRK1hfOpED5oPEpsf5x6n0IyFrdJdzyTirHDzl_e9HyovWDfvzXU2cBcjVvEEF6B5XrS-8vqbtn_SAvkoT-cZr9pVAkIowfp0z_oLHky-4ZP1h9qf1jbQGRx1eiv0gueaL71Bd7paT21-ivBcMiS33Z-1Pt3YRyUVRYlYPGF60fSv-42PgQkCm-zP2lnFz9-FSI_aN-AvLFl7O_xMPLWl_ic4r-8S_IAqJuArLWl6u_9OPLF19q_bD6R-kEZI4vU_9QbqB6fCr0j_8onYD88eNk6B_iJVSPT0XQPy56JiBzdjdV41OR9A-vvV0k_eOiYQJyBvehanwq7P7hx6ci7h-n7QRkSy1IzfZUmPkjaW8XeX87LTYgS-Kg1IxPhdE_oje-U3hf_4WoO4HIzyuBiu3t1G5vJ19_O3U2IM9ZJQilveshkdxL5fQOsuZ3UnQDch5UVIjt3cK8m_T28r2eCvS3U-KDQO4zigsjvVsYF1TvXd9Aof4OibKtQJHjiQszvYeQbqlqeBcl-7tEtAIlDyYqkvKeJN5V4Y96QSr0dwnt00CFA4mLOLwPkSvLEjQ08n79lywxUXANKp9ClCzRg6C8r656fc36gxDt-mt9c7BDf31Df31Df31Df33TLD_6RwXN-mt9cXBAf31Df31Df31Df33TKj_6Rwet-mt9b3BCf31Df31Df33TKD_6RwmN-mt9bXBBf31Df31Df33TJj_6Rwtt-mt9a6iH_vqG_vqmSX70jxqa9Nf60uCG_vqG_vqmRX70jx5a9Nf6ztAA_fUN_fVNg_zoH0U06K_1lcED-uub-vnRP5qo31_rG4Mn9Nc31fOjf1RRvb_WFwYv6K9vyK9v6K9vKudH_yijcn-trws-1M2P_tFG3f5a3xZ8qZof_aOOqv21viz4UTM_-kcfNftrfVfwh_z6pl5-9I9G6vXX-qYgBPn1Ta386B-dkF_fVOqv9TUhAOTXN-TXN-TXN-TXN9TXN-TXN-TXN9TXN9TXN8XqI39MUKi-1tcCiVBf3xBf3xBf3xBf39Be35Be31Be3xBe31Bd3xAcAAAAAAAAAAAAoFFq4mPe60v27uuXQL_3JUtmH85nHlnSxzBjz-fGFd-z5MjgQmbI4Sqzid_ND5-RwR_421vMgsR4rmxBCv3LMZbQB7szr53oWr2w12T6y5dYkvSHAqZtyijDb_zLhnPXWDIoL4t599pIw6KclTU_2P7b-Ggus2h-Fbn836P05LMZdKf05yxNfxvCpfZIood-whLzG2bmyIF79i49_Q0_Z0oViZ82iVk54RPuMXMafbyGJV9dGMgcsc42W3ZN2Ed2dOOvTulv3fX9MtMX75Wby5PrSm7MPmEdtuTv3EvFLekhh1nyC2thTvYcSWaPSyR3tfnQWPwpZd054S_cAz_nmEqrniTZ695mts89x01PXU3378aSMcteZEh-JTd_Qwrd_QOWrF3fg9k8LJ5bXXOSo06x5Ie3ZjLZBtaUd3amuevKJwxtBzxsbflsCjnz3RDywNV844nnOMv6003JubxR5BWumfHIsdetV_hefP6sN-jaz6rIoXa7mcyyG_gdfFt62DaWZAy03WfLOO76rV24DRdZUje3nFmT0aLmf7U76c0US_bPopjRb99gfvTpkWTzRor_14jl1lVDTnHX6ijT7iOV5MUVbzEz6_Ybf1r9DE8_wpKURSeZj18t5AbvWMKtuGC7_9VvzGWz15gKXp5hHj_69ZLrfW_rW7c2gWz9ZRSp_SrBOP619dYP0q6XxK16ip__JEs6bFtnfvzlDvxDu84Z1-5iyZ_ODGBOd8vgE0fvo4dvryKlv77JJPWeS368wJgSv8qiD25KsE75Yi1nOJ5tHHCeJU07t2Y-_rqMu3fc03RFBUumH_-3eed9-fyluzPp9L-y5J3hZczI-etMRusMs6luSUlt9zZ9j-ZuMDx4chKfupwlpm1nmLzCOdzR5CJ66R6WHNs2hrlSOYtQ1dNNU893o-tyL1nOrGvHF_9nkfHHQyzpv_MZ5qG1XWqmXanjXjjBkuZz32ceu_SQefHeK_sGzc_ik2rGWRdM68hb4tvQo15lyfE-A5iKb0fwm3KamJLXV5I3dza1ZK8Zas699WbyaGkG_8y28dZPy-KMcy6xZPPkidyCz963XnxnODf5z1Poy4tZ0vH6UuYfxlb89pXJdNJWluTOzGc6sp14autW2_unimyZeJD58Id3-S0PNq25eqiK_LT8GFN-sYRfXzXVVLl1FpnceoEl81Im2XVnP_Pyqlb03GVU3_JWm7jHz7Lmi8apxoyPdljm5U3g7513iv7uaiVp-VOxZVH-aH774jT68gyWzCrJYdZ1f5Z_Ib2Aq3ycJS1qa5k9RS32TVxaScqtzbmJ26ZZ4ivyuK7D-9H32fZFb0lkTCtr-bHtqvfRpX8kOw7dZB06tQV_euMEQ8rnLOlCbTcvHnqKixuRRJ_eb_v5OT2Y8t1VZNUJjj62IoM-Oaaj5aOn4sw9P_q9uVfPSzUdjC9Ye6x7gmzcu9B0_5hs-uDTy6zfDlrDj_3n18ZvbO-fjQljmer4wWTK5STTz51uJlseOcs8fH6s-cCQ86bTz5_ghpVZrYfvNxo37B1o6pIwlwwaesGy8OgkvnXVBPrL21jy_C3VzIgDGXxh8v2mhYPmkMprqyzjD97Bf3-Lgf51Dkuyfq1gkj5L5dPpzvSkV1jyc2kfZn_1Qn5j9fuGd6eyZP6eTcyRiq-5tmszuXHfsqS4YrLZ_Nss_vbpq40f2x5_tKjE_H8SywQz
</depth_map>
</model>
</panorama>
```

{% resImg "gsv-pano-imgs.jpg", "alt" %}
{% resImg "gsv-depth-imgs.jpg", "alt" %}

<div align="center">{% resImg "gsv-open3d-01.png", "alt" %}</div>
<div align="center">{% resImg "gsv-open3d-01_pcd.png", "alt" %}</div>

<div align="center">{% resImg "gsv-open3d-sat.png", "alt" %}</div>
<div align="center">{% resImg "gsv-open3d-sat_pcd.png", "alt" %}</div>