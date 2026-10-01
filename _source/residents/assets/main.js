// Barnhall Meadows residents association · page behaviour. No dependencies.
// Everything here is an enhancement: the pages read and work without JavaScript.

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const EMAIL = '__EMAIL__'; // filled in from data.mjs at build time

/* ---------- Scroll: header state, progress bar, skyline parallax, footer wordmark ---------- */
const header = $('[data-header]');
const progress = $('.progress span');
const layers = $$('.skyline .layer');
const footerWord = $('.footer-word');
let ticking = false;

function onScroll() {
  ticking = false;
  const y = scrollY;
  const max = document.documentElement.scrollHeight - innerHeight;
  header.classList.toggle('scrolled', y > 8);
  progress.style.setProperty('--p', max > 0 ? Math.min(1, y / max).toFixed(4) : 0);
  if (reduceMotion.matches) return;
  // Back layers sink behind the front row as you scroll away, capped so they never leave the frame.
  if (y < innerHeight * 1.5) {
    for (const layer of layers) layer.style.transform = `translate3d(0, ${Math.min(90, y * Number(layer.dataset.depth)).toFixed(1)}px, 0)`;
  }
  if (footerWord) {
    const r = footerWord.getBoundingClientRect();
    const t = Math.max(0, Math.min(1, (innerHeight - r.top) / r.height));
    footerWord.style.setProperty('--fy', `${(1 - t) * 40}%`);
  }
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();

/* ---------- Reveal on scroll ---------- */
const revealables = $$('[data-reveal]');
if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const io = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  revealables.forEach(el => io.observe(el));
} else {
  revealables.forEach(el => el.classList.add('is-in'));
}

/* ---------- Mobile menu ---------- */
const menu = $('[data-menu]');
$('[data-menu-open]').addEventListener('click', () => menu.showModal());
$('[data-menu-close]').addEventListener('click', () => menu.close());
menu.addEventListener('click', e => {
  if (e.target === menu) {
    const r = menu.getBoundingClientRect();
    if (e.clientX < r.left) menu.close();
  }
  if (e.target.closest('a')) menu.close();
});
matchMedia('(min-width: 1100px)').addEventListener('change', e => { if (e.matches && menu.open) menu.close(); });

/* ---------- Home: next event and countdown ----------
   The page ships with the next event at build time; this swaps in the next one still to come,
   so the noticeboard never shows a past event. */
const eventsData = $('#events-data');
const notice = $('[data-next-event]');
if (eventsData && notice) {
  const now = new Date();
  const list = JSON.parse(eventsData.textContent);
  const next = list.find(e => new Date(`${e.date}T${e.end}`) > now);
  if (next) {
    const link = $('[data-ne-link]', notice);
    const base = link.getAttribute('href').replace(/events\/[^/]+\/$/, '');
    link.textContent = next.title;
    link.href = `${base}events/${next.slug}/`;
    $('[data-ne-date]', notice).textContent = next.when;
    $('[data-ne-date]', notice).setAttribute('datetime', next.date);
    $('[data-ne-time]', notice).textContent = next.time;
    $('[data-ne-place]', notice).textContent = next.place;
    $('[data-ne-ics]', notice).href = `${base}events/${next.slug}/event.ics`;

    const cd = $('[data-countdown]', notice);
    const start = new Date(`${next.date}T${next.start}`);
    const days = Math.round((new Date(next.date + 'T00:00') - new Date(now.toDateString())) / 864e5);
    cd.textContent = start <= now ? 'On now' : days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `In ${days} days`;
    cd.hidden = false;
  }
}

/* ---------- Count-up numbers ---------- */
const counters = $$('[data-count]');
if (counters.length && 'IntersectionObserver' in window && !reduceMotion.matches) {
  const io = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      io.unobserve(e.target);
      const el = e.target;
      const target = Number(el.dataset.count);
      const out = el.querySelector('.ph') || el;
      const t0 = performance.now();
      const dur = 1400;
      const step = t => {
        const p = Math.min(1, (t - t0) / dur);
        out.textContent = Math.round(target * (1 - Math.pow(1 - p, 4)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }, { threshold: 0.6 });
  counters.forEach(c => io.observe(c));
}

/* ---------- News & Events filter ---------- */
const filter = $('[data-filter]');
if (filter) {
  filter.hidden = false;
  const status = $('[data-filter-status]');
  const labels = { all: 'everything', news: 'news', event: 'events', council: 'council notices' };
  const apply = f => {
    let shown = 0;
    $$('[data-group]').forEach(group => {
      let n = 0;
      $$('[data-kind]', group).forEach(item => {
        const on = f === 'all' || item.dataset.kind === f;
        item.hidden = !on;
        item.classList.add('is-in');
        if (on) n++;
      });
      group.hidden = n === 0;
      shown += n;
    });
    $$('.chip', filter).forEach(c => c.setAttribute('aria-pressed', String(c.dataset.f === f)));
    status.textContent = `Showing ${labels[f]}: ${shown} item${shown === 1 ? '' : 's'}.`;
  };
  filter.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip || chip.getAttribute('aria-pressed') === 'true') return;
    if (document.startViewTransition && !reduceMotion.matches) document.startViewTransition(() => apply(chip.dataset.f));
    else apply(chip.dataset.f);
  });
}

/* ---------- Documents search ---------- */
const docSearch = $('[data-doc-search]');
if (docSearch) {
  docSearch.hidden = false;
  const input = $('input', docSearch);
  const status = $('[data-doc-status]');
  const empty = $('[data-doc-empty]');
  const cats = $$('[data-doc-cat]');
  const initiallyOpen = cats.map(c => c.open);
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    let total = 0;
    cats.forEach((cat, i) => {
      let n = 0;
      $$('[data-doc]', cat).forEach(doc => {
        const on = !q || doc.dataset.doc.includes(q);
        doc.hidden = !on;
        if (on) n++;
      });
      cat.hidden = n === 0;
      cat.open = q ? n > 0 : initiallyOpen[i];
      cat.classList.add('is-in');
      total += n;
    });
    empty.hidden = total > 0;
    status.textContent = q ? `${total} document${total === 1 ? '' : 's'} found.` : '';
  });
}

/* ---------- Get Involved: the three "ways" preselect the form ---------- */
$$('[data-intent]').forEach(btn => btn.addEventListener('click', () => {
  const radio = $(`#intent-${btn.dataset.intent}`);
  if (radio) radio.checked = true;
}));

/* ---------- Message length ---------- */
const msg = $('#c-message');
if (msg) {
  const count = $('#c-message-count');
  msg.addEventListener('input', () => {
    const left = msg.maxLength - msg.value.length;
    count.textContent = left < 200 ? `${left} characters left` : 'Up to 2,000 characters';
  });
}

/* ---------- Forms ----------
   No backend: on a valid submit we open a pre-filled email to the association.
   Swap this for a form service once the committee decides where submissions should go (see README). */
const messages = {
  valueMissing: el => el.type === 'checkbox' ? 'Please tick this box so we can contact you.' : el.tagName === 'SELECT' ? `Please choose ${/^your /i.test(labelFor(el)) ? labelFor(el).toLowerCase() : 'a ' + labelFor(el).toLowerCase()}.` : `Please enter ${/^your /i.test(labelFor(el)) ? '' : 'your '}${labelFor(el).toLowerCase()}.`,
  typeMismatch: () => 'Please enter an email address like name@example.com.',
};
function labelFor(el) {
  const l = $(`label[for="${el.id}"]`);
  return l ? l.childNodes[0].textContent.trim() : 'details';
}
function showError(el) {
  const err = $(`#${el.id}-error`);
  if (!err) return;
  const v = el.validity;
  const text = v.valueMissing ? messages.valueMissing(el) : v.typeMismatch ? messages.typeMismatch(el) : el.validationMessage;
  err.textContent = text;
  err.hidden = !text;
  el.setAttribute('aria-invalid', text ? 'true' : 'false');
  const describedBy = new Set((el.getAttribute('aria-describedby') || '').split(' ').filter(Boolean));
  text ? describedBy.add(err.id) : describedBy.delete(err.id);
  if (describedBy.size) el.setAttribute('aria-describedby', [...describedBy].join(' '));
  else el.removeAttribute('aria-describedby');
}

const subjects = { join: 'Membership', contact: 'Message from the website', subscribe: 'Subscribe to the monthly update' };

$$('form[data-form]').forEach(form => {
  const fields = $$('input, select, textarea', form).filter(el => el.id && el.willValidate);
  fields.forEach(el => {
    el.addEventListener('blur', () => { if (el.value || el.getAttribute('aria-invalid')) showError(el); });
    el.addEventListener('input', () => { if (el.getAttribute('aria-invalid') === 'true') showError(el); });
    el.addEventListener('change', () => { if (el.getAttribute('aria-invalid') === 'true') showError(el); });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    fields.forEach(showError);
    const firstBad = fields.find(el => !el.checkValidity());
    if (firstBad) { firstBad.focus(); return; }

    const data = new FormData(form);
    const lines = [];
    for (const el of fields) {
      if (el.type === 'checkbox' || el.type === 'radio' || !el.value) continue;
      lines.push(`${labelFor(el)}: ${el.value}`);
    }
    const intent = data.get('intent');
    if (intent) lines.unshift(`I’d like to: ${intent}`);
    const interests = data.getAll('interests');
    if (interests.length) lines.push(`Interests: ${interests.join(', ')}`);
    if (data.get('consent')) lines.push('', 'I agree to the association using these details to contact me about association business.');
    const topic = data.get('c-topic');
    const subject = topic ? `${topic}: ${subjects.contact}` : subjects[form.dataset.form];

    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;

    const status = $('.form-status', form);
    status.innerHTML = `Thanks. Your email app should now open with your details filled in. Press send there to finish. Nothing opened? Email us at <a href="mailto:${EMAIL}">${EMAIL}</a>.`;
    status.hidden = false;
  });
});
