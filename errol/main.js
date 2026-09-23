// Errol Brennan Painting · page behaviour. No dependencies.

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ---------- Photos ----------
   Add a real image with data-src on any .photo, e.g. <div class="photo" data-photo="job-1" data-src="img/job-1.jpg" data-alt="…">.
   Sections that depend on photos stay hidden until enough of them actually load, so visitors never see empty slots. */
function loadPhoto(slot) {
  return new Promise(resolve => {
    if (!slot.dataset.src) return resolve(false);
    const img = new Image();
    img.alt = slot.dataset.alt || '';
    img.decoding = 'async';
    img.onload = () => { slot.appendChild(img); resolve(true); };
    img.onerror = () => resolve(false);
    img.src = slot.dataset.src;
  });
}

const compare = $('.compare');
Promise.all($$('.photo', compare).map(loadPhoto)).then(ok => {
  if (ok.every(Boolean)) compare.hidden = false;
});

const work = $('#work');
Promise.all($$('.job', work).map(async job => {
  const slot = $('.photo', job);
  const loaded = await loadPhoto(slot);
  job.hidden = !loaded;
  if (loaded && slot.dataset.caption) $('figcaption', job).textContent = slot.dataset.caption;
  return loaded;
})).then(ok => {
  if (ok.filter(Boolean).length >= 3) work.hidden = false;
});

/* ---------- Before / after slider ---------- */
const range = $('input[type=range]', compare);
range.addEventListener('input', () => {
  compare.style.setProperty('--pos', range.value + '%');
  range.setAttribute('aria-valuetext', `${range.value}% before`);
});

/* ---------- Mobile drawer ---------- */
const menuBtn = $('.menu-btn');
const drawer = $('#drawer');
const overlay = $('.drawer-overlay');

function setMenu(open) {
  drawer.hidden = overlay.hidden = !open;
  menuBtn.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) $('[data-close-menu]', drawer).focus();
  else menuBtn.focus({ preventScroll: true });
}
menuBtn.addEventListener('click', () => setMenu(true));
$$('[data-close-menu]').forEach(el => el.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => {
  if (drawer.hidden) return;
  if (e.key === 'Escape') setMenu(false);
  if (e.key === 'Tab') {
    const f = $$('a[href], button', drawer);
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

$('#year').textContent = new Date().getFullYear();
