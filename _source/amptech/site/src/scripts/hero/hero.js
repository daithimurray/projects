// Hero controller: entrance, the CCTV on-screen display, scroll, and the lazy
// three.js scene. All of this works without the scene; the poster stays put.
import { boot, gsap, SplitText, motionOK, isTouch } from '../motion.js';
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
  const osd = q('[data-hero-osd]');
  const hint = q('[data-hero-hint]');
  const state = { scroll: 0 };

  runClock(q('[data-osd-time]'), poster);
  if (poster) document.documentElement.classList.remove('hero-intro');
  else entrance(content, osd);

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
          onUpdate: (st) => (state.scroll = st.progress),
        },
      })
      .to(content, { y: () => -root.offsetHeight * 0.16, opacity: 0, ease: 'power1.in', duration: 0.75 }, 0)
      .to(hud, { opacity: 0, duration: 0.35 }, 0)
      .fromTo(q('[data-hero-poster]'), { scale: 1 }, { scale: 1.1, duration: 1 }, 0);
  }

  const allowed = poster || (motionOK() && !navigator.connection?.saveData && hasWebGL());
  if (!allowed) return;
  const touch = isTouch();
  hint.querySelector('[data-hint-text]').textContent = touch ? copy.hintTouch : copy.hintPointer;
  hint.classList.toggle('is-touch', touch);
  const ui = overlay(root, hint, q('[data-hero-track]'), q('[data-osd-cam]'));

  const start = () =>
    import('./scene.js')
      .then(({ createScene }) =>
        createScene({
          canvas: q('[data-hero-canvas]'),
          root,
          state,
          poster,
          hq: params.has('hq'), // test flag: fixed quality, real-time clock, window.__heroDebug
          decayEase: gsap.parseEase('decay'),
          onReady: () => {
            root.classList.add('is-live');
            if (!poster) setTimeout(ui.showHint, 4300);
          },
          onMotion: ui.motion,
          onFrame: ui.frame,
          onLost: () => root.classList.remove('is-live'),
        }),
      )
      .catch(() => root.classList.remove('is-live'));

  if (poster) start();
  else {
    const idle = () => ('requestIdleCallback' in window ? requestIdleCallback(start, { timeout: 1600 }) : setTimeout(start, 250));
    if (document.readyState === 'complete') idle();
    else window.addEventListener('load', idle, { once: true });
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

// OSD timestamp: Europe/Dublin, DD-MM-YYYY HH:MM:SS, ticking on the second.
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
  const tick = () => {
    const p = {};
    for (const { type, value } of fmt.formatToParts(new Date())) p[type] = value;
    if (!document.hidden) el.textContent = `${p.day}-${p.month}-${p.year} ${poster ? '22:47:12' : `${p.hour}:${p.minute}:${p.second}`}`;
    if (!poster) setTimeout(tick, 1000 - (Date.now() % 1000) + 8);
  };
  tick();
}

// Heading lines sweep up through masks; the rest trips on like a floodlight.
function entrance(content, osd) {
  const html = document.documentElement;
  const done = () => html.classList.remove('hero-intro');
  if (!motionOK()) return done();
  const title = content.querySelector('#hero-title');
  gsap.set(title, { opacity: 0 }); // until its lines are measured with the real font
  const fonts = Promise.race([document.fonts?.ready, new Promise((r) => setTimeout(r, 450))]);
  fonts.then(() => {
    const split = SplitText.create(title, { type: 'lines', mask: 'lines', linesClass: 'hero__line', aria: 'auto' });
    gsap.set(title, { opacity: 1 });
    gsap.from(split.lines, {
      yPercent: 140,
      duration: 0.95,
      ease: 'expo.out',
      stagger: 0.085,
      onComplete: () => split.revert(),
    });
  });
  const trips = [...content.querySelectorAll('[data-trip]'), osd];
  gsap
    .timeline({ delay: 0.32, onComplete: done })
    .fromTo(trips, { opacity: 0 }, {
      keyframes: [
        { opacity: 0.9, duration: 0.05, ease: 'none' },
        { opacity: 0.4, duration: 0.05, ease: 'none' },
        { opacity: 1, duration: 0.45, ease: 'expo.out' },
      ],
      stagger: 0.08,
    })
    .fromTo(trips, { y: 12 }, { y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.08, clearProps: 'transform' }, 0);
}

// The DOM layer over the canvas: the interaction hint and the motion box.
function overlay(root, hint, track, cam) {
  const label = hint.querySelector('.hero__hint-label');
  let hintOn = false;
  let userTripped = false;
  let boxOn = false;
  let lw = 0;
  const hideHint = () => {
    if (!hintOn) return;
    hintOn = false;
    hint.classList.remove('is-on');
    setTimeout(() => (hint.hidden = true), 700);
  };
  return {
    showHint() {
      if (userTripped || hintOn) return;
      hint.hidden = false;
      lw = label.offsetWidth;
      hintOn = true;
      requestAnimationFrame(() => hint.classList.add('is-on'));
    },
    motion(on, source) {
      root.classList.toggle('is-motion', on);
      hint.classList.toggle('is-muted', on);
      cam.textContent = on ? heroScene.motionLabel : copy.camLabel;
      if (on && source === 'user') {
        userTripped = true;
        hideHint();
      }
    },
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
      if (!!b !== boxOn) {
        boxOn = !!b;
        track.classList.toggle('is-on', boxOn);
      }
    },
  };
}
