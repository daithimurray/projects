// "How it works": the installer's survey drawing.
//
// Desktop (motion on): the stage pins and scroll steps through six zones. The
// house draws itself first (cable), then each zone switches on with its own
// device moment: the door opens (trip), the PIR fan sweeps (sweep), the camera
// pans (pan), the smoke detector pulses, the bell box strobes while the flood
// trips on, and the alert lands on a phone (strobe). Earlier zones stay armed.
// Small screens (motion on): the drawing sticks to the top and pans to each
// zone as its step passes. Reduced motion, no JS, and screens too short for
// either (landscape phones, high zoom): the markup is already the finished,
// fully armed drawing in a static layout, so nothing here runs.
import { boot, gsap, ScrollTrigger, sweepIn, strobe, motionOK, isPaused, onPauseChange } from './motion.js';

// Heights are in em so a larger default text size needs a taller screen
// before the section pins or sticks (37.5em = 600px, 35em = 560px at 16px).
const DESK = '(min-width: 1000px) and (min-height: 37.5em) and (prefers-reduced-motion: no-preference)';
const STACK = '(max-width: 999.98px) and (min-height: 35em) and (prefers-reduced-motion: no-preference)';
const STEP_VH = 0.7; // pinned scroll per zone, as a share of the viewport height
const FULL = '0 0 1200 860';
// Small-screen crops of the same drawing, one per zone (same 1200:860 aspect).
const CROPS = ['372 452 520 373', '190 452 520 373', '496 50 710 509', '150 250 500 358', '420 170 753 540', FULL];
const WIDE_U = 2.3; // above this many drawing units per pixel, annotations are too small to read
// Where each device sits in the drawing, for the hover locator (the phone is not in the drawing).
const ANCHORS = [
  [603, 575],
  [620, 567],
  [686, 487],
  [352, 404],
  [656, 446],
];

// trip: a PIR light snapping on. Fast attack, a flicker, then settle.
const trip = (to = 1) => [
  { opacity: to * 0.9, duration: 0.06, ease: 'none' },
  { opacity: to * 0.4, duration: 0.05, ease: 'none' },
  { opacity: to, duration: 0.6, ease: 'expo.out' },
];

export function initAnatomy(root) {
  if (!root) return;
  boot();

  const $ = (s) => root.querySelector(s);
  const $$ = (s) => [...root.querySelectorAll(s)];
  const svg = $('.an-svg');
  const stage = $('[data-an-stage]');
  const art = $('[data-an-art]');
  const steps = $$('[data-an-step]');
  const N = steps.length;

  // Drawing units per screen pixel: annotations stay a readable size at any width.
  const setU = () => {
    const w = svg.getBoundingClientRect().width;
    if (!w) return;
    const u = svg.viewBox.baseVal.width / w;
    root.style.setProperty('--u', u.toFixed(3));
    svg.classList.toggle('is-wide', u > WIDE_U);
  };
  setU();
  if ('ResizeObserver' in window) new ResizeObserver(setU).observe(svg);

  const title = $('#anatomy-title');
  sweepIn(title);
  // The heading re-splits into new lines a beat after a width change, so the
  // section's height moves after ScrollTrigger has measured. Re-measure then,
  // or every trigger below starts a line early or late.
  if (motionOK() && 'ResizeObserver' in window) {
    let h = 0;
    let wait = 0;
    new ResizeObserver(([entry]) => {
      const next = Math.round(entry.contentRect.height);
      if (h && next !== h) {
        clearTimeout(wait);
        wait = setTimeout(() => ScrollTrigger.refresh(), 250);
      }
      h = next;
    }).observe(title);
  }
  if (motionOK()) {
    const foot = $('[data-an-foot]');
    gsap.from(foot.querySelectorAll('.icon path, .icon circle'), {
      drawSVG: '0%',
      duration: 1.1,
      stagger: 0.12,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: foot, start: 'top 88%', once: true },
    });
  }

  const E = {
    leaf: $('[data-an-leaf]'),
    status: $('[data-an-status]'),
    fanFill: $('[data-an-fanfill]'),
    sweep: $('[data-an-sweep]'),
    cam: $$('[data-an-cam]'),
    inset: $('[data-an-inset]'),
    flash: $('[data-an-flash]'),
    clock: $('[data-an-clock]'),
    rec: $('[data-an-rec]'),
    rings: $$('[data-an-ring]'),
    smokeGlow: $('[data-an-smokeglow]'),
    walker: $('[data-an-walker]'),
    ping: $('[data-an-ping]'),
    blue: $('[data-an-blue]'),
    phone: $('[data-an-phone]'),
    card: $('[data-an-card]'),
  };
  const fx = steps.map((_, i) => $$(`[data-an-fx="${i}"]`));
  const devEls = steps.map((_, i) => $$(`[data-dev="${i}"]`));
  const tags = steps.map((_, i) => $(`[data-tag="${i}"]`));

  // Resting ("armed") light levels come from the CSS, so there is one source of truth.
  const rest = new Map();
  const restOf = (el) => rest.get(el) ?? 1;

  // The CCTV clock ticks while the camera is the live zone.
  const clockBase = E.clock.textContent.trim();
  const [hh, mins, ss] = clockBase.split(':');
  let secs = Number(ss) || 0;
  let clockCall = null;
  const tick = () => {
    secs = (secs + 1) % 60;
    E.clock.textContent = `${hh}:${mins}:${String(secs).padStart(2, '0')}`;
    clockCall = hold(gsap.delayedCall(1, tick));
  };
  const stopClock = () => {
    clockCall?.kill();
    clockCall = null;
  };

  let mode = null;
  let current = -1;
  let buttons = [];
  const state = new Array(N).fill('calm');
  const tls = new Array(N).fill(null);
  const loops = steps.map(() => []);

  // Pause (WCAG 2.2.2): the header's control stops every looping device
  // (REC blink, walker, smoke rings, bell-box strobe) and the camera clock.
  // Scroll-driven changes keep working; they are the reader's own doing.
  const hold = (t) => {
    if (isPaused()) t.pause();
    return t;
  };
  onPauseChange((paused) => {
    [...loops.flat(), clockCall].forEach((t) => t?.paused(paused));
  });

  // ---------- One authored moment per device. s: 'on' | 'calm' | 'off' ----------
  const devices = [
    // Zone 1: the front door opens a hand's width and its contact reports it.
    (s, tl) => {
      if (s === 'on') {
        tl.to(E.leaf, { scaleX: 0.95, duration: 0.14, ease: 'power1.out' }, 0.15)
          .to(E.leaf, { scaleX: 0.55, duration: 1, ease: 'power3.out' }, 0.29)
          .to(fx[0], { keyframes: trip(1) }, 0.34)
          .fromTo(
            E.status,
            { opacity: 0 },
            {
              keyframes: [
                { opacity: 1, duration: 0.05, ease: 'none' },
                { opacity: 0.15, duration: 0.12, ease: 'none' },
                { opacity: 1, duration: 0.05, ease: 'none' },
                { opacity: 0.15, duration: 0.12, ease: 'none' },
                { opacity: 1, duration: 0.3, ease: 'expo.out' },
              ],
            },
            0.6,
          );
      } else {
        tl.to(E.leaf, { scaleX: 1, duration: s === 'off' ? 0.5 : 0.9, ease: 'power2.inOut' }, 0)
          .to(fx[0], { opacity: 0, duration: s === 'off' ? 0.4 : 1.2, ease: 'decay' }, 0)
          .to(E.status, { opacity: 0, duration: 0.3 }, 0);
      }
    },

    // Zone 2: a detection beam sweeps the hall; each lobe trips as it passes.
    (s, tl) => {
      const lobes = fx[1];
      if (s === 'on') {
        tl.set(lobes, { opacity: 0 }, 0)
          .set(E.sweep, { rotation: 180, opacity: 0 }, 0)
          .to(E.sweep, { opacity: 1, duration: 0.08, ease: 'none' }, 0.15)
          .to(E.sweep, { rotation: 97, duration: 1.05, ease: 'power2.inOut' }, 0.15)
          .to(E.sweep, { opacity: 0, duration: 0.35 }, 1.05);
        [0.41, 0.55, 0.65, 0.74, 0.85, 1].forEach((at, i) => tl.to(lobes[i], { keyframes: trip(1) }, at));
        tl.fromTo(E.fanFill, { opacity: 0 }, { opacity: 0.18, duration: 0.1, ease: 'none' }, 1.12).to(
          E.fanFill,
          { opacity: 0.05, duration: 1.3, ease: 'decay' },
          1.25,
        );
      } else {
        tl.to(lobes, { opacity: s === 'off' ? 0 : restOf(lobes[0]), duration: s === 'off' ? 0.4 : 1.3, ease: 'decay' }, 0).to(
          [E.sweep, E.fanFill],
          { opacity: 0, duration: 0.4 },
          0,
        );
      }
    },

    // Cam 1: the head pans from the road onto the driveway; its picture comes up.
    (s, tl) => {
      stopClock();
      if (s === 'on') {
        tl.to(E.cam, { rotation: 4, duration: 1, ease: 'power2.inOut' }, 0.1)
          .to(E.cam, { rotation: 0, duration: 0.7, ease: 'power2.out' }, 1.1)
          .to(fx[2], { opacity: 1, duration: 0.8, ease: 'power1.out' }, 0.25)
          .fromTo(E.inset, { scaleY: 0.012, opacity: 1 }, { scaleY: 1, duration: 0.5, ease: 'expo.out' }, 0.7)
          .fromTo(E.flash, { opacity: 0.9 }, { opacity: 0, duration: 0.8, ease: 'power2.out' }, 0.75)
          .add(() => {
            clockCall = hold(gsap.delayedCall(1, tick));
            loops[2].push(
              hold(gsap.to(E.rec, { opacity: 0.1, duration: 0.5, repeat: -1, yoyo: true, ease: 'steps(1)' })),
              // The figure on the driveway keeps walking while the camera is live.
              hold(
                gsap.to(E.walker, {
                  x: 14,
                  y: 7,
                  scale: 1.1,
                  transformOrigin: '50% 100%',
                  duration: 3.4,
                  repeat: -1,
                  yoyo: true,
                  ease: 'sine.inOut',
                }),
              ),
            );
          }, 1.2);
      } else if (s === 'calm') {
        tl.to(E.walker, { x: 0, y: 0, scale: 1, duration: 0.8 }, 0)
          .to(E.cam, { rotation: 0, duration: 0.6 }, 0)
          .to(fx[2], { opacity: restOf(fx[2][0]), duration: 1.3, ease: 'decay' }, 0)
          .to(E.inset, { scaleY: 1, opacity: 1, duration: 0.4 }, 0)
          .to([E.rec, E.flash], { opacity: (i) => (i ? 0 : 1), duration: 0.2 }, 0);
      } else {
        tl.to(E.walker, { x: 0, y: 0, scale: 1, duration: 0.4 }, 0)
          .to(E.cam, { rotation: -20, duration: 0.6, ease: 'power2.inOut' }, 0)
          .to(fx[2], { opacity: 0, duration: 0.4 }, 0)
          .to(E.inset, { scaleY: 0.012, opacity: 0, duration: 0.35, ease: 'power2.in' }, 0)
          .to(E.rec, { opacity: 1, duration: 0.2 }, 0);
      }
    },

    // Zone 5: the smoke detector pulses rings across the landing.
    (s, tl) => {
      if (s === 'on') {
        const loop = gsap.timeline({ repeat: -1, repeatDelay: 0.45, delay: 0.3 });
        loop
          .fromTo(E.smokeGlow, { opacity: 0 }, { keyframes: trip(0.55) }, 0)
          .to(E.smokeGlow, { opacity: 0.12, duration: 1.4, ease: 'decay' }, 0.75)
          .fromTo(
            E.rings,
            { scale: 1, opacity: 0.95 },
            { scale: 7, opacity: 0, duration: 1.7, ease: 'power1.out', stagger: 0.4 },
            0,
          );
        loops[3].push(hold(loop));
      } else {
        tl.to([...E.rings, E.smokeGlow], { opacity: 0, duration: 0.4 }, 0);
      }
    },

    // External: the floodlight trips on over the driveway; the bell box double-blinks.
    (s, tl) => {
      const lights = fx[4];
      if (s === 'on') {
        tl.to(lights, { keyframes: trip(1), stagger: 0.03 }, 0.12);
        const loop = gsap.timeline({ repeat: -1, repeatDelay: 1.1, delay: 0.45 });
        loop
          .to(E.blue, { opacity: 1, duration: 0.04, ease: 'none' })
          .to(E.blue, { opacity: 0.2, duration: 0.1, ease: 'none' })
          .to(E.blue, { opacity: 1, duration: 0.04, ease: 'none' })
          .to(E.blue, { opacity: 0.3, duration: 0.55, ease: 'decay' });
        loops[4].push(hold(loop));
      } else {
        const off = s === 'off';
        tl.to(lights, { opacity: (i, el) => (off ? 0 : restOf(el)), duration: off ? 0.4 : 1.3, ease: 'decay' }, 0).to(
          E.blue,
          { opacity: off ? 0 : restOf(E.blue), duration: 0.6 },
          0,
        );
      }
    },

    // HKC app: the alert lands on the phone with a bell-box strobe.
    (s, tl) => {
      const desk = mode === 'desk';
      if (s === 'on') {
        tl.fromTo(
          E.phone,
          desk ? { yPercent: 115, rotation: 7, opacity: 0 } : { yPercent: -30, opacity: 0 },
          { yPercent: 0, rotation: desk ? -3 : 0, opacity: 1, duration: 1, ease: 'expo.out' },
          0.1,
        )
          .fromTo(E.card, { y: -14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' }, desk ? 0.65 : 0.2)
          .add(() => strobe(E.card), desk ? 0.8 : 0.35);
      } else {
        tl.to(
          E.phone,
          desk
            ? { yPercent: 115, rotation: 7, opacity: 0, duration: 0.5, ease: 'power2.in' }
            : { yPercent: -30, opacity: 0, duration: 0.35 },
          0,
        );
      }
    },
  ];

  // Leader lines draw from the device to the tag like a cable run.
  function tagTo(i, s, tl) {
    const t = tags[i];
    if (!t) return;
    const lead = t.querySelector('.an-tag__lead');
    const dot = t.querySelector('.an-tag__dot');
    const txt = [...t.querySelectorAll('.an-tag__txt:not([data-an-status])')];
    if (s === 'on') {
      tl.fromTo(dot, { scale: 0, opacity: 1 }, { scale: 1, duration: 0.4, ease: 'expo.out' }, 0).fromTo(
        lead,
        { drawSVG: '0%' },
        { drawSVG: '100%', duration: 0.65, ease: 'power2.inOut' },
        0.05,
      );
      if (txt.length) tl.fromTo(txt, { opacity: 0 }, { keyframes: trip(1) }, 0.55);
    } else if (s === 'calm') {
      tl.to(lead, { drawSVG: '100%', duration: 0.4 }, 0).to([dot, ...txt], { opacity: 1, scale: 1, duration: 0.4 }, 0);
    } else {
      tl.to(lead, { drawSVG: '0%', duration: 0.35, ease: 'power2.in' }, 0).to([dot, ...txt], { opacity: 0, duration: 0.25 }, 0);
    }
  }

  function setDev(i, s) {
    if (state[i] === s) return;
    state[i] = s;
    devEls[i].forEach((n) => (n.dataset.state = s));
    tls[i]?.kill();
    loops[i].forEach((l) => l.kill());
    loops[i].length = 0;
    const tl = gsap.timeline();
    tls[i] = tl;
    devices[i](s, tl);
    tagTo(i, s, tl);
  }

  function panTo(k) {
    gsap.to(svg, {
      attr: { viewBox: k < 0 ? FULL : CROPS[k] },
      duration: 1.1,
      ease: 'power2.inOut',
      overwrite: 'auto',
      onUpdate: setU,
    });
  }

  // Switching zones: panel LEDs, the open step, every device's state.
  function setStep(k) {
    if (k === current) return;
    current = k;
    steps.forEach((li, i) => {
      li.classList.toggle('is-active', i === k);
      li.classList.toggle('is-done', i < k);
    });
    buttons.forEach((b, i) => (i === k ? b.setAttribute('aria-current', 'step') : b.removeAttribute('aria-current')));
    for (let i = 0; i < N; i++) setDev(i, i < k ? 'calm' : i === k ? 'on' : 'off');
    if (mode === 'stack') panTo(k);
  }

  // The sodium rail between panel LEDs fills with scroll inside each zone.
  const rail = (p) => {
    const x = p * N;
    steps.forEach((li, i) => li.style.setProperty('--fill', Math.min(1, Math.max(0, x - i)).toFixed(3)));
  };

  // The house draws itself: walls and roof, site, floors, stairs, furniture, then the fills.
  function buildDraw() {
    const groups = [1, 2, 3, 4, 5].map((n) => [...svg.querySelectorAll(`.d${n}`)]);
    const lines = groups.flat();
    const fills = [...svg.querySelectorAll('[data-fill]')];
    const fillRest = new Map(fills.map((el) => [el, parseFloat(getComputedStyle(el).fillOpacity) || 1]));
    const glow = [...svg.querySelectorAll('[data-an-glow]')];
    const sheet = $('[data-an-sheet]');
    const bodies = [...svg.querySelectorAll('[data-an-devices] > :not(.an-bloom)')];
    const fades = [...svg.querySelectorAll('[data-an-fade]')];
    gsap.set(lines, { drawSVG: '0%' });
    gsap.set(fills, { fillOpacity: 0 });
    gsap.set([...glow, sheet, ...bodies, ...fades], { opacity: 0 });
    return gsap
      .timeline({
        paused: true,
        defaults: { ease: 'power2.inOut' },
        onComplete: () => gsap.set(lines, { clearProps: 'strokeDasharray,strokeDashoffset' }),
      })
      .to(sheet, { keyframes: trip(1) }, 0)
      .to(groups[0], { drawSVG: '100%', duration: 1.2, stagger: 0.06 }, 0)
      .to(groups[4], { drawSVG: '100%', duration: 1.3, stagger: 0.05 }, 0.2)
      .to(groups[1], { drawSVG: '100%', duration: 0.9, stagger: 0.06 }, 0.55)
      .to(groups[2], { drawSVG: '100%', duration: 0.9, stagger: 0.04 }, 0.95)
      .to(groups[3], { drawSVG: '100%', duration: 0.8, stagger: 0.04 }, 1.35)
      .to(fills, { fillOpacity: (i, el) => fillRest.get(el), duration: 1, ease: 'power1.out', stagger: 0.02 }, 1)
      .to(fades, { opacity: 1, duration: 0.7, ease: 'power1.out' }, 1.3)
      .to(bodies, { opacity: 1, duration: 0.5, stagger: 0.015, ease: 'power1.out' }, 1.9)
      .to(glow, { keyframes: trip(1) }, 2.05);
  }

  const mm = gsap.matchMedia();
  mm.add({ desk: DESK, stack: STACK }, (ctx) => {
    const { desk, stack } = ctx.conditions;
    if (!desk && !stack) return undefined;
    mode = desk ? 'desk' : 'stack';
    root.classList.add('is-live', desk ? 'is-pinned' : 'is-sticky');
    setU();

    // Everything starts dark: undrawn house, devices off, tags hidden.
    const fxAll = fx.flat();
    [...fxAll, E.blue].forEach((el) => rest.set(el, parseFloat(getComputedStyle(el).opacity)));
    const tagParts = tags.filter(Boolean).flatMap((t) => [...t.querySelectorAll('.an-tag__dot, .an-tag__txt')]);
    const leads = tags.filter(Boolean).map((t) => t.querySelector('.an-tag__lead'));
    for (let i = 0; i < N; i++) {
      state[i] = 'off';
      devEls[i].forEach((n) => (n.dataset.state = 'off'));
    }
    current = -1;
    gsap.set(E.leaf, { transformOrigin: '0% 50%' });
    gsap.set(E.sweep, { svgOrigin: '616 574', rotation: 180 });
    gsap.set(E.rings, { svgOrigin: '352 407' });
    gsap.set(E.cam, { svgOrigin: '668 487', rotation: -20 });
    gsap.set(E.inset, { svgOrigin: '985 172', scaleY: 0.012, opacity: 0 });
    gsap.set([...fxAll, E.fanFill, E.sweep, E.blue, E.smokeGlow], { opacity: 0 });
    gsap.set(E.phone, desk ? { yPercent: 115, rotation: 7, opacity: 0 } : { yPercent: -30, opacity: 0 });
    gsap.set(E.card, { opacity: 0 });
    gsap.set(leads, { drawSVG: '0%' });
    gsap.set(tagParts, { opacity: 0, transformOrigin: '50% 50%' });
    if (stack) svg.setAttribute('viewBox', FULL);

    const draw = buildDraw();
    const play = () => draw.play();
    ScrollTrigger.create({ trigger: art, start: 'top 82%', onToggle: play, onLeave: play });

    let onPointer = null;
    let onHover = null;
    let fitWatch = null;
    if (desk) {
      // The list reserves its tallest state: every zone closed plus the
      // longest one open. Rows are measured whatever their transition state
      // (a row minus its body is its closed height). If that outgrows the
      // room under the header, the list tightens.
      const need = () => {
        let closed = 0;
        let open = 0;
        steps.forEach((li) => {
          const body = li.querySelector('.an-step__body');
          closed += li.offsetHeight - body.offsetHeight;
          open = Math.max(open, body.firstElementChild.scrollHeight);
        });
        return Math.ceil(closed + open);
      };
      const fitList = () => {
        root.classList.remove('is-tight');
        const cs = getComputedStyle(stage);
        const room = stage.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
        let h = need();
        if (h > room) {
          root.classList.add('is-tight');
          h = need();
        }
        root.style.setProperty('--an-list-h', `${h}px`);
      };
      fitList();
      // Width, height and late fonts all change the rows; the stage's own
      // size changes with the viewport only (pinning keeps it).
      fitWatch = new ResizeObserver(fitList);
      fitWatch.observe(stage);
      document.fonts?.ready.then(() => mode === 'desk' && fitList());

      const pin = ScrollTrigger.create({
        trigger: stage,
        pin: true,
        // Measured before every later trigger, so they start below its spacing
        // (also after a breakpoint round trip re-creates it last).
        refreshPriority: 1,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * STEP_VH * N)}`,
        invalidateOnRefresh: true,
        onUpdate(self) {
          rail(self.progress);
          if (!self.isActive && self.progress === 0) setStep(-1);
          else setStep(Math.min(N - 1, Math.floor(self.progress * N)));
        },
        onLeaveBack: () => {
          setStep(-1);
          rail(0);
        },
      });

      // Each step becomes a real control: click or tab to it and the scroll
      // moves there. A pointer click glides. Keyboard focus jumps: a running
      // glide would swallow the browser's scroll to the next focused element,
      // leaving focus off-screen after the next Tab or Shift+Tab.
      const goTo = (i, how) => {
        const y = pin.start + (pin.end - pin.start) * ((i + 0.3) / N);
        const lenis = window.__lenis;
        if (how === 'jump') {
          if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
          else window.scrollTo(0, y);
        } else if (lenis) lenis.scrollTo(y, { duration: 1.3, force: true });
        else window.scrollTo({ top: y, behavior: 'smooth' });
      };
      let pointerFocus = false;
      onPointer = () => {
        pointerFocus = true;
        setTimeout(() => (pointerFocus = false), 500);
      };
      root.addEventListener('pointerdown', onPointer);

      // Hovering a step pings its device on the drawing, so list and picture stay linked.
      const ping = (i) => {
        const a = ANCHORS[i];
        if (!a) return;
        gsap.set(E.ping, { attr: { cx: a[0], cy: a[1] } });
        gsap.fromTo(
          E.ping,
          { scale: 0.35, opacity: 1 },
          { scale: 2.2, opacity: 0, duration: 0.9, ease: 'expo.out', transformOrigin: '50% 50%', overwrite: true },
        );
      };
      onHover = (e) => {
        const li = e.target.closest('[data-an-step]');
        if (li && !li.contains(e.relatedTarget)) ping(steps.indexOf(li));
      };
      root.addEventListener('pointerover', onHover);
      buttons = steps.map((li, i) => {
        const h = li.querySelector('.an-step__title');
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'an-step__btn';
        b.append(...h.childNodes);
        h.append(b);
        // detail 0: activated from the keyboard (Enter or Space), so jump too
        b.addEventListener('click', (e) => goTo(i, e.detail === 0 ? 'jump' : 'glide'));
        b.addEventListener('focus', () => {
          if (!pointerFocus) goTo(i, 'jump');
        });
        return b;
      });
    } else {
      steps.forEach((li, i) =>
        ScrollTrigger.create({
          trigger: li,
          start: 'top 58%',
          end: 'bottom 58%',
          onToggle: (self) => self.isActive && setStep(i),
        }),
      );
      // A jump (nav link, Home/End) can skip every step trigger. Past the list
      // the drawing settles on its last zone; above it, everything is off. Either
      // way no looping device is left running off-screen.
      ScrollTrigger.create({
        trigger: $('.an-steps'),
        start: 'top 58%',
        end: 'bottom 58%',
        onLeave: () => setStep(N - 1),
        onLeaveBack: () => setStep(-1),
      });
    }

    return () => {
      stopClock();
      loops.forEach((l) => {
        l.forEach((t) => t.kill());
        l.length = 0;
      });
      tls.forEach((t) => t?.kill());
      gsap.killTweensOf(svg);
      const touched = [
        E.leaf, E.status, E.fanFill, E.sweep, ...E.cam, E.inset, E.flash, E.rec, ...E.rings, E.smokeGlow, E.walker, E.ping,
        E.blue, E.phone, E.card, ...fxAll, ...leads, ...tagParts,
      ];
      gsap.killTweensOf(touched);
      gsap.set(touched, { clearProps: 'all' });
      buttons.forEach((b) => {
        b.parentNode.append(...b.childNodes);
        b.remove();
      });
      buttons = [];
      if (onPointer) root.removeEventListener('pointerdown', onPointer);
      if (onHover) root.removeEventListener('pointerover', onHover);
      fitWatch?.disconnect();
      root.style.removeProperty('--an-list-h');
      root.classList.remove('is-live', 'is-pinned', 'is-sticky', 'is-tight');
      steps.forEach((li) => {
        li.classList.remove('is-active', 'is-done');
        li.style.removeProperty('--fill');
      });
      for (let i = 0; i < N; i++) {
        state[i] = 'calm';
        tls[i] = null;
        devEls[i].forEach((n) => (n.dataset.state = 'calm'));
      }
      current = -1;
      mode = null;
      E.clock.textContent = clockBase;
      svg.setAttribute('viewBox', FULL);
      setU();
    };
  });
}
