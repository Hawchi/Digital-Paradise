(function enforceIndexHtmlInUrl() {
    // this is the URL without the hash
    const url = new URL(window.location.href);

    // if the pathname ends with /public/ (or just /public),we  rewrite it to /public/index.html
    if (/\/public\/?$/.test(url.pathname)) {
        url.pathname = url.pathname.replace(/\/public\/?$/, '/public/index.html');
        window.location.replace(url.toString());
    }
})();

function getCurrentRoute() {
    return window.location.hash.replace('#', '').split('&')[0] || 'home';
}

// ensuring there is a hash in the URl when the user first visits the site
if (!location.hash) {
    location.hash = '#home';
}

const pageRoutesMap = {
    home: '../src/pages/home.html',
    about: '../src/pages/about.html',
    about2: '../src/pages/about2.html',
    events: '../src/pages/events.html',
    contact: '../src/pages/contact.html'
}

const mainElement = document.getElementById('main');

function routeResolver(routeKey) {
    if (!pageRoutesMap[routeKey]) {
        console.error(`Unknown route: ${routeKey}`);
        mainElement.innerHTML = `<h2>404 - Page Not Found</h2>\n<p>The page you are looking for is not available.</p>`;
        return null;
    }  

    return pageRoutesMap[routeKey];
}

async function loadPage(routeKey) {
    const resolvedPath = routeResolver(routeKey);
    if (!resolvedPath) {
        return;
    }

    try {
        const response = await fetch(resolvedPath);

        if (!response.ok) {
            throw new Error(`HTTP error!\nstatus: ${response.status}\nstatusText: ${response.statusText}`);
        }

        const content = await response.text();
        renderPage(content);
        console.log(`Loaded page: ${routeKey}`);

        // if (routeKey === 'home') {
        //     requestAnimationFrame(() => moveBackgroundSoundBy('2%'));
        // } else {
        //     moveBackgroundSoundBy('');
        // }

        if (routeKey === 'events') {
            renderEvents();
        }

        if (routeKey === 'about' && window.initAboutDP) {
            requestAnimationFrame(() => window.initAboutDP());
        }


        if (routeKey === 'about' || routeKey === 'about2' || routeKey === 'contact' || routeKey === 'events') {
            const header = document.getElementById('header');
            const footer = document.getElementById('footer');
            header.style.backgroundColor = '#1E1E1E';
            footer.style.backgroundColor = '#1E1E1E';
        } else {
            const header = document.getElementById('header');
            const footer = document.getElementById('footer');
            header.style.backgroundColor = '';
            footer.style.backgroundColor = '';
        }
    } catch (error) {
        console.error('Failed to load page:', error);
        mainElement.innerHTML = `<h2>Error Loading Page</h2>\n<p>There was an error loading the requested page. We might be experiencing technical difficulties or doing maintenance. Please try again later.</p>`;
    }
}

function renderPage(content) {
    mainElement.innerHTML = content;
}

function wireRouting() {
    const links = document.querySelectorAll('.header-nav a');

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const targetRouteKey = link.getAttribute('href').replace('#', '') || 'home';
            window.location.hash = targetRouteKey;
        })
    })
}

function showcaseCurrentPage() {
    const currentRoute = getCurrentRoute();
    const links = document.querySelectorAll('.nav-links a');

    links.forEach(link => {
        const targetRouteKey = link.getAttribute('href').replace('#', '') || 'home';
        if (targetRouteKey === currentRoute) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

window.addEventListener('hashchange', () => {
    const currentRoute = getCurrentRoute();
    loadPage(currentRoute);
    showcaseCurrentPage();
})

async function initializeRouter() {
    const currentRoute = getCurrentRoute();
    await loadPage(currentRoute);
    wireRouting();
    showcaseCurrentPage();
}

initializeRouter();
showcaseCurrentPage();