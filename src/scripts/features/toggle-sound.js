loadAudioComponents();

// sets the UI state of the sound toggle button meaning sound-on or sound-off
function setUiState(soundToggle, desiredOn) {
    soundToggle.classList.toggle('sound-on', desiredOn);
    soundToggle.classList.toggle('sound-off', !desiredOn);
}

// sets the animation state of the sound toggle button meaning is it playing or not
function setPlayingUiState(soundToggle, isPlaying) {
    soundToggle.classList.toggle('is-playing', isPlaying);
}

// tries to play the audio and syncs the UI state based on success or failure
async function tryPlayingAndSyncUiState(soundToggle) {
    try {
        await backgroundAudio.play();
        // if successful, turn on the playing animation
        setPlayingUiState(soundToggle, true);
    } catch (error) {
        console.error('Error playing audio:', error);
        // if failed, turn off the playing animation
        setPlayingUiState(soundToggle, false);
    }
}

function initializeBackgroundSound() {
    const soundToggle = document.querySelector('.sound-toggle-container');
    if (!soundToggle) return;

    // read the saved state from localStorage
    const musicIsPlaying = localStorage.getItem('musicIsPlaying');

    // set the initial ui state based on saved state, meaning sound-on or sound-off, default to off
    setUiState(soundToggle, musicIsPlaying === 'true');

    // if the saved state is playing, try to play and sync the ui state
    if (musicIsPlaying === 'true') {
        tryPlayingAndSyncUiState(soundToggle);
        window.addEventListener('click', () => {
            tryPlayingAndSyncUiState(soundToggle);
        }, { once: true });
    } else {
        // if the saved state is not playing, ensure audio is paused and ui shows as not playing
        pauseBackgroundAudio();
        setPlayingUiState(soundToggle, false);
    }

    soundToggle.addEventListener('click', async () => {
        const on = soundToggle.classList.contains('sound-on');

        if (on) {
            pauseBackgroundAudio();
            localStorage.setItem('musicIsPlaying', 'false');
            setUiState(soundToggle, false);
            setPlayingUiState(soundToggle, false);
        } else {
            playBackgroundAudio();
            localStorage.setItem('musicIsPlaying', 'true');
            setUiState(soundToggle, true);
            await tryPlayingAndSyncUiState(soundToggle);
        }
    });
}

function moveBackgroundSoundBy(percent) {
    const soundToggleElement = document.querySelector('.sound-toggle-container');

    if (!soundToggleElement) return;
    soundToggleElement.style.bottom = percent;
}