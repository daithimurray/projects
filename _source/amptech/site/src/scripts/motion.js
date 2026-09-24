// Shared motion system. Every section script imports from here so GSAP,
// ScrollTrigger and Lenis are registered once and the motion gate is honoured.
//
// Motion grammar (see _source/amptech/BUILD-SPEC.md):
//   trip   — a PIR floodlight snapping on: fast attack, short settle, slow decay
//   sweep  — a detection beam passing across (headings, scan lines)
//   strobe — the bell-box beacon double-blink, for alerts only
//   pan    — a CCTV head turning to follow
//   cable  — a line drawn along a path, like a cable run
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, DrawSVGPlugin);

// Floodlight curve: jumps most of the way instantly, overshoots a hair, settles.
CustomEase.create('trip', 'M0,0 C0.05,0.9 0.1,1.04 0.24,1.02 0.4,1 0.6,1 1,1');
CustomEase.create('decay', 'M0,0 C0.3,0 0.4,0.6 1,1');

const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

/** True when the visitor allows motion. Read at call time; it can change. */
export const motionOK = () => !reducedQuery.matches;

export const isTouch = () => window.matchMedia('(hover: none), (pointer: coarse)').matches;

let lenis = null;
let booted = false;

/** Idempotent. Called by every section script before it builds timelines. */
export function boot() {
  if (booted) return { gsap, ScrollTrigger, lenis };
  booted = true;

  const root = document.documentElement;
  if (motionOK()) {
    root.classList.add('motion-ok');
    lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95, anchors: false });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    window.__lenis = lenis;
    keepPlaceOnResize(lenis);
  }

  // In-page anchors: glide with Lenis, keep focus and history correct.
  document.addEventListener('click', (event) => {
    // Leave new-tab, new-window and download gestures to the browser
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href');
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    scrollToTarget(target);
    history.pushState(null, '', id);
  });

  reducedQuery.addEventListener('change', () => window.location.reload());

  // Section scripts create triggers in whatever order they load. Sort by page
  // position so pins higher up push later triggers down, then re-measure once
  // web fonts have changed line breaks.
  const settle = () => {
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', settle, { once: true });
  else queueMicrotask(settle);
  if (document.fonts?.ready) document.fonts.ready.then(settle);

  initPause();
  initLitReveals();
  initPointerLights();
  return { gsap, ScrollTrigger, lenis };
}

// Both paths honour html's scroll-padding-top (header height + 16px), so no
// manual offset: Lenis subtracts scroll-padding for element targets itself.
export function scrollToTarget(target, { focus = true } = {}) {
  const done = () => {
    if (!focus) return;
    if (!target.hasAttribute('tabindex') && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(target.tagName)) {
      target.setAttribute('tabindex', '-1');
    }
    target.focus({ preventScroll: true });
  };
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.2, onComplete: done });
  } else {
    target.scrollIntoView({ behavior: motionOK() ? 'smooth' : 'auto', block: 'start' });
    done();
  }
}

/*
 * Crossing a gsap.matchMedia breakpoint (rotating a tablet, resizing a window)
 * reverts and rebuilds pins, and Lenis would otherwise snap the page to the
 * top. Remember which section the reader is in, and how far through it, then
 * put them back there once ScrollTrigger has finished refreshing.
 */
function keepPlaceOnResize(lenis) {
  const sections = [...document.querySelectorAll('main > section')];
  let anchor = null;
  let frozen = false;
  let raf = 0;
  const measure = () => {
    if (frozen) return;
    const el = sections.find((s) => (s.closest('.pin-spacer') || s).getBoundingClientRect().bottom > 0);
    if (!el) return;
    const box = (el.closest('.pin-spacer') || el).getBoundingClientRect();
    anchor = { el, frac: -box.top / Math.max(1, box.height) };
  };
  lenis.on('scroll', measure);
  measure();
  // Only real layout changes: phones fire resize when the URL bar slides, and
  // a stale anchor must never be replayed on some later, unrelated refresh.
  let last = { w: window.innerWidth, h: window.innerHeight };
  let thaw = 0;
  window.addEventListener('resize', () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (w === last.w && Math.abs(h - last.h) < 160) return;
    last = { w, h };
    frozen = true;
    clearTimeout(thaw);
    thaw = setTimeout(() => {
      frozen = false;
    }, 1500);
  });
  ScrollTrigger.addEventListener('refresh', () => {
    if (!frozen || !anchor) return;
    cancelAnimationFrame(raf); // wait for the last of several refresh cycles
    raf = requestAnimationFrame(() => {
      const box = (anchor.el.closest('.pin-spacer') || anchor.el).getBoundingClientRect();
      lenis.reset(); // Lenis still holds the old target; scrollTo() is a no-op when y equals it
      lenis.scrollTo(box.top + window.scrollY + anchor.frac * box.height, { immediate: true, force: true });
      ScrollTrigger.update();
      frozen = false;
    });
  });
}

/**
 * trip: content in shadow lights up as it arrives. Starts dim, never invisible.
 * @param {Element|Element[]|string} targets
 */
export function lightsOn(targets, { trigger, start = 'top 82%', stagger = 0.09, y = 14 } = {}) {
  if (!motionOK()) return null;
  const els = gsap.utils.toArray(targets);
  if (!els.length) return null;
  gsap.set(els, { opacity: 0.18, y });
  return gsap
    .timeline({ scrollTrigger: { trigger: trigger || els[0], start, once: true } })
    .to(els, {
      keyframes: [
        { opacity: 0.9, duration: 0.06, ease: 'none' },
        { opacity: 0.55, duration: 0.05, ease: 'none' },
        { opacity: 1, duration: 0.7, ease: 'expo.out' },
      ],
      stagger,
    })
    .to(els, { y: 0, duration: 0.9, ease: 'expo.out', stagger }, 0);
}

/**
 * sweep: a heading lit line by line, as if a beam passes across it.
 * Uses SplitText with masked lines; the text stays readable to assistive tech.
 */
export function sweepIn(heading, { trigger, start = 'top 80%', delay = 0 } = {}) {
  if (!motionOK() || !heading) return null;
  // autoSplit re-splits when the width changes or fonts arrive late; returning
  // the tween from onSplit lets SplitText carry its progress over to the new lines.
  return SplitText.create(heading, {
    type: 'lines',
    mask: 'lines',
    linesClass: 'sweep-line',
    aria: 'auto',
    reduceWhiteSpace: false,
    autoSplit: true,
    onSplit: (self) =>
      gsap.fromTo(
        self.lines,
        { yPercent: 105 },
        {
          yPercent: 0,
          duration: 1.05,
          ease: 'expo.out',
          stagger: 0.09,
          delay,
          scrollTrigger: { trigger: trigger || heading, start, once: true },
        },
      ),
  });
}

/** strobe: bell-box beacon double blink on an element (alerts, confirmations). */
export function strobe(el, { color = 'var(--strobe-500)' } = {}) {
  if (!el) return null;
  if (!motionOK()) return null;
  return gsap
    .timeline()
    .set(el, { '--strobe': color })
    .fromTo(el, { '--strobe-a': 0 }, { '--strobe-a': 1, duration: 0.05, repeat: 3, yoyo: true, ease: 'none' })
    .to(el, { '--strobe-a': 0, duration: 0.4, ease: 'decay' });
}

/**
 * Build non-critical section motion after first paint, in idle time, so the
 * first viewport isn't blocked by timelines for sections far below it.
 * Pinned sections must NOT use this: pins are built eagerly so every later
 * trigger measures with the pin spacing in place. One sort + refresh runs
 * after the queue drains.
 */
const laterQueue = [];
let laterScheduled = false;
const idle = window.requestIdleCallback || ((fn) => setTimeout(() => fn({ timeRemaining: () => 8 }), 60));
export function later(build) {
  laterQueue.push(build);
  if (laterScheduled) return;
  laterScheduled = true;
  const run = (deadline) => {
    while (laterQueue.length && deadline.timeRemaining() > 4) laterQueue.shift()();
    if (laterQueue.length) {
      idle(run, { timeout: 400 });
      return;
    }
    laterScheduled = false;
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  };
  const start = () => idle(run, { timeout: 800 });
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}

/*
 * Pause (WCAG 2.2.2). One switch for every looping animation on the page:
 * CSS loops pause through html.motion-paused (base.css); scripted loops
 * (canvas, WebGL, intervals) subscribe with onPauseChange() and stop drawing.
 * Scroll-driven motion is user-controlled and keeps working.
 */
const pauseListeners = new Set();
const PAUSE_KEY = 'amptech:motion-paused';
export const isPaused = () => document.documentElement.classList.contains('motion-paused');
export function onPauseChange(fn) {
  pauseListeners.add(fn);
  return () => pauseListeners.delete(fn);
}
export function setPaused(paused) {
  document.documentElement.classList.toggle('motion-paused', paused);
  try {
    if (paused) localStorage.setItem(PAUSE_KEY, '1');
    else localStorage.removeItem(PAUSE_KEY);
  } catch {}
  pauseListeners.forEach((fn) => fn(paused));
}
function initPause() {
  let stored = false;
  try {
    stored = localStorage.getItem(PAUSE_KEY) === '1';
  } catch {}
  if (stored) document.documentElement.classList.add('motion-paused');
}

// Lit sections: the floodlight switches on as the section arrives. A veil
// element (not a pseudo-element) carries the mask, so tweening its own
// non-inherited --reveal restyles one element instead of the whole section.
// The final radius covers the whole section (tall sections on phones outgrow
// any vmax value), and the veil is hidden once the light is fully on.
function initLitReveals() {
  if (!motionOK()) return;
  gsap.utils.toArray('[data-lit-reveal]').forEach((section) => {
    const veil = document.createElement('div');
    veil.className = 'lit-veil';
    veil.setAttribute('aria-hidden', 'true');
    section.prepend(veil);
    const full = () => `${Math.ceil(Math.hypot(section.offsetWidth / 2, section.offsetHeight) + 40)}px`;
    gsap.fromTo(
      veil,
      { '--reveal': '0px' },
      {
        '--reveal': full,
        ease: 'power2.in',
        immediateRender: true,
        scrollTrigger: {
          trigger: section,
          start: 'top 92%',
          end: 'top 25%',
          scrub: 0.4,
          invalidateOnRefresh: true,
          onUpdate: (self) => section.classList.toggle('is-revealed', self.progress > 0.995),
          onLeave: () => section.classList.add('is-revealed'),
        },
      },
    );
  });
}

// Buttons carry a light that follows the pointer (see .btn::before).
function initPointerLights() {
  if (isTouch()) return;
  document.addEventListener(
    'pointermove',
    (event) => {
      const btn = event.target.closest?.('.btn, [data-pointer-light]');
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      btn.style.setProperty('--mx', `${event.clientX - r.left}px`);
      btn.style.setProperty('--my', `${event.clientY - r.top}px`);
    },
    { passive: true },
  );
}

export { gsap, ScrollTrigger, SplitText };
