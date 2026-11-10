document.addEventListener('click', (e) => {
  const card = e.target.closest('.event-card');
  if (!card) return;

  const CLOSE_MS = 200; // must match closing transition

  if (!card.classList.contains('is-open')) {
    card.classList.remove('is-closing');
    card.classList.add('is-open');
    return;
  }

  // start closing animation (keep 2-col spread)
  card.classList.add('is-closing');

  // after the cover shuts, collapse layout
  setTimeout(() => {
    card.classList.remove('is-open');
    card.classList.remove('is-closing');
  }, CLOSE_MS);
});
