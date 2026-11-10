async function injectComponent(selector, path) {
    const container = document.querySelector(selector);
    if (!container) return;

    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} statusText: ${response.statusText}`);
        }

        const content = await response.text();
        container.innerHTML = content;
        console.log(`Injected component: ${path}`);
    } catch (error) {
        console.error(`Failed to inject component ${path} : ${error}`);
    }
}

Promise.all([
    injectComponent('#header', '../src/partials/layout/header-nav.html'),
    injectComponent('#footer', '../src/partials/layout/footer.html'),
    injectComponent('#sound-toggle-container', '../src/partials/modals/sound-toggle.html')
]).catch((error) => {
    console.error('Error injecting components:', error);
    throw error;
}).then(() => {
    console.log('All components injected successfully.');
    wireRouting();
    showcaseCurrentPage();
    initializeBackgroundSound();
    const video = document.querySelector('video');
    if (video) {
        video.src = 'assets/videos/home-video-bg.mp4';
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.play().catch((error) => {
            console.error('Error playing video:', error);
        });
    }
});
































// async function loadComponent(selector, path) {
//     const container = document.querySelector(selector);
//     if (!container) return;

//     try {
//         const response = await fetch(path);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status} StatusText: ${response.statusText}`);
//         }
//         const content = await response.text();
//         container.innerHTML = content;
//     } catch (error) {
//         console.error(`Failed to load component ${path} : ${error}`);
//     }
// }


// Promise.all([
// loadComponent('#header', '../src/partials/layout/header-nav.html'),
// loadComponent('#footer', '../src/partials/layout/footer.html')
// ]).catch((error) => {
//     console.error('Error loading components:', error);
//     throw error;
// }).then(() => {
//     console.log('All components loaded successfully.');
// });
