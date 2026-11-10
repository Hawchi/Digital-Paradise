let backgroundAudio;

function loadAudioComponents() {
    if (!backgroundAudio) {
        backgroundAudio = new Audio('./assets/sounds/digital-paradise-live-set-rotterdam.mp3');
        backgroundAudio.loop = true;
        backgroundAudio.volume = 0.4;
    }

    return backgroundAudio;
}

function playBackgroundAudio() {
    if (!backgroundAudio || backgroundAudio.muted || !backgroundAudio.paused) {
        return;
    }
    backgroundAudio.play().catch((error) => {
        console.error('Error playing audio:', error);
    });
}

function pauseBackgroundAudio() {
    if (!backgroundAudio) {
        return;
    }
    backgroundAudio.pause();
}