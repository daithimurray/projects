// Errol Brennan Painting · page behaviour. No dependencies.

// Where quote requests are POSTed (multipart/form-data, photos included).
// Works with Formspree, Basin, Netlify Functions, or any endpoint that accepts form posts.
// Leave empty until a backend exists: on localhost the form simulates success,
// anywhere else it tells the visitor to ring instead, so no request is silently lost.
const QUOTE_ENDPOINT = '';

const DRAFT_KEY = 'eb-quote-draft';
const PHONE = '087 875 3433';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ---------- Photos: <div class="photo" data-src="img/x.jpg"> loads when a file is set ---------- */
$$('.photo[data-src]').forEach(slot => {
  const img = new Image();
  img.alt = slot.dataset.alt || '';
  img.loading = slot.closest('.hero') ? 'eager' : 'lazy';
  img.decoding = 'async';
  img.onload = () => slot.classList.add('has-img');
  img.src = slot.dataset.src;
  slot.appendChild(img);
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

/* ---------- Before / after slider ---------- */
const compare = $('.compare');
const range = $('input[type=range]', compare);
const setPos = () => {
  compare.style.setProperty('--pos', range.value + '%');
  range.setAttribute('aria-label', `Compare before and after. ${range.value}% before shown.`);
};
range.addEventListener('input', setPos);

/* ---------- Work filter ---------- */
const chips = $$('.chip');
const jobs = $$('.job');
const workCount = $('#work-count');
chips.forEach(chip => chip.addEventListener('click', () => {
  const f = chip.dataset.filter;
  chips.forEach(c => c.setAttribute('aria-pressed', String(c === chip)));
  let n = 0;
  jobs.forEach(j => { const show = f === 'All' || j.dataset.cat === f; j.hidden = !show; if (show) n++; });
  workCount.textContent = n + (n === 1 ? ' project' : ' projects') + (f === 'All' ? '' : ' · ' + f.toLowerCase());
}));

/* ---------- Quote flow ---------- */
const TITLES = { 1: 'What needs painting?', 2: 'Show us the rooms', 3: 'Where should we send it?', 4: 'Sent. Thanks.' };
const PART_LABELS = { walls: 'Walls & ceilings', wood: 'Woodwork', paper: 'Wallpaper', outside: 'Outside' };
const PART_PRICE = { walls: 480, wood: 180, paper: 320, outside: 1900 };
const FIELDS = ['name', 'eircode', 'email', 'phone'];

const blank = () => ({
  step: 1, type: 'Interior', parts: { walls: true, wood: false, paper: false, outside: false },
  rooms: 3, notes: '', d: { name: '', eircode: '', email: '', phone: '' }, reply: 'Email',
});
let state = blank();
let photos = []; // File objects, kept in memory only
let done = false;

try {
  const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
  if (saved) state = { ...state, ...saved, parts: { ...state.parts, ...saved.parts }, d: { ...state.d, ...saved.d } };
} catch (e) { /* storage unavailable */ }

function save(patch) {
  Object.assign(state, patch);
  try { localStorage.setItem(DRAFT_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  render();
}

const form = $('#quote-form');
const fmt = n => '€' + n.toLocaleString('en-IE');

function render() {
  const step = done ? 4 : state.step;
  $('#step-label').textContent = step === 4 ? 'Sent' : `Step ${step} of 3`;
  $('#quote-title').textContent = TITLES[step];
  $$('.progress span').forEach((bar, i) => bar.classList.toggle('on', step > i));
  $$('.quote-main [data-step]').forEach(card => { card.hidden = +card.dataset.step !== step; });

  $$('.segmented [data-type]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.type === state.type)));
  $$('input[name=part]').forEach(cb => { cb.checked = !!state.parts[cb.value]; });
  $('#rooms').textContent = state.rooms;

  const summary = [state.type, state.rooms + (state.rooms === 1 ? ' room' : ' rooms'),
    ...Object.keys(PART_LABELS).filter(k => state.parts[k]).map(k => PART_LABELS[k]),
    ...(photos.length ? [photos.length + (photos.length === 1 ? ' photo' : ' photos')] : [])];
  $('#summary').replaceChildren(...summary.map(s => Object.assign(document.createElement('span'), { className: 'pill', textContent: s })));

  const per = Object.keys(PART_PRICE).reduce((sum, k) => sum + (state.parts[k] ? PART_PRICE[k] : 0), 0);
  const lo = per * state.rooms, hi = Math.round(lo * 1.25);
  $('#guide-price').textContent = lo ? `${fmt(lo)} – ${fmt(hi)}` : 'pick a job type';
}

function goTo(step) {
  save({ step });
  const title = $('#quote-title');
  title.focus({ preventScroll: true });
  if (title.getBoundingClientRect().top < 72) $('#quote').scrollIntoView({ behavior: 'smooth' });
}

// Step 1
$$('.segmented [data-type]').forEach(b => b.addEventListener('click', () => {
  const t = b.dataset.type;
  save({ type: t, parts: { ...state.parts, outside: t !== 'Interior', walls: t !== 'Exterior' } });
}));
$('.segmented').addEventListener('keydown', e => {
  const btns = $$('.segmented [data-type]');
  const i = btns.findIndex(b => b.dataset.type === state.type);
  const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
  if (!d) return;
  e.preventDefault();
  const next = btns[(i + d + btns.length) % btns.length];
  next.click(); next.focus();
});
$$('input[name=part]').forEach(cb => cb.addEventListener('change', () => save({ parts: { ...state.parts, [cb.value]: cb.checked } })));
$$('[data-rooms]').forEach(b => b.addEventListener('click', () => save({ rooms: Math.min(20, Math.max(1, state.rooms + +b.dataset.rooms)) })));
const notes = $('#notes');
notes.value = state.notes;
notes.addEventListener('input', () => save({ notes: notes.value }));
$$('[data-next]').forEach(b => b.addEventListener('click', () => goTo(Math.min(3, state.step + 1))));
$$('[data-back]').forEach(b => b.addEventListener('click', () => goTo(Math.max(1, state.step - 1))));

// Step 2
const photoInput = $('#photos');
const photoList = $('#photo-list');
const photoError = $('#photo-error');
const MAX_PHOTOS = 10, MAX_BYTES = 20 * 1024 * 1024;

function addPhotos(files) {
  const imgs = Array.from(files).filter(f => f.type.startsWith('image/') || /\.hei[cf]$/i.test(f.name));
  const tooBig = imgs.filter(f => f.size > MAX_BYTES);
  const ok = imgs.filter(f => f.size <= MAX_BYTES);
  const room = MAX_PHOTOS - photos.length;
  photos = [...photos, ...ok.slice(0, room)];
  const msgs = [];
  if (tooBig.length) msgs.push(`${tooBig.length} over 20 MB skipped.`);
  if (ok.length > room) msgs.push(`Up to ${MAX_PHOTOS} photos. ${ok.length - room} not added.`);
  photoError.textContent = msgs.join(' ');
  renderPhotos();
}

function renderPhotos() {
  photoList.replaceChildren(...photos.map((file, i) => {
    const li = document.createElement('li');
    li.className = 'photo-item';
    const thumb = document.createElement('img');
    thumb.className = 'thumb'; thumb.alt = '';
    if (file.type && file.type !== 'image/heic') { thumb.src = URL.createObjectURL(file); thumb.onload = () => URL.revokeObjectURL(thumb.src); }
    const name = Object.assign(document.createElement('span'), { className: 'name', textContent: file.name });
    const ok = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    ok.setAttribute('class', 'ok'); ok.setAttribute('width', '20'); ok.setAttribute('height', '20'); ok.setAttribute('aria-hidden', 'true');
    ok.innerHTML = '<use href="#i-tick"/>';
    const rm = document.createElement('button');
    rm.type = 'button'; rm.setAttribute('aria-label', 'Remove ' + file.name);
    rm.innerHTML = '<svg width="16" height="16" aria-hidden="true"><use href="#i-close"/></svg>';
    rm.addEventListener('click', () => { photos.splice(i, 1); photoError.textContent = ''; renderPhotos(); photoInput.focus(); });
    li.append(thumb, name, ok, rm);
    return li;
  }));
  render();
}

photoInput.addEventListener('change', () => { addPhotos(photoInput.files); photoInput.value = ''; });
const dropzone = $('#dropzone');
['dragenter', 'dragover'].forEach(t => dropzone.addEventListener(t, e => { e.preventDefault(); dropzone.classList.add('drag'); }));
['dragleave', 'drop'].forEach(t => dropzone.addEventListener(t, () => dropzone.classList.remove('drag')));
dropzone.addEventListener('drop', e => { e.preventDefault(); addPhotos(e.dataTransfer.files); });

// Step 3
FIELDS.forEach(k => {
  const input = form.elements[k];
  input.value = state.d[k] || '';
  input.addEventListener('input', () => {
    state.d[k] = input.value;
    setError(k, '');
    save({});
  });
});
$$('input[name=reply]', form).forEach(r => {
  r.checked = r.value === state.reply;
  r.addEventListener('change', () => save({ reply: r.value }));
});

function setError(k, msg) {
  const input = form.elements[k];
  const el = $('#err-' + k);
  if (!el) return;
  el.textContent = msg;
  if (msg) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
}

function validate() {
  const d = state.d, err = {};
  if (!d.name.trim()) err.name = 'Enter your first name';
  if (!/^[A-Za-z]\d[\dA-Za-z]\s?[\dA-Za-z]{4}$/.test(d.eircode.trim())) err.eircode = 'Enter a full Eircode, e.g. W23 F2P4';
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email.trim())) err.email = 'Enter an email with an @';
  return err;
}

function showAlert(msg) {
  const alert = $('#form-alert');
  $('#form-alert-msg').textContent = msg;
  alert.hidden = false;
  alert.focus();
}

async function send() {
  const isLocal = ['localhost', '127.0.0.1', ''].includes(location.hostname);
  if (!QUOTE_ENDPOINT) {
    if (isLocal) return;
    throw new Error('no-endpoint');
  }
  const fd = new FormData();
  fd.append('type', state.type);
  fd.append('work', Object.keys(PART_LABELS).filter(k => state.parts[k]).map(k => PART_LABELS[k]).join(', '));
  fd.append('rooms', String(state.rooms));
  fd.append('notes', state.notes);
  FIELDS.forEach(k => fd.append(k, state.d[k].trim()));
  fd.append('reply', state.reply);
  fd.append('guide', $('#guide-price').textContent);
  photos.forEach(f => fd.append('photos', f, f.name));
  const res = await fetch(QUOTE_ENDPOINT, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error('http-' + res.status);
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const err = validate();
  ['name', 'eircode', 'email'].forEach(k => setError(k, err[k] || ''));
  if (Object.keys(err).length) { showAlert('Fix the fields below, or'); return; }

  const btn = $('#submit-btn');
  btn.disabled = true; btn.textContent = 'Sending…';
  try {
    await send();
  } catch (x) {
    showAlert(x.message === 'no-endpoint' ? 'Online requests aren’t switched on yet. Please' : 'Something went wrong sending it. Try again, or');
    return;
  } finally {
    btn.disabled = false; btn.textContent = 'Send request';
  }
  $('#form-alert').hidden = true;

  const date = new Date();
  const dow = date.getDay();
  date.setDate(date.getDate() + (dow === 5 ? 3 : dow === 6 ? 2 : 1));
  const method = state.reply === 'Call' ? 'phone' : state.reply === 'Text' ? 'text message' : 'email';
  $('#done-msg').textContent = `Thanks ${state.d.name.trim()}. Errol will reply by ${method} on ${date.toLocaleDateString('en-IE', { weekday: 'long' })}.`;
  done = true;
  try { localStorage.removeItem(DRAFT_KEY); } catch (x) { /* ignore */ }
  render();
  $('#quote-title').focus({ preventScroll: true });
});

$('[data-reset]').addEventListener('click', () => {
  const { type, parts, rooms, notes, reply } = state;
  state = { ...blank(), type, parts, rooms, notes, reply };
  photos = []; done = false;
  FIELDS.forEach(k => { form.elements[k].value = ''; setError(k, ''); });
  renderPhotos();
  goTo(1);
});

$('#year').textContent = new Date().getFullYear();
render();
renderPhotos();
