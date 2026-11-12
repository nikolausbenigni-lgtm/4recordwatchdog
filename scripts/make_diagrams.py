"""Generates the explanatory SVG diagrams used in the guides.
Run from the project root:  python3 scripts/make_diagrams.py
Output: public/images/guides/*.svg
"""
import os
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'guides')
os.makedirs(OUT, exist_ok=True)

NAVY, ORANGE, INK, MUTED, LINE, SOFT = '#071638', '#ff6f36', '#1e293b', '#475569', '#cbd5e1', '#f1f5f9'
BLUE, PURPLE, GREEN, RED = '#2f5fd0', '#7c4dd6', '#14916f', '#c2410c'
FONT = 'Arial, Helvetica, sans-serif'

def esc(t): return t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

def text(x, y, s, size=15, weight=400, fill=INK, anchor='start', style=''):
    return f'<text x="{x}" y="{y}" font-size="{size}" font-weight="{weight}" fill="{fill}" text-anchor="{anchor}" {style}>{esc(s)}</text>'

def lines(x, y, ls, size=14, lh=19, fill=MUTED, anchor='start', weight=400):
    return ''.join(text(x, y + i * lh, l, size, weight, fill, anchor) for i, l in enumerate(ls))

def rect(x, y, w, h, fill='#fff', stroke=LINE, rx=14, sw=1.5):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'

def circle(cx, cy, r, fill, label, size=18):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}"/>' + text(cx, cy + size * 0.35, label, size, 700, '#fff', 'middle')

def svg(name, w, h, title, body):
    s = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-label="{esc(title)}" font-family="{FONT}">'
         f'<title>{esc(title)}</title><rect width="{w}" height="{h}" rx="18" fill="#ffffff"/>{body}</svg>')
    open(os.path.join(OUT, name), 'w', encoding='utf-8').write(s)

def heading(w, s): return text(w / 2, 40, s, 22, 700, NAVY, 'middle')
def footer(w, y, ls): return ''.join(text(w / 2, y + i * 20, l, 14, 400, MUTED, 'middle', 'font-style="italic"') for i, l in enumerate(ls))

def arrow(x1, y1, x2, y2, color=MUTED):
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="2.5"/><polygon points="{x2},{y2} {x2 - 6 if x2 > x1 else x2 + 6 if x2 < x1 else x2 - 6},{y2 - 8 if y2 > y1 else y2 + 8 if y2 < y1 else y2 - 6} {x2 + 6 if x2 == x1 else x2 - 6 if x2 > x1 else x2 + 6},{y2 - 8 if y2 > y1 else y2 + 8 if y2 < y1 else y2 + 6}" fill="{color}"/>'

def timeline(name, title, steps, foot, h=330):
    w, n = 800, len(steps)
    gap = (w - 180) / (n - 1)
    xs = [90 + gap * i for i in range(n)]
    b = heading(w, title) + f'<line x1="{xs[0]}" y1="105" x2="{xs[-1]}" y2="105" stroke="{LINE}" stroke-width="4"/>'
    for i, (head, ls) in enumerate(steps):
        x = xs[i]
        b += circle(x, 105, 26, NAVY if i % 2 == 0 else ORANGE, str(i + 1))
        b += text(x, 158, head, 16, 700, NAVY, 'middle') + lines(x, 182, ls, 13, 19, MUTED, 'middle')
    b += footer(w, h - 38, foot)
    svg(name, w, h, title, b)

def table(name, title, cols, colors, rows, foot, h, label_w=150):
    w = 800
    cw = (w - 48 - label_w - 10) / 2
    x1, x2 = 24 + label_w, 24 + label_w + cw + 10
    b = heading(w, title)
    for x, c, col in ((x1, cols[0], colors[0]), (x2, cols[1], colors[1])):
        b += rect(x, 62, cw, 46, col, col, 12) + text(x + cw / 2, 92, c, 18, 700, '#fff', 'middle')
    y = 118
    for i, (lab, a, bb) in enumerate(rows):
        rh = 54 if max(len(a), len(bb)) > 1 else 46
        fill = SOFT if i % 2 == 0 else '#ffffff'
        b += rect(24, y, w - 48, rh, fill, LINE, 10, 1) + text(36, y + rh / 2 + 5, lab, 15, 700, NAVY)
        for x, cell in ((x1, a), (x2, bb)):
            top = y + rh / 2 - (len(cell) - 1) * 9 + 5
            b += lines(x + 12, top, cell, 14, 18, INK)
        y += rh + 8
    b += footer(w, h - 24, foot)
    svg(name, w, h, title, b)

def cards(name, title, items, foot, h, cols=4, y0=72, ch=190, hdr=60):
    w = 800
    pad, gap = 24, 16
    cw = (w - 2 * pad - gap * (cols - 1)) / cols
    b = heading(w, title)
    for i, (head, colr, ls) in enumerate(items):
        r, c = divmod(i, cols)
        x, y = pad + c * (cw + gap), y0 + r * (ch + gap)
        b += rect(x, y, cw, ch, '#fff', LINE, 14)
        b += f'<path d="M{x},{y + hdr} V{y + 14} Q{x},{y} {x + 14},{y} H{x + cw - 14} Q{x + cw},{y} {x + cw},{y + 14} V{y + hdr} Z" fill="{colr}"/>'
        for k, hl in enumerate(head): b += text(x + cw / 2, y + 25 + k * 20 if len(head) > 1 else y + hdr / 2 + 6, hl, 16, 700, '#fff', 'middle')
        b += lines(x + 14, y + hdr + 28, ls, 14, 21, MUTED)
    b += footer(w, h - 40, foot)
    svg(name, w, h, title, b)

# 1. County offices
cards('county-offices.svg', 'Who keeps what in a county', [
    (['Clerk of Court'], BLUE, ['Filings and dockets', 'Judgments and orders', 'Lawsuits, divorces,', 'and criminal cases']),
    (['Recorder or', 'Register of Deeds'], GREEN, ['Deeds and mortgages', 'Liens and releases', 'Easements', 'The land record index']),
    (['Assessor'], PURPLE, ['Owner on the tax roll', 'Parcel number', 'Assessed value', 'Property details']),
    (['Treasurer or', 'Tax Collector'], RED, ['Tax bills', 'Payments made', 'Delinquent amounts', 'Tax sale status'])],
    ['Office names differ by state. Search by the record you need, not the title.'], 360)

# 2. FOIA timeline
timeline('foia-timeline.svg', 'How a federal FOIA request moves', [
    ('Send request', ['Write to the FOIA', 'officer. Be specific.']),
    ('Agency responds', ['Generally within 20', 'business days', '(delays are common)']),
    ('Decision', ['Released, partly', 'released, or denied']),
    ('Appeal', ['Use the deadline in', 'the denial letter']),
    ('Next steps', ['OGIS mediation or', 'federal court'])],
    ['State and local agencies follow their own state public records laws,', 'which have different deadlines.'], 320)

# 3. Chapter 7 vs 13
table('chapter-7-vs-13.svg', 'Chapter 7 vs. Chapter 13 at a glance', ['Chapter 7', 'Chapter 13'], [BLUE, PURPLE], [
    ('Purpose', ['Sells nonexempt assets to pay', 'creditors, then discharges debts'], ['Repays debts through a', 'court-approved plan']),
    ('Your property', ['Trustee may sell nonexempt assets'], ['You generally keep your property']),
    ('How long', ['A few months'], ['Three to five years']),
    ('Who qualifies', ['Must pass a means test'], ['Regular income, within debt limits']),
    ('Credit report', ['Commonly up to 10 years'], ['Commonly about 7 years'])],
    ['General information, not legal advice. Rules and exceptions vary.'], 440)

# 4. Court routing
w, h = 800, 380
b = heading(w, 'Which court records should you search?')
b += rect(290, 62, 220, 54, NAVY, NAVY, 14) + text(400, 95, 'Where was the case filed?', 16, 700, '#fff', 'middle')
for cx, head, res, colr in ((145, 'County or state court', ['County clerk or', 'state court portal'], BLUE), (400, 'Federal court', ['PACER or', 'CourtListener'], PURPLE), (655, 'Bankruptcy court', ['PACER Case Locator'], GREEN)):
    b += f'<path d="M400,116 V140 H{cx} V172" fill="none" stroke="{LINE}" stroke-width="3"/>' if cx != 400 else f'<line x1="400" y1="116" x2="400" y2="172" stroke="{LINE}" stroke-width="3"/>'
    b += rect(cx - 115, 172, 230, 54, colr, colr, 14) + text(cx, 205, head, 16, 700, '#fff', 'middle')
    b += f'<line x1="{cx}" y1="226" x2="{cx}" y2="256" stroke="{LINE}" stroke-width="3"/>'
    b += rect(cx - 115, 256, 230, 66, '#fff', colr, 14, 2.5) + lines(cx, 285 if len(res) == 2 else 295, res, 15, 20, INK, 'middle', 700)
b += footer(w, 350, ['Not sure? Start with the county where the event happened, then check PACER.'])
svg('court-routing.svg', w, h, 'Which court records should you search', b)

# 5. Property steps
cards('property-research.svg', 'Researching a property: four offices to check', [
    (['1. Assessor'], PURPLE, ['Owner of record', 'Parcel number', 'Assessed value']),
    (['2. Recorder'], GREEN, ['Deed history', 'Mortgages and liens', 'Releases']),
    (['3. Treasurer'], RED, ['Taxes paid?', 'Delinquent amounts', 'Tax sale status']),
    (['4. Clerk of Court'], BLUE, ['Lawsuits', 'Foreclosures', 'Judgments'])],
    ['A free search is a screening tool, not a title guarantee.', 'Buying? A title company or attorney does the full title search.'], 330, ch=170)

# 6. Civil vs criminal
table('civil-vs-criminal.svg', 'Civil and criminal cases compared', ['Civil case', 'Criminal case'], [BLUE, PURPLE], [
    ('Who brings it', ['A person or company', '(the plaintiff)'], ['The government', '(the prosecutor)']),
    ('Proof needed', ['Preponderance of', 'the evidence'], ['Beyond a', 'reasonable doubt']),
    ('Possible result', ['Money damages or', 'court orders'], ['Fines, probation,', 'or incarceration']),
    ('Typical records', ['Complaint, answer,', 'judgment'], ['Charges, plea,', 'sentence'])],
    ['A claim or a charge is not a finding. Always read the final disposition.'], 425)

# 7. Due diligence
cards('due-diligence.svg', 'A due diligence checklist for a business partner', [
    (['1. Entity status'], BLUE, ['Secretary of State', 'records']),
    (['2. Liens and UCC'], PURPLE, ['Who has a claim', 'on the assets?']),
    (['3. Court cases'], GREEN, ['County, state, and', 'federal dockets']),
    (['4. Bankruptcy'], RED, ['PACER Case Locator', '']),
    (['5. Licenses'], BLUE, ['State board records', 'and any discipline']),
    (['6. Sanctions lists'], PURPLE, ['OFAC and SAM.gov', 'exclusion lists'])],
    ['Keep a dated log of each check and where you found it.'], 410, cols=3, ch=130, hdr=48)

# 8. Docket anatomy
w, h = 800, 340
b = heading(w, 'Anatomy of a docket') + rect(30, 62, 740, 190, '#fff', LINE, 12)
b += rect(30, 62, 740, 38, NAVY, NAVY, 12) + text(46, 87, 'Date filed', 14, 700, '#fff') + text(176, 87, '#', 14, 700, '#fff') + text(236, 87, 'Docket text', 14, 700, '#fff')
for i, (d, n, t) in enumerate([('01/15/2025', '1', 'COMPLAINT filed by Plaintiff against Defendant.'), ('01/22/2025', '2', 'SUMMONS issued as to Defendant.'), ('02/20/2025', '3', 'ANSWER to Complaint filed by Defendant.')]):
    y = 100 + i * 50
    b += (f'<rect x="31" y="{y}" width="738" height="50" fill="{SOFT}"/>' if i % 2 == 0 else '') + text(46, y + 31, d, 14, 400, INK) + text(176, y + 31, n, 14, 700, ORANGE) + text(236, y + 31, t, 14, 400, INK)
for x, lab in ((100, 'Date filed'), (190, 'Entry number'), (500, 'Short description written by court staff')):
    b += f'<line x1="{x}" y1="252" x2="{x}" y2="276" stroke="{ORANGE}" stroke-width="2.5"/>' + text(x, 296, lab, 14, 700, NAVY, 'middle')
b += footer(w, 322, ['Example only. Not a real case.'])
svg('docket-anatomy.svg', w, h, 'Anatomy of a court docket with date, entry number and description', b)

# 9. Certified copies
timeline('certified-copy-steps.svg', 'Ordering a certified copy', [
    ('Find the office', ['The office that holds', 'the original record']),
    ('Gather details', ['Case or document', 'number, names, dates']),
    ('Choose a method', ['Online, mail,', 'or in person']),
    ('Pay the fees', ['Per-page copy fee plus', 'a certification fee']),
    ('Receive the copy', ['Ask if an apostille', 'is also needed'])],
    ['Ask the agency that will receive the copy which kind of', 'certification it requires and how recent it must be.'], 320)
print('diagrams written to', os.path.abspath(OUT))
