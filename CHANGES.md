# Changes in this update

Directory markup and scripts are unchanged (state selector, business/court/bankruptcy/incarceration sections).

- Homepage: latest 6 guides + topic sections now come first; directory sits below under a "Public Records Directory" heading (#directory). Hero subtitle reworded.
- Nav: "Blog" renamed "Guides"; "Directory" link added.
- Blog: newest first (real dates, src/data/posts.js), topic filters, read time, breadcrumbs, table of contents, related guides by topic, published/updated dates, ISO dates + BreadcrumbList in schema.
- Content: 5 thinnest articles expanded (src/data/blogRewrites.js); 3 new articles (src/data/blogNew.js).
- sitemap.xml is now generated during build from real article dates.
- Two small notes added under the PACER and inmate name fields clarifying they are scratchpads.
- Removed the "Verified Legal Researchers / fact-checked by our legal research team" claims; replaced with a factual description.

Build: `npm run build` (vite build, then generate-static.mjs).

## Second pass
- 15 more articles extended with practical sections (src/data/blogExtras.js); 22 of 23 articles are now 575+ words (most 700-830).
- Byline is set in one place: src/data/site.js (AUTHOR). Replace with a real name and add a bio on the About page.
- Article publication dates still come from blogData.js; use the real dates.

## Third pass
- Homepage is now blog-first: short hero -> latest guides (featured card + 7) -> topic cards -> directory (state selector hero + all existing sections, unchanged).
- Guide cards restyled: category colour banner + icon, larger titles, 3-line excerpts, date/read-time footer, hover lift. Same card is used on the Guides page.
- The old hero (state selector) is now the directory intro (#directory) with its h1 changed to h2 so the page has one h1.

## Fourth pass
- Hero right side now holds an "Official sources" panel with six buttons that open PACER, CourtListener, the BOP inmate locator, NSOPW, SEC EDGAR and FOIA.gov in a new tab, plus a link down to the state/county directory.

## Fifth pass
- Removed the "Official sources" link panel from the hero; hero is now centered. "Read the Guides" opens /blog/, "Search the Directory" scrolls to #directory.
- New "Free tools" section between the guides and the directory: "Which Office Has the Record?" (12 record types, links to guides) and a "Records Request Letter Builder" (FOIA or state request letter, copy button). Both run in the browser only.

## Sixth pass
- Free tools moved off the homepage to their own page, /tools/, with a short "how it works" explanation. Added a "Tools" nav link, a link from the hero chip, and a sitemap entry.
- Homepage order is now: hero -> latest guides + topics -> directory.

## Seventh pass
- Every article now has: a "Key takeaways" box (3 points), an "Official Sources and Further Reading" list (src/data/blogMeta.js), and an author box with publish/updated dates.
- Author bio text: src/data/site.js (AUTHOR_BIO). Replace AUTHOR and AUTHOR_BIO with a real person's details.

## Eighth pass
- Article headings get a scroll offset (scroll-margin-top) so "In this guide" links land with the heading visible below the sticky header.

## Ninth pass
- Analytics: Google Analytics ID G-Q7ZXH6EXHV added (generator header + index.html). Consent Mode added: analytics/ad storage stay denied until the visitor clicks Accept All, then are granted. CSP widened for GA regional endpoints and AdSense hosts (only adds allowed hosts).
- Guides page: keyword search combined with topic filters, "New here? Start with these" and "Recently updated" boxes, topic links.
- Articles: share buttons (copy link, email, LinkedIn, Facebook, X), corrections note, newer/older guide links.
- New pages: /blog/category/<topic>/ (4), /start-here/ (public records by situation), /glossary/ (28 terms). Footer links to Guides, Start Here, Glossary, Tools. All in the sitemap.
- Not done (need you or can't be tested here): newsletter signup, compiled Tailwind build, Core Web Vitals check, AdSense consent message, ads.txt review.

## Tenth pass (pre-submission audit fixes)
- Social share image and favicon now point to the existing logo file (og-image.jpg did not exist; no favicon was set).
- Logo compressed from 348 KB to a few dozen KB (it is shown at 160px wide on every page).
- public/_headers CSP synced with the page CSP (otherwise the stricter header could block Google Analytics or AdSense on hosts that use _headers).
- Directory page wording: removed unsupported claims ("every link is .gov", "Verified", "Most searched", "High traffic"). No directory markup or scripts changed.

## Eleventh pass (state guides + policy gaps)
- Six new state guides (Texas, Florida, New York, Pennsylvania, Illinois, Georgia) with a new "State Guides" topic page. California moved into the same topic. Public records law details were checked against official state sources.
- Footer on every page now states the site is independent and not affiliated with any government agency or court.
- Privacy Policy: added Google Analytics / Consent Mode paragraph, the Google partner-sites disclosure link, and a Google Ads Settings link; "Last Updated" set to November 10, 2026. Have the policy text reviewed.

## Twelfth pass (images)
- Nine original SVG diagrams (public/images/guides, generated by scripts/make_diagrams.py) placed after the intro of nine guides, each with alt text, a caption, fixed width/height, and lazy loading.
- A 1200x630 share image for every guide plus a default (public/images/og, generated by scripts/make_og.py). Each guide's og:image/twitter:image now points to its own image.
- No stock or copied photos were used.

## Thirteenth pass (hero and mid-article images)
- Every guide now has an illustrated hero image under the title and a mid-article image with a one-line tip caption (public/images/hero and public/images/mid, generated by scripts/make_heroes.py; alt text and captions in src/data/blogImages.js).
- To use a real photo instead, save it as public/images/hero/<slug>.jpg (1200x420) or public/images/mid/<slug>.jpg (1200x240). The build prefers a .jpg over the generated .svg.
- The preview file's Back and Forward buttons now work (navigation is recorded in the URL hash).
