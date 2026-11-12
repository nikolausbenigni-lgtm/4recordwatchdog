import { blogPosts } from './blogData.js';
import { rewrites } from './blogRewrites.js';
import { newPosts } from './blogNew.js';
import { statePosts } from './blogStates.js';
import { appendSections } from './blogExtras.js';
import { AUTHOR } from './site.js';
import { blogMeta, SRC } from './blogMeta.js';
import { figures } from './blogFigures.js';

// Date the rewritten articles were last reviewed and updated.
export const REVIEWED = 'November 2, 2026';

export const CATEGORIES = [
  { id: 'states', name: 'State Guides', blurb: 'State-by-state guides to court, business, property, and public records laws.' },
  { id: 'business', name: 'Business Records', blurb: 'LLC filings, registered agents, licenses, and checking out a company.' },
  { id: 'courts', name: 'Court & Bankruptcy Records', blurb: 'County dockets, PACER, civil vs. criminal cases, and bankruptcy filings.' },
  { id: 'property', name: 'Property & Government Records', blurb: 'Deeds and liens, county offices, FOIA requests, and state guides.' },
  { id: 'safety', name: 'Background & Safety', blurb: 'Inmate searches, registries, background checks, and personal privacy.' }
];

const categoryBySlug = {
  'how-to-search-public-records-in-california': 'states',
  'how-to-search-public-records-in-texas': 'states',
  'how-to-search-public-records-in-florida': 'states',
  'how-to-search-public-records-in-new-york': 'states',
  'how-to-search-public-records-in-pennsylvania': 'states',
  'how-to-search-public-records-in-illinois': 'states',
  'how-to-search-public-records-in-georgia': 'states',
  'understanding-llc-filings-and-business-entity-searches': 'business',
  'what-to-look-for-in-a-background-check-before-hiring': 'safety',
  'guide-to-county-court-records-and-lawsuit-searches': 'courts',
  'how-to-find-incarceration-records-by-state': 'safety',
  'difference-between-state-and-federal-inmate-searches': 'safety',
  'navigating-the-national-sex-offender-public-website': 'safety',
  'how-to-search-bankruptcy-records-using-pacer': 'courts',
  'why-delaware-is-the-most-popular-state-for-llc-formation': 'business',
  'understanding-civil-vs-criminal-court-records': 'courts',
  'how-to-verify-a-contractors-business-license': 'business',
  'the-importance-of-registered-agents-in-business-filings': 'business',
  'how-to-read-a-docket-sheet-in-civil-lawsuits': 'courts',
  'protecting-your-privacy-when-searching-public-records': 'safety',
  'common-mistakes-people-make-when-searching-court-records': 'courts',
  'how-to-find-property-records-and-liens-in-your-county': 'property',
  'beginners-guide-to-foia-requests': 'property',
  'understanding-chapter-7-vs-chapter-13-bankruptcy-filings': 'courts',
  'how-to-conduct-due-diligence-on-a-new-business-partner': 'business',
  'the-role-of-public-records-in-journalistic-investigations': 'property',
  'pacer-vs-courtlistener-which-should-you-use': 'courts',
  'county-clerk-vs-recorder-vs-assessor-who-holds-which-records': 'property',
  'how-to-request-certified-copies-of-public-records': 'property'
};

const toIso = (text) => new Date(`${text} 12:00 UTC`).toISOString().slice(0, 10);
const countWords = (html) => html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

const withExtras = (p) => (appendSections[p.slug] ? { ...p, content: p.content + appendSections[p.slug], extended: true } : p);

const merged = [
  ...blogPosts.map((p) => {
    const r = rewrites[p.slug];
    return withExtras(r ? { ...p, ...r, updated: REVIEWED } : { ...p, updated: p.date });
  }),
  ...newPosts.map((p) => withExtras({ ...p, updated: p.updated || p.date })),
  ...statePosts.map((p) => withExtras({ ...p, updated: p.updated || p.date }))
].map((p) => ({ ...p, author: AUTHOR, updated: p.extended ? REVIEWED : p.updated })).map((p) => {
  const f = figures[p.slug];
  if (!f) return p;
  const html = `<figure class="guide-figure"><img src="/images/guides/${f.file}" alt="${f.alt}" width="800" height="${f.h}" loading="lazy" decoding="async" /><figcaption>${f.caption}</figcaption></figure>`;
  const i = p.content.indexOf('<h2');
  return { ...p, hasFigure: true, content: i > -1 ? p.content.slice(0, i) + html + p.content.slice(i) : p.content + html };
});

// Newest first, based on real dates (not array order).
export const posts = merged
  .map((p) => {
    const words = countWords(p.content);
    return {
      ...p,
      category: categoryBySlug[p.slug] || 'property',
      takeaways: (blogMeta[p.slug] || {}).takeaways || [],
      sources: ((blogMeta[p.slug] || {}).sources || []).map((k) => SRC[k]).filter(Boolean),
      iso: toIso(p.date),
      updatedIso: toIso(p.updated),
      wasUpdated: p.updated !== p.date,
      words,
      readMins: Math.max(2, Math.round(words / 220))
    };
  })
  .sort((a, b) => b.iso.localeCompare(a.iso) || b.id - a.id);

export const categoryName = (id) => (CATEGORIES.find((c) => c.id === id) || {}).name || 'Guide';
