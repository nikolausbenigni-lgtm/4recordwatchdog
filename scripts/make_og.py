"""Generates 1200x630 social share images (one per guide, plus a default).
Run from the project root:  python3 scripts/make_og.py
Needs Python Pillow and node (to read the post list).  Output: public/images/og/*.jpg
"""
import json, os, subprocess
from PIL import Image, ImageDraw, ImageFont
ROOT = os.path.join(os.path.dirname(__file__), '..')
OUT = os.path.join(ROOT, 'public', 'images', 'og'); os.makedirs(OUT, exist_ok=True)
posts = json.loads(subprocess.check_output(['node', '-e', "import('./src/data/posts.js').then(m=>console.log(JSON.stringify({posts:m.posts.map(p=>({slug:p.slug,title:p.title,category:p.category})),cats:m.CATEGORIES})))"], cwd=ROOT))
catname = {c['id']: c['name'] for c in posts['cats']}
COL = {'business': ('#0f2a6b', '#3b6fe0'), 'courts': ('#3b1d6e', '#8a5ce0'), 'property': ('#0b5a49', '#22b08a'), 'safety': ('#a3330b', '#ff7a3d'), 'states': ('#0a3d62', '#2b86c5'), 'default': ('#071638', '#ff6f36')}
BOLD = next(p for p in ['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf'] if os.path.exists(p))
hexrgb = lambda h: tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))

def make(slug, title, cat):
    c1, c2 = map(hexrgb, COL[cat]); W, H = 1200, 630
    im = Image.new('RGB', (W, H)); d = ImageDraw.Draw(im)
    for x in range(W):
        for y in range(0, H, 3):
            t = min(1, max(0, (x / W) * 0.75 + (y / H) * 0.25))
            d.rectangle([x, y, x, y + 2], fill=tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3)))
    ov = Image.new('RGBA', (W, H), (0, 0, 0, 0)); od = ImageDraw.Draw(ov)
    od.ellipse([820, -160, 1320, 340], fill=(255, 255, 255, 30)); od.ellipse([940, 260, 1300, 620], fill=(255, 255, 255, 22))
    im = Image.alpha_composite(im.convert('RGBA'), ov).convert('RGB'); d = ImageDraw.Draw(im)
    label = catname.get(cat, 'Public Records Guides')
    f = ImageFont.truetype(BOLD, 28); tw = d.textlength(label.upper(), font=f)
    d.rounded_rectangle([70, 64, 70 + tw + 44, 116], radius=26, fill='#ffffff'); d.text((92, 74), label.upper(), font=f, fill=COL[cat][0])
    size = 76
    while True:
        f = ImageFont.truetype(BOLD, size); words, lines, cur = title.split(), [], ''
        for w in words:
            t = (cur + ' ' + w).strip()
            if d.textlength(t, font=f) <= 1000: cur = t
            else: lines.append(cur); cur = w
        lines.append(cur)
        if len(lines) <= 4 and size * 1.22 * len(lines) <= 340: break
        size -= 4
    y = 160
    for l in lines: d.text((70, y), l, font=f, fill='#ffffff'); y += int(size * 1.22)
    d.text((70, 540), 'RecordWatchdog', font=ImageFont.truetype(BOLD, 38), fill='#ffffff')
    f2 = ImageFont.truetype(BOLD, 28); t = 'recordwatchdog.com'; d.text((W - 70 - d.textlength(t, font=f2), 548), t, font=f2, fill=(255, 255, 255))
    im.save(os.path.join(OUT, slug + '.jpg'), quality=84, optimize=True)

make('default', 'Public Records, Explained Clearly.', 'default')
for p in posts['posts']: make(p['slug'], p['title'], p['category'])
print(len(posts['posts']) + 1, 'images ->', os.path.abspath(OUT))
