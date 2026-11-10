# Digital Paradise

Digital Paradise is a Fontys HBO-ICT team project that combines a visual identity and an interactive website for an electronic music artist with Caribbean roots. The project explored two visual directions: urban nightlife and tropical festival energy.

The website brings that identity to life with an artist introduction, an events page, a contact page, and optional audio from a live set.

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
