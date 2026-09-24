/* Clonakenny Flower Farm: page behaviour. */
(function () {
  'use strict';

  var doc = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var gsap = window.gsap;
  var ST = window.ScrollTrigger;
  var motion = !reduce && !!(gsap && ST);
  if (motion) {
    doc.classList.add('motion');
    gsap.registerPlugin(ST);
    if (window.SplitText) gsap.registerPlugin(window.SplitText);
  }

  var PHONE = '353872766413';
  var COLORS = { lilac: '#C8A2C8', dusk: '#1B0E21', pale: '#F3EAF3' };
  var isDesktop = function () { return window.matchMedia('(min-width: 861px)').matches; };
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var yearEl = $('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
     Photos: gallery from photos.js, and hide any slot whose file is missing
     ------------------------------------------------------------------ */
  var gallery = window.CLONAKENNY_GALLERY || [];
  var list = $('[data-gallery]');
  if (list) {
    gallery.forEach(function (p) {
      var li = document.createElement('li');
      li.className = 'gallery__item';
      li.innerHTML = '<figure class="photo"><div class="photo__frame"><img alt="" loading="lazy" decoding="async"></div><figcaption></figcaption></figure>';
      var img = li.querySelector('img');
      img.src = p.src;
      if (p.srcset) { img.srcset = p.srcset; img.sizes = '(min-width: 861px) 36vw, 78vw'; }
      if (p.w) { img.width = p.w; img.height = p.h; }
      img.alt = p.alt || '';
      li.querySelector('figcaption').textContent = p.caption || '';
      list.appendChild(li);
    });
    if (!gallery.length) {
      var gal = $('.gallery');
      gal.hidden = true;
      $$('a[href="#flowers"]').forEach(function (a) { a.setAttribute('href', '#bouquets'); });
    }
  }

  function markMissing(fig) {
    fig.classList.add('is-missing');
    var story = fig.closest('.story__grid');
    if (story && $$('.story__photo:not(.is-missing)', story).length === 0) story.classList.add('no-photos');
    var offer = fig.closest('.offer');
    if (offer) offer.classList.add('no-photo');
    if (motion) ST.refresh();
  }
  $$('.photo[data-photo] img').forEach(function (img) {
    var fig = img.closest('.photo');
    if (img.complete && img.naturalWidth === 0) markMissing(fig);
    else img.addEventListener('error', function () { markMissing(fig); }, { once: true });
  });

  /* ------------------------------------------------------------------
     Smooth scroll
     ------------------------------------------------------------------ */
  var lenis = null;
  if (motion && window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    lenis.on('scroll', ST.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }
  function scrollToTarget(target) {
    if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (id.length < 2) return;
    var target = document.getElementById(id.slice(1));
    if (!target) return;
    e.preventDefault();
    closeMenu();
    if (a.dataset.occasion) setOccasion(a.dataset.occasion, a.dataset.month);
    scrollToTarget(target);
    history.replaceState(null, '', id);
  });

  /* ------------------------------------------------------------------
     Menu (mobile)
     ------------------------------------------------------------------ */
  var toggle = $('.nav__toggle');
  var menu = $('#menu');
  function openMenu() {
    menu.hidden = false;
    requestAnimationFrame(function () { menu.classList.add('is-open'); });
    toggle.setAttribute('aria-expanded', 'true');
    toggle.querySelector('.nav__toggle-label').textContent = 'Close';
    document.body.classList.add('menu-open');
    if (lenis) lenis.stop();
    var first = $('a', menu);
    if (first) setTimeout(function () { first.focus(); }, 300);
  }
  function closeMenu() {
    if (!menu || !menu.classList.contains('is-open')) return;
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.querySelector('.nav__toggle-label').textContent = 'Menu';
    document.body.classList.remove('menu-open');
    if (lenis) lenis.start();
    setTimeout(function () { if (!menu.classList.contains('is-open')) menu.hidden = true; }, 800);
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      if (menu.classList.contains('is-open')) { closeMenu(); toggle.focus(); } else openMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) { closeMenu(); toggle.focus(); }
    });
  }

  /* ------------------------------------------------------------------
     Flowers (WebGL)
     ------------------------------------------------------------------ */
  function makeFlower(canvas, opts) {
    if (!canvas || !window.ClonakennyFlower) return null;
    try { return new window.ClonakennyFlower(canvas, opts); } catch (err) { return null; }
  }
  function watch(flower, el) {
    if (!flower) return;
    if (!motion) { flower.render(); return; }
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) flower.start(); else flower.stop(); });
    }, { rootMargin: '100px' }).observe(el);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) flower.stop();
    });
  }
  function onResize(flower, layout) {
    if (!flower) return;
    var t;
    window.addEventListener('resize', function () {
      clearTimeout(t);
      t = setTimeout(function () { flower.resize(); if (layout) layout(); if (!flower.running) flower.render(); }, 120);
    });
  }

  var small = window.matchMedia('(max-width: 860px)').matches;
  var hero = makeFlower($('.hero__canvas'), { preset: 'dahlia', bloom: motion ? 0 : 1, maxDpr: small ? 1.6 : 2 });
  var heroBase = { offsetX: 0, offsetY: 0, dist: 9 };
  var intro = { b: motion ? 0 : 0.9 };
  var heroScroll = { center: 0, dive: 0 };
  function layoutHero() {
    if (!hero) return;
    var w = window.innerWidth, h = window.innerHeight, aspect = w / h;
    if (w <= 860) {
      heroBase.offsetX = 0; heroBase.offsetY = aspect < 0.62 ? 0.5 : 0.42; heroBase.dist = aspect < 0.62 ? 12.5 : 10.5;
    } else {
      heroBase.offsetX = 0.42; heroBase.offsetY = 0.04; heroBase.dist = aspect > 1.9 ? 7.8 : 8.4;
    }
  }
  if (hero) {
    doc.classList.add('webgl');
    layoutHero();
    hero.onBeforeRender = function (f) {
      var c = heroScroll.center;
      f.state.offsetX = heroBase.offsetX * (1 - c);
      f.state.offsetY = heroBase.offsetY * (1 - c);
      f.state.dist = heroBase.dist + (heroBase.dist * 0.82 - heroBase.dist) * c;
      f.state.bloom = Math.min(1, intro.b + 0.12 * c);
      f.state.dive = heroScroll.dive;
    };
    hero.onBeforeRender(hero);
    watch(hero, $('.hero'));
    onResize(hero, layoutHero);
    if (finePointer && motion) {
      window.addEventListener('pointermove', function (e) {
        hero.setPointer(e.clientX / window.innerWidth * 2 - 1, e.clientY / window.innerHeight * 2 - 1);
        if (year) year.setPointer(e.clientX / window.innerWidth * 2 - 1, e.clientY / window.innerHeight * 2 - 1);
      }, { passive: true });
    }
  }

  var yearCanvas = $('.year__canvas');
  var year = makeFlower(yearCanvas, { preset: 'seed', bloom: 1, maxDpr: small ? 1.5 : 2, seed: 7 });
  var PRESET_ORDER = ['seed', 'ranunculus', 'cosmos', 'dahlia', 'strawflower'];
  if (year) {
    year.state.dist = 7.2;
    year.state.tiltX = -0.5;
    year.state.spinSpeed = 0.07;
    if (!motion) year.setPreset('dahlia');
    watch(year, $('.year'));
    onResize(year);
  }

  /* ------------------------------------------------------------------
     Composer
     ------------------------------------------------------------------ */
  var form = $('[data-composer]');
  var tagText = $('[data-tag-text]');
  var tag = $('.tag');
  var OPENERS = {
    bouquet: "I'd love to order a bouquet",
    wedding: "I'm getting married and I'd love to talk about wedding flowers",
    event: "I'm looking for flowers for an event",
    wreath: "I'd love to order a December wreath",
    other: 'I have a question about flowers'
  };
  function formatDate(value) {
    if (!value) return '';
    var d = new Date(value + 'T12:00:00');
    if (isNaN(d)) return '';
    return d.toLocaleDateString('en-IE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }
  function buildMessage() {
    var data = new FormData(form);
    var occ = data.get('occasion') || 'bouquet';
    var date = formatDate(data.get('date'));
    var name = (data.get('name') || '').trim();
    var notes = (data.get('notes') || '').trim();
    var msg = 'Hi Ali, ' + OPENERS[occ];
    if (date) msg += (occ === 'wedding' ? '. The date is ' : ' for ') + date;
    msg += '.';
    if (notes) msg += '\n' + notes;
    msg += '\n' + (name ? 'Thanks, ' + name : 'Thanks!');
    return msg;
  }
  var swingT;
  function updateComposer(swing) {
    if (!form) return;
    var msg = buildMessage();
    tagText.textContent = msg;
    var enc = encodeURIComponent(msg);
    $('[data-send="whatsapp"]').href = 'https://wa.me/' + PHONE + '?text=' + enc;
    $('[data-send="sms"]').href = 'sms:+' + PHONE + '?&body=' + enc;
    if (swing && motion) {
      clearTimeout(swingT);
      swingT = setTimeout(function () {
        tag.classList.remove('is-swing');
        void tag.offsetWidth;
        tag.classList.add('is-swing');
      }, 250);
    }
  }
  function setOccasion(occ, monthIndex) {
    if (!form) return;
    var radio = form.querySelector('input[name="occasion"][value="' + occ + '"]');
    if (radio) radio.checked = true;
    if (monthIndex != null && monthIndex !== '') {
      var now = new Date();
      var m = parseInt(monthIndex, 10);
      var y = now.getFullYear() + (m < now.getMonth() ? 1 : 0);
      var dateInput = form.querySelector('#c-date');
      if (!dateInput.value) {
        var notes = form.querySelector('#c-notes');
        var monthName = new Date(y, m, 1).toLocaleDateString('en-IE', { month: 'long', year: 'numeric' });
        if (!notes.value) notes.value = 'We are thinking of ' + monthName + '.';
      }
    }
    updateComposer(true);
  }
  if (form) {
    var today = new Date();
    form.querySelector('#c-date').min = today.toISOString().slice(0, 10);
    form.addEventListener('input', function () { updateComposer(true); });
    form.addEventListener('change', function () { updateComposer(true); });
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    updateComposer(false);
  }

  /* ------------------------------------------------------------------
     Wedding bloom-finder
     ------------------------------------------------------------------ */
  var SEASONS = [
    { name: 'The quiet season', text: "January is the farm's quietest month. Ask Ali what's possible with dried flowers." },
    { name: 'Sowing season', text: "Seeds are going in and very little is ready to cut. Ask Ali what's possible for an early spring wedding." },
    { name: 'Sowing season', text: "Seeds are going in and very little is ready to cut. Ask Ali what's possible for an early spring wedding." },
    { name: 'First flowers', text: 'The first cut flowers of the year come from the polytunnels. Soft, early and limited, so book ahead.' },
    { name: 'First flowers', text: 'The first cut flowers of the year come from the polytunnels. Soft, early and limited, so book ahead.' },
    { name: 'High summer', text: 'The meadow and raised beds are in full swing. Big, bright, generous flowers.' },
    { name: 'High summer', text: 'The meadow and raised beds are in full swing. Big, bright, generous flowers.' },
    { name: 'Dahlia season', text: 'Dahlias at their peak, the flower Clonakenny is known for, with late-summer flowers around them.' },
    { name: 'Dahlia season', text: 'Dahlias at their peak, the flower Clonakenny is known for, with late-summer flowers around them.' },
    { name: 'Dahlia season', text: 'The last big month for dahlias, right up to the first frosts.' },
    { name: 'The last of the season', text: 'The final flowers of the year, with flowers dried on the farm.' },
    { name: 'Dried and foraged', text: 'Dried flowers from the farm with foraged foliage, berries and twigs. Wintry and textured.' }
  ];
  var MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var finder = $('[data-finder]');
  if (finder) {
    var buttons = $$('[data-month]', finder);
    var seasonEl = $('[data-finder-season]', finder);
    var textEl = $('[data-finder-text]', finder);
    var cta = $('[data-finder-cta]', finder);
    var pick = function (btn) {
      var m = parseInt(btn.dataset.month, 10);
      buttons.forEach(function (b) {
        var on = b === btn;
        b.setAttribute('aria-checked', on ? 'true' : 'false');
        b.tabIndex = on ? 0 : -1;
      });
      var s = SEASONS[m];
      var apply = function () {
        seasonEl.textContent = MONTH_NAMES[m] + ': ' + s.name.toLowerCase();
        textEl.textContent = s.text;
      };
      if (motion) {
        gsap.to([seasonEl, textEl], {
          opacity: 0, y: -8, duration: 0.2, ease: 'power2.in',
          onComplete: function () {
            apply();
            gsap.fromTo([seasonEl, textEl], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'expo.out' });
          }
        });
      } else apply();
      cta.dataset.month = String(m);
      cta.querySelector('span').textContent = 'Ask about ' + MONTH_NAMES[m];
    };
    buttons.forEach(function (b, i) {
      b.tabIndex = i === 0 ? 0 : -1;
      b.addEventListener('click', function () { pick(b); });
      b.addEventListener('keydown', function (e) {
        var k = e.key, idx = buttons.indexOf(b), next = null;
        if (k === 'ArrowRight' || k === 'ArrowDown') next = buttons[(idx + 1) % buttons.length];
        if (k === 'ArrowLeft' || k === 'ArrowUp') next = buttons[(idx - 1 + buttons.length) % buttons.length];
        if (next) { e.preventDefault(); next.focus(); pick(next); }
      });
    });
  }

  /* ------------------------------------------------------------------
     Everything below is scroll choreography: motion only.
     ------------------------------------------------------------------ */
  if (!motion) {
    if (hero) { hero.render(); }
    if (year) { year.render(); }
    return;
  }

  var ease = 'expo.out';

  /* Hero intro */
  var titleLines = $$('.hero__title .line');
  titleLines.forEach(function (line) {
    var inner = document.createElement('span');
    inner.className = 'line-inner';
    inner.style.display = 'block';
    while (line.firstChild) inner.appendChild(line.firstChild);
    line.appendChild(inner);
    line.style.overflow = 'hidden';
    line.style.paddingBottom = '0.1em';
    line.style.marginBottom = '-0.1em';
  });
  gsap.set('.hero__title .line-inner', { yPercent: 110 });
  gsap.set(['.hero__place', '.hero__lede', '.hero__actions', '.hero__note'], { opacity: 0, y: 18 });
  var fontsReady = document.fonts && document.fonts.ready ? Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 900); })]) : Promise.resolve();
  fontsReady.then(function () {
    var tl = gsap.timeline({ delay: 0.15 });
    tl.to(intro, { b: 0.88, duration: 3.4, ease: 'power3.out' }, 0);
    tl.to('.hero__place', { opacity: 1, y: 0, duration: 1, ease: ease }, 0.2);
    tl.to('.hero__title .line-inner', { yPercent: 0, duration: 1.4, stagger: 0.12, ease: ease }, 0.3);
    tl.to(['.hero__lede', '.hero__actions'], { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: ease }, 0.9);
    tl.to('.hero__note', { opacity: 1, y: 0, duration: 1.2, ease: ease }, 1.6);
  });

  /* Hero scroll: centre the flower, open it fully, then dive into it */
  var heroTl = gsap.timeline({
    scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=125%', scrub: 0.8, pin: true, anticipatePin: 1, refreshPriority: 3 }
  });
  heroTl
    .to('.hero__copy', { y: -60, opacity: 0, duration: 0.3, ease: 'power1.in' }, 0)
    .to(['.hero__note', '.hero__cue'], { opacity: 0, duration: 0.15 }, 0)
    .to(heroScroll, { center: 1, duration: 0.4, ease: 'power1.inOut' }, 0)
    .to(heroScroll, { dive: 1, duration: 0.55, ease: 'power2.in' }, 0.38)
    .to('.hero__dusk', { opacity: 1, duration: 0.16, ease: 'none' }, 0.8)
    .to({}, { duration: 0.05 });
  if (!hero) {
    heroTl.to('.hero__poster', { scale: 1.6, opacity: 0, duration: 0.5 }, 0.3);
  }

  /* Headings: lines rise out of a mask */
  if (window.SplitText) {
    $$('h2.display, .offer__title').forEach(function (h) {
      var split = new window.SplitText(h, { type: 'lines', mask: 'lines', linesClass: 'split-line' });
      gsap.from(split.lines, {
        yPercent: 105, duration: 1.3, stagger: 0.1, ease: ease,
        scrollTrigger: { trigger: h, start: 'top 85%', once: true }
      });
    });

    /* Story paragraph lights up word by word as you read */
    var lit = $('[data-lit]');
    if (lit) {
      var words = new window.SplitText(lit, { type: 'words', wordsClass: 'w' }).words;
      gsap.set(words, { opacity: 0.18 });
      gsap.to(words, {
        opacity: 1, stagger: 0.12, ease: 'none',
        scrollTrigger: { trigger: lit, start: 'top 78%', end: 'bottom 42%', scrub: 0.6 }
      });
    }

    /* Footer word */
    var fw = $('.foot__word');
    if (fw) {
      var chars = new window.SplitText(fw, { type: 'chars', mask: 'chars' }).chars;
      gsap.from(chars, { yPercent: 100, duration: 1.2, stagger: 0.04, ease: ease, scrollTrigger: { trigger: fw, start: 'top 92%', once: true } });
    }
  }

  /* Soft rise for supporting copy */
  $$('.story__body, .facts .fact, .gallery__head p, .offers__head, .year__intro, .weddings__copy p, .bloom-finder, .order__intro p, .composer, .press, .find > *:not(h2)').forEach(function (el) {
    gsap.from(el, { opacity: 0, y: 36, duration: 1.2, ease: ease, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  });

  /* Photos bloom open from the centre, then drift */
  function bloomPhoto(frame, trigger) {
    var img = frame.querySelector('img');
    gsap.fromTo(frame, { clipPath: 'circle(6% at 50% 58%)' }, {
      clipPath: 'circle(76% at 50% 50%)', duration: 1.8, ease: 'expo.out',
      scrollTrigger: { trigger: trigger || frame, start: 'top 86%', once: true },
      onComplete: function () { gsap.set(frame, { clearProps: 'clipPath' }); }
    });
    if (img) gsap.fromTo(img, { scale: 1.35 }, { scale: 1.12, duration: 2.2, ease: 'expo.out', scrollTrigger: { trigger: trigger || frame, start: 'top 86%', once: true } });
  }
  $$('.story__photo .photo__frame, .offer__photo .photo__frame').forEach(function (f) { bloomPhoto(f); });
  $$('.story__photo .photo__frame img, .weddings__photo img').forEach(function (img) {
    gsap.fromTo(img, { yPercent: -6 }, {
      yPercent: 6, ease: 'none',
      scrollTrigger: { trigger: img.closest('.photo'), start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });
  var wedImg = $('.weddings__photo img');
  if (wedImg) gsap.set(wedImg, { scale: 1.14 });

  /* Gallery: sideways on desktop, with parallax inside each frame and a flutter on speed */
  var mm = gsap.matchMedia();
  mm.add('(min-width: 861px)', function () {
    var track = $('.gallery__list');
    if (!track || !track.children.length) return;
    var distance = function () { return Math.max(0, track.scrollWidth - window.innerWidth + parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gutter')) * 0 + 64); };
    var tween = gsap.to(track, {
      x: function () { return -distance(); }, ease: 'none',
      scrollTrigger: {
        trigger: '.gallery__pin', start: 'top top', end: function () { return '+=' + distance(); },
        scrub: 0.6, pin: true, invalidateOnRefresh: true, anticipatePin: 1, refreshPriority: 2
      }
    });
    $$('.gallery__item', track).forEach(function (item) {
      var frame = item.querySelector('.photo__frame');
      var img = item.querySelector('img');
      gsap.set(img, { scale: 1.18 });
      gsap.fromTo(img, { xPercent: -7 }, {
        xPercent: 7, ease: 'none',
        scrollTrigger: { trigger: item, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true }
      });
      gsap.fromTo(frame, { clipPath: 'circle(10% at 50% 55%)' }, {
        clipPath: 'circle(76% at 50% 50%)', ease: 'power2.out',
        scrollTrigger: { trigger: item, containerAnimation: tween, start: 'left 95%', end: 'left 45%', scrub: true }
      });
    });
    var skewTo = gsap.quickTo(track, 'skewX', { duration: 0.6, ease: 'power3' });
    var st = tween.scrollTrigger;
    var ticker = function () {
      var v = st.getVelocity();
      skewTo(gsap.utils.clamp(-3, 3, v / -450));
    };
    gsap.ticker.add(ticker);
    return function () { gsap.ticker.remove(ticker); gsap.set(track, { clearProps: 'x,skewX' }); };
  });
  mm.add('(max-width: 860px)', function () {
    $$('.gallery__item .photo__frame').forEach(function (f) { bloomPhoto(f, f); });
  });

  /* Offers: each panel settles back as the next one slides over it */
  var offers = $$('.offer');
  offers.forEach(function (panel, i) {
    var next = offers[i + 1];
    if (!next) return;
    gsap.fromTo(panel, { scale: 1, '--dim': 0 }, {
      scale: 0.93, '--dim': 0.38, ease: 'none',
      scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true }
    });
  });

  /* The flower year: pinned; the flower morphs species through the seasons */
  var stops = $$('.stop');
  var months = $$('.year__months li');
  var monthsBar = $('.year__months');
  var tints = ['#D8C2CE', '#E6C4CB', '#DDB3CF', '#C8A2C8', '#CDB0B6'];
  var tintAt = gsap.utils.interpolate(tints);
  var active = -1;
  function setStop(i) {
    if (i === active) return;
    active = i;
    stops.forEach(function (s, j) { s.classList.toggle('is-active', j === i); });
  }
  setStop(0);
  ST.create({
    trigger: '.year', start: 'top top', end: function () { return '+=' + (isDesktop() ? 320 : 260) + '%'; },
    pin: '.year__pin', scrub: true, anticipatePin: 1, invalidateOnRefresh: true, refreshPriority: 1,
    onUpdate: function (self) {
      var p = self.progress;
      var s = p * (PRESET_ORDER.length - 1);
      var k = Math.min(Math.floor(s), PRESET_ORDER.length - 2);
      var f = s - k;
      var eased = gsap.utils.clamp(0, 1, (f - 0.28) / 0.44);
      eased = eased * eased * (3 - 2 * eased);
      if (year) year.mix(PRESET_ORDER[k], PRESET_ORDER[k + 1], eased);
      setStop(Math.round(s));
      monthsBar.style.setProperty('--p', p.toFixed(4));
      var mIdx = Math.round(p * (months.length - 1));
      months.forEach(function (m, j) { m.classList.toggle('is-on', j <= mIdx); });
      if (self.isActive) gsap.set(document.body, { backgroundColor: tintAt(p) });
    }
  });

  /* Page colour washes. Created after every pin so their positions include pin spacing. */
  function setBg(name) {
    gsap.to(document.body, { backgroundColor: COLORS[name] || name, duration: 0.9, ease: 'power2.out', overwrite: 'auto' });
  }
  $$('[data-bg]').forEach(function (sec) {
    if (sec.classList.contains('hero')) return;
    ST.create({
      trigger: sec, start: 'top 55%', end: 'bottom 55%',
      onToggle: function (self) { if (self.isActive) setBg(sec.dataset.bg); }
    });
  });
  ST.create({ trigger: '.hero', start: 'top top', end: 'bottom 55%', onToggle: function (self) { if (self.isActive) setBg('lilac'); } });

  /* Nav: colour follows whatever is under it; hides on the way down, returns on the way up */
  var nav = $('[data-nav]');
  var bgSections = $$('[data-bg]');
  var heroPin = heroTl.scrollTrigger;
  function navTheme() {
    var theme = 'light';
    if (heroPin && heroPin.isActive) {
      theme = heroPin.progress > 0.74 ? 'dark' : 'light';
    } else {
      for (var i = 0; i < bgSections.length; i++) {
        var r = bgSections[i].getBoundingClientRect();
        if (r.top <= 36 && r.bottom > 36) {
          if (bgSections[i].classList.contains('hero')) theme = heroPin && heroPin.progress > 0.74 ? 'dark' : 'light';
          else theme = bgSections[i].dataset.bg === 'dusk' ? 'dark' : 'light';
          break;
        }
      }
      var offersUnder = $$('.offer').filter(function (o) { var r = o.getBoundingClientRect(); return r.top <= 36 && r.bottom > 36; });
      if (offersUnder.length) theme = offersUnder[offersUnder.length - 1] === $('.offer:last-child') ? 'dark' : 'light';
    }
    if (nav.dataset.theme !== theme) nav.dataset.theme = theme;
  }
  ST.create({
    start: 0, end: 'max',
    onUpdate: function (self) {
      var y = self.scroll();
      nav.classList.toggle('is-solid', heroPin ? y > heroPin.end - 4 : y > window.innerHeight);
      if (!document.body.classList.contains('menu-open')) nav.classList.toggle('is-hidden', self.direction === 1 && y > (heroPin ? heroPin.end + window.innerHeight * 0.6 : window.innerHeight * 2));
      navTheme();
    }
  });
  navTheme();

  ST.sort();
  ST.refresh();

  /* Magnetic buttons on fine pointers */
  if (finePointer) {
    $$('.btn').forEach(function (btn) {
      var xTo = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3' });
      var yTo = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3' });
      btn.addEventListener('pointermove', function (e) {
        var r = btn.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.22);
        yTo((e.clientY - r.top - r.height / 2) * 0.3);
      });
      btn.addEventListener('pointerleave', function () { xTo(0); yTo(0); });
    });
  }

  window.addEventListener('load', function () { ST.refresh(); });
})();
