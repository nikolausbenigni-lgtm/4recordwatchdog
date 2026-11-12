import fs from 'fs';
import path from 'path';
import { posts as blogPosts, CATEGORIES, categoryName } from './src/data/posts.js';
import { AUTHOR_BIO } from './src/data/site.js';
import { imageMeta } from './src/data/blogImages.js';
// Prefer a real photo (<slug>.jpg) over the generated illustration (<slug>.svg).
const pickImg = (kind, slug) => fs.existsSync(`./public/images/${kind}/${slug}.jpg`) ? `/images/${kind}/${slug}.jpg` : `/images/${kind}/${slug}.svg`;

const distDir = './dist';

if (!fs.existsSync(distDir)) {
  console.error('Please run "npm run build" first to create the dist directory.');
  process.exit(1);
}

const header = (title, desc, canonicalUrl = '', ogImage = 'https://recordwatchdog.com/images/og/default.jpg') => `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${desc}" />
  <meta name="robots" content="index, follow" />
  <meta name="google-site-verification" content="_39_XmfiyJvFJbEm7OP2tx2A-0WWIGn6_HOvqyOv5gw" />
  ${canonicalUrl ? `<link rel="canonical" href="https://recordwatchdog.com${canonicalUrl}" />
  <link rel="icon" type="image/png" href="/recordwatchdog-logo.png" />` : ''}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:title" content="${title}" />
  <meta property="twitter:description" content="${desc}" />
  <meta property="twitter:image" content="${ogImage}" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://cdn.tailwindcss.com https://pagead2.googlesyndication.com https://*.adtrafficquality.google https://www.googletagservices.com https://partner.googleadservices.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: http: blob:; font-src 'self' https://fonts.gstatic.com; frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://bid.g.doubleclick.net https://*.googlesyndication.com https://*.google.com; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://pagead2.googlesyndication.com https://*.adtrafficquality.google;" />
  <meta http-equiv="X-Content-Type-Options" content="nosniff" />
  <meta http-equiv="X-Frame-Options" content="SAMEORIGIN" />
  <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
  <meta http-equiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()" />
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q7ZXH6EXHV"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    // Consent Mode: analytics and ad storage stay off until the visitor clicks Accept All.
    gtag('consent', 'default', { 'ad_storage': 'denied', 'ad_user_data': 'denied', 'ad_personalization': 'denied', 'analytics_storage': 'denied' });
    try {
      if (localStorage.getItem('cookieConsent') === 'true') {
        gtag('consent', 'update', { 'ad_storage': 'granted', 'ad_user_data': 'granted', 'ad_personalization': 'granted', 'analytics_storage': 'granted' });
      }
    } catch (e) {}
    gtag('js', new Date());
    gtag('config', 'G-Q7ZXH6EXHV');
  </script>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = { theme: { extend: { colors: { primary: '#101943', accent: '#ff6f36' } } } }
  </script>
  <style>
    html { scroll-behavior: smooth; }
    .prose h2 { font-size: 1.5rem; font-weight: 800; color: #101943; margin-top: 2rem; margin-bottom: 1rem; }
    .prose p { margin-bottom: 1rem; line-height: 1.75; color: #334155; }
    .prose ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; color: #334155; }
    .prose li { margin-bottom: 0.5rem; }
    .prose h2[id] { scroll-margin-top: 6rem; }
    .article-hero { margin: 1.75rem 0 0; }
    .article-hero img { display: block; width: 100%; height: auto; aspect-ratio: 1200 / 420; object-fit: cover; border-radius: 1.25rem; background: #e2e8f0; }
    .mid-figure img { aspect-ratio: 1200 / 240; object-fit: cover; border: 0; }
    .mid-figure figcaption { font-size: 0.95rem; color: #334155; }
    .guide-figure { margin: 2rem 0; }
    .guide-figure img { display: block; width: 100%; height: auto; border: 1px solid #e2e8f0; border-radius: 1rem; background: #fff; }
    .guide-figure figcaption { margin-top: 0.6rem; text-align: center; font-size: 0.85rem; color: #64748b; }
    .prose ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; color: #334155; }
    .prose strong { color: #101943; }
  </style>
</head>
<body class="min-h-screen bg-slate-50 text-primary flex flex-col font-sans">
  <div class="sticky top-0 z-50 bg-white/95 shadow-sm backdrop-blur-sm">
    <header class="border-b border-slate-100">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-1.5">
        <a href="/" class="flex items-center gap-2 group leading-none">
          <img src="/recordwatchdog-logo.png" alt="RecordWatchdog" class="h-auto min-w-[150px] max-w-[160px] object-contain" loading="lazy" decoding="async" />
        </a>
      <nav class="hidden xl:block flex-1">
        <ul class="flex items-center justify-end gap-6 text-sm font-bold">
          <li><a href="/" class="transition hover:text-accent">Home</a></li>
          <li><a href="/about/" class="transition hover:text-accent">About</a></li>
          <li><a href="/blog/" class="transition hover:text-accent">Guides</a></li>
          <li><a href="/#directory" class="transition hover:text-accent">Directory</a></li>
          <li><a href="/tools/" class="transition hover:text-accent">Tools</a></li>
          <li><a href="/faq/" class="transition hover:text-accent">FAQ</a></li>
          <li><a href="/contact/" class="transition hover:text-accent">Contact</a></li>
        </ul>
      </nav>
      </div>
    </header>
    <div class="border-b border-slate-200 bg-slate-50/80 py-3">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 sm:flex-row">
        <h3 class="text-xs font-black uppercase tracking-wider text-primary">Search Public Records:</h3>
        <div class="flex flex-wrap justify-center gap-2">
          <a href="/#business" class="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-primary shadow-sm transition hover:border-accent hover:bg-orange-50 hover:text-accent">
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg> Business
          </a>
          <a href="/#court" class="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-primary shadow-sm transition hover:border-accent hover:bg-orange-50 hover:text-accent">
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg> Lawsuits
          </a>
          <a href="/#inmates" class="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-primary shadow-sm transition hover:border-accent hover:bg-orange-50 hover:text-accent">
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg> Incarceration
          </a>
          <a href="/#bankruptcy" class="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-primary shadow-sm transition hover:border-accent hover:bg-orange-50 hover:text-accent">
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg> Bankruptcy
          </a>
        </div>
      </div>
    </div>
  </div>
  <main class="flex-grow">`;

const footer = `
  </main>
  <footer class="bg-[#071638] px-5 py-10 text-white">
    <div class="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <a href="/" class="flex items-center gap-2">
        <img src="/recordwatchdog-logo.png" alt="RecordWatchdog" class="h-auto min-w-[150px] max-w-[160px] object-contain" loading="lazy" decoding="async" />
      </a>
      <div class="flex flex-wrap gap-5 text-sm font-bold text-slate-300">
        <a href="/about/" class="transition hover:text-white">About</a>
        <a href="/blog/" class="transition hover:text-white">Guides</a>
        <a href="/start-here/" class="transition hover:text-white">Start Here</a>
        <a href="/glossary/" class="transition hover:text-white">Glossary</a>
        <a href="/tools/" class="transition hover:text-white">Tools</a>
        <a href="/privacy-policy/" class="transition hover:text-white">Privacy Policy</a>
        <a href="/cookie-policy/" class="transition hover:text-white">Cookie Policy</a>
        <a href="/terms/" class="transition hover:text-white">Terms</a>
        <a href="/faq/" class="transition hover:text-white">FAQ</a>
        <a href="/contact/" class="transition hover:text-white">Contact</a>
        <a href="/dmca/" class="transition hover:text-white">DMCA</a>
      </div>
    </div>
    <div class="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-slate-400">
      <p>&copy; 2026 RecordWatchdog. All rights reserved.</p>
      <p class="mt-2">RecordWatchdog is an independent website. It is not affiliated with, endorsed by, or operated by any government agency or court, and it is not a consumer reporting agency. We link to official sources and do not provide legal advice.</p>
    </div>
  </footer>
  <div id="cookie-banner" class="fixed bottom-0 left-0 right-0 z-[100] border-t border-slate-200 bg-white p-4 shadow-2xl sm:p-6">
    <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
      <div class="text-center sm:text-left">
        <p class="text-sm font-bold text-primary">We value your privacy</p>
        <p class="mt-1 text-sm text-slate-600">We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our <a href="/privacy-policy/" class="font-bold text-accent underline">Privacy Policy</a>.</p>
      </div>
      <div class="flex shrink-0 gap-3">
        <button onclick="acceptCookies()" class="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#1a2a5e]">Accept All</button>
        <a href="/privacy-policy/" class="rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50">Customize</a>
      </div>
    </div>
  </div>
  <script>
    // If user already accepted, hide the banner immediately on load
    if (localStorage.getItem('cookieConsent') === 'true') {
      document.getElementById('cookie-banner').style.display = 'none';
    }
    function acceptCookies() { 
      localStorage.setItem('cookieConsent', 'true'); 
      document.getElementById('cookie-banner').style.display = 'none'; 
      if (typeof gtag === 'function') {
        gtag('consent', 'update', { 'ad_storage': 'granted', 'ad_user_data': 'granted', 'ad_personalization': 'granted', 'analytics_storage': 'granted' });
      }
    }
  </script>
</body>
</html>`;

function writePage(folderPath, title, desc, content, schema = '', ogImage = undefined) {
  const dir = path.join(distDir, folderPath);
  fs.mkdirSync(dir, { recursive: true });
  const schemaScript = schema ? `\n  <script type="application/ld+json">${JSON.stringify(schema)}</script>\n` : '';
  const canonicalUrl = folderPath ? `/${folderPath}/` : '/';
  fs.writeFileSync(path.join(dir, 'index.html'), header(title, desc, canonicalUrl, ogImage) + schemaScript + content + footer);
  console.log('Generated:', path.join(folderPath, 'index.html'));
}

// 1. Privacy Policy
const privacySchema = { "@context": "https://schema.org", "@type": "WebPage", "name": "Privacy Policy", "description": "RecordWatchdog Privacy Policy regarding data handling, Google AdSense cookies, and user privacy." };
writePage('privacy-policy', 'Privacy Policy - Data Protection & Cookies | RecordWatchdog', 'Learn how RecordWatchdog protects your privacy, handles data, and uses Google AdSense cookies. We prioritize your security and transparency in all data practices.', `
  <section class="mx-auto max-w-4xl px-5 py-16">
    <header class="mb-8"><p class="font-black uppercase tracking-[0.18em] text-accent">Legal</p><h1 class="mt-2 text-4xl font-black text-primary">Privacy Policy</h1><p class="mt-4 text-slate-600">Last Updated: November 10, 2026</p></header>
    <article class="prose max-w-none">
      <h2>1. Introduction</h2>
      <p>RecordWatchdog ("we," "our," or "us") respects your privacy and is deeply committed to protecting your personal data. This comprehensive Privacy Policy explains in detail how we collect, use, disclose, and safeguard your information when you visit our website, recordwatchdog.com (the "Site").</p>
      <p>Please read this Privacy Policy carefully. By accessing or using the Site, you consent to the practices described in this policy. If you do not agree with the terms of this Privacy Policy, please do not access the Site. We reserve the right to make changes to this Privacy Policy at any time, and we encourage you to review it periodically.</p>

      <h2>2. Information We Collect</h2>
      <p><strong>Non-Personal Information:</strong> When you visit the Site, we and our third-party service providers automatically collect certain non-personal information about your device and browsing activity. This includes your IP address, browser type, operating system, referring URLs, access times, and pages viewed. We use this data to analyze trends, administer the Site, and improve the overall user experience.</p>
      <p><strong>Personal Information:</strong> RecordWatchdog is designed to be a privacy-friendly directory. We do not require you to create an account, log in, or provide personal information to use our core directory features. However, if you choose to contact us via our contact form or email, we may collect your name, email address, and the content of your message solely to respond to your inquiry.</p>
      <p><strong>Cookies and Tracking Technologies:</strong> We use cookies, web beacons, and similar tracking technologies to enhance your browsing experience. Cookies are small text files stored on your device that help us remember your preferences and understand how you interact with our Site.</p>

      <h2>3. Advertising and Google AdSense</h2>
      <p>We may use third-party advertising companies, including Google AdSense, to serve advertisements when you visit our Site. These companies may use cookies, web beacons, and other tracking technologies to collect information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.</p>
      <p>Google, as a third-party vendor, uses cookies to serve ads on our Site. Google's use of the DART cookie enables it to serve ads to our users based on their visit to our Site and other sites on the Internet. Users may opt out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy. We encourage you to review Google's privacy policies to understand how your data is used for advertising purposes.</p>
      <p><strong>Analytics and consent:</strong> We use Google Analytics to understand how visitors use the Site. We use Google Consent Mode, which means analytics and advertising storage on your device stays turned off until you click "Accept All" on our cookie banner. To withdraw your consent, clear the site data for recordwatchdog.com in your browser settings.</p>
      <p>Third parties, including Google, may place and read cookies on your browser, or use web beacons or IP addresses to collect information, as a result of ad serving on our Site. To learn how Google uses data when you use our site, see <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">How Google uses data when you use our partners' sites or apps</a>. You can manage personalized advertising at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</p>

      <h2>4. Third-Party Links and Services</h2>
      <p>RecordWatchdog is primarily an informational directory of official public-record resources. We provide direct links to external government websites (.gov), court systems, and authorized third-party legal research tools. We do not control these external sites and are not responsible for their content, privacy practices, or data collection methods. We strongly encourage you to read the privacy policies of any third-party sites you visit through our links.</p>

      <h2>5. Data Security</h2>
      <p>We implement appropriate technical and organizational security measures designed to protect your personal information from accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.</p>

      <h2>6. Children's Privacy</h2>
      <p>Our Site is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately so we can take steps to delete such information.</p>

      <h2>7. Contact Us</h2>
      <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at: <strong>niko@nwbventures.com</strong></p>
    </article>
  </section>
`, privacySchema);

// 2. Terms
const termsSchema = { "@context": "https://schema.org", "@type": "WebPage", "name": "Terms of Use", "description": "RecordWatchdog Terms of Use, FCRA Disclaimer, and user guidelines." };
writePage('terms', 'Terms of Use - FCRA Disclaimer & Guidelines | RecordWatchdog', 'Read our Terms of Use including FCRA disclaimer. RecordWatchdog is not a consumer reporting agency. Learn about user conduct, prohibited uses, and legal guidelines.', `
  <section class="mx-auto max-w-4xl px-5 py-16">
    <header class="mb-8"><p class="font-black uppercase tracking-[0.18em] text-accent">Legal</p><h1 class="mt-2 text-4xl font-black text-primary">Terms of Use</h1><p class="mt-4 text-slate-600">Last Updated: June 1, 2026</p></header>
    <article class="prose max-w-none">
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing, browsing, or using RecordWatchdog (the "Site"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree to these terms, you must not access or use the Site. We reserve the right to modify these terms at any time, and your continued use of the Site constitutes acceptance of those changes.</p>

      <h2>2. Nature of the Service</h2>
      <p>RecordWatchdog is strictly an informational directory and search tool aggregator. Our sole purpose is to help users locate official public-record resources, government websites, and authorized third-party legal research tools. <strong>We do not host, generate, compile, or maintain any criminal records, court documents, inmate databases, bankruptcy filings, or sex offender registry records on our servers.</strong> All searches initiated through our Site redirect you to the respective official government or authorized third-party websites.</p>

      <h2>3. Fair Credit Reporting Act (FCRA) Disclaimer</h2>
      <p><strong>IMPORTANT LEGAL NOTICE:</strong> RecordWatchdog is NOT a "consumer reporting agency" as defined by the Fair Credit Reporting Act (FCRA), 15 U.S.C. § 1681 et seq. The information and resources provided on this Site may not be used for any purpose that requires FCRA compliance. This explicitly includes, but is not limited to:</p>
      <ul>
        <li>Employment screening or pre-employment background checks.</li>
        <li>Tenant screening or housing eligibility decisions.</li>
        <li>Credit eligibility or insurance underwriting decisions.</li>
        <li>Determining eligibility for government benefits or licenses.</li>
      </ul>
      <p>Users must verify all information directly with the official source and should not make adverse decisions based solely on information found via this directory. We assume no liability for any actions taken based on the information or links provided on this Site.</p>

      <h2>4. User Conduct and Prohibited Uses</h2>
      <p>You agree to use the Site only for lawful purposes. You agree not to use the Site to: (a) harass, intimidate, or threaten any individual, including individuals listed on public registries; (b) violate any local, state, national, or international law; (c) attempt to gain unauthorized access to any portion of the Site or any other computer system; or (d) use any automated system, including "robots," "spiders," or "offline readers," to access the Site in a manner that sends more request messages to our servers than a human can reasonably produce in the same period.</p>

      <h2>5. Intellectual Property</h2>
      <p>The Site, including its original content, features, functionality, design, and compilation of resources, is owned by RecordWatchdog and is protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, or publicly display any content from our Site without our express written permission.</p>

      <h2>6. Limitation of Liability</h2>
      <p>The Site is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, regarding the accuracy, completeness, reliability, or availability of the information provided. We shall not be liable for any direct, indirect, incidental, consequential, or punitive damages resulting from your use of, or inability to use, the Site or any third-party websites linked herein.</p>

      <h2>7. Governing Law</h2>
      <p>These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms will be brought exclusively in the federal or state courts located in Delaware.</p>

      <h2>8. Contact Information</h2>
      <p>For questions regarding these Terms of Use, please contact us at: <strong>niko@nwbventures.com</strong></p>
    </article>
  </section>
`, termsSchema);

// 3. About
const aboutSchema = { "@context": "https://schema.org", "@type": "AboutPage", "name": "About RecordWatchdog", "description": "Learn about RecordWatchdog's mission to make public records accessible, our core values, and our commitment to transparency." };
writePage('about', 'About RecordWatchdog - Free Public Records Directory', 'Learn about RecordWatchdog\'s mission to make public records accessible. We provide free, transparent access to official government sources and public records.', `
  <section class="mx-auto max-w-4xl px-5 py-16">
    <header class="mb-8"><p class="font-black uppercase tracking-[0.18em] text-accent">About Us</p><h1 class="mt-2 text-4xl font-black text-primary">About RecordWatchdog</h1><p class="mt-4 text-xl leading-8 text-slate-600">Making public records accessible, understandable, and easy to navigate for everyone.</p></header>
    <article class="prose max-w-none">
      <h2>Our Mission</h2>
      <p>RecordWatchdog was founded with a clear and simple mission: to organize the highly fragmented, often confusing landscape of U.S. public records into one streamlined, user-friendly, and completely free directory. Whether you are a small business owner researching a potential vendor, a homeowner verifying a contractor's license, or a citizen looking up local court procedures, finding the correct official government portal should not require hours of frustrating web searches. We do the heavy lifting of cataloging, verifying, and organizing these official search portals so you can find what matters without the guesswork.</p>

      <h2>Why We Built RecordWatchdog</h2>
      <p>The internet is filled with predatory "people search" and "background check" websites that charge exorbitant hidden fees for basic information that is actually available for free directly from government sources. These sites often use deceptive marketing to trick users into recurring subscriptions. We built RecordWatchdog as an antidote to this practice. We provide direct, transparent, and free pathways to the official .gov and authorized county websites where public records actually reside.</p>

      <h2>Our Core Values</h2>
      <ul>
        <li><strong>Official Sources Only:</strong> We rigorously prioritize direct links to official .gov, .state.us, and verified county court websites. We do not link to predatory data brokers or paywalled third-party aggregators.</li>
        <li><strong>Privacy-First Design:</strong> We believe you shouldn't have to trade your privacy to access public information. You can use our directory completely anonymously, without creating an account, providing an email, or handing over your personal data to data brokers.</li>
        <li><strong>Radical Transparency:</strong> We are completely clear about what we are and what we are not. We are an informational directory. We do not host, generate, or sell personal data, and we are not a consumer reporting agency under the FCRA.</li>
        <li><strong>Accessibility and Education:</strong> Beyond just providing links, we strive to educate our users. Our comprehensive blog and guides are designed to demystify legal jargon and explain exactly how to navigate complex government systems.</li>
      </ul>

      <h2>Our Commitment to Accuracy</h2>
      <p>Government websites frequently update their domains, search portals, and user interfaces. Our team continuously monitors and verifies the links in our directory to ensure they remain accurate, functional, and secure. If you ever encounter a broken link or an outdated resource, we encourage you to report it to us so we can fix it immediately.</p>

      <h2>Contact Us</h2>
      <p>We welcome your feedback, corrections, and partnership inquiries. If you have a suggestion for a resource we should add, or if you need to report an issue, please reach out to us at: <strong>niko@nwbventures.com</strong></p>
    </article>
  </section>
`, aboutSchema);

// 4. Contact
const contactSchema = { "@context": "https://schema.org", "@type": "ContactPage", "name": "Contact RecordWatchdog", "description": "Get in touch with the RecordWatchdog team." };
writePage('contact', 'Contact RecordWatchdog - Get Help & Support', 'Contact the RecordWatchdog team for help with public records searches, report broken links, or ask questions. We provide support for users navigating databases.', `
  <section class="mx-auto max-w-4xl px-5 py-16">
    <header class="mb-8"><p class="font-black uppercase tracking-[0.18em] text-accent">Get in Touch</p><h1 class="mt-2 text-4xl font-black text-primary">Contact Us</h1><p class="mt-4 text-xl leading-8 text-slate-600">Have a question, correction, or business inquiry? We'd love to hear from you.</p></header>
    <article class="prose max-w-none">
      <div class="grid gap-10 lg:grid-cols-2">
        <div class="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 class="text-xl font-black text-primary">Direct Email</h2>
          <p class="mt-3 text-slate-600">For general inquiries, legal requests, or partnership opportunities, please email us directly. We typically respond within 24-48 business hours.</p>
          <a href="mailto:niko@nwbventures.com" class="mt-4 block text-lg font-bold text-accent transition hover:underline">niko@nwbventures.com</a>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 class="text-xl font-black text-primary mb-4">Send a Message</h2>
          <form action="https://formspree.io/f/xqeowkpw" method="POST" class="space-y-5">
            <div><label class="mb-1 block text-sm font-bold text-slate-700">Name</label><input required type="text" name="name" class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-accent" /></div>
            <div><label class="mb-1 block text-sm font-bold text-slate-700">Email</label><input required type="email" name="email" class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-accent" /></div>
            <div><label class="mb-1 block text-sm font-bold text-slate-700">Message</label><textarea required name="message" rows="5" class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-accent"></textarea></div>
            <button type="submit" class="w-full rounded-xl bg-accent py-4 font-black text-white shadow-md transition hover:bg-[#e55a25]">Send Message</button>
          </form>
        </div>
      </div>

      <div class="mt-12">
        <h2 class="text-2xl font-black text-primary">What Can We Help You With?</h2>
        <p class="mt-4 text-slate-600 leading-7">RecordWatchdog is committed to providing the best possible experience for users seeking public records. Whether you need assistance navigating our directory, have a question about a specific resource, or want to report an issue, we're here to help. Below are some common reasons users contact us:</p>
        
        <div class="mt-6 grid gap-4 md:grid-cols-2">
          <div class="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h3 class="text-lg font-black text-primary">Report Broken Links</h3>
            <p class="mt-2 text-sm text-slate-600">Government websites frequently update their domains and interfaces. If you encounter a broken or outdated link in our directory, please let us know so we can fix it immediately.</p>
          </div>
          <div class="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h3 class="text-lg font-black text-primary">Suggest New Resources</h3>
            <p class="mt-2 text-sm text-slate-600">Know of an official government portal or public record database that should be in our directory? We welcome suggestions for new resources to add.</p>
          </div>
          <div class="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h3 class="text-lg font-black text-primary">Partnership Inquiries</h3>
            <p class="mt-2 text-sm text-slate-600">Interested in partnering with RecordWatchdog? We're open to collaborations with government agencies, legal organizations, and other public interest groups.</p>
          </div>
          <div class="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h3 class="text-lg font-black text-primary">General Questions</h3>
            <p class="mt-2 text-sm text-slate-600">Have a question about using our directory or understanding public records? We're happy to provide guidance and point you in the right direction.</p>
          </div>
        </div>

        <h2 class="mt-10 text-2xl font-black text-primary">Response Times</h2>
        <p class="mt-4 text-slate-600 leading-7">We strive to respond to all inquiries promptly. General questions and link reports are typically addressed within 24-48 business hours. Legal requests and DMCA notices may take longer to process as they require careful review. For urgent matters, please indicate the urgency in your message subject line.</p>

        <h2 class="mt-10 text-2xl font-black text-primary">Important Notice</h2>
        <p class="mt-4 text-slate-600 leading-7">Please note that RecordWatchdog is a directory service and does not host or maintain any public records. We cannot provide specific information about individuals, court cases, or other records. For actual record searches, please use the official government portals linked in our directory. We also cannot provide legal advice or interpret legal documents. If you need legal assistance, please consult with a qualified attorney.</p>
      </div>
    </article>
  </section>
`, contactSchema);

// 5. DMCA
const dmcaSchema = { "@context": "https://schema.org", "@type": "WebPage", "name": "DMCA Policy", "description": "RecordWatchdog Digital Millennium Copyright Act policy and takedown procedures." };
writePage('dmca', 'DMCA Policy - Copyright Takedown Procedures | RecordWatchdog', 'Read our DMCA Policy for copyright infringement notices. Learn how to submit takedown requests and our procedures for handling copyright claims and disputes.', `
  <section class="mx-auto max-w-4xl px-5 py-16">
    <header class="mb-8"><p class="font-black uppercase tracking-[0.18em] text-accent">Legal</p><h1 class="mt-2 text-4xl font-black text-primary">DMCA Policy</h1><p class="mt-4 text-slate-600">Last Updated: June 1, 2026</p></header>
    <article class="prose max-w-none">
      <h2>1. Policy Overview</h2>
      <p>RecordWatchdog respects the intellectual property rights of others. In accordance with the Digital Millennium Copyright Act (DMCA), we will respond expeditiously to claims of copyright infringement. This policy outlines the procedures for submitting copyright infringement claims and our response process.</p>
      <p>The DMCA is a United States copyright law that provides limitations and exceptions to copyright liability for online service providers. As an online directory and information aggregator, RecordWatchdog complies with the safe harbor provisions of the DMCA to protect both our users and copyright holders.</p>

      <h2>2. Our Commitment to Copyright Compliance</h2>
      <p>RecordWatchdog is primarily a directory service that provides links to official government websites and public record databases. We do not host, store, or distribute copyrighted materials on our servers. However, we recognize that copyright issues can arise in connection with user-submitted content, third-party links, or other aspects of our service.</p>
      <p>We are committed to:</p>
      <ul>
        <li>Responding promptly to legitimate copyright infringement notifications</li>
        <li>Removing or disabling access to allegedly infringing material when appropriate</li>
        <li>Terminating repeat infringers in appropriate circumstances</li>
        <li>Accommodating standard technical measures used by copyright owners to identify or protect copyrighted works</li>
      </ul>

      <h2>3. Notice of Copyright Infringement</h2>
      <p>If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, please notify our designated copyright agent. To be effective, the notification must be in writing and include the following information:</p>
      <ul>
        <li><strong>Physical or Electronic Signature:</strong> A physical or electronic signature of a person authorized to act on behalf of the owner of the exclusive right that is allegedly infringed.</li>
        <li><strong>Identification of Copyrighted Work:</strong> Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works at a single online site are covered by a single notification, a representative list of such works at that site.</li>
        <li><strong>Identification of Infringing Material:</strong> Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate the material (including the specific URL).</li>
        <li><strong>Contact Information:</strong> Information reasonably sufficient to permit us to contact the complaining party, such as an address, telephone number, and, if available, an electronic mail address at which the complaining party may be contacted.</li>
        <li><strong>Good Faith Statement:</strong> A statement that the complaining party has a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
        <li><strong>Statement of Accuracy:</strong> A statement that the information in the notification is accurate, and under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
      </ul>

      <h2>4. Designated Copyright Agent</h2>
      <p>Please send all DMCA notices to our designated agent at: <strong>niko@nwbventures.com</strong> with the subject line "DMCA Takedown Request". We will review your notice and take appropriate action, which may include removing or disabling access to the allegedly infringing material.</p>
      <p>Please note that under the DMCA, you may be liable for damages (including costs and attorneys' fees) if you materially misrepresent that material or activity is infringing. If you are unsure whether the material you are reporting is infringing, we suggest consulting with an attorney.</p>

      <h2>5. Counter-Notification</h2>
      <p>If you believe that your material was removed or disabled as a result of mistake or misidentification, you may submit a counter-notification to our designated agent. The counter-notification must include:</p>
      <ul>
        <li>Your physical or electronic signature</li>
        <li>Identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or disabled</li>
        <li>A statement under penalty of perjury that you have a good faith belief that the material was removed or disabled as a result of mistake or misidentification</li>
        <li>Your name, address, and telephone number</li>
        <li>A statement that you consent to the jurisdiction of the federal district court for the judicial district in which your address is located (or the federal district court for the District of Delaware if your address is outside of the United States), and that you will accept service of process from the person who provided notification of the alleged infringement</li>
      </ul>
      <p>If we receive a valid counter-notification, we will forward it to the party who submitted the original notification. That party will then have 10 business days to initiate legal proceedings to seek a court order to restrain the relevant activity. If we do not receive such notice within 10 business days, we will restore the removed or disabled material.</p>

      <h2>6. Repeat Infringers</h2>
      <p>RecordWatchdog reserves the right to disable or terminate accounts of users who are found to be repeat infringers or who are found to have committed other acts of intellectual property infringement. This policy applies to all users of our service.</p>

      <h2>7. Changes to This DMCA Policy</h2>
      <p>We may update this DMCA Policy from time to time to reflect changes in law, regulations, or our business practices. When we make changes, we will update the "Last Updated" date at the top of this page. We encourage you to review this policy periodically to stay informed about our copyright practices.</p>

      <h2>8. Contact Us</h2>
      <p>If you have any questions about this DMCA Policy or our copyright practices, please contact us at: <strong>niko@nwbventures.com</strong></p>
    </article>
  </section>
`, dmcaSchema);

// 5.5 Cookie Policy
const cookieSchema = { "@context": "https://schema.org", "@type": "WebPage", "name": "Cookie Policy", "description": "RecordWatchdog Cookie Policy explaining how we use cookies and similar tracking technologies." };
writePage('cookie-policy', 'Cookie Policy - How We Use Cookies | RecordWatchdog', 'Learn how RecordWatchdog uses cookies for analytics, advertising, and site functionality. Understand your options for managing and disabling cookies on our site.', `
  <section class="mx-auto max-w-4xl px-5 py-16">
    <header class="mb-8"><p class="font-black uppercase tracking-[0.18em] text-accent">Legal</p><h1 class="mt-2 text-4xl font-black text-primary">Cookie Policy</h1><p class="mt-4 text-slate-600">Last Updated: June 1, 2026</p></header>
    <article class="prose max-w-none">
      <h2>1. What Are Cookies</h2>
      <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide useful information to website owners. Cookies allow a website to recognize your device and remember information about your visit, such as your preferred language, login details, and other settings.</p>
      <p>Similar technologies include web beacons, pixels, and local storage, which we may also use to provide certain features on our Site. Throughout this Cookie Policy, we refer to all these technologies collectively as "cookies."</p>

      <h2>2. How We Use Cookies</h2>
      <p>RecordWatchdog uses cookies for the following purposes:</p>
      <ul>
        <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You may not opt out of these cookies as the website cannot function properly without them.</li>
        <li><strong>Analytics Cookies:</strong> We use cookies to collect information about how visitors use our website. These cookies help us understand which pages are visited most often and how users move around the site. This information is used to improve how the website works. We use Google Analytics, which sets cookies to track user interactions anonymously.</li>
        <li><strong>Advertising Cookies:</strong> We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads based on a user's prior visits to our website and other websites on the Internet. Google uses its DoubleClick cookie to serve ads. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google Ads Settings</a>.</li>
        <li><strong>Preference Cookies:</strong> These cookies allow our website to remember choices you make (such as your language preference) and provide enhanced, more personalized features.</li>
      </ul>

      <h2>3. Third-Party Cookies</h2>
      <p>In addition to our own cookies, we also allow trusted third parties to set cookies on your device. These include:</p>
      <ul>
        <li><strong>Google Analytics:</strong> For website analytics and performance tracking. Google Analytics cookies collect information anonymously and report website trends without identifying individual visitors. Visit <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google's Privacy Policy</a> for more information.</li>
        <li><strong>Google AdSense:</strong> For serving personalized advertisements. Google may use cookies to serve ads based on your prior visits to our site or other sites. You can opt out of personalized ads by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google Ads Settings</a> or by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener">www.aboutads.info/choices</a>.</li>
      </ul>

      <h2>4. Managing Cookies</h2>
      <p>You can control and manage cookies in various ways. Please note that removing or blocking cookies may impact your user experience and some functionality may no longer be available.</p>
      <ul>
        <li><strong>Browser Settings:</strong> Most browsers allow you to manage cookie settings through their settings menu. You can usually find these settings in the "Options" or "Preferences" menu of your browser. The following links may be helpful: <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Chrome</a>, <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener">Firefox</a>, <a href="https://support.microsoft.com/en-us/microsoft-edge/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener">Edge</a>, <a href="https://support.apple.com/guide/safari/sfri11471/mac" target="_blank" rel="noopener">Safari</a>.</li>
        <li><strong>Opt-Out Tools:</strong> You can opt out of Google Analytics cookies by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google Analytics Opt-out Browser Add-on</a>. You can opt out of Google AdSense personalized ads by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google Ads Settings</a>.</li>
        <li><strong>Cookie Consent Banner:</strong> When you first visit our website, you will see a cookie consent banner. You can accept all cookies or customize your preferences. You can change your cookie preferences at any time by clearing your browser cookies.</li>
      </ul>

      <h2>5. Cookie Consent</h2>
      <p>When you first visit our website, we will ask for your consent to set cookies on your device. You can give your consent by clicking "Accept All" on our cookie banner. You can withdraw your consent at any time by deleting cookies from your browser or by adjusting your browser settings to block cookies.</p>
      <p>Please note that if you disable cookies, some features of our website may not function properly, and your user experience may be affected.</p>

      <h2>6. Changes to This Cookie Policy</h2>
      <p>We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. When we make changes, we will update the "Last Updated" date at the top of this page. We encourage you to review this Cookie Policy periodically to stay informed about how we use cookies.</p>

      <h2>7. Contact Us</h2>
      <p>If you have any questions about our use of cookies or this Cookie Policy, please contact us at: <strong>niko@nwbventures.com</strong></p>
    </article>
  </section>
`, cookieSchema);

// 6. FAQ
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "name": "Frequently Asked Questions", "description": "Answers to common questions about using RecordWatchdog and public records." };
writePage('faq', 'FAQ - Common Questions About Public Records | RecordWatchdog', 'Find answers to frequently asked questions about RecordWatchdog, public records searches, privacy, and our directory services. Get help using our site.', `
  <section class="mx-auto max-w-4xl px-5 py-16">
    <header class="mb-8 text-center">
      <p class="font-black uppercase tracking-[0.18em] text-accent">Support</p>
      <h1 class="mt-2 text-4xl font-black text-primary">Frequently Asked Questions</h1>
      <p class="mt-4 text-xl leading-8 text-slate-600">Everything you need to know about using RecordWatchdog to find official public records.</p>
    </header>
    <article class="prose max-w-none space-y-8">
      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 class="mt-0 text-xl font-black text-primary">Is RecordWatchdog free to use?</h2>
        <p class="text-slate-700">Yes, our directory is completely free. We provide direct, verified links to official government portals. While our directory is free, please note that some official government databases may charge a small, standard fee for downloading certified copies of specific documents (like a certified deed or a PACER court document).</p>
      </div>
      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 class="mt-0 text-xl font-black text-primary">Do you host criminal records or personal data?</h2>
        <p class="text-slate-700">No. RecordWatchdog is strictly an informational directory and search tool aggregator. We do not host, generate, compile, or maintain any criminal records, court documents, inmate databases, bankruptcy filings, or personal data on our servers. All searches initiated through our site redirect you directly to the official, secure government websites where this data is legally maintained.</p>
      </div>
      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 class="mt-0 text-xl font-black text-primary">Can I use this site for employment background checks?</h2>
        <p class="text-slate-700">No. RecordWatchdog is NOT a "consumer reporting agency" as defined by the Fair Credit Reporting Act (FCRA). Our resources may not be used for tenant screening, employment background checks, credit eligibility decisions, insurance underwriting, or any other FCRA-regulated purpose. You must use a certified, FCRA-compliant background check provider for those purposes.</p>
      </div>
      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 class="mt-0 text-xl font-black text-primary">Why do some county searches require a visit to the courthouse?</h2>
        <p class="text-slate-700">While many counties offer robust, free online databases, the digitization of public records is an ongoing process that varies by jurisdiction. Some smaller or rural counties have not fully digitized their historical records. In these cases, you may need to visit the county clerk's office in person, use their public access terminals, or submit a formal written request to access older physical files.</p>
      </div>
      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 class="mt-0 text-xl font-black text-primary">How do I report a broken or outdated link?</h2>
        <p class="text-slate-700">We continuously monitor and verify the links in our directory, but government websites frequently update their domains and user interfaces. If you encounter a broken link or an outdated resource, please contact us immediately at <strong>niko@nwbventures.com</strong> so we can fix it.</p>
      </div>
    </article>
  </section>
`, faqSchema);

// 7. Blog listing + individual posts (newest first, driven by src/data/posts.js)
const CAT_STYLE = {
  states:   { grad: 'from-[#0a3d62] to-[#2b86c5]', icon: '🗺️', tint: 'text-[#0a3d62]', soft: 'bg-sky-50' },
  business: { grad: 'from-[#0f2a6b] to-[#3b6fe0]', icon: '🏢', tint: 'text-[#0f2a6b]', soft: 'bg-blue-50' },
  courts:   { grad: 'from-[#3b1d6e] to-[#8a5ce0]', icon: '⚖️', tint: 'text-[#3b1d6e]', soft: 'bg-violet-50' },
  property: { grad: 'from-[#0b5a49] to-[#22b08a]', icon: '🏠', tint: 'text-[#0b5a49]', soft: 'bg-emerald-50' },
  safety:   { grad: 'from-[#a3330b] to-[#ff7a3d]', icon: '🛡️', tint: 'text-[#a3330b]', soft: 'bg-orange-50' }
};
const postCard = (post, h = 'h2', featured = false) => {
  const st = CAT_STYLE[post.category] || CAT_STYLE.property;
  return `
  <a href="/blog/${post.slug}/" data-cat="${post.category}" data-search="${(post.title + ' ' + post.excerpt + ' ' + categoryName(post.category)).toLowerCase().replace(/"/g, '&quot;')}" class="blog-card group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-2xl ${featured ? 'md:col-span-2' : ''}">
    <div class="relative flex ${featured ? 'h-44 md:h-52' : 'h-28'} items-end bg-gradient-to-br ${st.grad} p-5">
      <span class="pointer-events-none absolute right-5 top-3 select-none text-5xl opacity-30 transition duration-300 group-hover:scale-110 group-hover:opacity-60" aria-hidden="true">${st.icon}</span>
      <span class="rounded-full bg-white px-3 py-1 text-[11px] font-black uppercase tracking-wider ${st.tint}">${categoryName(post.category)}</span>
    </div>
    <div class="flex flex-1 flex-col p-6">
      <${h} class="${featured ? 'text-2xl md:text-3xl' : 'text-xl'} font-black leading-snug text-primary transition group-hover:text-accent">${post.title}</${h}>
      <p class="mt-3 flex-1 text-sm leading-6 text-slate-600 ${featured ? '' : 'line-clamp-3'}">${post.excerpt}</p>
      <div class="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-500">
        <span>${post.date} &bull; ${post.readMins} min read</span>
        <span class="text-sm font-black text-accent transition group-hover:translate-x-1">Read &rarr;</span>
      </div>
    </div>
  </a>`;
};

const filterBtn = (id, label, active) => `<button type="button" data-filter="${id}" class="filter-btn rounded-full border border-slate-200 px-4 py-2 text-sm font-bold transition ${active ? 'bg-accent text-white' : 'bg-white text-primary'}">${label}</button>`;
const filterButtons = filterBtn('all', 'All guides (' + blogPosts.length + ')', true) + CATEGORIES.map(c => filterBtn(c.id, c.name, false)).join('');
const filterScript = `<script>(function(){var btns=document.querySelectorAll('.filter-btn'),cards=document.querySelectorAll('.blog-card'),box=document.getElementById('guide-search'),none=document.getElementById('no-results'),cat='all',q='';function apply(){var terms=q.split(/\\s+/).filter(Boolean),shown=0;cards.forEach(function(c){var ok=(cat==='all'||c.getAttribute('data-cat')===cat);if(ok){var hay=c.getAttribute('data-search')||'';ok=terms.every(function(t){return hay.indexOf(t)>-1;});}c.style.display=ok?'':'none';if(ok)shown++;});if(none)none.classList.toggle('hidden',shown>0);}btns.forEach(function(x){x.addEventListener('click',function(){cat=x.getAttribute('data-filter');btns.forEach(function(y){y.classList.toggle('bg-accent',y===x);y.classList.toggle('text-white',y===x);y.classList.toggle('bg-white',y!==x);y.classList.toggle('text-primary',y!==x);});apply();});});if(box)box.addEventListener('input',function(){q=box.value.toLowerCase().trim();apply();});})();</script>`;

const blogIndexSchema = { "@context": "https://schema.org", "@type": "Blog", "name": "RecordWatchdog Guides", "description": "Plain-English guides on how to find and understand public records.", "url": "https://recordwatchdog.com/blog/" };

const startSlugs = ['beginners-guide-to-foia-requests', 'guide-to-county-court-records-and-lawsuit-searches', 'understanding-llc-filings-and-business-entity-searches', 'how-to-find-property-records-and-liens-in-your-county', 'protecting-your-privacy-when-searching-public-records'];
startSlugs.forEach(sl => { if (!blogPosts.find(p => p.slug === sl)) throw new Error('Missing start-here guide: ' + sl); });
const startPicks = startSlugs.map(sl => blogPosts.find(p => p.slug === sl));
const recentlyUpdated = blogPosts.filter(p => p.wasUpdated).sort((a, b) => b.updatedIso.localeCompare(a.updatedIso) || b.id - a.id).slice(0, 5);

writePage('blog', 'Public Records Guides & How-Tos | RecordWatchdog', 'Plain-English guides to public records: court searches, business filings, property records, bankruptcy, FOIA requests, and more. Newest guides first.', `
  <section class="mx-auto max-w-7xl px-5 py-16">
    <header class="mb-10 text-center">
      <p class="font-black uppercase tracking-[0.18em] text-accent">Guides</p>
      <h1 class="mt-2 text-4xl font-black text-primary md:text-5xl">Public Records Guides</h1>
      <p class="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">Step-by-step explanations of how court, business, property, and bankruptcy records work, with links to the official sources. Newest guides first.</p>
    </header>
    <div class="mx-auto mb-6 max-w-xl">
      <label for="guide-search" class="sr-only">Search guides</label>
      <input id="guide-search" type="search" placeholder="Search guides, e.g. bankruptcy, FOIA, liens" autocomplete="off" class="w-full rounded-full border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-900 shadow-sm outline-none focus:border-accent focus:ring-4 focus:ring-orange-100" />
    </div>
    <div class="mb-8 flex flex-wrap justify-center gap-3">${filterButtons}</div>
    <p id="no-results" class="hidden mb-8 text-center font-bold text-slate-600">No guides match your search. Try a different word or choose All guides.</p>
    <div class="grid gap-8 lg:grid-cols-[1fr_350px]">
      <div class="grid gap-8 sm:grid-cols-2">${blogPosts.map(p => postCard(p)).join('')}</div>
      <aside class="space-y-8">
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="text-lg font-black text-primary">How These Guides Work</h2>
          <p class="mt-3 text-sm leading-6 text-slate-600">Each guide points to the official government source it describes. Every page shows when it was published and, if changed, when it was last updated. Fees, procedures, and office names change, so confirm details with the agency before relying on them. If you spot an error, please contact us and we will correct it.</p>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="text-lg font-black text-primary">Browse by Topic</h2>
          <ul class="mt-3 space-y-3 text-sm">
            ${CATEGORIES.map(c => `<li><a href="/blog/category/${c.id}/" class="font-bold text-primary hover:text-accent">${c.name}</a><br /><span class="text-slate-500">${c.blurb}</span></li>`).join('')}
          </ul>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="text-lg font-black text-primary">New Here? Start With These</h2>
          <ul class="mt-3 space-y-3 text-sm">
            ${startPicks.map(p => `<li><a href="/blog/${p.slug}/" class="font-bold text-accent hover:underline">${p.title}</a></li>`).join('')}
          </ul>
          <a href="/start-here/" class="mt-4 block text-sm font-black text-primary hover:text-accent">Public records by situation &rarr;</a>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="text-lg font-black text-primary">Recently Updated</h2>
          <ul class="mt-3 space-y-3 text-sm">
            ${recentlyUpdated.map(p => `<li><a href="/blog/${p.slug}/" class="font-bold text-accent hover:underline">${p.title}</a><br /><span class="text-xs text-slate-500">Updated ${p.updated}</span></li>`).join('')}
          </ul>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-[#071638] p-6 text-white shadow-sm">
          <h2 class="text-lg font-black">Ready to Search?</h2>
          <p class="mt-3 text-sm leading-6 text-slate-300">Use the free directory to jump to official state, county, and federal record portals.</p>
          <a href="/#directory" class="mt-6 block w-full rounded-xl bg-accent py-3 text-center font-black text-white transition hover:bg-[#e55a25]">Open the Directory</a>
        </div>
      </aside>
    </div>
  </section>
  ${filterScript}
`, blogIndexSchema);

const slugifyHeading = (t) => t.replace(/<[^>]+>/g, '').toLowerCase().replace(/&amp;/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
function addToc(html) {
  const toc = [];
  const out = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (m, inner) => {
    const id = slugifyHeading(inner);
    toc.push({ id, text: inner.replace(/<[^>]+>/g, '') });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: out, toc };
}

blogPosts.forEach(post => {
  const { html: bodyHtml, toc } = addToc(post.content);
  const im = imageMeta[post.slug];
  const heroHtml = im ? `<figure class="article-hero"><img src="${pickImg('hero', post.slug)}" alt="${im.heroAlt}" width="1200" height="420" decoding="async" fetchpriority="high" /></figure>` : '';
  let bodyWithMid = bodyHtml;
  if (im) {
    const heads = [...bodyHtml.matchAll(/<h2 id=/g)].map(m => m.index);
    if (heads.length >= 3) {
      const at = heads[Math.floor(heads.length / 2)];
      const midHtml = `<figure class="guide-figure mid-figure"><img src="${pickImg('mid', post.slug)}" alt="${im.midAlt}" width="1200" height="240" loading="lazy" decoding="async" /><figcaption><strong>Tip:</strong> ${im.tip}</figcaption></figure>`;
      bodyWithMid = bodyHtml.slice(0, at) + midHtml + bodyHtml.slice(at);
    }
  }
  const related = [
    ...blogPosts.filter(p => p.slug !== post.slug && p.category === post.category),
    ...blogPosts.filter(p => p.slug !== post.slug && p.category !== post.category)
  ].slice(0, 3);
  const catName = categoryName(post.category);
  const postSchema = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.iso,
      "dateModified": post.updatedIso,
      "wordCount": post.words,
      "articleSection": catName,
      "mainEntityOfPage": `https://recordwatchdog.com/blog/${post.slug}/`,
      "author": { "@type": "Organization", "name": post.author },
      "publisher": { "@type": "Organization", "name": "RecordWatchdog", "logo": { "@type": "ImageObject", "url": "https://recordwatchdog.com/recordwatchdog-logo.png" } }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recordwatchdog.com/" },
        { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://recordwatchdog.com/blog/" },
        { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://recordwatchdog.com/blog/${post.slug}/` }
      ]
    }
  ];
  const tocHtml = toc.length >= 3 ? `
          <nav aria-label="Table of contents" class="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p class="text-sm font-black uppercase tracking-[0.14em] text-primary">In this guide</p>
            <ol class="mt-3 list-decimal space-y-1 pl-5 text-sm text-slate-700">
              ${toc.map(t => `<li><a href="#${t.id}" class="text-accent hover:underline">${t.text}</a></li>`).join('')}
            </ol>
          </nav>` : '';
  const initials = post.author.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const takeawaysHtml = post.takeaways.length ? `
          <div class="mt-8 rounded-2xl border-l-4 border-accent bg-orange-50 p-6">
            <p class="text-sm font-black uppercase tracking-[0.14em] text-accent">Key takeaways</p>
            <ul class="mt-3 space-y-2 text-slate-800">
              ${post.takeaways.map(x => `<li class="flex gap-3"><span class="mt-0.5 font-black text-accent" aria-hidden="true">&#10003;</span><span>${x}</span></li>`).join('')}
            </ul>
          </div>` : '';
  const sourcesHtml = `
          <div class="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 class="text-lg font-black text-primary">Official Sources and Further Reading</h2>
            <ul class="mt-3 space-y-2 text-sm">
              ${post.sources.map(x => `<li><a href="${x.url}" target="_blank" rel="noopener noreferrer" class="font-bold text-accent hover:underline">${x.label}</a></li>`).join('')}
            </ul>
            <p class="mt-4 text-sm leading-6 text-slate-600">Fees, deadlines, and procedures change and differ by state and county. Confirm details on the official government website or with the office that holds the record before you rely on them. <a href="/#directory" class="font-bold text-accent hover:underline">Open the directory</a> to find the official portal for your state.</p>
          </div>`;
  const authorHtml = `
          <div class="mt-6 flex gap-4 rounded-2xl border border-slate-200 bg-white p-6">
            <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#071638] text-lg font-black text-white" aria-hidden="true">${initials}</div>
            <div>
              <p class="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Written by</p>
              <p class="text-lg font-black text-primary">${post.author}</p>
              <p class="mt-1 text-sm leading-6 text-slate-600">${AUTHOR_BIO}</p>
              <p class="mt-2 text-xs font-semibold text-slate-500">Published ${post.date}${post.wasUpdated ? ' &bull; Last updated ' + post.updated : ''}</p>
            </div>
          </div>`;
  const idx = blogPosts.indexOf(post);
  const newer = idx > 0 ? blogPosts[idx - 1] : null;
  const older = idx < blogPosts.length - 1 ? blogPosts[idx + 1] : null;
  const postUrl = `https://recordwatchdog.com/blog/${post.slug}/`;
  const enc = encodeURIComponent;
  const pill = 'rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-primary transition hover:border-accent hover:text-accent';
  const shareHtml = `
          <div class="mt-10 flex flex-wrap items-center gap-3 border-y border-slate-200 py-4">
            <span class="text-sm font-black text-primary">Share this guide</span>
            <button type="button" data-copy="${postUrl}" class="copy-link ${pill}">Copy link</button>
            <a href="mailto:?subject=${enc(post.title)}&amp;body=${enc(postUrl)}" class="${pill}">Email</a>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${enc(postUrl)}" target="_blank" rel="noopener noreferrer" class="${pill}">LinkedIn</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${enc(postUrl)}" target="_blank" rel="noopener noreferrer" class="${pill}">Facebook</a>
            <a href="https://twitter.com/intent/tweet?url=${enc(postUrl)}&amp;text=${enc(post.title)}" target="_blank" rel="noopener noreferrer" class="${pill}">X</a>
          </div>
          <script>document.querySelectorAll('.copy-link').forEach(function(b){b.addEventListener('click',function(){var u=b.getAttribute('data-copy');var done=function(){b.textContent='Link copied';setTimeout(function(){b.textContent='Copy link';},2000);};if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(u).then(done,done);}else{var i=document.createElement('input');i.value=u;document.body.appendChild(i);i.select();document.execCommand('copy');document.body.removeChild(i);done();}});});</script>`;
  const correctionHtml = `
          <p class="mt-6 text-sm leading-6 text-slate-600"><strong class="text-slate-800">Spotted an error or an outdated detail?</strong> Fees, deadlines, and procedures change. <a href="/contact/" class="font-bold text-accent hover:underline">Tell us</a> and we will review and correct the guide.</p>`;
  const navCard = (p, label, right) => `<a href="/blog/${p.slug}/" class="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-accent hover:shadow-md ${right ? 'sm:text-right' : ''}"><p class="text-xs font-black uppercase tracking-[0.14em] text-slate-500">${label}</p><p class="mt-2 font-black leading-snug text-primary group-hover:text-accent">${p.title}</p></a>`;
  const prevNextHtml = `
          <nav aria-label="More guides" class="mt-10 grid gap-4 sm:grid-cols-2">
            ${newer ? navCard(newer, '&larr; Newer guide', false) : '<div></div>'}
            ${older ? navCard(older, 'Older guide &rarr;', true) : '<div></div>'}
          </nav>`;
  writePage(`blog/${post.slug}`, `${post.title} | RecordWatchdog`, post.excerpt, `
    <div class="mx-auto max-w-7xl px-5 py-12">
      <nav aria-label="Breadcrumb" class="mb-6 text-sm font-bold text-slate-500">
        <a href="/" class="hover:text-accent">Home</a> <span class="mx-1">/</span>
        <a href="/blog/" class="hover:text-accent">Guides</a> <span class="mx-1">/</span>
        <span class="text-slate-700">${catName}</span>
      </nav>
      <div class="grid gap-10 lg:grid-cols-[1fr_350px]">
        <article>
          <div class="mb-6 flex flex-wrap items-center gap-3 text-sm font-bold text-slate-500">
            <span class="rounded-full bg-orange-50 px-3 py-1 text-accent">${catName}</span>
            <span>Published ${post.date}</span>
            ${post.wasUpdated ? `<span>&bull; Updated ${post.updated}</span>` : ''}
            <span>&bull; ${post.readMins} min read</span>
            <span>&bull; ${post.author}</span>
          </div>
          <h1 class="text-3xl font-black leading-tight text-primary md:text-5xl">${post.title}</h1>
          <p class="mt-6 text-xl leading-8 text-slate-600">${post.excerpt}</p>
          ${heroHtml}${takeawaysHtml}${tocHtml}
          <div class="prose mt-8 max-w-none">${bodyWithMid}</div>
          ${shareHtml}${sourcesHtml}${authorHtml}${correctionHtml}${prevNextHtml}
          <div class="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h2 class="text-xl font-black text-primary">Disclaimer</h2>
            <p class="mt-3 text-sm leading-6 text-slate-600">The information provided in this article is for general informational and educational purposes only and does not constitute legal advice. Public record systems and laws vary by jurisdiction and are subject to change. Always verify information directly with the official government agency or consult with a qualified attorney. RecordWatchdog is not a consumer reporting agency.</p>
          </div>
        </article>
        <aside class="space-y-8">
          <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 class="text-lg font-black text-primary">Related Guides</h2>
            <div class="mt-4 space-y-4">
              ${related.map(p => `
                <a href="/blog/${p.slug}/" class="group block">
                  <h3 class="text-sm font-bold text-primary transition group-hover:text-accent">${p.title}</h3>
                  <p class="mt-1 text-xs text-slate-500">${categoryName(p.category)} &bull; ${p.date}</p>
                </a>`).join('')}
            </div>
            <a href="/blog/" class="mt-5 block text-sm font-black text-accent hover:underline">All guides &rarr;</a>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-[#071638] p-6 text-white shadow-sm">
            <h2 class="text-lg font-black">Start Your Search</h2>
            <p class="mt-3 text-sm leading-6 text-slate-300">Use our free directory to open official state and county record portals.</p>
            <a href="/#directory" class="mt-6 block w-full rounded-xl bg-accent py-3 text-center font-black text-white transition hover:bg-[#e55a25]">Open the Directory</a>
          </div>
        </aside>
      </div>
    </div>
  `, postSchema, `https://recordwatchdog.com/images/og/${post.slug}.jpg`);
});

// Homepage: guides first, directory below (directory markup and scripts are unchanged)
const homeTop = `
  <section class="relative overflow-hidden bg-[#071638] text-white">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,.14),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(255,111,54,.2),transparent_26%)]"></div>
    <div class="relative mx-auto max-w-4xl px-5 py-20 text-center lg:py-28">
      <p class="font-black uppercase tracking-[0.2em] text-accent">Public records guides &amp; free tools</p>
      <h1 class="mt-4 text-4xl font-black leading-tight tracking-tight md:text-6xl">Public Records, <span class="text-accent">Explained Clearly.</span></h1>
      <p class="mx-auto mt-6 max-w-3xl text-xl leading-8 text-slate-200">Plain-English guides to court, business, property, and bankruptcy records, plus free tools that show you where a record is kept and help you write a records request. A free state-by-state search directory is further down the page.</p>
      <div class="mt-10 flex flex-wrap justify-center gap-4">
        <a href="/blog/" class="rounded-xl bg-accent px-8 py-4 font-black text-white shadow-lg transition hover:bg-[#e55a25]">Read the Guides</a>
        <a href="#directory" class="rounded-xl border border-white/30 px-8 py-4 font-black text-white transition hover:bg-white/10">Search the Directory</a>
      </div>
      <div class="mt-12 flex flex-wrap justify-center gap-3 text-sm font-bold text-slate-200">
        <span class="rounded-full border border-white/20 bg-white/10 px-4 py-2">${blogPosts.length} in-depth guides</span>
        <a href="/tools/" class="rounded-full border border-white/20 bg-white/10 px-4 py-2 transition hover:bg-white/20">2 free tools</a>
        <span class="rounded-full border border-white/20 bg-white/10 px-4 py-2">Official sources</span>
      </div>
    </div>
  </section>
`;

const homeGuides = `
  <section id="guides" class="scroll-mt-16 bg-slate-50/70 py-16">
    <div class="mx-auto max-w-7xl px-5">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="font-black uppercase tracking-[0.2em] text-accent">Latest guides</p>
          <h2 class="mt-2 text-3xl font-black text-primary md:text-4xl">Newest Public Records Guides</h2>
          <p class="mt-3 max-w-3xl text-slate-600">Step-by-step explanations of how court, business, property, and bankruptcy records work.</p>
          <p class="mt-3 text-sm font-bold"><a href="/start-here/" class="text-accent hover:underline">New to public records? Start here &rarr;</a></p>
        </div>
        <a href="/blog/" class="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-primary transition hover:border-accent hover:text-accent">View all ${blogPosts.length} guides &rarr;</a>
      </div>
      <div class="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        ${blogPosts.slice(0, 8).map((p, i) => postCard(p, 'h3', i === 0)).join('')}
      </div>
      <div class="mt-16">
        <h2 class="text-2xl font-black text-primary">Browse by Topic</h2>
        <div class="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          ${CATEGORIES.map(c => { const st = CAT_STYLE[c.id]; return `
            <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div class="flex items-center gap-3 bg-gradient-to-br ${st.grad} px-6 py-5 text-white">
                <span class="text-3xl" aria-hidden="true">${st.icon}</span>
                <h3 class="text-lg font-black leading-tight"><a href="/blog/category/${c.id}/" class="hover:underline">${c.name}</a></h3>
              </div>
              <div class="p-6">
                <p class="text-sm leading-6 text-slate-600">${c.blurb}</p>
                <ul class="mt-4 space-y-2 text-sm">
                  ${blogPosts.filter(p => p.category === c.id).slice(0, 3).map(p => `<li><a href="/blog/${p.slug}/" class="font-bold text-accent hover:underline">${p.title}</a></li>`).join('')}
                </ul>
              </div>
            </div>`; }).join('')}
        </div>
      </div>
    </div>
  </section>
`;

// 8. Homepage (static version with full interactive features)
const homeSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "RecordWatchdog",
  "url": "https://recordwatchdog.com/",
  "description": "Free directory to search official public records by state. Find business entity filings, county court records, incarceration databases, and bankruptcy filings.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://recordwatchdog.com/?state={state}",
    "query-input": "required name=state"
  }
};


const bySlug = Object.fromEntries(blogPosts.map(p => [p.slug, p]));
const finderItems = [
  { label: 'A lawsuit, divorce, or other court case', office: 'The Clerk of Court (county or state), or PACER for federal cases', holds: 'Dockets, filings, judgments, and orders for cases filed in that court.', tip: 'Start with the county where the case was filed. Federal and state courts keep separate records.', slugs: ['guide-to-county-court-records-and-lawsuit-searches', 'how-to-read-a-docket-sheet-in-civil-lawsuits'] },
  { label: 'Who owns a property, and any mortgages or liens', office: 'The County Recorder or Register of Deeds, plus the Assessor', holds: 'The recorder keeps deeds, mortgages, liens, and releases. The assessor lists the owner on the tax roll and the assessed value.', tip: 'Search by parcel number when you can. Addresses and owner names are easy to mismatch.', slugs: ['how-to-find-property-records-and-liens-in-your-county', 'county-clerk-vs-recorder-vs-assessor-who-holds-which-records'] },
  { label: 'Whether property taxes are paid', office: 'The County Treasurer or Tax Collector', holds: 'Tax bills, payments, delinquent amounts, and tax sale status.', tip: 'Also look for a recorded tax lien at the recorder\u2019s office.', slugs: ['county-clerk-vs-recorder-vs-assessor-who-holds-which-records', 'how-to-find-property-records-and-liens-in-your-county'] },
  { label: 'Whether an LLC or corporation is active', office: 'The Secretary of State (business filing office) in the state where it was formed', holds: 'Entity status, formation date, registered agent, and annual report filings.', tip: 'Check the state of formation and any state where the company does business.', slugs: ['understanding-llc-filings-and-business-entity-searches', 'the-importance-of-registered-agents-in-business-filings'] },
  { label: 'Checking out a new business partner', office: 'Several sources used together', holds: 'Secretary of State filings, liens and UCC records, court dockets, bankruptcy filings, and licensing boards.', tip: 'Keep a log of each check with the source and the date.', slugs: ['how-to-conduct-due-diligence-on-a-new-business-partner'] },
  { label: 'A bankruptcy filing', office: 'The U.S. Bankruptcy Court, searchable through PACER', holds: 'Petitions, schedules, trustee reports, and discharge or dismissal orders.', tip: 'Look for a discharge order to see how a case ended.', slugs: ['how-to-search-bankruptcy-records-using-pacer', 'understanding-chapter-7-vs-chapter-13-bankruptcy-filings'] },
  { label: 'A contractor\u2019s license', office: 'The state contractor or professional licensing board', holds: 'License status, classification, expiration date, and any discipline.', tip: 'Confirm the license class covers the kind of work you are hiring for.', slugs: ['how-to-verify-a-contractors-business-license'] },
  { label: 'Someone in a state prison or county jail', office: 'The state Department of Corrections (prison) or the county Sheriff (jail)', holds: 'Inmate locators and jail rosters showing custody status.', tip: 'Federal inmates are in a separate system run by the Bureau of Prisons.', slugs: ['how-to-find-incarceration-records-by-state', 'difference-between-state-and-federal-inmate-searches'] },
  { label: 'A sex offender registry search', office: 'The state registry and the National Sex Offender Public Website', holds: 'Registered offender listings, with the details shown varying by state.', tip: 'Registry information is for safety purposes, not for harassment.', slugs: ['navigating-the-national-sex-offender-public-website'] },
  { label: 'A certified copy of a court, land, or business record', office: 'The office that holds the original record', holds: 'Certified or exemplified copies for official use.', tip: 'Ask the agency that will receive it exactly what kind of certification it needs.', slugs: ['how-to-request-certified-copies-of-public-records'] },
  { label: 'Documents held by a government agency', office: 'A public records request: FOIA for federal agencies, your state\u2019s law for state and local ones', holds: 'Agency contracts, emails, reports, and other records that are not already published.', tip: 'Be specific about the records you want and the date range.', slugs: ['beginners-guide-to-foia-requests', 'the-role-of-public-records-in-journalistic-investigations'] },
  { label: 'Protecting my own information in public records', office: 'The office that publishes the record, plus any address confidentiality program you qualify for', holds: 'Court dockets, property records, and business filings can show names and addresses.', tip: 'Ask the custodian about redaction, and ask a legal aid office about sealing.', slugs: ['protecting-your-privacy-when-searching-public-records'] }
];
finderItems.forEach(it => it.slugs.forEach(sl => { if (!bySlug[sl]) throw new Error('Finder tool references missing guide: ' + sl); }));

const fieldCls = 'mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-accent focus:ring-4 focus:ring-orange-100';
const labelCls = 'block text-xs font-black uppercase tracking-[0.12em] text-slate-600';

const homeTools = `
  <section id="tools" class="scroll-mt-16 bg-white py-16">
    <div class="mx-auto max-w-7xl px-5">
      <div class="mx-auto max-w-3xl text-center">
        <p class="font-black uppercase tracking-[0.2em] text-accent">Free tools</p>
        <h1 class="mt-2 text-4xl font-black text-primary md:text-5xl">Free Public Records Tools</h1>
        <p class="mt-3 text-lg leading-8 text-slate-600">Two free helpers for finding the right office and asking an agency for records. Both run in your browser, and nothing you type is sent to us or stored.</p>
      </div>
      <div class="mt-10 grid gap-8 lg:grid-cols-2">

        <div class="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-sm">
          <h3 class="text-2xl font-black text-primary">Which Office Has the Record?</h3>
          <p class="mt-2 text-sm leading-6 text-slate-600">Records are split between many offices. Pick what you are looking for to see where it is usually kept and which guides explain the search.</p>
          <label for="finder-select" class="${labelCls} mt-6">I am looking for</label>
          <select id="finder-select" class="${fieldCls}">
            ${finderItems.map((it, i) => `<option value="${i}">${it.label}</option>`).join('')}
          </select>
          <div class="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            ${finderItems.map((it, i) => `
            <div class="finder-panel" data-id="${i}"${i ? ' hidden' : ''}>
              <p class="text-xs font-black uppercase tracking-[0.14em] text-accent">Start with</p>
              <h4 class="mt-1 text-xl font-black leading-snug text-primary">${it.office}</h4>
              <p class="mt-3 text-sm leading-6 text-slate-600"><strong class="text-slate-800">What it holds:</strong> ${it.holds}</p>
              <p class="mt-2 text-sm leading-6 text-slate-600"><strong class="text-slate-800">Tip:</strong> ${it.tip}</p>
              <p class="mt-5 text-xs font-black uppercase tracking-[0.14em] text-slate-500">Read next</p>
              <ul class="mt-2 space-y-1.5 text-sm">
                ${it.slugs.map(sl => `<li><a href="/blog/${sl}/" class="font-bold text-accent hover:underline">${bySlug[sl].title}</a></li>`).join('')}
              </ul>
            </div>`).join('')}
          </div>
          <p class="mt-4 text-xs leading-5 text-slate-500">Office names differ by state. If you cannot find the right one, call the county clerk's main line and ask who handles the record.</p>
        </div>

        <div class="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-sm">
          <h3 class="text-2xl font-black text-primary">Records Request Letter Builder</h3>
          <p class="mt-2 text-sm leading-6 text-slate-600">Fill in the boxes and get a ready-to-edit letter for a federal FOIA request or a state public records request.</p>
          <div class="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label for="rq-type" class="${labelCls}">Type of request</label>
              <select id="rq-type" class="${fieldCls}"><option value="federal">Federal agency (FOIA)</option><option value="state">State or local agency</option></select>
            </div>
            <div id="rq-law-wrap" hidden>
              <label for="rq-law" class="${labelCls}">Name of state law (optional)</label>
              <input id="rq-law" type="text" placeholder="e.g. California Public Records Act" class="${fieldCls}" />
            </div>
            <div class="sm:col-span-2">
              <label for="rq-agency" class="${labelCls}">Agency or office</label>
              <input id="rq-agency" type="text" placeholder="e.g. Department of Transportation" class="${fieldCls}" />
            </div>
            <div class="sm:col-span-2">
              <label for="rq-desc" class="${labelCls}">Records you want</label>
              <textarea id="rq-desc" rows="3" placeholder="e.g. The signed contract, change orders, and final invoices for the Route 9 resurfacing project" class="${fieldCls}"></textarea>
            </div>
            <div>
              <label for="rq-range" class="${labelCls}">Time period (optional)</label>
              <input id="rq-range" type="text" placeholder="e.g. January 2024 to June 2025" class="${fieldCls}" />
            </div>
            <div>
              <label for="rq-format" class="${labelCls}">Preferred format</label>
              <select id="rq-format" class="${fieldCls}"><option>electronic (PDF)</option><option>electronic (original format)</option><option>paper</option></select>
            </div>
            <div>
              <label for="rq-fee" class="${labelCls}">Fee limit in dollars</label>
              <input id="rq-fee" type="number" min="0" value="25" class="${fieldCls}" />
            </div>
            <div class="flex items-end">
              <label class="flex items-center gap-3 text-sm font-bold text-slate-700"><input id="rq-waiver" type="checkbox" class="h-5 w-5 rounded border-slate-300" /> Ask for a fee waiver</label>
            </div>
            <div>
              <label for="rq-name" class="${labelCls}">Your name</label>
              <input id="rq-name" type="text" class="${fieldCls}" />
            </div>
            <div>
              <label for="rq-email" class="${labelCls}">Your email</label>
              <input id="rq-email" type="email" class="${fieldCls}" />
            </div>
          </div>
          <label for="rq-output" class="${labelCls} mt-6">Your letter</label>
          <textarea id="rq-output" rows="12" readonly class="${fieldCls} font-mono text-xs leading-5"></textarea>
          <div class="mt-3 flex flex-wrap items-center gap-4">
            <button id="rq-copy" type="button" class="rounded-xl bg-accent px-6 py-3 text-sm font-black text-white shadow transition hover:bg-[#e55a25]">Copy letter</button>
            <a href="/blog/beginners-guide-to-foia-requests/" class="text-sm font-bold text-accent hover:underline">Read the beginner's guide to FOIA</a>
          </div>
          <p class="mt-4 text-xs leading-5 text-slate-500">This is a template, not legal advice. Deadlines, fees, and exemptions differ by state, so check the law that applies to your request.</p>
        </div>

      </div>

      <div class="mx-auto mt-14 max-w-3xl">
        <div class="prose max-w-none">
          <h2>How the Office Finder Works</h2>
          <p>County and state governments are organized differently, so the finder shows the office that usually holds each type of record, not a guarantee. It follows the common roles explained in our guide to county clerks, recorders, and assessors. If your county uses different names, search the county website for the record type, such as "deed search" or "marriage license," or call the main county line and ask who handles it.</p>

          <h2>Using Your Request Letter</h2>
          <ol>
            <li><strong>Find the right office.</strong> Federal agencies list a FOIA contact on their websites, and FOIA.gov has a directory. For state and local records, look for the agency's public records officer or custodian.</li>
            <li><strong>Edit the letter.</strong> Replace any bracketed text and make the description of the records as specific as you can. Narrow requests are answered faster.</li>
            <li><strong>Send it and keep a copy.</strong> Use the agency's online portal or email if it has one. Save the date you sent it and any tracking number you receive.</li>
            <li><strong>Follow up.</strong> Federal agencies generally have 20 business days to respond to a FOIA request. State deadlines differ, so check your state's law.</li>
            <li><strong>Know your options.</strong> If the request is denied, the agency must explain how to appeal. Our <a href="/blog/beginners-guide-to-foia-requests/">beginner's guide to FOIA requests</a> covers exemptions, fees, and appeals.</li>
          </ol>

          <h2>Good to Know</h2>
          <p>These tools provide general information and a starting template, not legal advice. The letter is generic, so review it before sending, and check the rules that apply in your state or agency.</p>
        </div>
      </div>
    </div>
  </section>
  <script>
  (function () {
    var sel = document.getElementById('finder-select');
    if (sel) {
      var panels = document.querySelectorAll('.finder-panel');
      var show = function () { panels.forEach(function (p) { p.hidden = p.getAttribute('data-id') !== sel.value; }); };
      sel.addEventListener('change', show);
      show();
    }
    var out = document.getElementById('rq-output');
    if (!out) return;
    var g = function (id) { var e = document.getElementById(id); return e ? e.value.trim() : ''; };
    var build = function () {
      var federal = g('rq-type') === 'federal';
      document.getElementById('rq-law-wrap').hidden = federal;
      var law = federal ? 'the Freedom of Information Act, 5 U.S.C. § 552' : (g('rq-law') ? 'the ' + g('rq-law') : 'my state’s public records law');
      var agency = g('rq-agency') || '[Agency name]';
      var desc = g('rq-desc') || '[Describe the records you want: document type, subject, and any names or case numbers.]';
      var range = g('rq-range');
      var fee = g('rq-fee');
      var L = [];
      L.push(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
      L.push('');
      L.push(agency);
      L.push(federal ? 'FOIA Officer' : 'Public Records Officer');
      L.push('');
      L.push('Re: Public records request');
      L.push('');
      L.push('To the ' + (federal ? 'FOIA Officer' : 'Records Custodian') + ':');
      L.push('');
      L.push('Under ' + law + ', I am requesting copies of the following records:');
      L.push('');
      L.push(desc);
      if (range) { L.push(''); L.push('Time period: ' + range + '.'); }
      L.push('');
      L.push('Please send the records in ' + g('rq-format') + ' format to ' + (g('rq-email') || '[your email]') + '.');
      L.push('');
      L.push(fee ? 'I am willing to pay reasonable fees up to $' + fee + '. Please contact me before incurring costs above that amount.' : 'Please contact me before incurring any fees.');
      if (document.getElementById('rq-waiver').checked) {
        L.push('');
        L.push('I also request a waiver or reduction of fees, because disclosure of these records is in the public interest and is not primarily for commercial purposes.');
      }
      L.push('');
      L.push('If any part of this request is denied, please identify the legal basis for each withholding and release any portions that can be separated from exempt material. If you need clarification, please contact me.');
      L.push('');
      L.push('Thank you for your help.');
      L.push('');
      L.push('Sincerely,');
      L.push(g('rq-name') || '[Your name]');
      out.value = L.join('\\n');
    };
    ['rq-type', 'rq-law', 'rq-agency', 'rq-desc', 'rq-range', 'rq-format', 'rq-fee', 'rq-waiver', 'rq-name', 'rq-email'].forEach(function (id) {
      var e = document.getElementById(id);
      e.addEventListener('input', build);
      e.addEventListener('change', build);
    });
    document.getElementById('rq-copy').addEventListener('click', function () {
      var btn = this;
      out.select();
      var done = function () { btn.textContent = 'Copied!'; setTimeout(function () { btn.textContent = 'Copy letter'; }, 2000); };
      if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(out.value).then(done, function () { document.execCommand('copy'); done(); }); }
      else { document.execCommand('copy'); done(); }
    });
    build();
  })();
  </script>
`;


writePage('tools', 'Free Public Records Tools: Office Finder & Request Letter Builder | RecordWatchdog',
  'Free tools for public records research: find which office holds a record and build a FOIA or state public records request letter.',
  homeTools,
  { "@context": "https://schema.org", "@type": "WebPage", "name": "Free Public Records Tools", "url": "https://recordwatchdog.com/tools/", "description": "Find which office holds a record and build a public records request letter." });


// ---- Category pages, Start Here, Glossary ----
const CATEGORY_INTRO = {
  states: 'Public records are kept mostly at the state and county level, and the rules change from state to state. These guides explain how court, business, property, and open records searches work in individual states, which offices to contact, how long agencies have to respond to a records request, and where each state\u2019s official portals and appeals processes are. We add states over time and check each one against official sources.',
  business: 'Businesses leave a paper trail in public records. These guides explain how to confirm that a company exists, who its registered agent is, whether it is in good standing, and what liens, lawsuits, or licensing issues may be on file. They are written for anyone vetting a vendor, partner, landlord, or contractor, and they point to the official state offices where the records are kept.',
  courts: 'Court records show what disputes were filed, how they progressed, and how they ended. These guides cover county and state courts, federal courts and PACER, how to read a docket, the difference between civil and criminal cases, and how bankruptcy filings work. Start with the guides on identifying the right court, then move on to reading dockets and final outcomes.',
  property: 'Property and government records answer questions about who owns land, what is owed against it, and what agencies are willing to release. These guides explain the roles of county clerks, recorders, and assessors, how to find deeds and liens, how to request certified copies, and how to use FOIA and state public records laws, including how journalists use these records.',
  safety: 'Some records bear on personal safety, hiring, and privacy. These guides explain how inmate locators and the National Sex Offender Public Website work, what pre-employment background checks involve and the legal limits on using them, and how to limit what public records reveal about you. They emphasize responsible, lawful use of sensitive information.'
};
CATEGORIES.forEach(c => {
  const list = blogPosts.filter(p => p.category === c.id);
  const st = CAT_STYLE[c.id];
  writePage(`blog/category/${c.id}`, `${c.name}: Guides | RecordWatchdog`, c.blurb + ' ' + list.length + ' guides.', `
    <section class="mx-auto max-w-7xl px-5 py-14">
      <nav aria-label="Breadcrumb" class="mb-6 text-sm font-bold text-slate-500">
        <a href="/" class="hover:text-accent">Home</a> <span class="mx-1">/</span>
        <a href="/blog/" class="hover:text-accent">Guides</a> <span class="mx-1">/</span>
        <span class="text-slate-700">${c.name}</span>
      </nav>
      <div class="overflow-hidden rounded-3xl bg-gradient-to-br ${st.grad} p-8 text-white md:p-12">
        <span class="text-5xl" aria-hidden="true">${st.icon}</span>
        <h1 class="mt-3 text-3xl font-black md:text-5xl">${c.name}</h1>
        <p class="mt-4 max-w-3xl text-lg leading-8 text-white/90">${CATEGORY_INTRO[c.id]}</p>
        <p class="mt-4 text-sm font-bold text-white/80">${list.length} guides, newest first</p>
      </div>
      <div class="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">${list.map(p => postCard(p, 'h2')).join('')}</div>
      <p class="mt-10 text-center"><a href="/blog/" class="font-black text-accent hover:underline">&larr; All guides</a></p>
    </section>
  `, { "@context": "https://schema.org", "@type": "CollectionPage", "name": c.name, "url": `https://recordwatchdog.com/blog/category/${c.id}/`, "description": CATEGORY_INTRO[c.id] });
});

const situations = [
  { id: 'house', icon: '🏠', title: 'I am buying or researching a property', intro: 'Property information is split between several county offices. Work through them in this order.', steps: ['Find the parcel number and owner of record at the county assessor.', 'Search the recorder or register of deeds for the deed history, mortgages, liens, and releases.', 'Check the treasurer or tax collector to see whether property taxes are paid.', 'Search the clerk of court for lawsuits, foreclosures, or judgments involving the owner.', 'For a purchase, use a title company or attorney. A free search is not a title guarantee.'], slugs: ['how-to-find-property-records-and-liens-in-your-county', 'county-clerk-vs-recorder-vs-assessor-who-holds-which-records'] },
  { id: 'business', icon: '🏢', title: 'I am checking out a business, vendor, or partner', intro: 'Start with whether the company legally exists, then look at its history.', steps: ['Search the Secretary of State in the state of formation and note status, formation date, and registered agent.', 'Compare names, addresses, and officers with the documents you were given.', 'Look for liens and UCC filings, then search court records and bankruptcy filings.', 'Verify any required license with the state licensing board.', 'Keep a dated log of what you checked and where you found it.'], slugs: ['understanding-llc-filings-and-business-entity-searches', 'the-importance-of-registered-agents-in-business-filings', 'how-to-conduct-due-diligence-on-a-new-business-partner', 'how-to-verify-a-contractors-business-license'] },
  { id: 'lawsuit', icon: '⚖️', title: 'I need to understand a lawsuit or court case', intro: 'Find the right court first, then read the docket from the top.', steps: ['Decide whether the case is in a county, state, or federal court.', 'Search the clerk\u2019s portal, or PACER and CourtListener for federal cases.', 'Open the docket and read the most recent entries to see the status.', 'Look for the final disposition before drawing any conclusion.', 'Match at least two details to be sure you have the right person or company.'], slugs: ['guide-to-county-court-records-and-lawsuit-searches', 'how-to-read-a-docket-sheet-in-civil-lawsuits', 'understanding-civil-vs-criminal-court-records', 'pacer-vs-courtlistener-which-should-you-use', 'common-mistakes-people-make-when-searching-court-records'] },
  { id: 'bankruptcy', icon: '📄', title: 'I need a bankruptcy record', intro: 'Bankruptcy cases are federal, and PACER is the official place to look.', steps: ['Search the PACER Case Locator by name or case number.', 'Note the chapter and the court that handled the case.', 'Look for a discharge order, a dismissal, or a closing entry.', 'Remember that downloading documents costs per page, with a free quarterly threshold.'], slugs: ['how-to-search-bankruptcy-records-using-pacer', 'understanding-chapter-7-vs-chapter-13-bankruptcy-filings'] },
  { id: 'hiring', icon: '🧑\u200d💼', title: 'I am hiring or screening someone', intro: 'Screening has legal limits, so understand them before you start.', steps: ['Learn what a standard background check includes.', 'If you use an outside screening company, follow the Fair Credit Reporting Act notice and consent steps.', 'Check state and local rules about what you may consider.', 'Read the final disposition of any record, not just the charge.'], slugs: ['what-to-look-for-in-a-background-check-before-hiring', 'understanding-civil-vs-criminal-court-records'] },
  { id: 'custody', icon: '🔎', title: 'I am looking for someone in custody or on a registry', intro: 'Different systems hold different people, so match the system to the situation.', steps: ['Decide whether the person is likely in county jail, state prison, or federal prison.', 'Use the matching locator: county sheriff, state Department of Corrections, or the Bureau of Prisons.', 'For registry searches, use official sources and respect the legal limits on using the data.', 'Confirm important details with the facility, since online searches can lag.'], slugs: ['how-to-find-incarceration-records-by-state', 'difference-between-state-and-federal-inmate-searches', 'navigating-the-national-sex-offender-public-website'] },
  { id: 'request', icon: '✉️', title: 'I want documents from a government agency', intro: 'If a record is not already published, you can often request it.', steps: ['Find out whether it is a federal agency (FOIA) or a state or local one (your state\u2019s law).', 'Write a specific request that names the records and a date range.', 'Send it to the agency\u2019s FOIA or public records officer and keep a copy.', 'Follow up when the response deadline passes, and appeal if you are denied.', 'If you need an official copy of a court, land, or business record, ask for a certified copy.'], slugs: ['beginners-guide-to-foia-requests', 'how-to-request-certified-copies-of-public-records', 'the-role-of-public-records-in-journalistic-investigations'] },
  { id: 'privacy', icon: '🔒', title: 'I want to protect my own information', intro: 'Start by seeing what is already public about you.', steps: ['Search your own name in county records, courts, and the business filing office.', 'Use official .gov sources and avoid entering a Social Security number to search.', 'Ask the record custodian about redaction or correction if something is wrong.', 'Ask a legal aid office or attorney about sealing, expungement, or address confidentiality.'], slugs: ['protecting-your-privacy-when-searching-public-records'] }
];
situations.forEach(sit => sit.slugs.forEach(sl => { if (!blogPosts.find(p => p.slug === sl)) throw new Error('Start Here references missing guide: ' + sl); }));

writePage('start-here', 'Public Records by Situation: Where to Start | RecordWatchdog', 'Not sure where to begin? Pick your situation, such as buying a house, checking a business, or understanding a lawsuit, and follow a short checklist with links to the right guides.', `
  <section class="mx-auto max-w-5xl px-5 py-14">
    <header class="mx-auto max-w-3xl text-center">
      <p class="font-black uppercase tracking-[0.18em] text-accent">Start here</p>
      <h1 class="mt-2 text-4xl font-black text-primary md:text-5xl">Public Records by Situation</h1>
      <p class="mt-4 text-lg leading-8 text-slate-600">Not sure which record you need or where it is kept? Find your situation below for a short checklist and the guides that explain each step.</p>
      <div class="mt-6 flex flex-wrap justify-center gap-2 text-sm font-bold">
        ${situations.map(x => `<a href="#${x.id}" class="rounded-full border border-slate-300 bg-white px-4 py-2 text-primary transition hover:border-accent hover:text-accent">${({ house: 'Buying a property', business: 'Checking a business', lawsuit: 'A lawsuit or court case', bankruptcy: 'A bankruptcy record', hiring: 'Hiring someone', custody: 'Someone in custody', request: 'Requesting agency records', privacy: 'My own privacy' })[x.id]}</a>`).join('')}
      </div>
    </header>
    <div class="mt-12 space-y-8">
      ${situations.map(x => `
      <article id="${x.id}" class="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-9">
        <h2 class="text-2xl font-black text-primary"><span aria-hidden="true">${x.icon}</span> ${x.title}</h2>
        <p class="mt-2 text-slate-600">${x.intro}</p>
        <ol class="mt-5 list-decimal space-y-2 pl-6 text-slate-700">${x.steps.map(st => `<li>${st}</li>`).join('')}</ol>
        <p class="mt-6 text-xs font-black uppercase tracking-[0.14em] text-slate-500">Guides to read</p>
        <ul class="mt-2 space-y-1.5">${x.slugs.map(sl => { const p = blogPosts.find(q => q.slug === sl); return `<li><a href="/blog/${p.slug}/" class="font-bold text-accent hover:underline">${p.title}</a></li>`; }).join('')}</ul>
      </article>`).join('')}
    </div>
    <p class="mt-10 text-center text-sm leading-6 text-slate-500">These checklists are general information, not legal advice. Office names, fees, and rules differ by state and county.</p>
  </section>
`, { "@context": "https://schema.org", "@type": "WebPage", "name": "Public Records by Situation", "url": "https://recordwatchdog.com/start-here/" });

const glossary = [
  ['Apostille', 'A certificate that authenticates a public document so it can be used in another country that belongs to the Hague Apostille Convention.', 'how-to-request-certified-copies-of-public-records'],
  ['Assessor', 'The county official who values property for tax purposes and keeps the ownership information shown on the tax roll.', 'county-clerk-vs-recorder-vs-assessor-who-holds-which-records'],
  ['Certified copy', 'A copy of a record that the office holding the original has stamped, sealed, or signed to confirm that it is a true copy.', 'how-to-request-certified-copies-of-public-records'],
  ['Chapter 7', 'A form of bankruptcy in which a trustee may sell nonexempt assets to pay creditors, and eligible debts can be discharged.', 'understanding-chapter-7-vs-chapter-13-bankruptcy-filings'],
  ['Chapter 13', 'A form of bankruptcy in which an individual with regular income repays some or all debts through a court-approved plan over three to five years.', 'understanding-chapter-7-vs-chapter-13-bankruptcy-filings'],
  ['Clerk of court', 'The office that keeps case files, dockets, judgments, and orders for a court and processes new filings.', 'guide-to-county-court-records-and-lawsuit-searches'],
  ['Complaint', 'The document that begins a civil lawsuit by stating the plaintiff\u2019s claims against the defendant.', 'how-to-read-a-docket-sheet-in-civil-lawsuits'],
  ['Default judgment', 'A judgment entered for the plaintiff when the defendant does not respond to a lawsuit in time.', 'the-importance-of-registered-agents-in-business-filings'],
  ['Discharge', 'A court order in bankruptcy that releases a debtor from personal liability for eligible debts.', 'understanding-chapter-7-vs-chapter-13-bankruptcy-filings'],
  ['Disposition', 'The outcome of a case, such as dismissed, convicted, acquitted, settled, or judgment entered.', 'understanding-civil-vs-criminal-court-records'],
  ['Docket', 'A chronological list of the filings, orders, and events in a court case.', 'how-to-read-a-docket-sheet-in-civil-lawsuits'],
  ['Expungement', 'A court process that removes or seals certain records of an arrest or conviction. Eligibility rules differ by state.', 'protecting-your-privacy-when-searching-public-records'],
  ['FOIA', 'The Freedom of Information Act, a federal law that lets anyone request records from federal executive branch agencies.', 'beginners-guide-to-foia-requests'],
  ['Grantor and grantee', 'In land records, the grantor is the seller or transferor and the grantee is the buyer or recipient named in a deed.', 'how-to-find-property-records-and-liens-in-your-county'],
  ['Judgment lien', 'A claim against a debtor\u2019s property that is created when a court judgment is recorded against it.', 'how-to-find-property-records-and-liens-in-your-county'],
  ['Lien', 'A legal claim against property that secures payment of a debt.', 'how-to-find-property-records-and-liens-in-your-county'],
  ['Lis pendens', 'A recorded notice that a lawsuit affecting a particular property has been filed.', 'how-to-find-property-records-and-liens-in-your-county'],
  ['Mechanic\u2019s lien', 'A lien filed by a contractor or supplier who says they were not paid for work on a property.', 'how-to-find-property-records-and-liens-in-your-county'],
  ['PACER', 'Public Access to Court Electronic Records, the federal judiciary\u2019s system for dockets and documents from federal courts.', 'pacer-vs-courtlistener-which-should-you-use'],
  ['Plaintiff and defendant', 'In a civil case, the plaintiff brings the lawsuit and the defendant is the party being sued.', 'understanding-civil-vs-criminal-court-records'],
  ['Preponderance of the evidence', 'The standard of proof in most civil cases, meaning that something is more likely true than not.', 'understanding-civil-vs-criminal-court-records'],
  ['Recorder or register of deeds', 'The county office that records deeds, mortgages, liens, and similar land documents and keeps the index used to search them.', 'county-clerk-vs-recorder-vs-assessor-who-holds-which-records'],
  ['Registered agent', 'The person or company designated to receive legal papers and official notices on behalf of a business.', 'the-importance-of-registered-agents-in-business-filings'],
  ['Sealed record', 'A court record that has been closed to public access by court order.', 'protecting-your-privacy-when-searching-public-records'],
  ['Secretary of State', 'In most states, the office that keeps business entity filings and UCC filings.', 'understanding-llc-filings-and-business-entity-searches'],
  ['Service of process', 'The formal delivery of legal papers, such as a summons and complaint, to a party in a lawsuit.', 'the-importance-of-registered-agents-in-business-filings'],
  ['Title search', 'A review of the recorded history of a property to confirm who owns it and what claims exist against it.', 'how-to-find-property-records-and-liens-in-your-county'],
  ['UCC filing', 'A public notice, usually filed with the Secretary of State, that a lender has a security interest in a borrower\u2019s personal property or business assets.', 'how-to-conduct-due-diligence-on-a-new-business-partner']
].sort((a, b) => a[0].localeCompare(b[0]));
glossary.forEach(t => { if (!blogPosts.find(p => p.slug === t[2])) throw new Error('Glossary references missing guide: ' + t[2]); });
const glossLetters = [...new Set(glossary.map(t => t[0][0].toUpperCase()))];

writePage('glossary', 'Public Records Glossary: Plain-English Definitions | RecordWatchdog', 'Plain-English definitions of common public records terms, from apostille and docket to lien, registered agent, and discharge, with links to the guides that explain them.', `
  <section class="mx-auto max-w-4xl px-5 py-14">
    <header class="text-center">
      <p class="font-black uppercase tracking-[0.18em] text-accent">Glossary</p>
      <h1 class="mt-2 text-4xl font-black text-primary md:text-5xl">Public Records Glossary</h1>
      <p class="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">Plain-English definitions of terms you will meet when searching court, property, business, and bankruptcy records. Each term links to a guide with more detail.</p>
      <div class="mt-6 flex flex-wrap justify-center gap-2 text-sm font-black">
        ${glossLetters.map(l => `<a href="#letter-${l}" class="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-primary transition hover:border-accent hover:text-accent">${l}</a>`).join('')}
      </div>
    </header>
    <div class="mt-12 space-y-10">
      ${glossLetters.map(l => `
      <div id="letter-${l}" class="scroll-mt-24">
        <h2 class="border-b border-slate-200 pb-2 text-2xl font-black text-accent">${l}</h2>
        <dl class="mt-4 space-y-5">
          ${glossary.filter(t => t[0][0].toUpperCase() === l).map(t => `
          <div>
            <dt class="text-lg font-black text-primary">${t[0]}</dt>
            <dd class="mt-1 leading-7 text-slate-700">${t[1]} <a href="/blog/${t[2]}/" class="font-bold text-accent hover:underline">Read more</a></dd>
          </div>`).join('')}
        </dl>
      </div>`).join('')}
    </div>
    <p class="mt-12 text-center text-sm leading-6 text-slate-500">Definitions are general explanations, not legal advice. Terms and procedures can differ by state.</p>
  </section>
`, { "@context": "https://schema.org", "@type": "DefinedTermSet", "name": "Public Records Glossary", "url": "https://recordwatchdog.com/glossary/", "hasDefinedTerm": glossary.map(t => ({ "@type": "DefinedTerm", "name": t[0], "description": t[1] })) });


const homeContent = `
  ${homeTop}

  ${homeGuides}

  <section id="directory" class="relative scroll-mt-16 overflow-hidden bg-[#071638] text-white">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,.14),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(255,111,54,.16),transparent_24%)]"></div>
    <div class="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.3fr_.7fr] lg:py-20">
      <div>
        <p class="mb-4 font-black uppercase tracking-[0.2em] text-accent">Free directory</p>
        <h2 class="max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">Search Public Records.<br /><span class="text-accent">Find What Matters.</span></h2>
        <p class="mt-6 max-w-3xl text-xl leading-8 text-slate-200">Pick a state to open official business, court, bankruptcy, and incarceration search portals. We link to government sources and do not host the records.</p>
        <div class="mt-8 flex flex-wrap gap-3 text-sm font-bold text-slate-200">
          <span class="rounded-full border border-white/20 bg-white/10 px-4 py-2">50 State Directories</span>
          <span class="rounded-full border border-white/20 bg-white/10 px-4 py-2">Official Sources</span>
          <span class="rounded-full border border-white/20 bg-white/10 px-4 py-2">Privacy-Friendly</span>
        </div>
        <div class="mt-10 max-w-2xl rounded-3xl border border-white/25 bg-white p-6 shadow-2xl">
          <label class="mb-3 block text-sm font-black uppercase tracking-[0.14em] text-slate-600">Select Your State</label>
          <div class="grid gap-4 md:grid-cols-[1fr_260px]">
            <div class="relative">
              <select id="state-select" onchange="updateSections()" class="w-full appearance-none rounded-xl border border-slate-300 bg-white px-5 py-4 text-lg font-bold text-slate-900 outline-none focus:border-accent focus:ring-4 focus:ring-orange-100">
                <option>All States</option>
                <option>Alabama</option><option>Alaska</option><option>Arizona</option><option>Arkansas</option><option>California</option>
                <option>Colorado</option><option>Connecticut</option><option>Delaware</option><option>Florida</option><option>Georgia</option>
                <option>Hawaii</option><option>Idaho</option><option>Illinois</option><option>Indiana</option><option>Iowa</option>
                <option>Kansas</option><option>Kentucky</option><option>Louisiana</option><option>Maine</option><option>Maryland</option>
                <option>Massachusetts</option><option>Michigan</option><option>Minnesota</option><option>Mississippi</option><option>Missouri</option>
                <option>Montana</option><option>Nebraska</option><option>Nevada</option><option>New Hampshire</option><option>New Jersey</option>
                <option>New Mexico</option><option>New York</option><option>North Carolina</option><option>North Dakota</option><option>Ohio</option>
                <option>Oklahoma</option><option>Oregon</option><option>Pennsylvania</option><option>Rhode Island</option><option>South Carolina</option>
                <option>South Dakota</option><option>Tennessee</option><option>Texas</option><option>Utah</option><option>Vermont</option>
                <option>Virginia</option><option>Washington</option><option>West Virginia</option><option>Wisconsin</option><option>Wyoming</option>
              </select>
              <svg class="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
            <a href="#business" class="flex items-center justify-center rounded-xl bg-accent px-8 py-4 font-black text-white shadow-lg transition hover:bg-[#e55a25]">Show Options</a>
          </div>
        </div>
        <div class="mt-8 grid gap-4 sm:grid-cols-3">
          <a href="#business" class="block rounded-2xl border border-white/15 bg-[#13224d] p-4 text-left shadow-lg transition hover:border-accent hover:bg-[#1a2d63]">
            <div class="text-base font-extrabold tracking-tight text-white">Florida Records</div>
            <div class="mt-1 text-sm font-medium text-slate-300">Quick access</div>
          </a>
          <a href="#court" class="block rounded-2xl border border-white/15 bg-[#13224d] p-4 text-left shadow-lg transition hover:border-accent hover:bg-[#1a2d63]">
            <div class="text-base font-extrabold tracking-tight text-white">California Courts</div>
            <div class="mt-1 text-sm font-medium text-slate-300">Court records</div>
          </a>
          <a href="#business" class="block rounded-2xl border border-white/15 bg-[#13224d] p-4 text-left shadow-lg transition hover:border-accent hover:bg-[#1a2d63]">
            <div class="text-base font-extrabold tracking-tight text-white">Texas Business Search</div>
            <div class="mt-1 text-sm font-medium text-slate-300">Business search</div>
          </a>
        </div>
      </div>
      <div class="grid content-center gap-8">
        <div class="space-y-6 pt-2">
          <div class="flex items-start gap-4">
            <svg class="mt-1 h-8 w-8 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            <div><h3 class="text-xl font-black">Trusted & Secure</h3><p class="mt-2 text-base leading-7 text-slate-200">Official sources, state court systems, and privacy-friendly navigation.</p></div>
          </div>
          <div class="flex items-start gap-4">
            <svg class="mt-1 h-8 w-8 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <div><h3 class="text-xl font-black">Official Sources</h3><p class="mt-2 text-base leading-7 text-slate-200">Government and court websites prioritized throughout the directory.</p></div>
          </div>
        </div>
      </div>
    </div>
  </section>


  <section class="border-b border-slate-200 bg-slate-50/70 py-10">
    <div class="mx-auto max-w-7xl px-5">
      <p class="font-black uppercase tracking-[0.18em] text-accent">Quick Access</p>
      <h2 class="mt-2 text-3xl font-black">Quick Access by State</h2>
      <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        <button onclick="selectState('Florida')" class="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-accent hover:shadow-lg">
          <div class="text-lg font-black">Florida</div>
          <div class="mt-2 text-sm leading-6 text-slate-600">Popular public record searches</div>
        </button>
        <button onclick="selectState('California')" class="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-accent hover:shadow-lg">
          <div class="text-lg font-black">California</div>
          <div class="mt-2 text-sm leading-6 text-slate-600">Popular public record searches</div>
        </button>
        <button onclick="selectState('Texas')" class="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-accent hover:shadow-lg">
          <div class="text-lg font-black">Texas</div>
          <div class="mt-2 text-sm leading-6 text-slate-600">Popular public record searches</div>
        </button>
        <button onclick="selectState('New York')" class="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-accent hover:shadow-lg">
          <div class="text-lg font-black">New York</div>
          <div class="mt-2 text-sm leading-6 text-slate-600">Popular public record searches</div>
        </button>
        <button onclick="selectState('Illinois')" class="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-accent hover:shadow-lg">
          <div class="text-lg font-black">Illinois</div>
          <div class="mt-2 text-sm leading-6 text-slate-600">Popular public record searches</div>
        </button>
        <button onclick="selectState('Georgia')" class="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-accent hover:shadow-lg">
          <div class="text-lg font-black">Georgia</div>
          <div class="mt-2 text-sm leading-6 text-slate-600">Popular public record searches</div>
        </button>
      </div>
    </div>
  </section>

  <section id="business" class="relative mx-auto max-w-7xl overflow-hidden px-5 py-16">
    <div class="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-orange-300/50 blur-3xl"></div>
    <div class="relative z-10 mb-8">
      <p class="font-black uppercase tracking-[0.2em] text-accent">Business records</p>
      <h2 id="business-title" class="mt-2 text-4xl font-black">Business Entity Search by State</h2>
      <p class="mt-3 max-w-3xl text-slate-600">Open official business entity search tools for LLCs, corporations, registered agents, and filings. Business entity searches are commonly used for due diligence, ownership verification, vendor checks, and researching active or dissolved companies.</p>
      <div class="mt-5 flex flex-wrap gap-3 text-sm font-bold text-slate-600">
        <span class="rounded-full bg-orange-50 px-4 py-2 text-accent">LLC Verification</span>
        <span class="rounded-full bg-slate-100 px-4 py-2">Corporate Filings</span>
        <span class="rounded-full bg-slate-100 px-4 py-2">Registered Agents</span>
      </div>
    </div>
    <div class="relative z-10 grid gap-5 md:grid-cols-2">
      <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-accent"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg></div>
        <p id="biz-tag" class="mb-2 text-xs font-black uppercase tracking-[0.18em] text-accent">State required</p>
        <h3 id="biz-card-title" class="text-lg font-black text-primary">Select a State First</h3>
        <p id="biz-card-text" class="mt-2 text-sm leading-6 text-slate-600">Choose a state above to display the official business search link.</p>
        <div id="biz-btn-wrap" class="mt-4 w-full"></div>
      </article>
      <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-accent"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div>
        <h3 class="text-lg font-black text-primary">Business Filing Tips</h3>
        <p class="mt-2 text-sm leading-6 text-slate-600">Search by exact name, partial name, officer, registered agent, or entity number when available.</p>
      </article>
    </div>
  </section>

  <section id="court" class="relative overflow-hidden border-y bg-gradient-to-b from-white to-slate-50 py-16">
    <div class="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-slate-300/70 blur-3xl"></div>
    <div class="relative z-10 mx-auto max-w-7xl px-5">
      <p class="font-black uppercase tracking-[0.2em] text-accent">Lawsuit records</p>
      <h2 id="court-title" class="mt-2 text-4xl font-black">Lawsuit Records by State and County</h2>
      <p id="court-desc" class="mt-3 max-w-3xl text-slate-600">Select a state from the hero section above to load county court records. Most lawsuit and civil court searches begin with the county clerk or local court system.</p>
      <div class="mt-5 flex flex-wrap gap-3 text-sm font-bold text-slate-600">
        <span class="rounded-full bg-orange-50 px-4 py-2 text-accent">Civil Cases</span>
        <span class="rounded-full bg-slate-100 px-4 py-2">Judgments</span>
        <span class="rounded-full bg-slate-100 px-4 py-2">County Court Records</span>
      </div>
      <div class="mt-8 grid gap-5 lg:grid-cols-2">
        <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-accent"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg></div>
          <p id="court-tag" class="mb-2 text-xs font-black uppercase tracking-[0.18em] text-accent">State required</p>
          <h3 id="court-card-title" class="text-lg font-black text-primary">Select a State First</h3>
          <p id="court-card-text" class="mt-2 text-sm leading-6 text-slate-600">Choose a state in the hero section above to load county lawsuit record options.</p>
          <div id="court-btn-wrap" class="mt-4 w-full"></div>
        </article>
        <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="mb-4 flex items-start gap-3">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-accent"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg></div>
            <div><p class="text-xs font-black uppercase tracking-[0.18em] text-accent">County lookup</p><h3 class="text-lg font-black text-primary">Choose County</h3><p class="mt-1 text-sm leading-6 text-slate-600">Most civil lawsuits and local court records are maintained at the county level.</p></div>
          </div>
          <select id="county-select" onchange="updateCountyLink()" disabled class="w-full rounded-xl border border-slate-300 px-4 py-4 font-bold outline-none disabled:bg-slate-100 disabled:text-slate-400">
            <option>Select a state above first</option>
          </select>
          <div id="county-btn-wrap" class="mt-4 w-full"></div>
        </article>
      </div>
    </div>
  </section>

  <section id="bankruptcy" class="relative mx-auto max-w-7xl overflow-hidden px-5 py-16">
    <div class="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-orange-300/50 blur-3xl"></div>
    <div class="relative z-10">
      <p class="font-black uppercase tracking-[0.2em] text-accent">Federal records</p>
      <h2 class="mt-2 text-4xl font-black">Bankruptcy & Federal Case Search</h2>
      <p class="mt-3 max-w-3xl text-slate-600">Search federal bankruptcy and court systems using PACER and related legal research tools. Bankruptcy filings are maintained in the federal court system and may include Chapter 7, Chapter 11, and Chapter 13 cases.</p>
      <div class="mt-5 flex flex-wrap gap-3 text-sm font-bold text-slate-600">
        <span class="rounded-full bg-orange-50 px-4 py-2 text-accent">Federal Court Records</span>
        <span class="rounded-full bg-slate-100 px-4 py-2">Chapter 7 & 11</span>
        <span class="rounded-full bg-slate-100 px-4 py-2">PACER Search</span>
      </div>
    </div>
    <div class="relative z-10 mt-6 rounded-2xl border bg-white p-6 shadow-sm">
      <div class="grid gap-3 md:grid-cols-[1fr_260px]">
        <input id="pacer-name" placeholder="Person or business name" class="min-w-0 rounded-xl border px-4 py-4 outline-none" />
        <a id="pacer-btn" href="https://pcl.uscourts.gov/pcl/index.jsf" target="_blank" class="flex min-h-[58px] w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-accent px-6 py-4 text-center text-sm font-black text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">Continue to PACER <svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></a>
      </div>
      <div id="pacer-hint" class="mt-4 hidden rounded-xl bg-orange-50 p-4 font-bold"></div>
      <p class="mt-3 text-xs text-slate-500">This field is a scratchpad. The official federal court site does not accept pre-filled searches, so use the button to open it and enter the name there.</p>
    </div>
    <div class="relative z-10 mt-8 grid items-stretch gap-5 md:grid-cols-3">
      <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-accent"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div>
        <p class="mb-2 text-xs font-black uppercase tracking-[0.18em] text-accent">Free research</p>
        <h3 class="text-lg font-black text-primary">CourtListener</h3>
        <p class="mt-2 text-sm leading-6 text-slate-600">Free federal court opinions, RECAP archives, and docket research tools.</p>
        <div class="mt-4 w-full"><a href="https://www.courtlistener.com/" target="_blank" class="flex min-h-[58px] w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-accent px-6 py-4 text-center text-sm font-black text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">Continue <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></a></div>
      </article>
      <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-accent"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></div>
        <p class="mb-2 text-xs font-black uppercase tracking-[0.18em] text-accent">Premium analytics</p>
        <h3 class="text-lg font-black text-primary">Docket Alarm</h3>
        <p class="mt-2 text-sm leading-6 text-slate-600">Advanced litigation analytics, federal court dockets, and legal intelligence tools.</p>
        <div class="mt-4 w-full"><a href="https://www.docketalarm.com/" target="_blank" class="flex min-h-[58px] w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-accent px-6 py-4 text-center text-sm font-black text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">Continue <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></a></div>
      </article>
      <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-accent"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg></div>
        <p class="mb-2 text-xs font-black uppercase tracking-[0.18em] text-accent">Legal intelligence</p>
        <h3 class="text-lg font-black text-primary">UniCourt</h3>
        <p class="mt-2 text-sm leading-6 text-slate-600">Enterprise court analytics, litigation tracking, and federal docket intelligence platform.</p>
        <div class="mt-4 w-full"><a href="https://unicourt.com/" target="_blank" class="flex min-h-[58px] w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-accent px-6 py-4 text-center text-sm font-black text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">Continue <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></a></div>
      </article>
    </div>
  </section>

  <section id="inmates" class="relative overflow-hidden border-y bg-gradient-to-b from-white to-slate-50 py-16">
    <div class="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-slate-300/70 blur-3xl"></div>
    <div class="relative z-10 mx-auto max-w-7xl px-5">
      <p class="font-black uppercase tracking-[0.2em] text-accent">Incarceration records</p>
      <h2 class="mt-2 text-4xl font-black">Incarceration Records</h2>
      <p id="inmate-desc" class="mt-3 max-w-3xl text-slate-600">Select a state above to load state incarceration records, or use the federal inmate locator below. State and federal inmate systems are maintained separately.</p>
      <div class="mt-5 flex flex-wrap gap-3 text-sm font-bold text-slate-600">
        <span class="rounded-full bg-orange-50 px-4 py-2 text-accent">State Corrections</span>
        <span class="rounded-full bg-slate-100 px-4 py-2">Federal Inmates</span>
        <span class="rounded-full bg-slate-100 px-4 py-2">County Jail Records</span>
      </div>
      <div class="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
        <div class="grid gap-3 md:grid-cols-[1fr_260px]">
          <input id="inmate-name" placeholder="First and last name" class="rounded-xl border px-4 py-4 outline-none" />
          <a id="inmate-btn" href="https://www.usa.gov/state-corrections" target="_blank" class="flex min-h-[58px] w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-accent px-6 py-4 text-center text-sm font-black text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">Open State Directory <svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></a>
        </div>
        <p class="mt-3 text-xs text-slate-500">This field is a scratchpad. Official corrections sites do not accept pre-filled searches, so use the button to open the official site and enter the name there.</p>
      </div>
      <div class="mt-8 grid gap-5 md:grid-cols-2">
        <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-accent"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg></div>
          <h3 class="text-lg font-black text-primary">Federal Inmate Locator</h3>
          <p class="mt-2 text-sm leading-6 text-slate-600">Search Bureau of Prisons records for federal inmates, federal convictions, and U.S. federal custody records.</p>
          <div class="mt-4 w-full"><a href="https://www.bop.gov/inmateloc/" target="_blank" class="flex min-h-[58px] w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-accent px-6 py-4 text-center text-sm font-black text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">Continue <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></a></div>
        </article>
        <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-accent"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg></div>
          <h3 class="text-lg font-black text-primary">County Jail Directory</h3>
          <p class="mt-2 text-sm leading-6 text-slate-600">Search county jail rosters, sheriff inmate databases, and local detention records by county or sheriff office.</p>
          <div class="mt-4 w-full"><a href="https://www.usa.gov/local-governments" target="_blank" class="flex min-h-[58px] w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-accent px-6 py-4 text-center text-sm font-black text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">Continue <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></a></div>
        </article>
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-5 py-16">
    <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
      <p class="font-black uppercase tracking-[0.18em] text-accent">User Guide</p>
      <h2 class="mt-2 text-3xl font-black text-primary md:text-4xl">How to Use the RecordWatchdog Public Records Directory</h2>
      <div class="mt-6 space-y-6 text-base leading-8 text-slate-700">
        <p>RecordWatchdog is designed to simplify the process of finding official public records across the United States. Navigating disparate government websites can be confusing and time-consuming. Our directory organizes over 50 state-level resources, county court systems, and federal databases into one streamlined, easy-to-use platform, saving you hours of research.</p>
        <div class="grid gap-6 md:grid-cols-3">
          <div class="rounded-2xl bg-slate-50 p-6">
            <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent font-black text-white">1</div>
            <h3 class="text-lg font-black text-primary">Select Your State</h3>
            <p class="mt-2 text-sm leading-6 text-slate-600">Use the dropdown menu at the top of this page to choose the specific state you are researching. This instantly filters our directory to show only relevant, official resources for that jurisdiction.</p>
          </div>
          <div class="rounded-2xl bg-slate-50 p-6">
            <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent font-black text-white">2</div>
            <h3 class="text-lg font-black text-primary">Choose Your Record Type</h3>
            <p class="mt-2 text-sm leading-6 text-slate-600">Navigate to the specific section you need, such as Business Entity Search, County Lawsuit Records, Incarceration Databases, or Bankruptcy Filings.</p>
          </div>
          <div class="rounded-2xl bg-slate-50 p-6">
            <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent font-black text-white">3</div>
            <h3 class="text-lg font-black text-primary">Access Official Sources</h3>
            <p class="mt-2 text-sm leading-6 text-slate-600">Click the provided buttons to be directed securely to the official government portal (e.g., Secretary of State, County Clerk, or Department of Corrections) to perform your search.</p>
          </div>
        </div>
        <div class="mt-4 rounded-2xl border border-orange-200 bg-orange-50 p-6">
          <h3 class="flex items-center gap-2 text-lg font-black text-primary"><svg class="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Important Transparency & FCRA Disclaimer</h3>
          <p class="mt-3 text-sm leading-7 text-slate-700">RecordWatchdog is strictly an informational directory and search tool aggregator. <strong>We do not host, generate, or maintain any criminal records, court documents, inmate databases, or personal data on our servers.</strong> All searches are conducted on third-party official government websites. Furthermore, this site is <strong>not</strong> a "consumer reporting agency" as defined by the Fair Credit Reporting Act (FCRA). The information provided here may not be used for tenant screening, employment background checks, credit eligibility decisions, or any other FCRA-regulated purpose.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-5 py-16">
    <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
      <p class="font-black uppercase tracking-[0.18em] text-accent">Our Value</p>
      <h2 class="mt-2 text-3xl font-black text-primary md:text-4xl">Why Choose RecordWatchdog?</h2>
      <div class="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h3 class="text-xl font-black text-primary">A Curated Directory of Official Sources</h3>
          <p class="mt-3 text-base leading-7 text-slate-700">Navigating the fragmented landscape of U.S. public records can be overwhelming. RecordWatchdog saves you hours of research by curating direct links to over 50 state-level resources, hundreds of county court systems, and federal databases. We aim to link to official government and court websites, and any third-party research tool we include is clearly labeled, protecting you from predatory third-party "people search" sites that charge hidden fees for freely available public data.</p>
        </div>
        <div>
          <h3 class="text-xl font-black text-primary">Empowering Informed Decisions</h3>
          <p class="mt-3 text-base leading-7 text-slate-700">Whether you are a small business owner verifying a new vendor's LLC status, a homeowner researching property liens, or a concerned parent checking local safety registries, access to accurate public information is your right. We provide the roadmap to that information, complete with step-by-step guides on how to interpret docket sheets, understand bankruptcy chapters, and conduct lawful due diligence.</p>
        </div>
      </div>
      <div class="mt-8 rounded-2xl bg-slate-50 p-6">
        <h3 class="text-lg font-black text-primary">Types of Public Records We Help You Find:</h3>
        <ul class="mt-4 grid gap-3 sm:grid-cols-2">
          <li class="flex items-start gap-3 text-sm leading-6 text-slate-700"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent"></span><strong>Business Entity Filings:</strong> LLCs, Corporations, Registered Agents, and Good Standing certificates.</li>
          <li class="flex items-start gap-3 text-sm leading-6 text-slate-700"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent"></span><strong>Civil & Criminal Court Records:</strong> County-level lawsuit dockets, judgments, and case dispositions.</li>
          <li class="flex items-start gap-3 text-sm leading-6 text-slate-700"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent"></span><strong>Incarceration & Jail Rosters:</strong> State Department of Corrections inmate locators and county jail databases.</li>
          <li class="flex items-start gap-3 text-sm leading-6 text-slate-700"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent"></span><strong>Federal Bankruptcy Filings:</strong> Chapter 7, 11, and 13 records via the official PACER system.</li>
          <li class="flex items-start gap-3 text-sm leading-6 text-slate-700"><span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent"></span><strong>Property & Real Estate:</strong> County assessor values, deed histories, and tax lien records.</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-5 py-16">
    <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
      <p class="font-black uppercase tracking-[0.18em] text-accent">FAQ</p>
      <h2 class="mt-2 text-3xl font-black text-primary md:text-4xl">Frequently Asked Questions</h2>
      <div class="mt-8 space-y-6">
        <div class="rounded-2xl bg-slate-50 p-6">
          <h3 class="text-lg font-black text-primary">Is RecordWatchdog free to use?</h3>
          <p class="mt-2 text-sm leading-7 text-slate-700">Yes, our directory is completely free. We provide direct links to official government portals. While our site is free, some official government databases may charge a small fee for downloading certified copies of documents.</p>
        </div>
        <div class="rounded-2xl bg-slate-50 p-6">
          <h3 class="text-lg font-black text-primary">Do you host criminal records or personal data?</h3>
          <p class="mt-2 text-sm leading-7 text-slate-700">No. RecordWatchdog is strictly an informational directory. We do not host, generate, or maintain any criminal records, court documents, inmate databases, or personal data on our servers. All searches redirect you to official, secure government websites.</p>
        </div>
        <div class="rounded-2xl bg-slate-50 p-6">
          <h3 class="text-lg font-black text-primary">Can I use this site for employment background checks?</h3>
          <p class="mt-2 text-sm leading-7 text-slate-700">No. RecordWatchdog is NOT a "consumer reporting agency" as defined by the Fair Credit Reporting Act (FCRA). Our resources may not be used for tenant screening, employment background checks, credit eligibility decisions, or any other FCRA-regulated purpose.</p>
        </div>
        <div class="rounded-2xl bg-slate-50 p-6">
          <h3 class="text-lg font-black text-primary">Why do some county searches require a visit to the courthouse?</h3>
          <p class="mt-2 text-sm leading-7 text-slate-700">While many counties offer robust online databases, some smaller jurisdictions have not fully digitized their historical records. In these cases, you may need to visit the county clerk's office in person or submit a formal written request to access older files.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-5 py-14">
    <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p class="font-black uppercase tracking-[0.18em] text-accent">Quick Links</p>
      <h2 class="mt-2 text-4xl font-black">Quick Links</h2>
      <div class="mt-5 flex flex-wrap gap-3">
        <a href="#business" class="inline-block rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-accent hover:bg-orange-50 hover:text-accent">Florida Public Records</a>
        <a href="#court" class="inline-block rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-accent hover:bg-orange-50 hover:text-accent">California Court Records</a>
        <a href="#business" class="inline-block rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-accent hover:bg-orange-50 hover:text-accent">Texas Business Search</a>
        <a href="#inmates" class="inline-block rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-accent hover:bg-orange-50 hover:text-accent">New York Inmate Search</a>
        <a href="#court" class="inline-block rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-accent hover:bg-orange-50 hover:text-accent">Illinois Court Search</a>
        <a href="#business" class="inline-block rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-accent hover:bg-orange-50 hover:text-accent">Georgia Business Entity Search</a>
        <a href="#business" class="inline-block rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-accent hover:bg-orange-50 hover:text-accent">Delaware LLC Search</a>
        <a href="#inmates" class="inline-block rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-accent hover:bg-orange-50 hover:text-accent">Florida Arrest Records</a>
      </div>
    </div>
  </section>

  <script>
  var stateBizUrls = {Alabama:'https://arc-sos.state.al.us/CGI/CORPNAME.MBR/INPUT',Alaska:'https://www.commerce.alaska.gov/cbp/main/search/entities',Arizona:'https://ecorp.azcc.gov/EntitySearch/Index',Arkansas:'https://www.sos.arkansas.gov/corps/search_all.php',California:'https://bizfileonline.sos.ca.gov/search/business',Colorado:'https://www.sos.state.co.us/biz/BusinessEntityCriteriaExt.do',Connecticut:'https://service.ct.gov/business/s/onlinebusinesssearch',Delaware:'https://icis.corp.delaware.gov/Ecorp/EntitySearch/NameSearch.aspx',Florida:'https://search.sunbiz.org/Inquiry/CorporationSearch/ByName',Georgia:'https://ecorp.sos.ga.gov/BusinessSearch',Hawaii:'https://hbe.ehawaii.gov/documents/search.html',Idaho:'https://sosbiz.idaho.gov/search/business',Illinois:'https://apps.ilsos.gov/businessentitysearch/',Indiana:'https://bsd.sos.in.gov/publicbusinesssearch',Iowa:'https://sos.iowa.gov/search/business/search.aspx',Kansas:'https://www.kansas.gov/bess/flow/main?execution=e1s1',Kentucky:'https://web.sos.ky.gov/ftsearch/',Louisiana:'https://coraweb.sos.la.gov/commercialsearch/commercialsearch.aspx',Maine:'https://icrs.informe.org/nei-sos-icrs/ICRS?MainPage=x',Maryland:'https://egov.maryland.gov/BusinessExpress/EntitySearch',Massachusetts:'https://corp.sec.state.ma.us/corpweb/CorpSearch/CorpSearch.aspx',Michigan:'https://cofs.lara.state.mi.us/SearchApi/Search/Search',Minnesota:'https://mblsportal.sos.state.mn.us/Business/Search',Mississippi:'https://businesssearch.sos.ms.gov/corp/soskb/csearch.asp',Missouri:'https://bsd.sos.mo.gov/BusinessEntity/BESearch.aspx',Montana:'https://biz.sosmt.gov/search/business',Nebraska:'https://www.nebraska.gov/sos/corp/corpsearch.cgi',Nevada:'https://esos.nv.gov/EntitySearch/OnlineEntitySearch','New Hampshire':'https://quickstart.sos.nh.gov/online/BusinessInquire','New Jersey':'https://www.njportal.com/DOR/BusinessNameSearch/Search/BusinessName','New Mexico':'https://portal.sos.state.nm.us/BFS/online/CorporationBusinessSearch','New York':'https://apps.dos.ny.gov/publicInquiry/','North Carolina':'https://www.sosnc.gov/online_services/search/by_title/_Business_Registration','North Dakota':'https://firststop.sos.nd.gov/search/business',Ohio:'https://businesssearch.ohiosos.gov/',Oklahoma:'https://www.sos.ok.gov/corp/corpInquiryFind.aspx',Oregon:'https://sos.oregon.gov/business/Pages/find.aspx',Pennsylvania:'https://file.dos.pa.gov/search/business','Rhode Island':'https://business.sos.ri.gov/CorpWeb/CorpSearch/CorpSearch.aspx','South Carolina':'https://businessfilings.sc.gov/BusinessFiling/Entity/Search','South Dakota':'https://sosenterprise.sd.gov/BusinessServices/Business/FilingSearch.aspx',Tennessee:'https://tnbear.tn.gov/Ecommerce/FilingSearch.aspx',Texas:'https://mycpa.cpa.state.tx.us/coa/',Utah:'https://secure.utah.gov/bes/',Vermont:'https://bizfilings.vermont.gov/online/BusinessInquire',Virginia:'https://cis.scc.virginia.gov/EntitySearch/Index',Washington:'https://ccfs.sos.wa.gov/#/BusinessSearch','West Virginia':'https://apps.sos.wv.gov/business/corporations/',Wisconsin:'https://www.wdfi.org/apps/CorpSearch/Search.aspx',Wyoming:'https://wyobiz.wyo.gov/Business/FilingSearch.aspx'};
  var stateCourtUrls = {Alabama:'https://judicial.alabama.gov/',Alaska:'https://courts.alaska.gov/',Arizona:'https://www.azcourts.gov/',Arkansas:'https://arcourts.gov/',California:'https://www.courts.ca.gov/find-my-court.htm',Colorado:'https://www.courts.state.co.us/',Connecticut:'https://jud.ct.gov/',Delaware:'https://courts.delaware.gov/',Florida:'https://www.flcourts.gov/',Georgia:'https://georgiacourts.gov/',Hawaii:'https://www.courts.state.hi.us/',Idaho:'https://isc.idaho.gov/',Illinois:'https://www.illinoiscourts.gov/',Indiana:'https://www.in.gov/courts/',Iowa:'https://www.iowacourts.gov/',Kansas:'https://www.kscourts.org/',Kentucky:'https://kycourts.gov/',Louisiana:'https://www.lasc.org/',Maine:'https://www.courts.maine.gov/',Maryland:'https://www.courts.state.md.us/',Massachusetts:'https://www.mass.gov/orgs/massachusetts-court-system',Michigan:'https://www.courts.michigan.gov/',Minnesota:'https://www.mncourts.gov/',Mississippi:'https://courts.ms.gov/',Missouri:'https://www.courts.mo.gov/',Montana:'https://courts.mt.gov/',Nebraska:'https://supremecourt.nebraska.gov/',Nevada:'https://nvcourts.gov/','New Hampshire':'https://www.courts.nh.gov/','New Jersey':'https://www.njcourts.gov/','New Mexico':'https://www.nmcourts.gov/','New York':'https://www.nycourts.gov/','North Carolina':'https://www.nccourts.gov/','North Dakota':'https://www.ndcourts.gov/',Ohio:'https://www.supremecourt.ohio.gov/',Oklahoma:'https://www.oscn.net/',Oregon:'https://www.courts.oregon.gov/',Pennsylvania:'https://www.pacourts.us/','Rhode Island':'https://www.courts.ri.gov/','South Carolina':'https://www.sccourts.org/','South Dakota':'https://ujs.sd.gov/',Tennessee:'https://www.tncourts.gov/',Texas:'https://www.txcourts.gov/',Utah:'https://www.utcourts.gov/',Vermont:'https://www.vermontjudiciary.org/',Virginia:'https://www.vacourts.gov/',Washington:'https://www.courts.wa.gov/','West Virginia':'https://www.courtswv.gov/',Wisconsin:'https://www.wicourts.gov/',Wyoming:'https://www.courts.state.wy.us/'};
  var countyData = {'New York':[['Albany County','https://iapps.courts.state.ny.us/nyscef/CaseSearch?task=new'],['Bronx County','https://iapps.courts.state.ny.us/nyscef/CaseSearch?task=new'],['Kings County','https://iapps.courts.state.ny.us/nyscef/CaseSearch?task=new'],['Nassau County','https://iapps.courts.state.ny.us/nyscef/CaseSearch?task=new'],['New York County','https://iapps.courts.state.ny.us/nyscef/CaseSearch?task=new'],['Queens County','https://iapps.courts.state.ny.us/nyscef/CaseSearch?task=new'],['Richmond County','https://iapps.courts.state.ny.us/nyscef/CaseSearch?task=new'],['Suffolk County','https://iapps.courts.state.ny.us/nyscef/CaseSearch?task=new'],['Westchester County','https://iapps.courts.state.ny.us/nyscef/CaseSearch?task=new']],'Florida':[['Miami-Dade County','https://www2.miamidadeclerk.gov/ocs/'],['Broward County','https://www.browardclerk.org/web2'],['Orange County','https://myeclerk.myorangeclerk.com/'],['Palm Beach County','https://appsgp.mypalmbeachclerk.com/eCaseView/']],'California':[['Los Angeles County','https://www.lacourt.ca.gov/pages/lp/access-a-case/tp/find-case-information/cp/os-civil-case-access']],'Texas':[['Harris County','https://www.hcdistrictclerk.com/edocs/public/search.aspx'],['Dallas County','https://courtsportal.dallascounty.org/DALLASPROD']],'Illinois':[['Cook County','https://www.cookcountyclerkofcourt.org/online-case-information']],'Nevada':[['Clark County','https://www.clarkcountycourts.us/Portal/']]};
  var inmateByState = {California:'https://ciris.mt.cdcr.ca.gov/',Florida:'https://pubapps.fdc.myflorida.com/OffenderSearch/Search.aspx?TypeSearch=AI',Illinois:'https://idoc.illinois.gov/offender/inmatesearch.html','New York':'https://nysdoccslookup.doccs.ny.gov/',Texas:'https://inmate.tdcj.texas.gov/InmateSearch/start.action'};
  var defaultCourtUrl = 'https://www.ncsc.org/information-and-resources/state-court-websites';
  function selectState(name) { var s = document.getElementById('state-select'); s.value = name; updateSections(); document.getElementById('business').scrollIntoView({behavior:'smooth'}); }
  function updateSections() {
    var state = document.getElementById('state-select').value;
    var hasState = state !== 'All States';
    var bizUrl = stateBizUrls[state] || 'https://www.usa.gov/business';
    var courtUrl = stateCourtUrls[state] || defaultCourtUrl;
    var inmateUrl = hasState && inmateByState[state] ? inmateByState[state] : 'https://www.usa.gov/state-corrections';
    document.getElementById('business-title').textContent = hasState ? state + ' Business Entity Search' : 'Business Entity Search by State';
    document.getElementById('biz-tag').textContent = hasState ? 'Official source' : 'State required';
    document.getElementById('biz-card-title').textContent = hasState ? state + ' Entity Search' : 'Select a State First';
    document.getElementById('biz-card-text').textContent = hasState ? 'Look up official Secretary of State business filings.' : 'Choose a state above to display the official business search link.';
    document.getElementById('biz-btn-wrap').innerHTML = hasState ? '<a href="'+bizUrl+'" target="_blank" class="flex min-h-[58px] w-full items-center justify-center gap-3 rounded-xl bg-accent px-6 py-4 text-center text-sm font-black text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">Open Search <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg></a>' : '';
    document.getElementById('court-title').textContent = hasState ? state + ' Lawsuit Records' : 'Lawsuit Records by State and County';
    document.getElementById('court-desc').textContent = hasState ? 'Choose a county within ' + state + ' to open lawsuit and civil case lookup tools. Most civil lawsuits, judgments, and local court filings are managed at the county level.' : 'Select a state from the hero section above to load county court records. Most lawsuit and civil court searches begin with the county clerk or local court system.';
    document.getElementById('court-tag').textContent = hasState ? 'Lawsuit source' : 'State required';
    document.getElementById('court-card-title').textContent = hasState ? state + ' Court Directory' : 'Select a State First';
    document.getElementById('court-card-text').textContent = hasState ? 'Use official court and clerk resources for lawsuit and civil case records.' : 'Choose a state in the hero section above to load county lawsuit record options.';
    document.getElementById('court-btn-wrap').innerHTML = hasState ? '<a href="'+courtUrl+'" target="_blank" class="flex min-h-[58px] w-full items-center justify-center gap-3 rounded-xl bg-accent px-6 py-4 text-center text-sm font-black text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">Court Directory <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg></a>' : '';
    var cs = document.getElementById('county-select');
    var counties = countyData[state] || [];
    cs.innerHTML = '<option>' + (hasState ? 'Select County' : 'Select a state above first') + '</option>';
    counties.forEach(function(c) { cs.innerHTML += '<option>' + c[0] + '</option>'; });
    cs.disabled = !hasState;
    updateCountyLink();
    document.getElementById('inmate-desc').textContent = hasState ? 'Search ' + state + ' correctional records or federal inmate custody records using official incarceration databases. State systems usually track prison inmates, while county jail systems may maintain separate local detention records.' : 'Select a state above to load state incarceration records, or use the federal inmate locator below. State and federal inmate systems are maintained separately.';
    document.getElementById('inmate-btn').href = inmateUrl;
    document.getElementById('inmate-btn').innerHTML = (hasState ? 'Open ' + state + ' Search' : 'Open State Directory') + ' <svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>';
  }
  function updateCountyLink() {
    var state = document.getElementById('state-select').value;
    var countyName = document.getElementById('county-select').value;
    var counties = countyData[state] || [];
    var found = counties.find(function(c) { return c[0] === countyName; });
    var courtUrl = stateCourtUrls[state] || defaultCourtUrl;
    var url = found ? found[1] : courtUrl;
    var label = found ? 'Open Lawsuit Search' : 'Court Directory';
    document.getElementById('county-btn-wrap').innerHTML = '<a href="'+url+'" target="_blank" class="flex min-h-[58px] w-full items-center justify-center gap-3 rounded-xl bg-accent px-6 py-4 text-center text-sm font-black text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">'+label+' <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg></a>';
  }
  document.getElementById('pacer-name').addEventListener('input', function() {
    var hint = document.getElementById('pacer-hint');
    if (this.value.trim()) { hint.textContent = 'Suggested search term: ' + this.value; hint.classList.remove('hidden'); }
    else { hint.classList.add('hidden'); }
  });
  </script>
`;

writePage('', 'RecordWatchdog - Public Records Guides & Free Search Directory', 'Search official public records by state. Access business filings, court records, incarceration data, and bankruptcy tools. Free directory.', homeContent, homeSchema);

// Generate redirect pages for common URL variations
const redirectPages = [
  { path: 'about-us', redirectTo: '/about/', title: 'About Us - Redirect to About Page' },
  { path: 'privacy', redirectTo: '/privacy-policy/', title: 'Privacy Policy - Redirect to Privacy Page' },
  { path: 'contact-us', redirectTo: '/contact/', title: 'Contact Us - Redirect to Contact Page' },
  { path: 'cookies', redirectTo: '/cookie-policy/', title: 'Cookie Policy - Redirect to Cookies Page' },
  { path: 'terms-and-conditions', redirectTo: '/terms/', title: 'Terms and Conditions - Redirect to Terms Page' },
  { path: 'terms-of-service', redirectTo: '/terms/', title: 'Terms of Service - Redirect to Terms Page' }
];

redirectPages.forEach(page => {
  const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title}</title>
  <meta http-equiv="refresh" content="0; url=${page.redirectTo}">
  <link rel="canonical" href="https://www.recordwatchdog.com${page.redirectTo}">
  <meta name="robots" content="noindex, follow">
</head>
<body>
  <p>Redirecting to <a href="${page.redirectTo}">${page.redirectTo}</a>...</p>
  <script>window.location.href = "${page.redirectTo}";</script>
</body>
</html>`;
  
  const dir = path.join(distDir, page.path);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(path.join(dir, 'index.html'), redirectHtml);
  console.log(`Generated redirect: ${page.path}/ -> ${page.redirectTo}`);
});

// Sitemap generated from real dates
const SITE_URL = 'https://recordwatchdog.com';
const newestUpdate = blogPosts.map(p => p.updatedIso).sort().pop();
const sitemapEntries = [
  ['/', newestUpdate, 'weekly', '1.0'],
  ['/blog/', newestUpdate, 'weekly', '0.9'],
  ['/tools/', newestUpdate, 'monthly', '0.6'],
  ['/start-here/', newestUpdate, 'monthly', '0.7'],
  ['/glossary/', newestUpdate, 'monthly', '0.6'],
  ...CATEGORIES.map(c => [`/blog/category/${c.id}/`, newestUpdate, 'weekly', '0.6']),
  ['/about/', '2026-06-01', 'monthly', '0.5'],
  ['/faq/', '2026-06-01', 'monthly', '0.5'],
  ['/contact/', '2026-06-01', 'yearly', '0.4'],
  ['/privacy-policy/', '2026-06-01', 'yearly', '0.3'],
  ['/cookie-policy/', '2026-06-01', 'yearly', '0.3'],
  ['/terms/', '2026-06-01', 'yearly', '0.3'],
  ['/dmca/', '2026-06-01', 'yearly', '0.3'],
  ...blogPosts.map(p => [`/blog/${p.slug}/`, p.updatedIso, 'monthly', '0.7'])
];
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  sitemapEntries.map(([loc, lastmod, freq, prio]) => `  <url>\n    <loc>${SITE_URL}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${prio}</priority>\n  </url>`).join('\n') +
  `\n</urlset>\n`;
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml);
if (fs.existsSync('./public')) fs.writeFileSync('./public/sitemap.xml', sitemapXml);
console.log('Generated: sitemap.xml with', sitemapEntries.length, 'URLs');

console.log('✅ Static site generation complete! All pages are now true multi-page HTML files.');