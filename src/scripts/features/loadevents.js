
const cardColors = ['#ccdf23', '#cd4d80', '#cf8a26', '#0e735e', '#2f3032'];

async function renderEvents() {
    try {
        const response = await fetch('../src/data/events.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const template = await fetch('../src/partials/ui/event-card.html');
        if (!template) {
            throw new Error('Template element not found');
        }

        console.log('Template found:', template);

        // convert the response from json to a javascript object
        const data = await response.json();
        const html = await template.text();

        const eventsContainer = document.getElementById('events-container');
        const eventCardTemplateHTML = document.createElement('template');
        eventCardTemplateHTML.innerHTML = html;
        const eventCardTemplate = eventCardTemplateHTML.content.querySelector('#event-card-template');
        document.body.appendChild(eventCardTemplate);
        const events = data.events;

        const cardColors = ['#2f3032', '#734d15', '#291285', '#7f2a4c', '#164e43'];

        events.sort((a, b) => {
            const dateA = a.date?.value || "0000-00-00";
            const dateB = b.date?.value || "0000-00-00";
            return dateB.localeCompare(dateA);
        });

        eventsContainer.innerHTML = '';

        events.forEach((event, index) => {
            const eventElement = eventCardTemplate.content.cloneNode(true);
            
            const color = cardColors[index % cardColors.length];
            eventElement.querySelector('.page.left')?.style.setProperty('background-color', color);
            const coverTitle = eventElement.querySelector('.cover .front-cover .front-cover-inner .event-title');
            if (coverTitle) {
            coverTitle.style.backgroundColor = color;
            }

            const titleElement = eventElement.querySelectorAll('.event-title');
            titleElement.forEach(el => {
                if (event.title) {
                    el.textContent = event.title;
                } else {
                    el.textContent = 'Title not available';
                }
            });

            const dateElement = eventElement.querySelectorAll('.event-date');
            const calendarImageElement = eventElement.querySelector('.icon-calendar');
            const calendarSVG = './assets/images/calendar.svg';
            dateElement.forEach(el => {
                if (event.date && event.date.label && event.date.value) {
                    calendarImageElement.src = calendarSVG;
                    calendarImageElement.alt = 'Calendar Icon';
                    calendarImageElement.style.width = '16px';
                    calendarImageElement.style.height = '16px';
                    el.textContent = `${event.date.label}`;
                    el.setAttribute('datetime', event.date.value);
                } else {
                    el.textContent = 'Date not available';
                    el.removeAttribute('datetime');
                }
            });

            const timeElement = eventElement.querySelector('.event-time');
            const clockImageElement = eventElement.querySelector('.icon-clock');
            const clockSVG = './assets/images/clock.svg';
            if (event.time && event.time.label && event.time.value) {
            clockImageElement.src = clockSVG;
            clockImageElement.alt = 'Clock Icon';
            clockImageElement.style.width = '16px';
            clockImageElement.style.height = '16px';
            timeElement.textContent = `${event.time.label}`;
            timeElement.setAttribute('datetime', event.time.value);
            } else {
            timeElement.textContent = 'Time not available';
            timeElement.removeAttribute('datetime');
            }

            const locationElement = eventElement.querySelectorAll('.event-location');
            const locationSVG = './assets/images/location.svg';
            const locationImageElement = eventElement.querySelector('.icon-location');
            locationImageElement.src = locationSVG;
            locationElement.forEach(el => {
            if (event.location && event.location.label && event.location.value) {
            locationImageElement.src = locationSVG;
            locationImageElement.alt = 'Location Icon';
            locationImageElement.style.width = '16px';
            locationImageElement.style.height = '16px';
            el.textContent = event.location.label;
            el.dataset.location = event.location.value;
            } else {
            el.textContent = 'Location not available';
            el.removeAttribute('data-location');
            }
            });

            const musicStyleElement = eventElement.querySelector('.event-music-style');
            const iconVibeElement = eventElement.querySelector('.icon-music');
            const vibeSVG = './assets/images/music.svg';
            const musicStyle = event["music-style"];
            if (musicStyle && musicStyle.label && Array.isArray(musicStyle.value)) {
            iconVibeElement.src = vibeSVG;
            iconVibeElement.alt = 'Music Icon';
            iconVibeElement.style.width = '16px';
            iconVibeElement.style.height = '16px';
            musicStyleElement.textContent = musicStyle.label;
            musicStyleElement.dataset.musicStyle = musicStyle.value.join(', ');
            } else {
            musicStyleElement.textContent = 'Music style not available';
            musicStyleElement.removeAttribute('data-music-style');
            }

            const eventVibeElement = eventElement.querySelector('.event-vibe');
            const iconVibeSVG = './assets/images/vibe.svg';
            const iconVibeImageElement = eventElement.querySelector('.icon-vibe');
            const eventVibe = event["event-vibe"];
            if (eventVibe && typeof eventVibe === 'string') {
            iconVibeImageElement.src = iconVibeSVG;
            iconVibeImageElement.alt = 'Vibe Icon';
            iconVibeImageElement.style.width = '16px';
            iconVibeImageElement.style.height = '16px';
            eventVibeElement.textContent = eventVibe;
            } else {
            eventVibeElement.textContent = 'Event vibe not available';
            }

            const ageRestrictionImage = './assets/images/18+.png';
            const ageRestrictionElement = eventElement.querySelector('.age-restriction');
            if (event["age-restriction"]  && typeof event["age-restriction"]  === 'string' && (event["age-restriction"]  === 'yes')) {
            ageRestrictionElement.src = ageRestrictionImage;
            ageRestrictionElement.alt = '18+ Age Restriction';
            ageRestrictionElement.style.display = 'block';
            ageRestrictionElement.style.position = 'absolute';
            ageRestrictionElement.style.top = '-20%';
            ageRestrictionElement.style.right = '-18%';
            ageRestrictionElement.style.height = '100%';
            ageRestrictionElement.style.transform = 'rotate(15deg)';
            ageRestrictionElement.style.objectFit = 'contain';
            ageRestrictionElement.style.zIndex = '25';
            } else if (event["age-restriction"]  && typeof event["age-restriction"]  === 'string' && (event["age-restriction"]  === 'no')) {
            ageRestrictionElement.style.display = 'none';
            }

            const coverImageElement = eventElement.querySelector('.event-cover-image');
            const coverImage = event["cover-image"];
            if (coverImage && typeof coverImage === 'string') {
            coverImageElement.style.backgroundImage = `url(${coverImage})`;
            } else {
            coverImageElement.style.textContent = 'Cover image not available';
            }

            eventsContainer.appendChild(eventElement);
        });

        
    } catch (error) {
        console.error('Error loading or rendering events:', error);
        window.alert('An error occurred while loading events. Please try again later.');
    }
}