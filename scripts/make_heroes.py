"""Generates an illustrated hero image and a mid-article image for every guide,
plus src/data/blogImages.js (alt text and tip captions).
Run from the project root:  python3 scripts/make_heroes.py
To use a real photo instead: put <slug>.jpg in public/images/hero/ (1200x420) or
public/images/mid/ (1200x240). The build prefers a .jpg over the generated .svg.
"""
import json, os, subprocess
ROOT = os.path.join(os.path.dirname(__file__), '..')
HERO = os.path.join(ROOT, 'public', 'images', 'hero'); MID = os.path.join(ROOT, 'public', 'images', 'mid')
os.makedirs(HERO, exist_ok=True); os.makedirs(MID, exist_ok=True)
cats = json.loads(subprocess.check_output(['node', '-e', "import('./src/data/posts.js').then(m=>console.log(JSON.stringify(m.posts.map(p=>({slug:p.slug,category:p.category}))))))"], cwd=ROOT)) if False else None
posts = json.loads(subprocess.check_output(['node', '-e', "import('./src/data/posts.js').then(m=>console.log(JSON.stringify(m.posts.map(p=>({slug:p.slug,category:p.category})))))"], cwd=ROOT))
catof = {p['slug']: p['category'] for p in posts}

COL = {'business': ('#0f2a6b', '#3b6fe0'), 'courts': ('#3b1d6e', '#8a5ce0'), 'property': ('#0b5a49', '#22b08a'), 'safety': ('#a3330b', '#ff7a3d'), 'states': ('#0a3d62', '#2b86c5')}
ACC = '#ffb347'   # warm accent that reads on every gradient
W = '#ffffff'

def esc(t): return t.replace('&', '&amp;')
def g(x, y, s, body, op=1): return f'<g transform="translate({x},{y}) scale({s})" opacity="{op}">{body}</g>'
def R(x, y, w, h, fill=W, rx=0, extra=''): return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" {extra}/>'
def P(d, fill=W, extra=''): return f'<path d="{d}" fill="{fill}" {extra}/>'
def C(cx, cy, r, fill=W, extra=''): return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" {extra}/>'
def L(x1, y1, x2, y2, col=W, sw=8): return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{col}" stroke-width="{sw}" stroke-linecap="round"/>'
def poly(pts, fill=W): return f'<polygon points="{pts}" fill="{fill}"/>'

# motifs are drawn in a 300 x 240 box. k = colour used for cut-outs (matches the background)
def courthouse(k): return (poly('150,8 276,72 24,72') + C(150, 46, 11, ACC) + R(24, 72, 252, 14, W, 3) +
    ''.join(R(46 + i * 46, 92, 24, 96, W, 5) for i in range(5)) + R(20, 188, 260, 12, W, 3) + R(8, 200, 284, 14, W, 3) + R(0, 214, 300, 16, W, 3))
def documents(k): return (R(40, 34, 150, 186, W, 12, 'transform="rotate(-7 115 127)" opacity="0.55"') + R(70, 20, 150, 196, W, 12) +
    ''.join(R(90, 52 + i * 26, 110 - (i % 2) * 30, 9, k, 4, 'opacity="0.55"') for i in range(5)) +
    C(206, 150, 46, 'rgba(255,255,255,0.18)', f'stroke="{ACC}" stroke-width="13"') + L(240, 184, 284, 228, ACC, 15))
def house(k): return (poly('150,14 288,116 12,116') + R(44, 116, 212, 108, W, 4) + R(124, 150, 52, 74, ACC, 5) + R(64, 138, 42, 36, k, 4, 'opacity="0.55"') + R(194, 138, 42, 36, k, 4, 'opacity="0.55"') + R(206, 36, 26, 56, W, 3))
def building(k): return (R(76, 14, 148, 212, W, 8) + ''.join(R(94 + c * 40, 36 + r * 36, 24, 20, k, 4, 'opacity="0.5"') for c in range(3) for r in range(4)) + R(132, 184, 36, 42, ACC, 4) + R(18, 104, 62, 122, W, 8, 'opacity="0.7"') + R(220, 66, 62, 160, W, 8, 'opacity="0.7"') + R(0, 226, 300, 10, W, 4))
def scales(k): return (C(150, 32, 15, ACC) + R(145, 40, 10, 164, W, 4) + R(96, 202, 108, 16, W, 6) + R(38, 56, 224, 9, W, 4) +
    L(60, 62, 22, 134, W, 4) + L(60, 62, 102, 134, W, 4) + L(240, 62, 198, 134, W, 4) + L(240, 62, 278, 134, W, 4) +
    P('M14,134 H110 Q62,184 14,134 Z') + P('M190,134 H286 Q238,184 190,134 Z'))
def folders(k): return (R(60, 40, 220, 150, W, 12, 'opacity="0.5"') + R(34, 60, 232, 160, W, 12) + R(34, 44, 96, 30, W, 9) + R(54, 100, 150, 9, k, 4, 'opacity="0.5"') + R(54, 124, 190, 9, k, 4, 'opacity="0.5"') + R(54, 148, 120, 9, k, 4, 'opacity="0.5"') + C(236, 184, 20, ACC))
def shield(k): return (P('M150,12 L262,56 V128 C262,182 212,216 150,232 C88,216 38,182 38,128 V56 Z') + f'<polyline points="98,128 136,166 206,92" fill="none" stroke="{ACC}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>')
def lock(k): return (f'<path d="M104,108 V78 a46,46 0 0 1 92,0 V108" fill="none" stroke="{W}" stroke-width="18" stroke-linecap="round"/>' + R(66, 104, 168, 122, W, 20) + C(150, 156, 16, k) + R(143, 160, 14, 38, k, 6))
def envelope(k): return (R(26, 46, 248, 168, W, 16) + f'<polyline points="30,62 150,152 270,62" fill="none" stroke="{k}" stroke-width="10" stroke-linejoin="round" opacity="0.6"/>' + R(206, 62, 48, 36, ACC, 6, 'opacity="0.95"') + R(48, 168, 90, 9, k, 4, 'opacity="0.45"') + R(48, 186, 60, 9, k, 4, 'opacity="0.45"'))
def calendar(k): return (R(38, 38, 224, 186, W, 18) + R(38, 38, 224, 52, ACC, 18) + R(38, 70, 224, 20, ACC) + R(80, 20, 14, 34, W, 7) + R(206, 20, 14, 34, W, 7) +
    ''.join(R(62 + c * 46, 108 + r * 38, 30, 24, k, 6, 'opacity="0.35"') for c in range(4) for r in range(3)) + f'<polyline points="196,184 210,198 236,170" fill="none" stroke="{ACC}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>')
def laptop(k): return (R(44, 30, 212, 140, W, 12) + R(58, 44, 184, 112, k, 6, 'opacity="0.35"') + R(72, 58, 120, 18, W, 9, 'opacity="0.9"') + C(214, 67, 10, ACC) +
    ''.join(R(72, 92 + i * 20, 156 - i * 24, 9, W, 4, 'opacity="0.8"') for i in range(3)) + poly('14,176 286,176 262,204 38,204'))
def clipboard(k): return (R(66, 26, 168, 206, W, 16) + R(112, 14, 76, 30, ACC, 9) + ''.join(R(110, 70 + i * 48, 100, 9, k, 4, 'opacity="0.5"') + f'<polyline points="86,{74 + i * 48} 94,{83 + i * 48} 106,{66 + i * 48}" fill="none" stroke="{ACC}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>' for i in range(4)))
def hardhat(k): return (P('M54,156 A96,96 0 0 1 246,156 Z') + R(132, 56, 36, 100, ACC, 8) + R(30, 154, 240, 24, W, 12) + R(188, 184, 94, 56, W, 9) + R(200, 198, 40, 8, k, 3, 'opacity="0.5"') + R(200, 214, 64, 8, k, 3, 'opacity="0.5"') + C(36, 200, 6, W, 'opacity="0"'))
def coins(k): return (''.join(f'<ellipse cx="{x}" cy="{y}" rx="52" ry="16" fill="{W}"/><rect x="{x - 52}" y="{y}" width="104" height="18" fill="{W}" opacity="0.8"/><ellipse cx="{x}" cy="{y + 18}" rx="52" ry="16" fill="{W}" opacity="0.8"/>' for x, y in ((92, 176), (92, 148), (92, 120), (200, 190), (200, 162))) + R(150, 40, 130, 100, W, 10, 'opacity="0.85"') + R(166, 60, 98, 8, k, 4, 'opacity="0.45"') + R(166, 80, 70, 8, k, 4, 'opacity="0.45"') + C(246, 118, 14, ACC))
def certificate(k): return (R(24, 36, 252, 172, W, 12) + R(46, 62, 150, 10, k, 4, 'opacity="0.5"') + R(46, 86, 190, 8, k, 4, 'opacity="0.35"') + R(46, 106, 170, 8, k, 4, 'opacity="0.35"') + poly('196,170 176,226 202,214 226,230 224,170', ACC) + C(210, 156, 32, ACC) + C(210, 156, 20, W, 'opacity="0.5"'))
def idcard(k): return (R(24, 66, 196, 140, W, 14) + C(76, 118, 24, k, 'opacity="0.55"') + P('M40,196 C40,160 112,160 112,196 Z', k, 'opacity="0.55"') + R(128, 96, 76, 9, k, 4, 'opacity="0.5"') + R(128, 118, 56, 9, k, 4, 'opacity="0.5"') + R(128, 140, 66, 9, k, 4, 'opacity="0.5"') + P('M244,50 C216,50 200,72 200,92 C200,122 244,170 244,170 C244,170 288,122 288,92 C288,72 272,50 244,50 Z', ACC) + C(244, 92, 14, k, 'opacity="0.7"'))
def magnifier(k): return (C(124, 108, 74, 'rgba(255,255,255,0.16)', f'stroke="{W}" stroke-width="16"') + L(178, 164, 252, 224, W, 22) + R(90, 76, 70, 8, W, 4, 'opacity="0.7"') + R(90, 98, 50, 8, W, 4, 'opacity="0.7"') + R(90, 120, 62, 8, W, 4, 'opacity="0.7"') + C(124, 108, 6, ACC))
def mapgrid(k, label=''):
    tiles = ''.join(R(30 + c * 58, 84 + r * 52, 52, 46, W, 8, f'opacity="{0.35 + ((c * 3 + r * 5) % 4) * 0.15:.2f}"') for c in range(4) for r in range(3))
    pin = P('M214,20 C184,20 166,44 166,66 C166,98 214,148 214,148 C214,148 262,98 262,66 C262,44 244,20 214,20 Z', ACC) + C(214, 66, 15, k, 'opacity="0.7"')
    return tiles + pin
MOTIFS = {'courthouse': (courthouse, 'a courthouse with columns'), 'documents': (documents, 'documents with a magnifying glass'), 'house': (house, 'a house'), 'building': (building, 'an office building'),
          'scales': (scales, 'the scales of justice'), 'folders': (folders, 'file folders'), 'shield': (shield, 'a shield with a check mark'), 'lock': (lock, 'a padlock'), 'envelope': (envelope, 'a sealed envelope'),
          'calendar': (calendar, 'a calendar with check marks'), 'laptop': (laptop, 'a laptop showing search results'), 'clipboard': (clipboard, 'a checklist on a clipboard'), 'hardhat': (hardhat, 'a hard hat and a license card'),
          'coins': (coins, 'stacks of coins and a document'), 'certificate': (certificate, 'a certificate with an official seal'), 'idcard': (idcard, 'an ID card with a location pin'), 'magnifier': (magnifier, 'a magnifying glass'), 'map': (mapgrid, 'a map pin over a grid of counties')}

def bg(w, h, cat, uid):
    c1, c2 = COL[cat]
    return (f'<defs><linearGradient id="g{uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{c1}"/><stop offset="1" stop-color="{c2}"/></linearGradient></defs>'
            f'<rect width="{w}" height="{h}" rx="22" fill="url(#g{uid})"/>' + C(w - 120, -40, 220, W, 'opacity="0.08"') + C(w - 20, h - 10, 150, W, 'opacity="0.07"') + C(120, h + 30, 170, W, 'opacity="0.06"'))

def motif(name, cat, x, y, s, op=1, label=''):
    fn = MOTIFS[name][0]; k = COL[cat][0]
    body = fn(k, label) if name == 'map' else fn(k)
    if name == 'map' and label:
        body += f'<text x="104" y="68" font-family="Arial, Helvetica, sans-serif" font-size="74" font-weight="800" fill="{W}" text-anchor="middle" opacity="0.95">{label}</text>'
    return g(x, y, s, body, op)

def svg(w, h, alt, body):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-label="{esc(alt)}"><title>{esc(alt)}</title>{body}</svg>'

# slug: (hero motif, mid motif A, mid motif B, tip caption, state label)
A = {
 'how-to-search-public-records-in-california': ('map', 'courthouse', 'documents', 'Business filings are kept at the state level, while court and property records are in the county.', 'CA'),
 'understanding-llc-filings-and-business-entity-searches': ('building', 'folders', 'magnifier', 'Search the state where the company was formed, and any state where it operates.', ''),
 'what-to-look-for-in-a-background-check-before-hiring': ('clipboard', 'shield', 'documents', 'If you use an outside screening company, the Fair Credit Reporting Act notice and consent steps apply.', ''),
 'guide-to-county-court-records-and-lawsuit-searches': ('courthouse', 'laptop', 'documents', 'Work out the right county first, then search the clerk\u2019s portal by name or case number.', ''),
 'how-to-find-incarceration-records-by-state': ('idcard', 'building', 'laptop', 'State prisons, county jails, and federal prisons are separate systems with separate searches.', ''),
 'difference-between-state-and-federal-inmate-searches': ('idcard', 'scales', 'documents', 'The Federal Bureau of Prisons has one national locator, while each state runs its own.', ''),
 'navigating-the-national-sex-offender-public-website': ('shield', 'laptop', 'documents', 'Registry details differ by jurisdiction, and the information is for safety, not harassment.', ''),
 'how-to-search-bankruptcy-records-using-pacer': ('coins', 'laptop', 'courthouse', 'Look for a discharge order or a dismissal to see how a case ended.', ''),
 'why-delaware-is-the-most-popular-state-for-llc-formation': ('building', 'scales', 'documents', 'Forming in Delaware does not remove your obligations in the state where you operate.', ''),
 'understanding-civil-vs-criminal-court-records': ('scales', 'documents', 'courthouse', 'Always read the final disposition. A claim or a charge is not a finding.', ''),
 'how-to-verify-a-contractors-business-license': ('hardhat', 'certificate', 'shield', 'Confirm the license class covers your type of work, and verify insurance directly with the insurer.', ''),
 'the-importance-of-registered-agents-in-business-filings': ('envelope', 'building', 'documents', 'A commercial agent\u2019s address is not necessarily the company\u2019s office.', ''),
 'how-to-read-a-docket-sheet-in-civil-lawsuits': ('documents', 'courthouse', 'calendar', 'Read the most recent entries first to see whether a case is active or finished.', ''),
 'protecting-your-privacy-when-searching-public-records': ('lock', 'laptop', 'shield', 'Start at the official .gov site, and never enter a Social Security number to run a search.', ''),
 'common-mistakes-people-make-when-searching-court-records': ('magnifier', 'scales', 'documents', 'Match at least two details before deciding that a record belongs to someone.', ''),
 'how-to-find-property-records-and-liens-in-your-county': ('house', 'folders', 'documents', 'Search by parcel number when you can. Addresses and owner names are easy to mismatch.', ''),
 'beginners-guide-to-foia-requests': ('envelope', 'calendar', 'documents', 'Specific requests that name the record and a date range are answered faster.', ''),
 'understanding-chapter-7-vs-chapter-13-bankruptcy-filings': ('coins', 'scales', 'calendar', 'A discharge means eligible debts were released. A dismissal does not.', ''),
 'how-to-conduct-due-diligence-on-a-new-business-partner': ('building', 'clipboard', 'magnifier', 'Keep a dated log of each check and where you found it.', ''),
 'the-role-of-public-records-in-journalistic-investigations': ('documents', 'magnifier', 'envelope', 'Read the primary document instead of a summary, and note the date you viewed it.', ''),
 'pacer-vs-courtlistener-which-should-you-use': ('laptop', 'courthouse', 'documents', 'Start with CourtListener, then confirm the current docket on PACER.', ''),
 'county-clerk-vs-recorder-vs-assessor-who-holds-which-records': ('folders', 'house', 'building', 'Office titles vary by state, so search by the record you need.', ''),
 'how-to-request-certified-copies-of-public-records': ('certificate', 'envelope', 'calendar', 'Ask the receiving agency exactly what kind of certification it needs.', ''),
 'how-to-search-public-records-in-texas': ('map', 'envelope', 'calendar', 'The 10-business-day clock starts when the written request reaches the right office.', 'TX'),
 'how-to-search-public-records-in-florida': ('map', 'folders', 'courthouse', 'Florida sets no fixed deadline, so follow up politely and keep a record of each contact.', 'FL'),
 'how-to-search-public-records-in-new-york': ('map', 'building', 'calendar', 'FOIL deadlines count business days, so write down the date you sent the request.', 'NY'),
 'how-to-search-public-records-in-pennsylvania': ('map', 'courthouse', 'laptop', 'The 15-business-day appeal deadline runs from the response or the deemed denial.', 'PA'),
 'how-to-search-public-records-in-illinois': ('map', 'folders', 'calendar', 'Mark both the five-business-day response deadline and the 60-day review deadline on your calendar.', 'IL'),
 'how-to-search-public-records-in-georgia': ('map', 'documents', 'house', 'Use the GSCCCA index to find which county holds a deed or lien, then request copies from that county.', 'GA'),
}
missing = [s for s in catof if s not in A]
assert not missing, missing
meta = {}
for slug, (hero, a, b, tip, lab) in A.items():
    cat = catof[slug]
    ha = 'Illustration of ' + MOTIFS[hero][1] + (f' marked {lab}' if lab else '')
    hb = bg(1200, 420, cat, 'h') + motif('documents' if hero != 'documents' else 'folders', cat, 70, 120, 0.9, 0.22) + motif(b if b != hero else 'shield', cat, 360, 190, 0.62, 0.3) + motif(hero, cat, 690, 36, 1.4, 1, lab)
    open(os.path.join(HERO, slug + '.svg'), 'w', encoding='utf-8').write(svg(1200, 420, ha, hb))
    ma = f'Illustration of {MOTIFS[a][1]} and {MOTIFS[b][1]}'
    mb = bg(1200, 240, cat, 'm') + motif(a, cat, 250, 20, 0.86, 1, lab if a == 'map' else '') + motif(b, cat, 700, 20, 0.86, 1, lab if b == 'map' else '') + L(560, 120, 640, 120, W, 6).replace('stroke-linecap="round"', 'stroke-linecap="round" stroke-dasharray="2 14" opacity="0.7"')
    open(os.path.join(MID, slug + '.svg'), 'w', encoding='utf-8').write(svg(1200, 240, ma, mb))
    meta[slug] = {'heroAlt': ha, 'midAlt': ma, 'tip': tip}
open(os.path.join(ROOT, 'src', 'data', 'blogImages.js'), 'w', encoding='utf-8').write('// Generated by scripts/make_heroes.py. Alt text and tip captions for hero and mid-article images.\nexport const imageMeta = ' + json.dumps(meta, indent=2, ensure_ascii=False) + ';\n')
print(len(meta), 'guides ->', HERO, MID)
