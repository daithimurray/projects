// Hero controller: the CCTV on-screen display, the scroll lift, and the lazy
// three.js scene. The entrance is pure CSS (Hero.astro): it starts at first
// paint, so it never waits for this script and never replays when it lands.
// Everything here works without the scene; the poster stays put.
import { boot, gsap, motionOK, isTouch, isPaused, onPauseChange } from '../motion.js';
import { hero as copy, heroScene } from '../../data/content.js';

const params = new URLSearchParams(location.search);

export function initHero() {
  const root = document.querySelector('[data-hero]');
  if (!root) return;
  boot();
  const poster = params.has('poster');
  const q = (s) => root.querySelector(s);
  const content = q('[data-hero-content]');
  const hud = q('[data-hero-hud]');
  const hint = q('[data-hero-hint]');
  const state = { scroll: 0 };
  let scene = null;

  // Loops (the OSD clock here, the scene in scene.js, the CSS blinks) run only
  // while the hero is on screen, the tab is visible and nothing is paused.
  const clock = runClock(q('[data-osd-time]'), poster);
  let inView = true;
  const syncLoops = () => clock.run(motionOK() && inView && !document.hidden && !isPaused());
  new IntersectionObserver(([e]) => {
    inView = e.isIntersecting;
    root.classList.toggle('is-away', !inView);
    syncLoops();
  }).observe(root);
  document.addEventListener('visibilitychange', syncLoops);
  onPauseChange(syncLoops);

  // Scroll: the camera dollies toward the door (in the scene); the words lift away.
  if (motionOK() && !poster) {
    gsap
      .timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (st) => {
            state.scroll = st.progress;
            scene?.nudge(); // a still frame when the loop is paused
          },
        },
      })
      .to(content, { y: () => -root.offsetHeight * 0.16, opacity: 0, ease: 'power1.in', duration: 0.75 }, 0)
      .to(hud, { opacity: 0, duration: 0.35 }, 0)
      .fromTo(q('[data-hero-poster]'), { scale: 1 }, { scale: 1.1, duration: 1 }, 0);
  }

  const conn = navigator.connection;
  const allowed = poster || (motionOK() && !conn?.saveData && !/2g/.test(conn?.effectiveType || ''));
  if (!allowed) return;
  const touch = isTouch();
  hint.querySelector('[data-hint-text]').textContent = touch ? copy.hintTouch : copy.hintPointer;
  hint.classList.toggle('is-touch', touch);
  const ui = overlay(root, hint, q('[data-hero-track]'), q('[data-osd-cam]'));

  // The driveway hint appears once the scene has settled, never while paused
  // (the scene can't answer then) and never after the visitor has tripped it.
  let hintTimer = 0;
  const scheduleHint = (delay) => {
    clearTimeout(hintTimer);
    if (!poster && root.classList.contains('is-live') && !isPaused()) hintTimer = setTimeout(ui.showHint, delay);
  };

  const start = () => {
    if (!hasWebGL()) return;
    import('./scene.js')
      .then(({ createScene }) =>
        createScene({
          canvas: q('[data-hero-canvas]'),
          root,
          state,
          poster,
          paused: isPaused(),
          hq: params.has('hq'), // test flag: fixed quality, real-time clock, window.__heroDebug
          decayEase: gsap.parseEase('decay'),
          onReady: () => {
            root.classList.add('is-live');
            scheduleHint(4300);
          },
          onMotion: ui.motion,
          onFrame: ui.frame,
          // Back to the poster, and the overlay with it: no tracking box or
          // hint over a picture that can't answer.
          onLost: () => {
            root.classList.remove('is-live');
            clearTimeout(hintTimer);
            ui.reset();
          },
          onRestored: () => {
            root.classList.add('is-live');
            scheduleHint(2500);
          },
        }),
      )
      .then((api) => {
        scene = api;
        const follow = (paused) => {
          api.setPaused(paused);
          if (paused) {
            clearTimeout(hintTimer);
            ui.hideHint(true);
          } else scheduleHint(1500);
        };
        onPauseChange(follow);
        if (isPaused()) follow(true); // paused while the scene was loading
      })
      .catch(() => root.classList.remove('is-live'));
  };

  if (poster) start();
  else {
    // Only when the hero is in, or near, view: a visitor who lands on #contact
    // (or a restored scroll) never downloads, parses or compiles three.js.
    const idle = () => ('requestIdleCallback' in window ? requestIdleCallback(start, { timeout: 1600 }) : setTimeout(start, 250));
    const near = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        near.disconnect();
        idle();
      },
      { rootMargin: '200px 0px' },
    );
    const arm = () => near.observe(root);
    if (document.readyState === 'complete') arm();
    else window.addEventListener('load', arm, { once: true });
  }
}

function hasWebGL() {
  try {
    const gl = document.createElement('canvas').getContext('webgl2');
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    return !!gl;
  } catch {
    return false;
  }
}

// OSD timestamp: Europe/Dublin, DD-MM-YYYY HH:MM:SS. It ticks on the second
// only while run(true); otherwise it holds the last time shown.
function runClock(el, poster) {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Dublin',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  });
  const draw = () => {
    const p = {};
    for (const { type, value } of fmt.formatToParts(new Date())) p[type] = value;
    el.textContent = `${p.day}-${p.month}-${p.year} ${poster ? '22:47:12' : `${p.hour}:${p.minute}:${p.second}`}`;
  };
  let timer = 0;
  let on = false;
  const tick = () => {
    draw();
    timer = setTimeout(tick, 1000 - (Date.now() % 1000) + 8);
  };
  draw();
  return {
    run(want) {
      if (poster || want === on) return;
      on = want;
      clearTimeout(timer);
      if (on) tick();
    },
  };
}

// The DOM layer over the canvas: the interaction hint and the motion box.
function overlay(root, hint, track, cam) {
  const label = hint.querySelector('.hero__hint-label');
  let hintOn = false;
  let userTripped = false;
  let boxOn = false;
  let lw = 0;
  let hideTimer = 0;
  const hideHint = (now = false) => {
    if (!hintOn && !now) return;
    hintOn = false;
    hint.classList.remove('is-on');
    clearTimeout(hideTimer);
    if (now) hint.hidden = true;
    else hideTimer = setTimeout(() => (hint.hidden = true), 700);
  };
  const setBox = (on) => {
    if (on === boxOn) return;
    boxOn = on;
    track.classList.toggle('is-on', on);
  };
  const motion = (on, source) => {
    root.classList.toggle('is-motion', on);
    hint.classList.toggle('is-muted', on);
    cam.textContent = on ? heroScene.motionLabel : copy.camLabel;
    if (on && source === 'user') {
      userTripped = true;
      hideHint();
    }
  };
  return {
    showHint() {
      if (userTripped || hintOn) return;
      clearTimeout(hideTimer);
      hint.hidden = false;
      lw = label.offsetWidth;
      hintOn = true;
      requestAnimationFrame(() => hintOn && hint.classList.add('is-on'));
    },
    hideHint,
    motion,
    frame(info) {
      if (hintOn) {
        const w = root.clientWidth;
        const x = Math.min(Math.max(info.hx, 16 + lw / 2), w - 16 - lw / 2);
        hint.style.transform = `translate3d(${info.hx.toFixed(1)}px,${info.hy.toFixed(1)}px,0)`;
        label.style.setProperty('--shift', `${(x - info.hx).toFixed(1)}px`);
      }
      const b = info.box;
      if (b) {
        track.style.transform = `translate3d(${b.x.toFixed(1)}px,${b.y.toFixed(1)}px,0)`;
        track.style.width = `${b.w.toFixed(1)}px`;
        track.style.height = `${b.h.toFixed(1)}px`;
      }
      setBox(!!b);
    },
    reset() {
      motion(false);
      setBox(false);
      hideHint(true);
    },
  };
}
