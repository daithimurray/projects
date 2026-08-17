#!/usr/bin/env python3
"""Generate the authored SVG artwork for the three sites.

No stock photography, no licensing, no generic finance imagery. Each site gets
a graphic language drawn from its own subject:

  Liffey     — engraved cartography of its actual service area: the Royal Canal
               line, contour work, and the towns it names in its copy.
  Alder      — architectural night: building masses, window light, long-exposure
               streaks, in the brand's emerald-on-black.
  Hedgerow   — seasonal landscape: layered fields, a hedgerow line and a low sun,
               with the palette shifting through the four seasons.

Deterministic: same input always produces identical files.

    python3 tools/make-artwork.py
"""
import math
from pathlib import Path

# ---------------------------------------------------------------- helpers

def rnd(seed):
    """Small deterministic PRNG so artwork never changes between runs."""
    s = seed & 0xFFFFFFFF
    while True:
        s = (1103515245 * s + 12345) & 0x7FFFFFFF
        yield s / 0x7FFFFFFF


def smooth(points, closed=False):
    """Catmull-Rom through points -> cubic bezier path data."""
    if len(points) < 2:
        return ""
    p = list(points)
    if closed:
        p = [points[-1]] + points + [points[0], points[1]]
    else:
        p = [points[0]] + points + [points[-1]]
    d = f"M {p[1][0]:.1f} {p[1][1]:.1f}"
    for i in range(1, len(p) - 2):
        p0, p1, p2, p3 = p[i - 1], p[i], p[i + 1], p[i + 2]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += (f" C {c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f}"
              f" {p2[0]:.1f} {p2[1]:.1f}")
    return d + (" Z" if closed else "")


def svg(w, h, body, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
            f'width="{w}" height="{h}" role="img" aria-label="{title}">\n'
            f'{body}\n</svg>\n')


def write(site, name, content):
    p = Path(site) / 'images' / f'{name}.svg'
    p.write_text(content)
    return f"{p}  ({len(content)/1024:.1f} KB)"


# ---------------------------------------------------------------- Liffey: cartography

NAVY, NAVY_DEEP, PAPER, ACCENT = '#1b2d4f', '#13223d', '#f2f4f7', '#2c5282'


def contours(w, h, seed, count=9, opacity=0.16, spread=None):
    """Nested organic contour rings, like an engraved elevation map."""
    g, out = rnd(seed), []
    cx, cy = w * 0.52, h * 0.46
    spread = spread or min(w, h) * 0.085
    for ring in range(count):
        pts, steps = [], 26
        base = spread * (ring + 1.6)
        wob = [next(g) for _ in range(steps)]
        for i in range(steps):
            a = i / steps * math.tau
            r = base * (1 + 0.16 * math.sin(a * 3 + ring) + 0.10 * (wob[i] - 0.5))
            pts.append((cx + math.cos(a) * r * 1.28, cy + math.sin(a) * r * 0.82))
        op = opacity * (1 - ring / (count + 3))
        out.append(f'<path d="{smooth(pts, True)}" fill="none" stroke="{NAVY}" '
                   f'stroke-width="1.1" opacity="{op:.3f}"/>')
    return "\n".join(out)


def graticule(w, h, step, colour, opacity=0.07):
    lines = []
    for x in range(0, w + 1, step):
        lines.append(f'<line x1="{x}" y1="0" x2="{x}" y2="{h}"/>')
    for y in range(0, h + 1, step):
        lines.append(f'<line x1="0" y1="{y}" x2="{w}" y2="{y}"/>')
    return (f'<g stroke="{colour}" stroke-width="0.6" opacity="{opacity}">'
            + "".join(lines) + '</g>')


def canal(w, h, pts, label=None):
    """The confident waterway line: a double stroke, the way maps draw canals."""
    d = smooth(pts)
    out = [f'<path d="{d}" fill="none" stroke="{ACCENT}" stroke-width="7" '
           f'opacity="0.18" stroke-linecap="round"/>',
           f'<path d="{d}" fill="none" stroke="{ACCENT}" stroke-width="2.1" '
           f'stroke-linecap="round"/>']
    return "\n".join(out)


def town(x, y, name, size=13, anchor='start', dx=14):
    return (f'<g><circle cx="{x}" cy="{y}" r="4.2" fill="{NAVY}"/>'
            f'<circle cx="{x}" cy="{y}" r="9" fill="none" stroke="{NAVY}" '
            f'stroke-width="1" opacity="0.4"/>'
            f'<text x="{x + (dx if anchor=="start" else -dx)}" y="{y + size*0.36:.0f}" '
            f'font-family="Georgia, serif" font-size="{size}" fill="{NAVY}" '
            f'letter-spacing="{size*0.11:.1f}" text-anchor="{anchor}">{name}</text></g>')


def liffey_hero(w=1200, h=1500):
    body = f'''  <rect width="{w}" height="{h}" fill="{PAPER}"/>
  {graticule(w, h, 60, NAVY, 0.05)}
  {contours(w, h, 7, count=11, opacity=0.15, spread=88)}
  {canal(w, h, [(-40, 1180), (250, 1080), (520, 980), (700, 800), (820, 560), (900, 300), (1010, 60), (1080, -40)])}
  <g opacity="0.9">
    {town(520, 980, 'MAYNOOTH', 20)}
    {town(820, 560, 'LEIXLIP', 15)}
    {town(250, 1080, 'KILCOCK', 15, 'end')}
    {town(700, 1250, 'CELBRIDGE', 15)}
    {town(300, 700, 'CLANE', 15, 'end')}
  </g>
  <g font-family="system-ui, sans-serif" fill="{NAVY}" opacity="0.55">
    <text x="72" y="{h-96}" font-size="15" letter-spacing="3.4">NORTH KILDARE</text>
    <text x="72" y="{h-64}" font-size="13" letter-spacing="1.6" opacity="0.8">THE ROYAL CANAL &amp; THE TOWNS WE WORK IN</text>
  </g>'''
    return svg(w, h, body, 'Map of North Kildare showing the Royal Canal and the towns Liffey Accountancy serves')


def liffey_band(w=2400, h=900):
    g = rnd(21)
    ridges = []
    for layer in range(4):
        pts, y0 = [], 470 + layer * 105
        for i in range(11):
            x = -100 + i * (w + 200) / 10
            pts.append((x, y0 - 130 * math.sin(i * 0.7 + layer) * (1 - layer * 0.15)
                        - 60 * (next(g) - 0.5)))
        pts += [(w + 100, h + 60), (-100, h + 60)]
        op = 0.09 + layer * 0.05
        ridges.append(f'<path d="{smooth(pts, True)}" fill="{NAVY}" opacity="{op:.2f}"/>')
    body = f'''  <rect width="{w}" height="{h}" fill="{PAPER}"/>
  {graticule(w, h, 80, NAVY, 0.04)}
  {"".join(ridges)}
  {canal(w, h, [(-60, 300), (400, 340), (900, 300), (1400, 250), (1900, 280), (2460, 240)])}
  <g font-family="system-ui, sans-serif" fill="{NAVY}" opacity="0.5" font-size="14" letter-spacing="3">
    <text x="80" y="80">MAYNOOTH · LEIXLIP · CELBRIDGE · KILCOCK · CLANE · STRAFFAN</text>
  </g>'''
    return svg(w, h, body, 'The North Kildare landscape and the Royal Canal')


def liffey_detail(w=1200, h=900):
    """A canal-bridge elevation with its reflection: engraved, balanced, ours."""
    water = 600
    arches, reflect = [], []
    spans = [(240, 128), (600, 168), (960, 128)]
    for cx, r in spans:
        springs = water - 96
        top = springs - r
        outer = (f'M {cx-r} {water-8} L {cx-r} {springs} '
                 f'A {r} {r} 0 0 1 {cx+r} {springs} L {cx+r} {water-8}')
        arches.append(f'<path d="{outer}" fill="{PAPER}" stroke="{NAVY}" '
                      f'stroke-width="2.2" opacity="0.75"/>')
        for k in range(1, 6):
            rr = r - k * 15
            if rr < 24:
                break
            arches.append(
                f'<path d="M {cx-rr} {water-8} L {cx-rr} {springs} '
                f'A {rr} {rr} 0 0 1 {cx+rr} {springs} L {cx+rr} {water-8}" '
                f'fill="none" stroke="{NAVY}" stroke-width="0.9" '
                f'opacity="{0.30 - k*0.045:.2f}"/>')
        reflect.append(
            f'<path d="M {cx-r} {water+8} L {cx-r} {water + (water-springs)} '
            f'A {r} {r} 0 0 0 {cx+r} {water + (water-springs)} L {cx+r} {water+8}" '
            f'fill="none" stroke="{ACCENT}" stroke-width="1.6" opacity="0.22"/>')
    # parapet and coping courses
    deck = "".join(
        f'<line x1="60" y1="{y}" x2="{w-60}" y2="{y}" stroke="{NAVY}" '
        f'stroke-width="{1.8 if y in (352, 396) else 0.8}" opacity="{0.5 if y in (352,396) else 0.2}"/>'
        for y in (352, 372, 396))
    voussoirs = []
    for cx, r in spans:
        for k in range(9):
            a = math.pi + k * math.pi / 8
            x1, y1 = cx + math.cos(a) * r, (water - 96) + math.sin(a) * r
            x2, y2 = cx + math.cos(a) * (r + 26), (water - 96) + math.sin(a) * (r + 26)
            voussoirs.append(f'<line x1="{x1:.0f}" y1="{y1:.0f}" x2="{x2:.0f}" y2="{y2:.0f}" '
                             f'stroke="{NAVY}" stroke-width="0.9" opacity="0.28"/>')
    ripples = "".join(
        f'<line x1="{80 + (i%3)*40}" y1="{water + 30 + i*22}" x2="{w - 80 - (i%4)*60}" '
        f'y2="{water + 30 + i*22}" stroke="{ACCENT}" stroke-width="1" '
        f'opacity="{0.16 - i*0.012:.3f}"/>' for i in range(11))
    body = f'''  <rect width="{w}" height="{h}" fill="{PAPER}"/>
  {graticule(w, h, 50, NAVY, 0.045)}
  {deck}
  {"".join(voussoirs)}
  {"".join(arches)}
  <line x1="0" y1="{water}" x2="{w}" y2="{water}" stroke="{NAVY}" stroke-width="2" opacity="0.55"/>
  {"".join(reflect)}
  {ripples}
  <g font-family="system-ui, sans-serif" fill="{NAVY}" opacity="0.45" font-size="13" letter-spacing="2.6">
    <text x="64" y="{h-40}">ROYAL CANAL BRIDGE · ELEVATION</text>
  </g>'''
    return svg(w, h, body, 'Line elevation of a Royal Canal bridge and its reflection')


# ---------------------------------------------------------------- Alder: architectural night

BLACK, EMERALD, RAISED = '#0a0a0a', '#34d399', '#101512'


def alder_atmosphere(w=2400, h=1000):
    g = rnd(5)
    towers, lights = [], []
    x = -60
    while x < w + 60:
        bw = 90 + next(g) * 150
        bh = 260 + next(g) * 560
        top = h - bh
        shade = 0.09 + next(g) * 0.10
        towers.append(f'<rect x="{x:.0f}" y="{top:.0f}" width="{bw:.0f}" height="{bh:.0f}" '
                      f'fill="#ffffff" opacity="{shade:.3f}"/>')
        towers.append(f'<line x1="{x:.0f}" y1="{top:.0f}" x2="{x+bw:.0f}" y2="{top:.0f}" '
                      f'stroke="{EMERALD}" stroke-width="1" opacity="0.38"/>')
        # window light: sparse horizontal ticks
        yy = top + 26
        while yy < h - 20:
            if next(g) > 0.45:
                lw = bw * (0.16 + next(g) * 0.3)
                lx = x + 12 + next(g) * (bw - lw - 20)
                lights.append(f'<rect x="{lx:.0f}" y="{yy:.0f}" width="{lw:.0f}" height="2.4" '
                              f'fill="{EMERALD}" opacity="{0.34 + next(g)*0.5:.2f}"/>')
            yy += 22
        x += bw + 12 + next(g) * 26
    # long-exposure streaks across the foreground water
    streaks = []
    for i in range(16):
        y = h * 0.74 + i * 16
        op = 0.10 + (i % 4) * 0.04
        streaks.append(f'<line x1="{-40 + next(g)*300:.0f}" y1="{y:.0f}" '
                       f'x2="{w + 40:.0f}" y2="{y + 6:.0f}" stroke="{EMERALD}" '
                       f'stroke-width="{0.7 + next(g):.1f}" opacity="{op:.3f}"/>')
    body = f'''  <defs>
    <radialGradient id="ag" cx="30%" cy="88%" r="72%">
      <stop offset="0%" stop-color="{EMERALD}" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="{EMERALD}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="af" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="{BLACK}" stop-opacity="0"/>
      <stop offset="100%" stop-color="{BLACK}" stop-opacity="0.65"/>
    </linearGradient>
  </defs>
  <rect width="{w}" height="{h}" fill="{BLACK}"/>
  <rect width="{w}" height="{h}" fill="url(#ag)"/>
  {"".join(towers)}
  {"".join(lights)}
  <rect y="{h*0.72:.0f}" width="{w}" height="{h*0.28:.0f}" fill="{BLACK}" opacity="0.40"/>
  {"".join(streaks)}
  <rect width="{w}" height="{h}" fill="url(#af)"/>'''
    return svg(w, h, body, 'Architectural night study of a city skyline')


def alder_detail(w=1600, h=1200):
    g = rnd(11)
    sheets = []
    for i, (x, y, sw, sh, rot) in enumerate([
            (240, 620, 900, 420, -6), (420, 500, 820, 400, 4), (150, 780, 700, 340, 11)]):
        op = 0.10 + i * 0.05
        sheets.append(f'<g transform="rotate({rot} {x+sw/2:.0f} {y+sh/2:.0f})">'
                      f'<rect x="{x}" y="{y}" width="{sw}" height="{sh}" fill="#ffffff" '
                      f'opacity="{op:.3f}"/>'
                      f'<rect x="{x}" y="{y}" width="{sw}" height="{sh}" fill="none" '
                      f'stroke="{EMERALD}" stroke-width="1" opacity="0.30"/>'
                      + "".join(
                          f'<line x1="{x+40}" y1="{y+50+k*34}" x2="{x+sw-60-next(g)*220:.0f}" '
                          f'y2="{y+50+k*34}" stroke="#ffffff" stroke-width="2" opacity="0.13"/>'
                          for k in range(int((sh-90)//34)))
                      + '</g>')
    body = f'''  <defs>
    <radialGradient id="dg" cx="62%" cy="26%" r="66%">
      <stop offset="0%" stop-color="{EMERALD}" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="{EMERALD}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="{w}" height="{h}" fill="{RAISED}"/>
  <rect width="{w}" height="{h}" fill="url(#dg)"/>
  {"".join(sheets)}
  <line x1="0" y1="470" x2="{w}" y2="440" stroke="{EMERALD}" stroke-width="1.4" opacity="0.22"/>
  <rect width="{w}" height="{h}" fill="{BLACK}" opacity="0.18"/>'''
    return svg(w, h, body, 'Low-light study of documents on a table')


# ---------------------------------------------------------------- Hedgerow: seasonal landscape

CREAM, OLIVE, OLIVE_DEEP, SAGE = '#f5f2e9', '#3d4a2c', '#2e3a1f', '#8fa377'

SEASONS = {
    'spring': dict(sky='#eef0e4', sun='#c9d6b4', fields=['#cfd8bd', '#b9c8a3', '#9fb489'], seed=31),
    'summer': dict(sky='#f3eedb', sun='#e2cf95', fields=['#c8cf9c', '#a9bb83', '#8aa46b'], seed=47),
    'autumn': dict(sky='#f4ece0', sun='#d9b989', fields=['#cdbf95', '#b8a878', '#94875c'], seed=59),
    'winter': dict(sky='#eceee9', sun='#cfd6d2', fields=['#d6dad0', '#c0c7bb', '#a3ada0'], seed=71),
}


def hedge_line(w, y, seed, amp=16, step=26, colour=OLIVE, opacity=0.5, sw=2.2):
    """The hedgerow itself: an irregular scrubby line, drawn not photographed."""
    g, pts = rnd(seed), []
    x = -20
    while x < w + 20:
        pts.append((x, y - next(g) * amp))
        x += step
    twigs = []
    for (px, py) in pts[::2]:
        h1 = 8 + next(g) * 16
        twigs.append(f'<line x1="{px:.0f}" y1="{py:.0f}" x2="{px + (next(g)-0.5)*10:.0f}" '
                     f'y2="{py-h1:.0f}" stroke="{colour}" stroke-width="1" opacity="{opacity*0.7:.2f}"/>')
    return (f'<path d="{smooth(pts)}" fill="none" stroke="{colour}" stroke-width="{sw}" '
            f'opacity="{opacity}"/>' + "".join(twigs))


def field_bands(w, h, cfg, top=0.42):
    g, out = rnd(cfg['seed']), []
    n = len(cfg['fields'])
    for i, col in enumerate(cfg['fields']):
        y0 = h * top + (h * (1 - top)) * (i / n)
        pts = []
        for k in range(9):
            x = -40 + k * (w + 80) / 8
            pts.append((x, y0 + math.sin(k * 0.9 + i * 1.7) * h * 0.035
                        + (next(g) - 0.5) * h * 0.02))
        pts += [(w + 40, h + 40), (-40, h + 40)]
        out.append(f'<path d="{smooth(pts, True)}" fill="{col}"/>')
    return "".join(out)


def hedgerow_season(name, w=900, h=900):
    cfg = SEASONS[name]
    body = f'''  <rect width="{w}" height="{h}" fill="{cfg['sky']}"/>
  <circle cx="{w*0.70:.0f}" cy="{h*0.26:.0f}" r="{w*0.115:.0f}" fill="{cfg['sun']}" opacity="0.75"/>
  {field_bands(w, h, cfg, top=0.44)}
  {hedge_line(w, h*0.47, cfg['seed']+3, amp=14, step=22, opacity=0.42, sw=1.8)}
  {hedge_line(w, h*0.68, cfg['seed']+9, amp=20, step=30, opacity=0.55, sw=2.4)}'''
    return svg(w, h, body, f'{name.capitalize()} in the fields')


def hedgerow_hero(w=1400, h=1750):
    cfg = dict(sky='#f0eee1', sun='#dfd7b4',
               fields=['#d4d9bd', '#bfc9a2', '#a6b78b', '#8ea172'], seed=13)
    body = f'''  <rect width="{w}" height="{h}" fill="{cfg['sky']}"/>
  <circle cx="{w*0.68:.0f}" cy="{h*0.19:.0f}" r="{w*0.10:.0f}" fill="{cfg['sun']}" opacity="0.7"/>
  {field_bands(w, h, cfg, top=0.34)}
  {hedge_line(w, h*0.37, 17, amp=18, step=26, opacity=0.35, sw=1.6)}
  {hedge_line(w, h*0.53, 23, amp=26, step=32, opacity=0.48, sw=2.2)}
  {hedge_line(w, h*0.76, 29, amp=34, step=38, opacity=0.62, sw=3)}
  <g font-family="system-ui, sans-serif" fill="{OLIVE_DEEP}" opacity="0.45" font-size="20" letter-spacing="4">
    <text x="{w*0.06:.0f}" y="{h-56}">CO. KILKENNY</text>
  </g>'''
    return svg(w, h, body, 'Layered fields and hedgerows in Co. Kilkenny')


def hedgerow_botanical(w=1200, h=900):
    """Seed heads at scale: the brand's botanical mark drawn as an engraving."""
    g = rnd(37)
    ground = h - 70
    stems = []
    # heights keep every seed head inside the frame (ground - hgt >= 150)
    spec = [(175, 545, -26, 0.86), (415, 655, 14, 1.0), (650, 590, -8, 0.94),
            (890, 680, 26, 1.04), (1075, 530, -18, 0.82)]
    for i, (bx, hgt, lean, sc) in enumerate(spec):
        top = ground - hgt
        d = smooth([(bx, ground), (bx + lean * 0.35, ground - hgt * 0.5), (bx + lean, top)])
        stems.append(f'<path d="{d}" fill="none" stroke="{OLIVE}" stroke-width="{2.6*sc:.1f}" '
                     f'opacity="0.62"/>')
        hx, hy = bx + lean, top
        rays = 19
        for k in range(rays):
            a = -math.pi / 2 + (k - (rays - 1) / 2) * 0.155
            L = (74 + next(g) * 46) * sc
            ex, ey = hx + math.cos(a) * L * 0.82, hy + math.sin(a) * L
            stems.append(f'<line x1="{hx:.0f}" y1="{hy:.0f}" x2="{ex:.0f}" y2="{ey:.0f}" '
                         f'stroke="{OLIVE}" stroke-width="1.2" opacity="0.42"/>')
            stems.append(f'<circle cx="{ex:.0f}" cy="{ey:.0f}" r="{4.2*sc:.1f}" fill="{OLIVE}" '
                         f'opacity="0.55"/>')
        for k in (0.28, 0.5, 0.72):
            ly = ground - hgt * k
            lx = bx + lean * k
            side = 1 if (i + int(k * 10)) % 2 else -1
            LL = (120 + next(g) * 70) * sc
            stems.append(
                f'<path d="M {lx:.0f} {ly:.0f} Q {lx + side*LL*0.55:.0f} {ly-54:.0f} '
                f'{lx + side*LL:.0f} {ly-4:.0f} Q {lx + side*LL*0.5:.0f} {ly+30:.0f} '
                f'{lx:.0f} {ly:.0f} Z" fill="{SAGE}" opacity="0.34"/>')
    body = f'''  <rect width="{w}" height="{h}" fill="{CREAM}"/>
  <line x1="0" y1="{ground}" x2="{w}" y2="{ground}" stroke="{OLIVE}" stroke-width="1.8" opacity="0.38"/>
  {hedge_line(w, ground - 6, 61, amp=10, step=20, opacity=0.30, sw=1.4)}
  {"".join(stems)}
  <g font-family="Georgia, serif" font-style="italic" fill="{OLIVE_DEEP}" opacity="0.42">
    <text x="56" y="{h-24}" font-size="28">Hedgerow</text>
  </g>'''
    return svg(w, h, body, 'Engraved study of hedgerow seed heads')


def hedgerow_place(w=1800, h=1200):
    g = rnd(43)
    # river through a valley, with a village roofline
    hills = []
    for i, (y0, col, op) in enumerate([(430, OLIVE, 0.10), (520, OLIVE, 0.14), (610, OLIVE, 0.20)]):
        pts = []
        for k in range(10):
            x = -60 + k * (w + 120) / 9
            pts.append((x, y0 - 90 * math.sin(k * 0.8 + i) - (next(g) - 0.5) * 50))
        pts += [(w + 60, h + 60), (-60, h + 60)]
        hills.append(f'<path d="{smooth(pts, True)}" fill="{col}" opacity="{op}"/>')
    roofs = []
    x = 520
    while x < 1320:
        bw2 = 60 + next(g) * 70
        bh2 = 50 + next(g) * 60
        base = 830
        roofs.append(f'<path d="M {x:.0f} {base} L {x:.0f} {base-bh2:.0f} '
                     f'L {x+bw2/2:.0f} {base-bh2-30:.0f} L {x+bw2:.0f} {base-bh2:.0f} '
                     f'L {x+bw2:.0f} {base} Z" fill="{OLIVE}" opacity="0.42"/>')
        x += bw2 + 16
    river = smooth([(820, 830), (900, 900), (840, 990), (960, 1080), (880, 1180), (1000, 1240)])
    body = f'''  <rect width="{w}" height="{h}" fill="#eeeade"/>
  {"".join(hills)}
  <line x1="0" y1="830" x2="{w}" y2="830" stroke="{OLIVE}" stroke-width="1.4" opacity="0.3"/>
  {"".join(roofs)}
  <path d="{river}" fill="none" stroke="#b9c6cc" stroke-width="26" opacity="0.7" stroke-linecap="round"/>
  <path d="{river}" fill="none" stroke="#ffffff" stroke-width="6" opacity="0.4" stroke-linecap="round"/>
  {hedge_line(w, 880, 51, amp=18, step=30, opacity=0.4, sw=2)}
  <g font-family="system-ui, sans-serif" fill="{OLIVE_DEEP}" opacity="0.45" font-size="17" letter-spacing="3.6">
    <text x="72" y="120">THOMASTOWN · RIVER NORE</text>
  </g>'''
    return svg(w, h, body, 'Thomastown and the River Nore')


# ---------------------------------------------------------------- run

def main():
    made = []
    made.append(write('liffey-accountancy', 'hero-maynooth', liffey_hero()))
    made.append(write('liffey-accountancy', 'local-north-kildare', liffey_band()))
    made.append(write('liffey-accountancy', 'office-detail', liffey_detail()))

    made.append(write('alder-and-frost', 'atmosphere-city', alder_atmosphere()))
    made.append(write('alder-and-frost', 'boardroom-detail', alder_detail()))

    made.append(write('hedgerow-accounting', 'hero-field', hedgerow_hero()))
    made.append(write('hedgerow-accounting', 'hero-hands', hedgerow_botanical()))
    for s in SEASONS:
        made.append(write('hedgerow-accounting', f'season-{s}', hedgerow_season(s)))
    made.append(write('hedgerow-accounting', 'about-thomastown', hedgerow_place()))

    for m in made:
        print('  ' + m)
    print(f"\n{len(made)} artwork files written.")
    print("Liffey's founder-portrait and team-group plates are left untouched:")
    print("they are reserved for real photographs.")


if __name__ == '__main__':
    raise SystemExit(main())
