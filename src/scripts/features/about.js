// - Uses #about-dp as the "body" for step classes
// - Uses #about-dp as the scroll container (root.scrollTop)
// - Keeps the same animation math + CSS variables

window.initAboutDP = function initAboutDP() {
  const root = document.getElementById("about-dp");
  if (!root) return;

  const story = root.querySelector("#story");
  const stage = root.querySelector("#stage");
  if (!story || !stage) return;

  // avoid double listeners when revisiting route
  if (root.dataset.bound === "true") {
    // still update once (important on route re-entry)
    update();
    return;
  }
  root.dataset.bound = "true";

  function update() {
    // In the original:
    // rect.height - window.innerHeight  => total scrollable distance
    // scrolled = clamp(-rect.top, 0..total)
    
    // In SPA with a scroll container:
    // total = story.scrollHeight - root.clientHeight
    // scrolled = clamp(root.scrollTop, 0..total)

    // const vh = root.clientHeight;
    // const total = story.scrollHeight - vh;

    // // guard against division by 0
    // const scrolled = total > 0 ? Math.max(0, Math.min(total, root.scrollTop)) : 0;
    // const t = total > 0 ? (scrolled / total) : 0;

    const rect = story.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height - vh;
    const scrolled = Math.max(0, Math.min(total, -rect.top));
    const t = scrolled / total;
    const animT = Math.min(1, t / 0.25); 


    const discShift = 200 * animT;
    stage.style.setProperty("--disc-x", `${discShift}px`);

    const discScale = 1 + (animT * 2.5);
    stage.style.setProperty("--disc-scale", discScale);

    const moveLeft = (window.innerWidth * 0.55) * animT;
    stage.style.setProperty("--stage-x", `-${moveLeft}px`);

    stage.style.setProperty("--cover-opacity", 1 - animT);
    stage.style.setProperty("--disc-rot", `${t * 500}deg`);

    // --- STEP CLASSES (but on root, not body) ---
    root.classList.remove("step-0", "step-1", "step-2", "step-3", "step-4");

    if (t < 0.20) {
      root.classList.add("step-0");
    } else if (t < 0.40) {
      root.classList.add("step-1");
    } else if (t < 0.60) {
      root.classList.add("step-2");
    } else if (t < 0.80) {
      root.classList.add("step-3");
    } else {
      root.classList.add("step-4");
    }
  }

  // Listen to the scroll CONTAINER (root), not window
  root.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);

  update();
};
