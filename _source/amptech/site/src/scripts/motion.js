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
  }

  // In-page anchors: glide with Lenis, keep focus and history correct.
  document.addEventListener('click', (event) => {
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
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });

  initLitReveals();
  initPointerLights();
  return { gsap, ScrollTrigger, lenis };
}

export function scrollToTarget(target, { focus = true } = {}) {
  const offset = -(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72) - 8;
  const done = () => {
    if (!focus) return;
    if (!target.hasAttribute('tabindex') && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(target.tagName)) {
      target.setAttribute('tabindex', '-1');
    }
    target.focus({ preventScroll: true });
  };
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.2, onComplete: done });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: motionOK() ? 'smooth' : 'auto' });
    done();
  }
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
  const split = SplitText.create(heading, { type: 'lines', mask: 'lines', linesClass: 'sweep-line', aria: 'auto' });
  gsap.set(split.lines, { yPercent: 105 });
  return gsap.to(split.lines, {
    yPercent: 0,
    duration: 1.05,
    ease: 'expo.out',
    stagger: 0.09,
    delay,
    scrollTrigger: { trigger: trigger || heading, start, once: true },
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

// Lit sections: the floodlight switches on as the section arrives.
function initLitReveals() {
  if (!motionOK()) return;
  gsap.utils.toArray('[data-lit-reveal]').forEach((section) => {
    gsap.fromTo(
      section,
      { '--reveal': '0vmax' },
      {
        '--reveal': '160vmax',
        ease: 'power2.in',
        scrollTrigger: { trigger: section, start: 'top 92%', end: 'top 25%', scrub: 0.4 },
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
