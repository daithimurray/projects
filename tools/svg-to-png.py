"""Render an SVG to an exact-size PNG with headless Chromium.

Chromium's headless screenshot canvas is the window size, but the layout
viewport is ~87px shorter, so the page is rendered short and the rest of the
canvas is painted with the html background. Render taller, then crop.
"""
import struct, subprocess, sys, zlib
from pathlib import Path

CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
CHROME_OFFSET = 120  # generous: cropped away afterwards


def render(svg_path, out_path, w, h, tmp):
    wrapper = Path(tmp) / 'wrap.html'
    wrapper.write_text(
        '<!doctype html><style>html,body{margin:0;padding:0;background:#14171c}'
        'img{display:block}</style>'
        f'<img src="file://{Path(svg_path).resolve()}" width="{w}" height="{h}">')
    shot = Path(tmp) / 'shot.png'
    subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--no-sandbox',
                    '--hide-scrollbars', f'--window-size={w},{h + CHROME_OFFSET}',
                    f'--screenshot={shot}', f'file://{wrapper}'],
                   check=True, capture_output=True)
    crop(shot, out_path, h)


def crop(src, dst, keep_rows):
    d = src.read_bytes()
    i, idat, w, h, ct, bd = 8, b'', None, None, None, None
    while i < len(d):
        ln = struct.unpack('>I', d[i:i + 4])[0]
        typ, data = d[i + 4:i + 8], d[i + 8:i + 8 + ln]
        if typ == b'IHDR':
            w, h, bd, ct = struct.unpack('>IIBB', data[:10])
        elif typ == b'IDAT':
            idat += data
        i += 12 + ln
    bpp = {0: 1, 2: 3, 4: 2, 6: 4}[ct] * (bd // 8)
    raw, stride, pos = zlib.decompress(idat), w * bpp, 0
    prev, rows = bytearray(stride), []
    for _ in range(h):
        f = raw[pos]; pos += 1
        line = bytearray(raw[pos:pos + stride]); pos += stride
        for x in range(stride):
            a = line[x - bpp] if x >= bpp else 0
            b = prev[x]
            c = prev[x - bpp] if x >= bpp else 0
            if f == 1: line[x] = (line[x] + a) & 255
            elif f == 2: line[x] = (line[x] + b) & 255
            elif f == 3: line[x] = (line[x] + (a + b) // 2) & 255
            elif f == 4:
                p = a + b - c
                pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
                line[x] = (line[x] + (a if pa <= pb and pa <= pc else b if pb <= pc else c)) & 255
        rows.append(bytes(line)); prev = line
    body = b''.join(b'\x00' + r for r in rows[:keep_rows])

    def chunk(t, payload):
        return (struct.pack('>I', len(payload)) + t + payload
                + struct.pack('>I', zlib.crc32(t + payload) & 0xFFFFFFFF))

    dst.write_bytes(b'\x89PNG\r\n\x1a\n'
                    + chunk(b'IHDR', struct.pack('>IIBBBBB', w, keep_rows, bd, ct, 0, 0, 0))
                    + chunk(b'IDAT', zlib.compress(body, 9))
                    + chunk(b'IEND', b''))


if __name__ == '__main__':
    svg, out, w, h, tmp = sys.argv[1], Path(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4]), sys.argv[5]
    render(svg, out, w, h, tmp)
    print(f'{out} written at {w}x{h}')
