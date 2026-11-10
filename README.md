# Digital Paradise

Digital Paradise is an electronic artist who draws on his Aruban and Venezuelan background, blending Caribbean rhythms with modern electronic production and live percussion.

## The assignment

The artist needed a consistent visual identity that captured the energy of his music and live performances and made him more recognizable to his audience. Our Fontys HBO-ICT team was asked to design a logo, a brand guide, and supporting visual assets. The identity needed to reflect three core values: community, energy, and authenticity.

## The website

This repository contains the website we built to apply that identity online. It introduces the artist, highlights upcoming events, provides contact information, and lets visitors listen to audio from a live set.

[View the website](https://i566292.luna.fhict.nl/dj-paradise/)

## Run locally

The site uses HTML, CSS, and JavaScript. There is no build step and no Fontys account is needed to browse this repository. From the repository root, start a local web server with Python 3:

```sh
python -m http.server 8000
```

Open [http://localhost:8000/public/index.html](http://localhost:8000/public/index.html). Use a local server because the site loads page fragments and event data over HTTP.

## Project structure

- `public/`: entry page, images, video, and audio.
- `src/pages/` and `src/partials/`: page content and reusable HTML.
- `src/styles/`: shared styles and page layouts.
- `src/scripts/` and `src/data/`: navigation, interactions, and content data.

## Credits

Created as a team project at Fontys HBO-ICT. This repository is a portfolio copy of the website.
