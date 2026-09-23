/* @ds-bundle: {"format":3,"namespace":"SlackDesignSystem_163e95","components":[],"sourceHashes":{"decks/marc-march-2026/deck-stage.js":"522102a1c71e","ui_kits/slack-app/ChannelSidebar.jsx":"822982ebe733","ui_kits/slack-app/Composer.jsx":"a9bb5718f214","ui_kits/slack-app/Message.jsx":"558188406956","ui_kits/slack-app/MessagePane.jsx":"145c84be34d1","ui_kits/slack-app/ThreadDrawer.jsx":"b00c7b7aed55","ui_kits/slack-app/WorkspaceRail.jsx":"068fa1461939","ui_kits/slack-marketing/FeatureRow.jsx":"437fa722fcd2","ui_kits/slack-marketing/FooterLarge.jsx":"963699f0f9d8","ui_kits/slack-marketing/Hero.jsx":"ea670bfc789a","ui_kits/slack-marketing/LogoRow.jsx":"66b3f1ff7459","ui_kits/slack-marketing/PricingTable.jsx":"c70c8d3db594","ui_kits/slack-marketing/TopNav.jsx":"cb0128514423"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SlackDesignSystem_163e95 = window.SlackDesignSystem_163e95 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// decks/marc-march-2026/deck-stage.js
try { (() => {
/**
 * <deck-stage> — reusable web component for HTML decks.
 *
 * Handles:
 *  (a) speaker notes — reads <script type="application/json" id="speaker-notes">
 *      and posts {slideIndexChanged: N} to the parent window on nav.
 *  (b) keyboard navigation — ←/→, PgUp/PgDn, Space, Home/End, number keys.
 *  (c) press R to reset to slide 0 (with a tasteful keyboard hint).
 *  (d) bottom-center overlay showing slide count + hints, fades out on idle.
 *  (e) auto-scaling — inner canvas is a fixed design size (default 1920×1080)
 *      scaled with `transform: scale()` to fit the viewport, letterboxed.
 *      Set the `noscale` attribute to render at authored size (1:1) — the
 *      PPTX exporter sets this so its DOM capture sees unscaled geometry.
 *  (f) print — `@media print` lays every slide out as its own page at the
 *      design size, so the browser's Print → Save as PDF produces a clean
 *      one-page-per-slide PDF with no extra setup.
 *
 * Slides are HIDDEN, not unmounted. Non-active slides stay in the DOM with
 * `visibility: hidden` + `opacity: 0`, so their state (videos, iframes,
 * form inputs, React trees) is preserved across navigation.
 *
 * Lifecycle event — the component dispatches a `slidechange` CustomEvent on
 * itself whenever the active slide changes (including the initial mount).
 * The event bubbles and composes out of shadow DOM, so you can listen on
 * the <deck-stage> element or on document:
 *
 *   document.querySelector('deck-stage').addEventListener('slidechange', (e) => {
 *     e.detail.index         // new 0-based index
 *     e.detail.previousIndex // previous index, or -1 on init
 *     e.detail.total         // total slide count
 *     e.detail.slide         // the new active slide element
 *     e.detail.previousSlide // the prior slide element, or null on init
 *     e.detail.reason        // 'init' | 'keyboard' | 'click' | 'tap' | 'api'
 *   });
 *
 * Persistence: current slide index is saved to localStorage keyed by the
 * document path, so refresh returns you to the same place.
 *
 * Usage:
 *   <deck-stage width="1920" height="1080">
 *     <section data-label="Title">...</section>
 *     <section data-label="Agenda">...</section>
 *   </deck-stage>
 *
 * Slides are the direct element children of <deck-stage>. Each slide is
 * automatically tagged with:
 *   - data-screen-label="NN Label"   (1-indexed, for comment flow)
 *   - data-om-validate="no_overflowing_text,no_overlapping_text,slide_sized_text"
 */

(() => {
  const DESIGN_W_DEFAULT = 1920;
  const DESIGN_H_DEFAULT = 1080;
  const STORAGE_PREFIX = 'deck-stage:slide:';
  const OVERLAY_HIDE_MS = 1800;
  const VALIDATE_ATTR = 'no_overflowing_text,no_overlapping_text,slide_sized_text';
  const pad2 = n => String(n).padStart(2, '0');
  const stylesheet = `
    :host {
      position: fixed;
      inset: 0;
      display: block;
      background: #000;
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
      overflow: hidden;
    }

    .stage {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .canvas {
      position: relative;
      transform-origin: center center;
      flex-shrink: 0;
      background: #fff;
      will-change: transform;
    }

    /* Slides live in light DOM (via <slot>) so authored CSS still applies.
       We absolutely position each slotted child to stack them. */
    ::slotted(*) {
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      box-sizing: border-box !important;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
    }
    ::slotted([data-deck-active]) {
      opacity: 1;
      pointer-events: auto;
      visibility: visible;
    }

    /* Tap zones for mobile — back/forward thirds like Stories.
       Transparent, no visible UI, don't block the overlay. */
    .tapzones {
      position: fixed;
      inset: 0;
      display: flex;
      z-index: 2147482000;
      pointer-events: none;
    }
    .tapzone {
      flex: 1;
      pointer-events: auto;
      -webkit-tap-highlight-color: transparent;
    }
    /* Only activate tap zones on coarse pointers (touch devices). */
    @media (hover: hover) and (pointer: fine) {
      .tapzones { display: none; }
    }

    .overlay {
      position: fixed;
      left: 50%;
      bottom: 22px;
      transform: translate(-50%, 6px) scale(0.92);
      filter: blur(6px);
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px;
      background: #000;
      color: #fff;
      border-radius: 999px;
      font-size: 12px;
      font-feature-settings: "tnum" 1;
      letter-spacing: 0.01em;
      opacity: 0;
      pointer-events: none;
      transition: opacity 260ms ease, transform 260ms cubic-bezier(.2,.8,.2,1), filter 260ms ease;
      transform-origin: center bottom;
      z-index: 2147483000;
      user-select: none;
    }
    .overlay[data-visible] {
      opacity: 1;
      pointer-events: auto;
      transform: translate(-50%, 0) scale(1);
      filter: blur(0);
    }

    .btn {
      appearance: none;
      -webkit-appearance: none;
      background: transparent;
      border: 0;
      margin: 0;
      padding: 0;
      color: inherit;
      font: inherit;
      cursor: default;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 28px;
      min-width: 28px;
      border-radius: 999px;
      color: rgba(255,255,255,0.72);
      transition: background 140ms ease, color 140ms ease;
      -webkit-tap-highlight-color: transparent;
    }
    .btn:hover { background: rgba(255,255,255,0.12); color: #fff; }
    .btn:active { background: rgba(255,255,255,0.18); }
    .btn:focus { outline: none; }
    .btn:focus-visible { outline: none; }
    .btn::-moz-focus-inner { border: 0; }
    .btn svg { width: 14px; height: 14px; display: block; }
    .btn.reset {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.02em;
      padding: 0 10px 0 12px;
      gap: 6px;
      color: rgba(255,255,255,0.72);
    }
    .btn.reset .kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
      font-size: 10px;
      line-height: 1;
      color: rgba(255,255,255,0.88);
      background: rgba(255,255,255,0.12);
      border-radius: 4px;
    }

    .count {
      font-variant-numeric: tabular-nums;
      color: #fff;
      font-weight: 500;
      padding: 0 8px;
      min-width: 42px;
      text-align: center;
      font-size: 12px;
    }
    .count .sep { color: rgba(255,255,255,0.45); margin: 0 3px; font-weight: 400; }
    .count .total { color: rgba(255,255,255,0.55); }

    .divider {
      width: 1px;
      height: 14px;
      background: rgba(255,255,255,0.18);
      margin: 0 2px;
    }

    /* ── Print: one page per slide, no chrome ────────────────────────────
       The screen layout stacks every slide at inset:0 inside a scaled
       canvas; for print we want them in document flow at the authored
       design size so the browser paginates one slide per sheet. The
       @page size is set from the width/height attributes via the inline
       <style id="deck-stage-print-page"> that connectedCallback injects
       into <head> (the @page at-rule has no effect inside shadow DOM). */
    @media print {
      :host {
        position: static;
        inset: auto;
        background: none;
        overflow: visible;
        color: inherit;
      }
      .stage { position: static; display: block; }
      .canvas {
        transform: none !important;
        width: auto !important;
        height: auto !important;
        background: none;
        will-change: auto;
      }
      ::slotted(*) {
        position: relative !important;
        inset: auto !important;
        width: var(--deck-design-w) !important;
        height: var(--deck-design-h) !important;
        box-sizing: border-box !important;
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto;
        break-after: page;
        page-break-after: always;
        break-inside: avoid;
        overflow: hidden;
      }
      ::slotted(*:last-child) {
        break-after: auto;
        page-break-after: auto;
      }
      .overlay, .tapzones { display: none !important; }
    }
  `;
  class DeckStage extends HTMLElement {
    static get observedAttributes() {
      return ['width', 'height', 'noscale'];
    }
    constructor() {
      super();
      this._root = this.attachShadow({
        mode: 'open'
      });
      this._index = 0;
      this._slides = [];
      this._notes = [];
      this._hideTimer = null;
      this._mouseIdleTimer = null;
      this._storageKey = STORAGE_PREFIX + (location.pathname || '/');
      this._onKey = this._onKey.bind(this);
      this._onResize = this._onResize.bind(this);
      this._onSlotChange = this._onSlotChange.bind(this);
      this._onMouseMove = this._onMouseMove.bind(this);
      this._onTapBack = this._onTapBack.bind(this);
      this._onTapForward = this._onTapForward.bind(this);
    }
    get designWidth() {
      return parseInt(this.getAttribute('width'), 10) || DESIGN_W_DEFAULT;
    }
    get designHeight() {
      return parseInt(this.getAttribute('height'), 10) || DESIGN_H_DEFAULT;
    }
    connectedCallback() {
      this._render();
      this._loadNotes();
      this._syncPrintPageRule();
      window.addEventListener('keydown', this._onKey);
      window.addEventListener('resize', this._onResize);
      window.addEventListener('mousemove', this._onMouseMove, {
        passive: true
      });
      // Initial collection + layout happens via slotchange, which fires on mount.
    }
    disconnectedCallback() {
      window.removeEventListener('keydown', this._onKey);
      window.removeEventListener('resize', this._onResize);
      window.removeEventListener('mousemove', this._onMouseMove);
      if (this._hideTimer) clearTimeout(this._hideTimer);
      if (this._mouseIdleTimer) clearTimeout(this._mouseIdleTimer);
    }
    attributeChangedCallback() {
      if (this._canvas) {
        this._canvas.style.width = this.designWidth + 'px';
        this._canvas.style.height = this.designHeight + 'px';
        this._canvas.style.setProperty('--deck-design-w', this.designWidth + 'px');
        this._canvas.style.setProperty('--deck-design-h', this.designHeight + 'px');
        this._fit();
        this._syncPrintPageRule();
      }
    }
    _render() {
      const style = document.createElement('style');
      style.textContent = stylesheet;
      const stage = document.createElement('div');
      stage.className = 'stage';
      const canvas = document.createElement('div');
      canvas.className = 'canvas';
      canvas.style.width = this.designWidth + 'px';
      canvas.style.height = this.designHeight + 'px';
      canvas.style.setProperty('--deck-design-w', this.designWidth + 'px');
      canvas.style.setProperty('--deck-design-h', this.designHeight + 'px');
      const slot = document.createElement('slot');
      slot.addEventListener('slotchange', this._onSlotChange);
      canvas.appendChild(slot);
      stage.appendChild(canvas);

      // Tap zones (mobile): left third = back, right third = forward.
      const tapzones = document.createElement('div');
      tapzones.className = 'tapzones export-hidden';
      tapzones.setAttribute('aria-hidden', 'true');
      const tzBack = document.createElement('div');
      tzBack.className = 'tapzone tapzone--back';
      const tzMid = document.createElement('div');
      tzMid.className = 'tapzone tapzone--mid';
      tzMid.style.pointerEvents = 'none';
      const tzFwd = document.createElement('div');
      tzFwd.className = 'tapzone tapzone--fwd';
      tzBack.addEventListener('click', this._onTapBack);
      tzFwd.addEventListener('click', this._onTapForward);
      tapzones.append(tzBack, tzMid, tzFwd);

      // Overlay: compact, solid black, with clickable controls.
      const overlay = document.createElement('div');
      overlay.className = 'overlay export-hidden';
      overlay.setAttribute('role', 'toolbar');
      overlay.setAttribute('aria-label', 'Deck controls');
      overlay.innerHTML = `
        <button class="btn prev" type="button" aria-label="Previous slide" title="Previous (←)">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3L5 8l5 5"/></svg>
        </button>
        <span class="count" aria-live="polite"><span class="current">1</span><span class="sep">/</span><span class="total">1</span></span>
        <button class="btn next" type="button" aria-label="Next slide" title="Next (→)">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>
        </button>
        <span class="divider"></span>
        <button class="btn reset" type="button" aria-label="Reset to first slide" title="Reset (R)">Reset<span class="kbd">R</span></button>
      `;
      overlay.querySelector('.prev').addEventListener('click', () => this._go(this._index - 1, 'click'));
      overlay.querySelector('.next').addEventListener('click', () => this._go(this._index + 1, 'click'));
      overlay.querySelector('.reset').addEventListener('click', () => this._go(0, 'click'));
      this._root.append(style, stage, tapzones, overlay);
      this._canvas = canvas;
      this._slot = slot;
      this._overlay = overlay;
      this._countEl = overlay.querySelector('.current');
      this._totalEl = overlay.querySelector('.total');
    }

    /** @page must live in the document stylesheet — it's a no-op inside
     *  shadow DOM. Inject/update a single <head> style tag so the print
     *  sheet matches the design size and Save-as-PDF yields one slide per
     *  page with no margins. */
    _syncPrintPageRule() {
      const id = 'deck-stage-print-page';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
        document.head.appendChild(tag);
      }
      tag.textContent = '@page { size: ' + this.designWidth + 'px ' + this.designHeight + 'px; margin: 0; } ' + '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; overflow: visible !important; height: auto !important; } ' + '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }';
    }
    _onSlotChange() {
      this._collectSlides();
      this._restoreIndex();
      this._applyIndex({
        showOverlay: false,
        broadcast: true,
        reason: 'init'
      });
      this._fit();
    }
    _collectSlides() {
      const assigned = this._slot.assignedElements({
        flatten: true
      });
      this._slides = assigned.filter(el => {
        // Skip template/style/script nodes even if someone slots them.
        const tag = el.tagName;
        return tag !== 'TEMPLATE' && tag !== 'SCRIPT' && tag !== 'STYLE';
      });
      this._slides.forEach((slide, i) => {
        const n = i + 1;
        // Determine a label for comment flow: prefer explicit data-label,
        // then an existing data-screen-label, then first heading, else "Slide".
        let label = slide.getAttribute('data-label');
        if (!label) {
          const existing = slide.getAttribute('data-screen-label');
          if (existing) {
            // Strip any leading number the author may have included.
            label = existing.replace(/^\s*\d+\s*/, '').trim() || existing;
          }
        }
        if (!label) {
          const h = slide.querySelector('h1, h2, h3, [data-title]');
          if (h) label = (h.textContent || '').trim().slice(0, 40);
        }
        if (!label) label = 'Slide';
        slide.setAttribute('data-screen-label', `${pad2(n)} ${label}`);

        // Validation attribute for comment flow / auto-checks.
        if (!slide.hasAttribute('data-om-validate')) {
          slide.setAttribute('data-om-validate', VALIDATE_ATTR);
        }
        slide.setAttribute('data-deck-slide', String(i));
      });
      if (this._totalEl) this._totalEl.textContent = String(this._slides.length || 1);
      if (this._index >= this._slides.length) this._index = Math.max(0, this._slides.length - 1);
    }
    _loadNotes() {
      const tag = document.getElementById('speaker-notes');
      if (!tag) {
        this._notes = [];
        return;
      }
      try {
        const parsed = JSON.parse(tag.textContent || '[]');
        if (Array.isArray(parsed)) this._notes = parsed;
      } catch (e) {
        console.warn('[deck-stage] Failed to parse #speaker-notes JSON:', e);
        this._notes = [];
      }
    }
    _restoreIndex() {
      try {
        const raw = localStorage.getItem(this._storageKey);
        if (raw != null) {
          const n = parseInt(raw, 10);
          if (Number.isFinite(n) && n >= 0 && n < this._slides.length) {
            this._index = n;
          }
        }
      } catch (e) {/* ignore */}
    }
    _persistIndex() {
      try {
        localStorage.setItem(this._storageKey, String(this._index));
      } catch (e) {/* ignore */}
    }
    _applyIndex({
      showOverlay = true,
      broadcast = true,
      reason = 'init'
    } = {}) {
      if (!this._slides.length) return;
      const prev = this._prevIndex == null ? -1 : this._prevIndex;
      const curr = this._index;
      this._slides.forEach((s, i) => {
        if (i === curr) s.setAttribute('data-deck-active', '');else s.removeAttribute('data-deck-active');
      });
      if (this._countEl) this._countEl.textContent = String(curr + 1);
      this._persistIndex();
      if (broadcast) {
        // (1) Legacy: host-window postMessage for speaker-notes renderers.
        try {
          window.postMessage({
            slideIndexChanged: curr
          }, '*');
        } catch (e) {}

        // (2) In-page CustomEvent on the <deck-stage> element itself.
        //     Bubbles and composes out of shadow DOM so slide code can listen:
        //       document.querySelector('deck-stage').addEventListener('slidechange', e => {
        //         e.detail.index, e.detail.previousIndex, e.detail.total, e.detail.slide, e.detail.reason
        //       });
        const detail = {
          index: curr,
          previousIndex: prev,
          total: this._slides.length,
          slide: this._slides[curr] || null,
          previousSlide: prev >= 0 ? this._slides[prev] || null : null,
          reason: reason // 'init' | 'keyboard' | 'click' | 'tap' | 'api'
        };
        this.dispatchEvent(new CustomEvent('slidechange', {
          detail,
          bubbles: true,
          composed: true
        }));
      }
      this._prevIndex = curr;
      if (showOverlay) this._flashOverlay();
    }
    _flashOverlay() {
      if (!this._overlay) return;
      this._overlay.setAttribute('data-visible', '');
      if (this._hideTimer) clearTimeout(this._hideTimer);
      this._hideTimer = setTimeout(() => {
        this._overlay.removeAttribute('data-visible');
      }, OVERLAY_HIDE_MS);
    }
    _fit() {
      if (!this._canvas) return;
      // PPTX export sets noscale so the DOM capture sees authored-size
      // geometry — the scaled canvas is in shadow DOM, so the exporter's
      // resetTransformSelector can't reach .canvas.style.transform directly.
      if (this.hasAttribute('noscale')) {
        this._canvas.style.transform = 'none';
        return;
      }
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const s = Math.min(vw / this.designWidth, vh / this.designHeight);
      this._canvas.style.transform = `scale(${s})`;
    }
    _onResize() {
      this._fit();
    }
    _onMouseMove() {
      // Keep overlay visible while mouse moves; hide after idle.
      this._flashOverlay();
    }
    _onTapBack(e) {
      e.preventDefault();
      this._go(this._index - 1, 'tap');
    }
    _onTapForward(e) {
      e.preventDefault();
      this._go(this._index + 1, 'tap');
    }
    _onKey(e) {
      // Ignore when the user is typing.
      const t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key;
      let handled = true;
      if (key === 'ArrowRight' || key === 'PageDown' || key === ' ' || key === 'Spacebar') {
        this._go(this._index + 1, 'keyboard');
      } else if (key === 'ArrowLeft' || key === 'PageUp') {
        this._go(this._index - 1, 'keyboard');
      } else if (key === 'Home') {
        this._go(0, 'keyboard');
      } else if (key === 'End') {
        this._go(this._slides.length - 1, 'keyboard');
      } else if (key === 'r' || key === 'R') {
        this._go(0, 'keyboard');
      } else if (/^[0-9]$/.test(key)) {
        // 1..9 jump to that slide; 0 jumps to 10.
        const n = key === '0' ? 9 : parseInt(key, 10) - 1;
        if (n < this._slides.length) this._go(n, 'keyboard');
      } else {
        handled = false;
      }
      if (handled) {
        e.preventDefault();
        this._flashOverlay();
      }
    }
    _go(i, reason = 'api') {
      if (!this._slides.length) return;
      const clamped = Math.max(0, Math.min(this._slides.length - 1, i));
      if (clamped === this._index) {
        this._flashOverlay();
        return;
      }
      this._index = clamped;
      this._applyIndex({
        showOverlay: true,
        broadcast: true,
        reason
      });
    }

    // Public API ------------------------------------------------------------

    /** Current slide index (0-based). */
    get index() {
      return this._index;
    }
    /** Total slide count. */
    get length() {
      return this._slides.length;
    }
    /** Programmatically navigate. */
    goTo(i) {
      this._go(i, 'api');
    }
    next() {
      this._go(this._index + 1, 'api');
    }
    prev() {
      this._go(this._index - 1, 'api');
    }
    reset() {
      this._go(0, 'api');
    }
  }
  if (!customElements.get('deck-stage')) {
    customElements.define('deck-stage', DeckStage);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "decks/marc-march-2026/deck-stage.js", error: String((e && e.message) || e) }); }

// ui_kits/slack-app/ChannelSidebar.jsx
try { (() => {
// ChannelSidebar.jsx — channel sidebar with sections
const SidebarSectionHeader = ({
  label,
  open,
  onToggle
}) => /*#__PURE__*/React.createElement("div", {
  style: sbStyles.sectionHeader,
  onClick: onToggle
}, /*#__PURE__*/React.createElement("svg", {
  width: "10",
  height: "10",
  viewBox: "0 0 10 10",
  style: {
    transform: open ? 'rotate(90deg)' : 'none',
    transition: 'transform 150ms'
  }
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 2l4 3-4 3z",
  fill: "currentColor"
})), /*#__PURE__*/React.createElement("span", null, label));
const SidebarRow = ({
  icon,
  label,
  active,
  unread,
  mention,
  onClick,
  presence,
  muted
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    ...sbStyles.row,
    ...(active ? sbStyles.rowActive : null)
  },
  onClick: onClick
}, /*#__PURE__*/React.createElement("span", {
  style: sbStyles.rowIcon
}, icon), /*#__PURE__*/React.createElement("span", {
  style: {
    ...sbStyles.rowLabel,
    opacity: muted ? 0.56 : unread ? 1 : 0.86,
    fontWeight: unread || active ? 900 : 400
  }
}, label), presence && /*#__PURE__*/React.createElement("span", {
  style: {
    ...sbStyles.dot,
    background: presence === 'active' ? '#2EB67D' : 'transparent',
    border: presence === 'active' ? 'none' : '1.5px solid rgba(255,255,255,0.56)'
  }
}), mention && /*#__PURE__*/React.createElement("span", {
  style: sbStyles.mentionBadge
}, mention));
const ChannelSidebar = ({
  workspace,
  channels,
  dms,
  activeId,
  onSelect
}) => {
  const [openCh, setOpenCh] = React.useState(true);
  const [openDm, setOpenDm] = React.useState(true);
  return /*#__PURE__*/React.createElement("div", {
    style: sbStyles.sidebar
  }, /*#__PURE__*/React.createElement("div", {
    style: sbStyles.header
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: sbStyles.wsName
  }, workspace), /*#__PURE__*/React.createElement("div", {
    style: sbStyles.wsMe
  }, /*#__PURE__*/React.createElement("span", {
    style: sbStyles.presence
  }), " Priya")), /*#__PURE__*/React.createElement("button", {
    style: sbStyles.headerBtn,
    title: "New message"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 20 20"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    d: "M3 14v3h3l9-9-3-3-9 9zM12 5l3 3"
  })))), /*#__PURE__*/React.createElement("div", {
    style: sbStyles.search
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 20 20"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "9",
    r: "5.5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13 13l4 4",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  })), /*#__PURE__*/React.createElement("span", null, "Search Acme")), /*#__PURE__*/React.createElement("div", {
    style: sbStyles.quick
  }, /*#__PURE__*/React.createElement(SidebarRow, {
    icon: "\uD83E\uDDF5",
    label: "Threads"
  }), /*#__PURE__*/React.createElement(SidebarRow, {
    icon: /*#__PURE__*/React.createElement(Glyph, {
      d: "M4 7h12M4 13h12M8 3l-2 14M14 3l-2 14"
    }),
    label: "All channels"
  }), /*#__PURE__*/React.createElement(SidebarRow, {
    icon: /*#__PURE__*/React.createElement(Glyph, {
      d: "M5 3h10v14l-5-3.5L5 17V3z"
    }),
    label: "Drafts & sent"
  })), /*#__PURE__*/React.createElement(SidebarSectionHeader, {
    label: "Channels",
    open: openCh,
    onToggle: () => setOpenCh(!openCh)
  }), openCh && channels.map(c => /*#__PURE__*/React.createElement(SidebarRow, {
    key: c.id,
    icon: c.private ? /*#__PURE__*/React.createElement(Glyph, {
      d: "M5 9h10v7H5zM7 9V6a3 3 0 0 1 6 0v3"
    }) : /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 900,
        fontSize: 15
      }
    }, "#"),
    label: c.name,
    active: activeId === c.id,
    unread: c.unread,
    mention: c.mentions,
    muted: c.muted,
    onClick: () => onSelect(c.id)
  })), /*#__PURE__*/React.createElement(SidebarRow, {
    icon: /*#__PURE__*/React.createElement(Glyph, {
      d: "M10 4v12M4 10h12"
    }),
    label: "Add channels",
    muted: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8
    }
  }), /*#__PURE__*/React.createElement(SidebarSectionHeader, {
    label: "Direct messages",
    open: openDm,
    onToggle: () => setOpenDm(!openDm)
  }), openDm && dms.map(d => /*#__PURE__*/React.createElement(SidebarRow, {
    key: d.id,
    icon: /*#__PURE__*/React.createElement("span", {
      style: {
        ...sbStyles.dmAv,
        background: d.color
      }
    }, d.initial),
    label: d.name + (d.you ? ' (you)' : ''),
    active: activeId === d.id,
    unread: d.unread,
    presence: d.presence,
    onClick: () => onSelect(d.id)
  })));
};
const Glyph = ({
  d
}) => /*#__PURE__*/React.createElement("svg", {
  width: "15",
  height: "15",
  viewBox: "0 0 20 20"
}, /*#__PURE__*/React.createElement("path", {
  d: d,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const sbStyles = {
  sidebar: {
    width: 260,
    background: '#3F0E40',
    color: 'rgba(255,255,255,0.86)',
    display: 'flex',
    flexDirection: 'column',
    flex: 'none',
    fontSize: 14,
    overflowY: 'auto'
  },
  header: {
    padding: '14px 16px 10px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  wsName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 900,
    letterSpacing: '-0.01em',
    whiteSpace: 'nowrap'
  },
  wsMe: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.72)',
    marginTop: 3,
    display: 'flex',
    alignItems: 'center',
    gap: 5
  },
  presence: {
    width: 8,
    height: 8,
    borderRadius: 999,
    background: '#2EB67D',
    display: 'inline-block'
  },
  headerBtn: {
    background: '#fff',
    color: '#4A154B',
    border: 'none',
    width: 26,
    height: 26,
    borderRadius: 999,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  search: {
    margin: '10px 12px 4px',
    background: 'rgba(0,0,0,0.2)',
    borderRadius: 6,
    padding: '6px 10px',
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    border: '1px solid rgba(255,255,255,0.08)'
  },
  quick: {
    padding: '6px 8px 8px',
    borderBottom: '1px solid rgba(255,255,255,0.08)'
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '10px 16px 6px',
    fontSize: 12,
    fontWeight: 900,
    color: 'rgba(255,255,255,0.72)',
    textTransform: 'none',
    cursor: 'pointer',
    letterSpacing: '-0.005em'
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '4px 16px',
    cursor: 'pointer',
    minHeight: 28
  },
  rowActive: {
    background: '#1164A3',
    color: '#fff'
  },
  rowIcon: {
    width: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'inherit'
  },
  rowLabel: {
    flex: 1,
    fontSize: 14,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    flex: 'none'
  },
  mentionBadge: {
    background: '#E01E5A',
    color: '#fff',
    fontSize: 11,
    fontWeight: 900,
    minWidth: 18,
    height: 18,
    borderRadius: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 5px'
  },
  dmAv: {
    width: 18,
    height: 18,
    borderRadius: 4,
    color: '#fff',
    fontSize: 11,
    fontWeight: 900,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};
window.ChannelSidebar = ChannelSidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/slack-app/ChannelSidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/slack-app/Composer.jsx
try { (() => {
// Composer.jsx — rich-text message composer
const Composer = ({
  placeholder,
  value,
  onChange,
  onSend
}) => {
  const handleKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) onSend();
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: cmpStyles.wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: cmpStyles.tabs
  }, /*#__PURE__*/React.createElement("span", {
    style: cmpStyles.tabActive
  }, "Aa")), /*#__PURE__*/React.createElement("div", {
    contentEditable: true,
    suppressContentEditableWarning: true,
    style: cmpStyles.input,
    onInput: e => onChange(e.currentTarget.textContent),
    onKeyDown: handleKey,
    "data-placeholder": placeholder
  }, value), /*#__PURE__*/React.createElement("div", {
    style: cmpStyles.tools
  }, /*#__PURE__*/React.createElement(ToolBtn, {
    d: "M10 4v12M4 10h12"
  }), /*#__PURE__*/React.createElement("span", {
    style: cmpStyles.div
  }), /*#__PURE__*/React.createElement(ToolBtn, null, "B"), /*#__PURE__*/React.createElement(ToolBtn, {
    italic: true
  }, "I"), /*#__PURE__*/React.createElement(ToolBtn, null, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 20 20"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 5h8M4 9h6M4 13h5M4 17h8",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    fill: "none"
  }))), /*#__PURE__*/React.createElement("span", {
    style: cmpStyles.div
  }), /*#__PURE__*/React.createElement(ToolBtn, {
    d: "M13.5 5.5l-7 7a3 3 0 0 0 4.2 4.2l7-7a4.5 4.5 0 0 0-6.4-6.4L4 10.5"
  }), /*#__PURE__*/React.createElement(ToolBtn, null, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 20 20"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "10",
    cy: "10",
    r: "7",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7.5",
    cy: "9",
    r: ".8",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12.5",
    cy: "9",
    r: ".8",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 12.5a4 4 0 0 0 6 0",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement(ToolBtn, null, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 20 20"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "10",
    cy: "10",
    r: "8",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "10",
    cy: "10",
    r: "3",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      ...cmpStyles.send,
      ...(value.trim() ? null : cmpStyles.sendDisabled)
    },
    onClick: () => value.trim() && onSend()
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 20 20"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 10l14-6-5 14-2.5-5.5L3 10z",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinejoin: "round"
  })))));
};
const ToolBtn = ({
  children,
  d,
  italic
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    ...cmpStyles.tool,
    fontStyle: italic ? 'italic' : 'normal'
  }
}, d ? /*#__PURE__*/React.createElement("svg", {
  width: "15",
  height: "15",
  viewBox: "0 0 20 20"
}, /*#__PURE__*/React.createElement("path", {
  d: d,
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  fill: "none"
})) : children);
const cmpStyles = {
  wrap: {
    margin: '0 20px 20px',
    border: '1px solid rgba(29,28,29,0.24)',
    borderRadius: 8,
    background: '#fff',
    boxShadow: '0 1px 0 rgba(0,0,0,0.04)'
  },
  tabs: {
    padding: '6px 10px',
    borderBottom: '1px solid rgba(29,28,29,0.08)',
    display: 'flex',
    gap: 8
  },
  tabActive: {
    fontWeight: 900,
    fontSize: 13,
    color: '#1D1C1D',
    borderBottom: '2px solid #1D1C1D',
    paddingBottom: 5
  },
  input: {
    padding: '10px 14px',
    minHeight: 40,
    fontSize: 15,
    color: '#1D1C1D',
    outline: 'none'
  },
  tools: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 8px',
    borderTop: '1px solid rgba(29,28,29,0.04)',
    color: '#454A4E'
  },
  tool: {
    width: 28,
    height: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    cursor: 'pointer',
    fontWeight: 900,
    fontSize: 14
  },
  div: {
    width: 1,
    height: 18,
    background: 'rgba(29,28,29,0.12)'
  },
  send: {
    background: '#007A5A',
    color: '#fff',
    border: 'none',
    width: 30,
    height: 28,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  sendDisabled: {
    background: 'transparent',
    color: '#868686',
    cursor: 'not-allowed'
  }
};
window.Composer = Composer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/slack-app/Composer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/slack-app/Message.jsx
try { (() => {
// Message.jsx — single message row
const Message = ({
  avatar,
  color,
  name,
  time,
  body,
  reactions,
  thread,
  onOpenThread,
  compact
}) => /*#__PURE__*/React.createElement("div", {
  className: "sl-msg",
  style: msgStyles.row
}, !compact ? /*#__PURE__*/React.createElement("div", {
  style: {
    ...msgStyles.av,
    background: color
  }
}, avatar) : /*#__PURE__*/React.createElement("div", {
  style: msgStyles.compactTime
}, time.split(' ')[0]), /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1,
    minWidth: 0
  }
}, !compact && /*#__PURE__*/React.createElement("div", {
  style: msgStyles.head
}, /*#__PURE__*/React.createElement("span", {
  style: msgStyles.name
}, name), /*#__PURE__*/React.createElement("span", {
  style: msgStyles.time
}, time)), /*#__PURE__*/React.createElement("div", {
  style: msgStyles.body
}, body), reactions && reactions.length > 0 && /*#__PURE__*/React.createElement("div", {
  style: msgStyles.reactions
}, reactions.map((r, i) => /*#__PURE__*/React.createElement("span", {
  key: i,
  style: {
    ...msgStyles.reaction,
    ...(r.me ? msgStyles.reactionMe : null)
  }
}, /*#__PURE__*/React.createElement("span", null, r.emoji), /*#__PURE__*/React.createElement("span", null, r.count))), /*#__PURE__*/React.createElement("span", {
  style: msgStyles.reactionAdd
}, /*#__PURE__*/React.createElement("svg", {
  width: "14",
  height: "14",
  viewBox: "0 0 20 20"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "10",
  cy: "10",
  r: "7",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "7.5",
  cy: "9",
  r: ".8",
  fill: "currentColor"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12.5",
  cy: "9",
  r: ".8",
  fill: "currentColor"
}), /*#__PURE__*/React.createElement("path", {
  d: "M7 12.5a4 4 0 0 0 6 0",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round"
})))), thread && /*#__PURE__*/React.createElement("div", {
  style: msgStyles.threadBar,
  onClick: onOpenThread
}, /*#__PURE__*/React.createElement("div", {
  style: msgStyles.threadStack
}, thread.avatars.map((t, i) => /*#__PURE__*/React.createElement("span", {
  key: i,
  style: {
    ...msgStyles.threadAv,
    background: t.color,
    marginLeft: i ? -4 : 0
  }
}, t.initial))), /*#__PURE__*/React.createElement("span", {
  style: msgStyles.threadCount
}, thread.replies, " replies"), /*#__PURE__*/React.createElement("span", {
  style: msgStyles.threadLast
}, "Last reply ", thread.last), /*#__PURE__*/React.createElement("span", {
  style: msgStyles.threadCta
}, "View thread \u2192"))));
const msgStyles = {
  row: {
    display: 'flex',
    gap: 10,
    padding: '6px 20px',
    alignItems: 'flex-start'
  },
  av: {
    width: 36,
    height: 36,
    borderRadius: 6,
    color: '#fff',
    fontWeight: 900,
    fontSize: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 'none',
    marginTop: 2
  },
  compactTime: {
    width: 36,
    fontSize: 11,
    color: '#868686',
    textAlign: 'right',
    paddingRight: 6,
    marginTop: 4
  },
  head: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 8
  },
  name: {
    fontWeight: 900,
    color: '#1D1C1D',
    fontSize: 15
  },
  time: {
    color: '#616061',
    fontSize: 12
  },
  body: {
    color: '#1D1C1D',
    fontSize: 15,
    lineHeight: 1.46,
    marginTop: 1,
    wordWrap: 'break-word'
  },
  reactions: {
    display: 'flex',
    gap: 6,
    flexWrap: 'wrap',
    marginTop: 6
  },
  reaction: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '2px 8px',
    border: '1px solid rgba(29,28,29,0.13)',
    background: '#fff',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    color: '#454A4E',
    cursor: 'pointer'
  },
  reactionMe: {
    borderColor: '#1264A3',
    background: '#E8F3FA',
    color: '#1264A3'
  },
  reactionAdd: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 8px',
    border: '1px solid rgba(29,28,29,0.08)',
    background: '#fff',
    borderRadius: 999,
    color: '#868686',
    cursor: 'pointer'
  },
  threadBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
    padding: '4px 8px',
    border: '1px solid transparent',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 13
  },
  threadStack: {
    display: 'flex'
  },
  threadAv: {
    width: 20,
    height: 20,
    borderRadius: 4,
    color: '#fff',
    fontWeight: 900,
    fontSize: 10,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  threadCount: {
    color: '#1264A3',
    fontWeight: 900
  },
  threadLast: {
    color: '#616061'
  },
  threadCta: {
    color: 'transparent'
  }
};
window.Message = Message;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/slack-app/Message.jsx", error: String((e && e.message) || e) }); }

// ui_kits/slack-app/MessagePane.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// MessagePane.jsx — channel header + message list
const MessagePane = ({
  channel,
  members,
  messages,
  onOpenThread,
  children
}) => /*#__PURE__*/React.createElement("div", {
  style: mpStyles.pane
}, /*#__PURE__*/React.createElement("div", {
  style: mpStyles.header
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: mpStyles.title
}, channel.private ? '🔒' : '#', " ", /*#__PURE__*/React.createElement("span", null, channel.name), /*#__PURE__*/React.createElement("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 20 20",
  style: {
    marginLeft: 6,
    opacity: 0.6
  }
}, /*#__PURE__*/React.createElement("path", {
  d: "M7 8l3 3 3-3",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}))), /*#__PURE__*/React.createElement("div", {
  style: mpStyles.topic
}, channel.topic)), /*#__PURE__*/React.createElement("div", {
  style: mpStyles.headerRight
}, /*#__PURE__*/React.createElement("div", {
  style: mpStyles.members
}, members.slice(0, 3).map((m, i) => /*#__PURE__*/React.createElement("span", {
  key: i,
  style: {
    ...mpStyles.mem,
    background: m.color,
    marginLeft: i ? -5 : 0
  }
}, m.initial)), /*#__PURE__*/React.createElement("span", {
  style: mpStyles.memCount
}, members.length)), /*#__PURE__*/React.createElement("button", {
  style: mpStyles.huddleBtn
}, /*#__PURE__*/React.createElement("svg", {
  width: "14",
  height: "14",
  viewBox: "0 0 20 20"
}, /*#__PURE__*/React.createElement("path", {
  d: "M6 11l-2 2v-9a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H6z",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5"
})), "Huddle"))), /*#__PURE__*/React.createElement("div", {
  style: mpStyles.scroll
}, /*#__PURE__*/React.createElement("div", {
  style: mpStyles.welcome
}, /*#__PURE__*/React.createElement("div", {
  style: mpStyles.welcomeHash
}, "#"), /*#__PURE__*/React.createElement("div", {
  style: mpStyles.welcomeTitle
}, "Welcome to #", channel.name), /*#__PURE__*/React.createElement("div", {
  style: mpStyles.welcomeBody
}, channel.welcome)), /*#__PURE__*/React.createElement("div", {
  style: mpStyles.dateDivider
}, /*#__PURE__*/React.createElement("span", null, "Today")), messages.map((m, i) => {
  const prev = messages[i - 1];
  const compact = prev && prev.name === m.name && !m.reactions && !m.thread;
  return /*#__PURE__*/React.createElement(Message, _extends({
    key: m.id
  }, m, {
    compact: compact,
    onOpenThread: () => onOpenThread(m.id)
  }));
})), children);
const mpStyles = {
  pane: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    background: '#fff'
  },
  header: {
    borderBottom: '1px solid rgba(29,28,29,0.13)',
    padding: '10px 20px 10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 1px 0 rgba(0,0,0,0.03)'
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 18,
    fontWeight: 900,
    color: '#1D1C1D',
    whiteSpace: 'nowrap'
  },
  topic: {
    fontSize: 13,
    color: '#616061',
    marginTop: 2,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    flex: 'none'
  },
  members: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid rgba(29,28,29,0.13)',
    borderRadius: 6,
    padding: '2px 8px 2px 4px'
  },
  mem: {
    width: 22,
    height: 22,
    borderRadius: 4,
    color: '#fff',
    fontWeight: 900,
    fontSize: 11,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1.5px solid #fff'
  },
  memCount: {
    marginLeft: 6,
    fontSize: 13,
    color: '#454A4E',
    fontWeight: 700
  },
  huddleBtn: {
    border: '1px solid rgba(29,28,29,0.13)',
    background: '#fff',
    borderRadius: 6,
    padding: '5px 10px',
    fontSize: 13,
    fontWeight: 700,
    color: '#1D1C1D',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    cursor: 'pointer'
  },
  scroll: {
    flex: 1,
    overflowY: 'auto',
    paddingBottom: 8
  },
  welcome: {
    padding: '28px 20px 12px'
  },
  welcomeHash: {
    width: 40,
    height: 40,
    borderRadius: 8,
    background: '#F4EDE4',
    color: '#4A154B',
    fontSize: 22,
    fontWeight: 900,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 900,
    marginTop: 10,
    color: '#1D1C1D',
    letterSpacing: '-0.01em'
  },
  welcomeBody: {
    fontSize: 15,
    color: '#454A4E',
    marginTop: 4,
    maxWidth: 560
  },
  dateDivider: {
    display: 'flex',
    alignItems: 'center',
    margin: '16px 0 6px',
    position: 'relative'
  }
};

// stylesheet injects for dateDivider :: pseudo-like look
const mpCss = `
.sl-msg:hover { background: rgba(29,28,29,0.04); }
`;
if (!document.getElementById('sl-msg-css')) {
  const s = document.createElement('style');
  s.id = 'sl-msg-css';
  s.textContent = mpCss;
  document.head.appendChild(s);
}
window.MessagePane = MessagePane;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/slack-app/MessagePane.jsx", error: String((e && e.message) || e) }); }

// ui_kits/slack-app/ThreadDrawer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// ThreadDrawer.jsx — right side thread panel
const ThreadDrawer = ({
  channel,
  parent,
  replies,
  onClose,
  onSend
}) => {
  const [draft, setDraft] = React.useState('');
  return /*#__PURE__*/React.createElement("div", {
    style: tdStyles.drawer
  }, /*#__PURE__*/React.createElement("div", {
    style: tdStyles.head
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: tdStyles.title
  }, "Thread"), /*#__PURE__*/React.createElement("div", {
    style: tdStyles.sub
  }, "# ", channel)), /*#__PURE__*/React.createElement("div", {
    style: tdStyles.close,
    onClick: onClose
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: tdStyles.scroll
  }, /*#__PURE__*/React.createElement(Message, parent), /*#__PURE__*/React.createElement("div", {
    style: tdStyles.replyCount
  }, replies.length, " ", replies.length === 1 ? 'reply' : 'replies'), replies.map(r => /*#__PURE__*/React.createElement(Message, _extends({
    key: r.id
  }, r)))), /*#__PURE__*/React.createElement(Composer, {
    placeholder: `Reply…`,
    value: draft,
    onChange: setDraft,
    onSend: () => {
      onSend(draft);
      setDraft('');
    }
  }));
};
const tdStyles = {
  drawer: {
    width: 420,
    borderLeft: '1px solid rgba(29,28,29,0.13)',
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    flex: 'none'
  },
  head: {
    padding: '12px 20px 10px',
    borderBottom: '1px solid rgba(29,28,29,0.08)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  title: {
    fontWeight: 900,
    fontSize: 17,
    color: '#1D1C1D'
  },
  sub: {
    fontSize: 12,
    color: '#616061',
    marginTop: 2
  },
  close: {
    width: 28,
    height: 28,
    fontSize: 24,
    color: '#616061',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scroll: {
    flex: 1,
    overflowY: 'auto',
    paddingBottom: 8
  },
  replyCount: {
    fontSize: 12,
    color: '#616061',
    padding: '6px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontWeight: 700
  }
};
window.ThreadDrawer = ThreadDrawer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/slack-app/ThreadDrawer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/slack-app/WorkspaceRail.jsx
try { (() => {
// WorkspaceRail.jsx — far-left 72px rail with workspace avatar + glyphs
const WorkspaceRail = () => {
  return /*#__PURE__*/React.createElement("div", {
    style: wsStyles.rail
  }, /*#__PURE__*/React.createElement("div", {
    style: wsStyles.ws
  }, /*#__PURE__*/React.createElement("div", {
    style: wsStyles.wsAvatar
  }, "A"), /*#__PURE__*/React.createElement("div", {
    style: wsStyles.wsBadge
  }, "3")), /*#__PURE__*/React.createElement("div", {
    style: wsStyles.addBtn
  }, "\uFF0B"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: wsStyles.navBtn,
    title: "Activity"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 20 20"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinejoin: "round",
    strokeLinecap: "round",
    d: "M5 14V9a5 5 0 0 1 10 0v5l1.5 2h-13L5 14zM8 17a2 2 0 0 0 4 0"
  }))), /*#__PURE__*/React.createElement("div", {
    style: wsStyles.navBtn,
    title: "Help"
  }, "?"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...wsStyles.navBtn,
      marginTop: 4
    },
    title: "You"
  }, /*#__PURE__*/React.createElement("div", {
    style: wsStyles.youAvatar
  }, "P")));
};
const wsStyles = {
  rail: {
    width: 72,
    background: '#350D36',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '12px 0 12px',
    gap: 10,
    flex: 'none',
    borderRight: '1px solid rgba(255,255,255,0.06)'
  },
  ws: {
    position: 'relative',
    marginBottom: 4
  },
  wsAvatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
    background: '#ECB22E',
    color: '#1D1C1D',
    fontWeight: 900,
    fontSize: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 0 3px rgba(255,255,255,0.14)'
  },
  wsBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    background: '#E01E5A',
    color: '#fff',
    fontSize: 10,
    fontWeight: 900,
    minWidth: 18,
    height: 18,
    borderRadius: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 4px',
    border: '2px solid #350D36'
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    background: 'rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.86)',
    fontSize: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  navBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    color: 'rgba(255,255,255,0.72)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 900
  },
  youAvatar: {
    width: 32,
    height: 32,
    borderRadius: 6,
    background: '#4A154B',
    color: '#fff',
    fontWeight: 900,
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 0 2px #2EB67D'
  }
};
window.WorkspaceRail = WorkspaceRail;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/slack-app/WorkspaceRail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/slack-marketing/FeatureRow.jsx
try { (() => {
// FeatureRow.jsx
const FeatureRow = ({
  eyebrow,
  title,
  body,
  bullet,
  image,
  flip
}) => /*#__PURE__*/React.createElement("section", {
  style: frStyles.wrap
}, /*#__PURE__*/React.createElement("div", {
  style: {
    ...frStyles.inner,
    flexDirection: flip ? 'row-reverse' : 'row'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: frStyles.copy
}, /*#__PURE__*/React.createElement("div", {
  style: frStyles.eyebrow
}, eyebrow), /*#__PURE__*/React.createElement("h2", {
  style: frStyles.h2
}, title), /*#__PURE__*/React.createElement("p", {
  style: frStyles.p
}, body), /*#__PURE__*/React.createElement("ul", {
  style: frStyles.list
}, bullet.map((b, i) => /*#__PURE__*/React.createElement("li", {
  key: i,
  style: frStyles.li
}, /*#__PURE__*/React.createElement("span", {
  style: frStyles.check
}, "\u2713"), b))), /*#__PURE__*/React.createElement("a", {
  style: frStyles.cta
}, "Learn more \u2192")), /*#__PURE__*/React.createElement("div", {
  style: frStyles.imgCol
}, image)));
const frStyles = {
  wrap: {
    padding: '72px 0'
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    gap: 80,
    alignItems: 'center'
  },
  copy: {
    flex: 1
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#611F69',
    marginBottom: 18
  },
  h2: {
    fontFamily: 'Lato',
    fontSize: 48,
    fontWeight: 900,
    letterSpacing: '-0.025em',
    lineHeight: 1.05,
    margin: 0,
    color: '#1D1C1D'
  },
  p: {
    fontSize: 18,
    color: '#454A4E',
    marginTop: 16,
    lineHeight: 1.5,
    maxWidth: 480
  },
  list: {
    listStyle: 'none',
    padding: 0,
    marginTop: 20
  },
  li: {
    display: 'flex',
    gap: 10,
    alignItems: 'flex-start',
    fontSize: 16,
    color: '#1D1C1D',
    marginBottom: 10
  },
  check: {
    color: '#007A5A',
    fontWeight: 900
  },
  cta: {
    color: '#1264A3',
    fontWeight: 900,
    fontSize: 16,
    display: 'inline-block',
    marginTop: 22,
    cursor: 'pointer'
  },
  imgCol: {
    flex: 1
  }
};
window.FeatureRow = FeatureRow;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/slack-marketing/FeatureRow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/slack-marketing/FooterLarge.jsx
try { (() => {
// FooterLarge.jsx
const COLS = [{
  title: 'Product',
  links: ['Features', 'Channels', 'Huddles', 'Canvas', 'Slack AI', 'Workflow Builder', 'Enterprise', 'Integrations']
}, {
  title: 'Solutions',
  links: ['Engineering', 'IT', 'Sales', 'Marketing', 'Customer support', 'Project management', 'Remote work']
}, {
  title: 'Resources',
  links: ['Help Center', 'Community', 'API', 'Events', 'Slack Tips', 'App Directory']
}, {
  title: 'Company',
  links: ['About us', 'Leadership', 'News', 'Media Kit', 'Careers', 'Contact us']
}];
const FooterLarge = () => /*#__PURE__*/React.createElement("footer", {
  style: flStyles.wrap
}, /*#__PURE__*/React.createElement("div", {
  style: flStyles.inner
}, /*#__PURE__*/React.createElement("div", {
  style: flStyles.brand
}, /*#__PURE__*/React.createElement("img", {
  src: "../../assets/logo/slack-mark-white.svg",
  style: {
    height: 40
  }
}), /*#__PURE__*/React.createElement("span", {
  style: flStyles.word
}, "slack")), /*#__PURE__*/React.createElement("div", {
  style: flStyles.grid
}, COLS.map(c => /*#__PURE__*/React.createElement("div", {
  key: c.title
}, /*#__PURE__*/React.createElement("div", {
  style: flStyles.colTitle
}, c.title), /*#__PURE__*/React.createElement("ul", {
  style: flStyles.list
}, c.links.map(l => /*#__PURE__*/React.createElement("li", {
  key: l
}, /*#__PURE__*/React.createElement("a", {
  style: flStyles.link
}, l))))))), /*#__PURE__*/React.createElement("div", {
  style: flStyles.bottom
}, /*#__PURE__*/React.createElement("div", null, "\xA9 2026 Slack Technologies, LLC, a Salesforce company. All rights reserved."), /*#__PURE__*/React.createElement("div", {
  style: flStyles.bottomLinks
}, /*#__PURE__*/React.createElement("a", {
  style: flStyles.link
}, "Privacy"), /*#__PURE__*/React.createElement("a", {
  style: flStyles.link
}, "Terms"), /*#__PURE__*/React.createElement("a", {
  style: flStyles.link
}, "Cookie Preferences"), /*#__PURE__*/React.createElement("a", {
  style: flStyles.link
}, "Status")))));
const flStyles = {
  wrap: {
    background: '#1D1C1D',
    color: '#fff',
    padding: '72px 0 40px'
  },
  inner: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '0 24px'
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 40
  },
  word: {
    fontFamily: 'Lato',
    fontSize: 32,
    fontWeight: 900,
    letterSpacing: '-0.03em',
    color: '#fff'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 32,
    paddingBottom: 40,
    borderBottom: '1px solid rgba(255,255,255,0.1)'
  },
  colTitle: {
    fontSize: 14,
    fontWeight: 900,
    marginBottom: 14
  },
  list: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  link: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 14,
    cursor: 'pointer'
  },
  bottom: {
    paddingTop: 24,
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 13,
    color: 'rgba(255,255,255,0.56)'
  },
  bottomLinks: {
    display: 'flex',
    gap: 20
  }
};
window.FooterLarge = FooterLarge;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/slack-marketing/FooterLarge.jsx", error: String((e && e.message) || e) }); }

// ui_kits/slack-marketing/Hero.jsx
try { (() => {
// Hero.jsx
const Hero = () => /*#__PURE__*/React.createElement("section", {
  style: heroStyles.wrap
}, /*#__PURE__*/React.createElement("div", {
  style: heroStyles.bgMark
}), /*#__PURE__*/React.createElement("div", {
  style: heroStyles.inner
}, /*#__PURE__*/React.createElement("div", {
  style: heroStyles.copy
}, /*#__PURE__*/React.createElement("div", {
  style: heroStyles.eyebrow
}, "Slack is your AI work operating system"), /*#__PURE__*/React.createElement("h1", {
  style: heroStyles.h1
}, "Where work happens."), /*#__PURE__*/React.createElement("p", {
  style: heroStyles.p
}, "Slack brings your people, apps, and AI agents together in one place \u2014 so teams move faster, stay aligned, and get more done."), /*#__PURE__*/React.createElement("div", {
  style: heroStyles.ctaRow
}, /*#__PURE__*/React.createElement("button", {
  style: heroStyles.btnAccent
}, "Try Slack free"), /*#__PURE__*/React.createElement("button", {
  style: heroStyles.btnGhost
}, "Talk to sales \u2192"))), /*#__PURE__*/React.createElement("div", {
  style: heroStyles.art
}, /*#__PURE__*/React.createElement("div", {
  style: heroStyles.screen
}, /*#__PURE__*/React.createElement("div", {
  style: heroStyles.screenHead
}, /*#__PURE__*/React.createElement("span", {
  style: {
    width: 10,
    height: 10,
    borderRadius: 999,
    background: '#E01E5A'
  }
}), /*#__PURE__*/React.createElement("span", {
  style: {
    width: 10,
    height: 10,
    borderRadius: 999,
    background: '#ECB22E'
  }
}), /*#__PURE__*/React.createElement("span", {
  style: {
    width: 10,
    height: 10,
    borderRadius: 999,
    background: '#2EB67D'
  }
})), /*#__PURE__*/React.createElement("div", {
  style: heroStyles.screenBody
}, /*#__PURE__*/React.createElement("div", {
  style: heroStyles.chPanel
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 12,
    fontWeight: 900,
    color: 'rgba(255,255,255,0.9)'
  }
}, "Acme Corp"), /*#__PURE__*/React.createElement("div", {
  style: heroStyles.chItem
}, "# launch"), /*#__PURE__*/React.createElement("div", {
  style: {
    ...heroStyles.chItem,
    background: '#1164A3'
  }
}, "# design-reviews"), /*#__PURE__*/React.createElement("div", {
  style: heroStyles.chItem
}, "# general"), /*#__PURE__*/React.createElement("div", {
  style: heroStyles.chItem
}, "# random")), /*#__PURE__*/React.createElement("div", {
  style: heroStyles.msgPanel
}, /*#__PURE__*/React.createElement("div", {
  style: heroStyles.chTitle
}, "# design-reviews"), /*#__PURE__*/React.createElement("div", {
  style: heroStyles.msg
}, /*#__PURE__*/React.createElement("div", {
  style: {
    ...heroStyles.msgAv,
    background: '#4A154B'
  }
}, "P"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: heroStyles.msgName
}, "Priya Ahuja"), /*#__PURE__*/React.createElement("div", {
  style: heroStyles.msgBody
}, "Review pushed to 2pm \uD83D\uDC4B"))), /*#__PURE__*/React.createElement("div", {
  style: heroStyles.msg
}, /*#__PURE__*/React.createElement("div", {
  style: {
    ...heroStyles.msgAv,
    background: '#2EB67D'
  }
}, "J"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: heroStyles.msgName
}, "Jordan Lee"), /*#__PURE__*/React.createElement("div", {
  style: heroStyles.msgBody
}, "Works for me.")))))))));
const heroStyles = {
  wrap: {
    background: '#4A154B',
    color: '#fff',
    position: 'relative',
    overflow: 'hidden'
  },
  bgMark: {
    position: 'absolute',
    right: -120,
    top: -120,
    width: 480,
    height: 480,
    background: 'radial-gradient(circle, rgba(97,31,105,0.8) 0%, rgba(74,21,75,0) 60%)',
    pointerEvents: 'none'
  },
  inner: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '72px 24px 96px',
    display: 'grid',
    gridTemplateColumns: '1.05fr 1fr',
    gap: 48,
    alignItems: 'center',
    position: 'relative'
  },
  copy: {},
  eyebrow: {
    fontSize: 13,
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#ECB22E',
    marginBottom: 20
  },
  h1: {
    fontFamily: 'Lato',
    fontSize: 80,
    fontWeight: 900,
    letterSpacing: '-0.035em',
    lineHeight: 1,
    margin: 0,
    color: '#fff'
  },
  p: {
    fontSize: 19,
    color: 'rgba(255,255,255,0.82)',
    maxWidth: 520,
    marginTop: 20,
    lineHeight: 1.5
  },
  ctaRow: {
    marginTop: 28,
    display: 'flex',
    gap: 14,
    alignItems: 'center'
  },
  btnAccent: {
    background: '#ECB22E',
    color: '#1D1C1D',
    border: 'none',
    fontWeight: 900,
    fontSize: 16,
    padding: '14px 22px',
    borderRadius: 4,
    cursor: 'pointer'
  },
  btnGhost: {
    background: 'transparent',
    color: '#fff',
    border: 'none',
    fontWeight: 900,
    fontSize: 16,
    cursor: 'pointer'
  },
  art: {
    position: 'relative'
  },
  screen: {
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
    overflow: 'hidden',
    transform: 'perspective(1600px) rotateY(-6deg) rotateX(3deg)'
  },
  screenHead: {
    background: '#F4F4F4',
    padding: '10px 14px',
    display: 'flex',
    gap: 6
  },
  screenBody: {
    display: 'grid',
    gridTemplateColumns: '140px 1fr',
    height: 300
  },
  chPanel: {
    background: '#3F0E40',
    padding: '14px 10px',
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  chItem: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 13,
    padding: '4px 8px',
    borderRadius: 4
  },
  msgPanel: {
    padding: 16,
    color: '#1D1C1D'
  },
  chTitle: {
    fontWeight: 900,
    fontSize: 15,
    paddingBottom: 10,
    borderBottom: '1px solid rgba(29,28,29,0.08)',
    marginBottom: 12
  },
  msg: {
    display: 'flex',
    gap: 10,
    marginBottom: 10
  },
  msgAv: {
    width: 28,
    height: 28,
    borderRadius: 4,
    color: '#fff',
    fontWeight: 900,
    fontSize: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  msgName: {
    fontWeight: 900,
    fontSize: 13
  },
  msgBody: {
    fontSize: 13,
    color: '#454A4E'
  }
};
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/slack-marketing/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/slack-marketing/LogoRow.jsx
try { (() => {
// LogoRow.jsx
const LogoRow = () => /*#__PURE__*/React.createElement("section", {
  style: lrStyles.wrap
}, /*#__PURE__*/React.createElement("div", {
  style: lrStyles.label
}, "Trusted by teams at"), /*#__PURE__*/React.createElement("div", {
  style: lrStyles.row
}, ['IBM', 'T-Mobile', 'Target', 'Airbnb', 'Uber', 'Intuit', 'Etsy', 'OpenAI'].map(n => /*#__PURE__*/React.createElement("div", {
  key: n,
  style: lrStyles.logo
}, n))));
const lrStyles = {
  wrap: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '48px 24px 24px',
    textAlign: 'center'
  },
  label: {
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#616061',
    marginBottom: 24
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 24
  },
  logo: {
    fontFamily: 'Lato',
    fontWeight: 900,
    fontSize: 22,
    color: '#868686',
    letterSpacing: '-0.01em'
  }
};
window.LogoRow = LogoRow;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/slack-marketing/LogoRow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/slack-marketing/PricingTable.jsx
try { (() => {
// PricingTable.jsx
const TIERS = [{
  name: 'Free',
  price: '$0',
  tag: 'For small teams trying out Slack',
  highlight: false,
  cta: 'Try for free',
  features: ['90 days of message history', '10 integrations', '1:1 huddles', 'Limited file storage']
}, {
  name: 'Pro',
  price: '$8.75',
  tag: 'For small- & medium-sized businesses',
  highlight: false,
  cta: 'Get started',
  features: ['Unlimited message history', 'Unlimited integrations', 'Group huddles', 'Slack Connect with 20 orgs']
}, {
  name: 'Business+',
  price: '$15',
  tag: 'For larger businesses',
  highlight: true,
  cta: 'Get started',
  features: ['SSO & data exports', 'SOC 2 / HIPAA', 'Slack AI add-on ready', '24/7 support — 4h response']
}, {
  name: 'Enterprise Grid',
  price: 'Custom',
  tag: 'For the largest enterprises',
  highlight: false,
  cta: 'Contact sales',
  features: ['Unlimited workspaces', 'DLP & eDiscovery', 'Enterprise Key Management', 'Designated customer team']
}];
const PricingTable = () => /*#__PURE__*/React.createElement("section", {
  style: ptStyles.wrap
}, /*#__PURE__*/React.createElement("div", {
  style: ptStyles.inner
}, /*#__PURE__*/React.createElement("div", {
  style: ptStyles.eyebrow
}, "Pricing"), /*#__PURE__*/React.createElement("h2", {
  style: ptStyles.h2
}, "Pick a plan that fits your team"), /*#__PURE__*/React.createElement("div", {
  style: ptStyles.grid
}, TIERS.map(t => /*#__PURE__*/React.createElement("div", {
  key: t.name,
  style: {
    ...ptStyles.card,
    ...(t.highlight ? ptStyles.cardHi : null)
  }
}, t.highlight && /*#__PURE__*/React.createElement("div", {
  style: ptStyles.ribbon
}, "Most popular"), /*#__PURE__*/React.createElement("div", {
  style: ptStyles.name
}, t.name), /*#__PURE__*/React.createElement("div", {
  style: ptStyles.tag
}, t.tag), /*#__PURE__*/React.createElement("div", {
  style: ptStyles.priceRow
}, /*#__PURE__*/React.createElement("span", {
  style: ptStyles.price
}, t.price), t.price.startsWith('$') && t.price !== '$0' && /*#__PURE__*/React.createElement("span", {
  style: ptStyles.per
}, "USD / seat / month")), /*#__PURE__*/React.createElement("button", {
  style: {
    ...ptStyles.cta,
    ...(t.highlight ? ptStyles.ctaHi : null)
  }
}, t.cta), /*#__PURE__*/React.createElement("ul", {
  style: ptStyles.list
}, t.features.map((f, i) => /*#__PURE__*/React.createElement("li", {
  key: i,
  style: ptStyles.li
}, /*#__PURE__*/React.createElement("span", {
  style: ptStyles.check
}, "\u2713"), f))))))));
const ptStyles = {
  wrap: {
    background: '#F4EDE4',
    padding: '96px 0'
  },
  inner: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '0 24px'
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#611F69',
    textAlign: 'center'
  },
  h2: {
    fontFamily: 'Lato',
    fontSize: 44,
    fontWeight: 900,
    letterSpacing: '-0.025em',
    textAlign: 'center',
    margin: '12px 0 48px',
    color: '#1D1C1D'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 16
  },
  card: {
    background: '#fff',
    borderRadius: 8,
    padding: 28,
    position: 'relative',
    border: '1px solid rgba(29,28,29,0.08)'
  },
  cardHi: {
    border: '2px solid #4A154B',
    boxShadow: '0 12px 32px rgba(74,21,75,0.18)'
  },
  ribbon: {
    position: 'absolute',
    top: -12,
    left: 20,
    background: '#4A154B',
    color: '#fff',
    fontSize: 11,
    fontWeight: 900,
    padding: '4px 10px',
    borderRadius: 999,
    letterSpacing: '0.04em'
  },
  name: {
    fontSize: 22,
    fontWeight: 900,
    color: '#1D1C1D'
  },
  tag: {
    fontSize: 13,
    color: '#616061',
    marginTop: 4,
    minHeight: 40
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 6,
    margin: '20px 0 16px'
  },
  price: {
    fontSize: 34,
    fontWeight: 900,
    color: '#1D1C1D',
    fontFamily: 'Lato',
    letterSpacing: '-0.02em'
  },
  per: {
    fontSize: 11,
    color: '#616061'
  },
  cta: {
    width: '100%',
    padding: '10px 14px',
    border: '1.5px solid #1D1C1D',
    background: 'transparent',
    color: '#1D1C1D',
    fontWeight: 900,
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 14
  },
  ctaHi: {
    background: '#4A154B',
    color: '#fff',
    borderColor: '#4A154B'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    marginTop: 20
  },
  li: {
    display: 'flex',
    gap: 8,
    fontSize: 13,
    color: '#1D1C1D',
    marginBottom: 8
  },
  check: {
    color: '#007A5A',
    fontWeight: 900
  }
};
window.PricingTable = PricingTable;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/slack-marketing/PricingTable.jsx", error: String((e && e.message) || e) }); }

// ui_kits/slack-marketing/TopNav.jsx
try { (() => {
// TopNav.jsx
const TopNav = () => /*#__PURE__*/React.createElement("div", {
  style: tnStyles.bar
}, /*#__PURE__*/React.createElement("div", {
  style: tnStyles.inner
}, /*#__PURE__*/React.createElement("div", {
  style: tnStyles.left
}, /*#__PURE__*/React.createElement("img", {
  src: "../../assets/logo/slack-mark.svg",
  style: {
    height: 28
  }
}), /*#__PURE__*/React.createElement("span", {
  style: tnStyles.word
}, "slack"), /*#__PURE__*/React.createElement("nav", {
  style: tnStyles.nav
}, /*#__PURE__*/React.createElement("a", {
  style: tnStyles.link
}, "Product ", /*#__PURE__*/React.createElement("span", {
  style: tnStyles.caret
}, "\u25BE")), /*#__PURE__*/React.createElement("a", {
  style: tnStyles.link
}, "Solutions ", /*#__PURE__*/React.createElement("span", {
  style: tnStyles.caret
}, "\u25BE")), /*#__PURE__*/React.createElement("a", {
  style: tnStyles.link
}, "Enterprise"), /*#__PURE__*/React.createElement("a", {
  style: tnStyles.link
}, "Resources ", /*#__PURE__*/React.createElement("span", {
  style: tnStyles.caret
}, "\u25BE")), /*#__PURE__*/React.createElement("a", {
  style: tnStyles.link
}, "Pricing"))), /*#__PURE__*/React.createElement("div", {
  style: tnStyles.right
}, /*#__PURE__*/React.createElement("a", {
  style: tnStyles.link
}, "Sign in"), /*#__PURE__*/React.createElement("button", {
  style: tnStyles.btnSecondary
}, "Talk to sales"), /*#__PURE__*/React.createElement("button", {
  style: tnStyles.btnPrimary
}, "Try Slack free"))));
const tnStyles = {
  bar: {
    background: '#fff',
    borderBottom: '1px solid rgba(29,28,29,0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 10
  },
  inner: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '14px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: 28
  },
  word: {
    fontFamily: 'Lato',
    fontSize: 26,
    fontWeight: 900,
    color: '#1D1C1D',
    letterSpacing: '-0.03em',
    marginLeft: -6
  },
  nav: {
    display: 'flex',
    gap: 22,
    marginLeft: 12
  },
  link: {
    color: '#1D1C1D',
    fontWeight: 700,
    fontSize: 14,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 3
  },
  caret: {
    fontSize: 9,
    opacity: 0.6
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 14
  },
  btnSecondary: {
    border: '1.5px solid #1D1C1D',
    background: 'transparent',
    color: '#1D1C1D',
    fontWeight: 900,
    padding: '8px 14px',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 14
  },
  btnPrimary: {
    background: '#4A154B',
    color: '#fff',
    border: 'none',
    fontWeight: 900,
    padding: '10px 16px',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 14
  }
};
window.TopNav = TopNav;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/slack-marketing/TopNav.jsx", error: String((e && e.message) || e) }); }

})();
