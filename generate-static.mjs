import fs from 'fs';
import path from 'path';
import { blogPosts } from './src/data/blogData.js';

const distDir = './dist';

if (!fs.existsSync(distDir)) {
  console.error('Please run "npm run build" first to create the dist directory.');
  process.exit(1);
}

const header = (title, desc) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${desc}" />
  <meta name="robots" content="index, follow" />
  <meta name="google-site-verification" content="YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://cdn.tailwindcss.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://adservice.google.com https://ep1.adtrafficquality.google; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: http: blob:; font-src 'self' https://fonts.gstatic.com; frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://bid.g.doubleclick.net; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://pagead2.googlesyndication.com;" />
  <meta http-equiv="X-Content-Type-Options" content="nosniff" />
  <meta http-equiv="X-Frame-Options" content="DENY" />
  <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
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
          <li><a href="/blog/" class="transition hover:text-accent">Blog</a></li>
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
          <a href="/#sex" class="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-primary shadow-sm transition hover:border-accent hover:bg-orange-50 hover:text-accent">
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg> Sex Offenders
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
        <a href="/blog/" class="transition hover:text-white">Blog</a>
        <a href="/privacy-policy/" class="transition hover:text-white">Privacy Policy</a>
        <a href="/terms/" class="transition hover:text-white">Terms</a>
        <a href="/faq/" class="transition hover:text-white">FAQ</a>
        <a href="/contact/" class="transition hover:text-white">Contact</a>
        <a href="/dmca/" class="transition hover:text-white">DMCA</a>
      </div>
    </div>
    <div class="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-slate-400">
      <p>&copy; 2026 RecordWatchdog. All rights reserved. This site is a directory of public resources and is not a consumer reporting agency.</p>
    </div>
  </footer>
  <div id="cookie-banner" class="fixed bottom-0 left-0 right-0 z-[100] border-t border-slate-200 bg-white p-4 shadow-2xl sm:p-6">
    <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
      <div class="text-center sm:text-left">
        <p class="text-sm font-bold text-primary">We value your privacy</p>
        <p class="mt-1 text-sm text-slate-600">We and our partners, including Google AdSense, use cookies to personalize content and ads, provide social media features, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our <a href="/privacy-policy/" class="font-bold text-accent underline">Privacy Policy</a>.</p>
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
    }
  </script>
</body>
</html>`;

function writePage(folderPath, title, desc, content, schema = '') {
  const dir = path.join(distDir, folderPath);
  fs.mkdirSync(dir, { recursive: true });
  const schemaScript = schema ? `\n  <script type="application/ld+json">${JSON.stringify(schema)}</script>\n` : '';
  fs.writeFileSync(path.join(dir, 'index.html'), header(title, desc) + schemaScript + content + footer);
  console.log('Generated:', path.join(folderPath, 'index.html'));
}

// 1. Privacy Policy
const privacySchema = { "@context": "https://schema.org", "@type": "WebPage", "name": "Privacy Policy", "description": "RecordWatchdog Privacy Policy regarding data handling, Google AdSense cookies, and user privacy." };
writePage('privacy-policy', 'Privacy Policy | RecordWatchdog', 'Read the RecordWatchdog Privacy Policy to understand how we handle your data, Google AdSense cookies, and protect your privacy.', `
  <section class="mx-auto max-w-4xl px-5 py-16">
    <header class="mb-8"><p class="font-black uppercase tracking-[0.18em] text-accent">Legal</p><h1 class="mt-2 text-4xl font-black text-primary">Privacy Policy</h1><p class="mt-4 text-slate-600">Last Updated: June 1, 2026</p></header>
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
writePage('terms', 'Terms of Use | RecordWatchdog', 'Read the RecordWatchdog Terms of Use. We are not a consumer reporting agency under the FCRA.', `
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
writePage('about', 'About Us | RecordWatchdog', 'Learn about RecordWatchdog, our mission to make public records accessible, and our core values.', `
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
writePage('contact', 'Contact Us | RecordWatchdog', 'Get in touch with the RecordWatchdog team for inquiries, corrections, or business opportunities.', `
  <section class="mx-auto max-w-4xl px-5 py-16">
    <header class="mb-8"><p class="font-black uppercase tracking-[0.18em] text-accent">Get in Touch</p><h1 class="mt-2 text-4xl font-black text-primary">Contact Us</h1><p class="mt-4 text-xl leading-8 text-slate-600">Have a question, correction, or business inquiry? We'd love to hear from you.</p></header>
    <article class="grid gap-10 lg:grid-cols-2">
      <div class="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 class="text-xl font-black text-primary">Direct Email</h2>
        <p class="mt-3 text-slate-600">For general inquiries, legal requests, or partnership opportunities, please email us directly.</p>
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
    </article>
  </section>
`, contactSchema);

// 5. DMCA
const dmcaSchema = { "@context": "https://schema.org", "@type": "WebPage", "name": "DMCA Policy", "description": "RecordWatchdog Digital Millennium Copyright Act policy and takedown procedures." };
writePage('dmca', 'DMCA Policy | RecordWatchdog', 'Read the RecordWatchdog Digital Millennium Copyright Act (DMCA) policy and takedown procedures.', `
  <section class="mx-auto max-w-4xl px-5 py-16">
    <header class="mb-8"><p class="font-black uppercase tracking-[0.18em] text-accent">Legal</p><h1 class="mt-2 text-4xl font-black text-primary">DMCA Policy</h1><p class="mt-4 text-slate-600">Last Updated: June 1, 2026</p></header>
    <article class="prose max-w-none">
      <h2>1. Policy Overview</h2><p>RecordWatchdog respects the intellectual property rights of others. In accordance with the Digital Millennium Copyright Act (DMCA), we will respond expeditiously to claims of copyright infringement.</p>
      <h2>2. Notice of Copyright Infringement</h2><p>If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, please notify our designated copyright agent with: (1) A physical or electronic signature, (2) Identification of the copyrighted work, (3) Identification of the infringing material and its URL, (4) Your contact information, (5) A good faith statement, and (6) A statement of accuracy under penalty of perjury.</p>
      <h2>3. Designated Copyright Agent</h2><p>Please send all DMCA notices to our designated agent at: <strong>niko@nwbventures.com</strong> with the subject line "DMCA Takedown Request".</p>
    </article>
  </section>
`, dmcaSchema);

// 6. FAQ
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "name": "Frequently Asked Questions", "description": "Answers to common questions about using RecordWatchdog and public records." };
writePage('faq', 'Frequently Asked Questions (FAQ) | RecordWatchdog', 'Find answers to common questions about using RecordWatchdog, public records, privacy, and our directory services.', `
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

// 7. Blog Listing
let blogCards = blogPosts.map(post => `
  <a href="/blog/${post.slug}/" class="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-accent hover:shadow-lg">
    <div class="mb-4 flex items-center gap-3 text-xs font-bold text-slate-500">
      <span class="rounded-full bg-orange-50 px-3 py-1 text-accent">Guide</span>
      <span>${post.date}</span>
    </div>
    <h2 class="text-xl font-black text-primary transition group-hover:text-accent">${post.title}</h2>
    <p class="mt-3 flex-grow text-sm leading-6 text-slate-600">${post.excerpt}</p>
    <div class="mt-6 flex items-center gap-2 text-sm font-black text-accent">Read Article <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></div>
  </a>
`).join('');

const blogSchema = { "@context": "https://schema.org", "@type": "Blog", "name": "RecordWatchdog Blog", "description": "Expert guides on navigating public records and the U.S. legal system.", "url": "https://recordwatchdog.com/blog/" };
writePage('blog', 'Blog | RecordWatchdog', 'Read expert guides, tips, and insights on navigating public records, conducting due diligence, and understanding the U.S. legal system.', `
  <section class="mx-auto max-w-7xl px-5 py-16">
    <header class="mb-10 text-center">
      <p class="font-black uppercase tracking-[0.18em] text-accent">Resources & Insights</p>
      <h1 class="mt-2 text-4xl font-black text-primary md:text-5xl">The RecordWatchdog Blog</h1>
      <p class="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">Expert guides, tips, and insights on navigating public records, conducting due diligence, and understanding the U.S. legal and business filing systems.</p>
    </header>
    <div class="grid gap-8 lg:grid-cols-[1fr_350px]">
      <article class="grid gap-8 sm:grid-cols-2">${blogCards}</article>
      <aside class="space-y-8">
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="text-lg font-black text-primary">Editorial Standards</h2>
          <p class="mt-3 text-sm leading-6 text-slate-600">Every article on RecordWatchdog is researched, fact-checked, and reviewed by our legal research team to ensure accuracy, compliance, and practical value for our readers.</p>
          <div class="mt-4 flex items-center gap-3">
            <div class="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">RW</div>
            <div>
              <p class="text-sm font-bold text-primary">RecordWatchdog Team</p>
              <p class="text-xs text-slate-500">Verified Legal Researchers</p>
            </div>
          </div>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="text-lg font-black text-primary">Popular Topics</h2>
          <ul class="mt-3 space-y-2 text-sm">
            <li><a href="/blog/how-to-search-public-records-in-california/" class="text-accent hover:underline">California Public Records</a></li>
            <li><a href="/blog/understanding-llc-filings-and-business-entity-searches/" class="text-accent hover:underline">LLC Business Searches</a></li>
            <li><a href="/blog/guide-to-county-court-records-and-lawsuit-searches/" class="text-accent hover:underline">County Court Records</a></li>
            <li><a href="/" class="text-accent hover:underline">Main Directory</a></li>
          </ul>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-[#071638] p-6 text-white shadow-sm">
          <h2 class="text-lg font-black">Need Help Searching?</h2>
          <p class="mt-3 text-sm leading-6 text-slate-300">Use our main directory to quickly jump to official state and county record portals.</p>
          <a href="/" class="mt-6 block w-full rounded-xl bg-accent py-3 text-center font-black text-white transition hover:bg-[#e55a25]">Go to Directory</a>
        </div>
      </aside>
    </div>
  </section>
`, blogSchema);

// 7. Individual Blog Posts
blogPosts.forEach(post => {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": "RecordWatchdog Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "RecordWatchdog",
      "logo": {
        "@type": "ImageObject",
        "url": "https://recordwatchdog.com/recordwatchdog-logo.png"
      }
    }
  };
  writePage(`blog/${post.slug}`, `${post.title} | RecordWatchdog Blog`, post.excerpt, `
    <div class="mx-auto max-w-7xl px-5 py-16">
      <a href="/blog/" class="mb-8 flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-accent">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg> Back to Blog
      </a>
      <div class="grid gap-10 lg:grid-cols-[1fr_350px]">
        <article>
          <div class="mb-6 flex items-center gap-3 text-sm font-bold text-slate-500">
            <span class="rounded-full bg-orange-50 px-3 py-1 text-accent">Guide</span>
            <span>${post.date}</span>
            <span>•</span>
            <span>${post.author}</span>
          </div>
          <h1 class="text-3xl font-black leading-tight text-primary md:text-5xl">${post.title}</h1>
          <p class="mt-6 text-xl leading-8 text-slate-600">${post.excerpt}</p>
          <div class="my-12 w-full">
            <div class="mb-3 flex items-center justify-center"><span class="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Advertisement</span></div>
            <div class="flex min-h-[250px] w-full items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 text-slate-400"><p class="text-sm font-medium">Google AdSense Unit</p></div>
          </div>
          <div class="prose max-w-none">${post.content}</div>
          <div class="my-12 w-full">
            <div class="mb-3 flex items-center justify-center"><span class="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Advertisement</span></div>
            <div class="flex min-h-[250px] w-full items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 text-slate-400"><p class="text-sm font-medium">Google AdSense Unit</p></div>
          </div>
          <div class="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h3 class="text-xl font-black text-primary">Disclaimer</h3>
            <p class="mt-3 text-sm leading-6 text-slate-600">The information provided in this article is for general informational and educational purposes only and does not constitute legal advice. Public record systems and laws vary by jurisdiction and are subject to change. Always verify information directly with the official government agency or consult with a qualified attorney. RecordWatchdog is not a consumer reporting agency.</p>
          </div>
        </article>
        <aside class="space-y-8">
          <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 class="text-lg font-black text-primary">Related Articles</h3>
            <div class="mt-4 space-y-4">
              ${blogPosts.filter(p => p.id !== post.id).slice(0, 3).map(p => `
                <a href="/blog/${p.slug}/" class="group block">
                  <h4 class="text-sm font-bold text-primary transition group-hover:text-accent">${p.title}</h4>
                  <p class="mt-1 text-xs text-slate-500">${p.date}</p>
                </a>
              `).join('')}
            </div>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-[#071638] p-6 text-white shadow-sm">
            <h3 class="text-lg font-black">Start Your Search</h3>
            <p class="mt-3 text-sm leading-6 text-slate-300">Ready to look up public records? Use our free directory to access official state and county databases.</p>
            <a href="/" class="mt-6 block w-full rounded-xl bg-accent py-3 text-center font-black text-white transition hover:bg-[#e55a25]">Go to Directory</a>
          </div>
        </aside>
      </div>
    </div>
  `, blogSchema);
});

// 8. Homepage (static version for crawlers and AdSense)
const homeSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "RecordWatchdog",
  "url": "https://recordwatchdog.com/",
  "description": "Free directory to search official public records by state. Find business entity filings, county court records, incarceration databases, bankruptcy filings, and sex offender registries.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://recordwatchdog.com/?state={state}",
    "query-input": "required name=state"
  }
};

writePage('', 'RecordWatchdog | Official Public Records Directory & Search', 'Free directory to search official public records by state. Find business entity filings, county court records, incarceration databases, bankruptcy filings, and sex offender registries.', `
  <section class="relative overflow-hidden bg-[#071638] text-white">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,.14),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(255,111,54,.16),transparent_24%)]"></div>
    <div class="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.3fr_.7fr] lg:py-20">
      <div>
        <h1 class="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">Search Public Records.<br /><span class="text-accent">Find What Matters.</span></h1>
        <p class="mt-6 max-w-3xl text-xl leading-8 text-slate-200">Start with a state, then access business entity search, lawsuit records, incarceration records, bankruptcy tools, and sex offender registry resources.</p>
        <div class="mt-8 flex flex-wrap gap-3 text-sm font-bold text-slate-200">
          <span class="rounded-full border border-white/20 bg-white/10 px-4 py-2">50 State Directories</span>
          <span class="rounded-full border border-white/20 bg-white/10 px-4 py-2">Official Sources</span>
          <span class="rounded-full border border-white/20 bg-white/10 px-4 py-2">Privacy-Friendly</span>
        </div>
        <div class="mt-10 max-w-2xl rounded-3xl border border-white/25 bg-white p-6 shadow-2xl">
          <label class="mb-3 block text-sm font-black uppercase tracking-[0.14em] text-slate-600">Select Your State</label>
          <div class="grid gap-4 md:grid-cols-[1fr_260px]">
            <select id="state-select" class="w-full appearance-none rounded-xl border border-slate-300 bg-white px-5 py-4 text-lg font-bold text-slate-900 outline-none focus:border-accent focus:ring-4 focus:ring-orange-100">
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
            <a href="#business" class="flex items-center justify-center rounded-xl bg-accent px-8 py-4 font-black text-white shadow-lg transition hover:bg-[#e55a25]">Show Options</a>
          </div>
        </div>
        <div class="mt-8 grid gap-4 sm:grid-cols-3">
          <a href="#business" class="block rounded-2xl border border-white/15 bg-[#13224d] p-4 text-left shadow-lg transition hover:border-accent hover:bg-[#1a2d63]">
            <div class="text-base font-extrabold tracking-tight text-white">Florida Records</div>
            <div class="mt-1 text-sm font-medium text-slate-300">Most searched state</div>
          </a>
          <a href="#court" class="block rounded-2xl border border-white/15 bg-[#13224d] p-4 text-left shadow-lg transition hover:border-accent hover:bg-[#1a2d63]">
            <div class="text-base font-extrabold tracking-tight text-white">California Courts</div>
            <div class="mt-1 text-sm font-medium text-slate-300">High traffic lookups</div>
          </a>
          <a href="#business" class="block rounded-2xl border border-white/15 bg-[#13224d] p-4 text-left shadow-lg transition hover:border-accent hover:bg-[#1a2d63]">
            <div class="text-base font-extrabold tracking-tight text-white">Texas Business Search</div>
            <div class="mt-1 text-sm font-medium text-slate-300">Popular entity searches</div>
          </a>
        </div>
      </div>
      <div class="grid content-center gap-8">
        <div class="py-2">
          <div class="mb-2 flex items-center justify-end"><span class="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-300">Advertisement</span></div>
          <div class="h-[220px] w-full overflow-hidden rounded-2xl bg-slate-100/80"></div>
        </div>
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
      <h2 class="mt-2 text-3xl font-black">Most Searched States</h2>
      <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        <a href="#business" class="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-accent hover:shadow-lg">
          <div class="text-lg font-black">Florida</div>
          <div class="mt-2 text-sm leading-6 text-slate-600">Popular public record searches</div>
        </a>
        <a href="#business" class="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-accent hover:shadow-lg">
          <div class="text-lg font-black">California</div>
          <div class="mt-2 text-sm leading-6 text-slate-600">Popular public record searches</div>
        </a>
        <a href="#business" class="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-accent hover:shadow-lg">
          <div class="text-lg font-black">Texas</div>
          <div class="mt-2 text-sm leading-6 text-slate-600">Popular public record searches</div>
        </a>
        <a href="#business" class="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-accent hover:shadow-lg">
          <div class="text-lg font-black">New York</div>
          <div class="mt-2 text-sm leading-6 text-slate-600">Popular public record searches</div>
        </a>
        <a href="#business" class="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-accent hover:shadow-lg">
          <div class="text-lg font-black">Illinois</div>
          <div class="mt-2 text-sm leading-6 text-slate-600">Popular public record searches</div>
        </a>
        <a href="#business" class="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-accent hover:shadow-lg">
          <div class="text-lg font-black">Georgia</div>
          <div class="mt-2 text-sm leading-6 text-slate-600">Popular public record searches</div>
        </a>
      </div>
    </div>
  </section>

  <section id="business" class="relative mx-auto max-w-7xl overflow-hidden px-5 py-16">
    <div class="relative z-10 mb-8">
      <p class="font-black uppercase tracking-[0.2em] text-accent">Business records</p>
      <h2 class="mt-2 text-4xl font-black">Business Entity Search by State</h2>
      <p class="mt-3 max-w-3xl text-slate-600">Open official business entity search tools for LLCs, corporations, registered agents, and filings. Business entity searches are commonly used for due diligence, ownership verification, vendor checks, and researching active or dissolved companies.</p>
      <div class="mt-5 flex flex-wrap gap-3 text-sm font-bold text-slate-600">
        <span class="rounded-full bg-orange-50 px-4 py-2 text-accent">LLC Verification</span>
        <span class="rounded-full bg-slate-100 px-4 py-2">Corporate Filings</span>
        <span class="rounded-full bg-slate-100 px-4 py-2">Registered Agents</span>
      </div>
    </div>
    <div class="relative z-10 grid gap-5 md:grid-cols-3">
      <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-accent"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg></div>
        <p class="mb-2 text-xs font-black uppercase tracking-[0.18em] text-accent">Official source</p>
        <h3 class="text-lg font-black text-primary">Select a State First</h3>
        <p class="mt-2 text-sm leading-6 text-slate-600">Choose a state above to display the official business search link.</p>
      </article>
      <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-accent"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div>
        <h3 class="text-lg font-black text-primary">Business Filing Tips</h3>
        <p class="mt-2 text-sm leading-6 text-slate-600">Search by exact name, partial name, officer, registered agent, or entity number when available.</p>
      </article>
      <div class="py-1">
        <div class="mb-2 flex items-center justify-end"><span class="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-300">Advertisement</span></div>
        <div class="h-[140px] w-full overflow-hidden rounded-2xl bg-slate-100/80"></div>
      </div>
    </div>
  </section>

  <section id="court" class="relative overflow-hidden border-y bg-gradient-to-b from-white to-slate-50 py-16">
    <div class="relative z-10 mx-auto max-w-7xl px-5">
      <p class="font-black uppercase tracking-[0.2em] text-accent">Lawsuit records</p>
      <h2 class="mt-2 text-4xl font-black">Lawsuit Records by State and County</h2>
      <p class="mt-3 max-w-3xl text-slate-600">Select a state from the hero section above to load county court records. Most lawsuit and civil court searches begin with the county clerk or local court system.</p>
      <div class="mt-5 flex flex-wrap gap-3 text-sm font-bold text-slate-600">
        <span class="rounded-full bg-orange-50 px-4 py-2 text-accent">Civil Cases</span>
        <span class="rounded-full bg-slate-100 px-4 py-2">Judgments</span>
        <span class="rounded-full bg-slate-100 px-4 py-2">County Court Records</span>
      </div>
      <div class="mt-8 grid gap-5 lg:grid-cols-3">
        <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-accent"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg></div>
          <p class="mb-2 text-xs font-black uppercase tracking-[0.18em] text-accent">Lawsuit source</p>
          <h3 class="text-lg font-black text-primary">Select a State First</h3>
          <p class="mt-2 text-sm leading-6 text-slate-600">Choose a state in the hero section above to load county lawsuit record options.</p>
        </article>
        <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="mb-4 flex items-start gap-3">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-accent"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg></div>
            <div><p class="text-xs font-black uppercase tracking-[0.18em] text-accent">County lookup</p><h3 class="text-lg font-black text-primary">Choose County</h3><p class="mt-1 text-sm leading-6 text-slate-600">Most civil lawsuits and local court records are maintained at the county level.</p></div>
          </div>
          <select disabled class="w-full rounded-xl border border-slate-300 px-4 py-4 font-bold outline-none disabled:bg-slate-100 disabled:text-slate-400">
            <option>Select a state above first</option>
          </select>
        </article>
        <div class="py-1">
          <div class="mb-2 flex items-center justify-end"><span class="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-300">Advertisement</span></div>
          <div class="h-[140px] w-full overflow-hidden rounded-2xl bg-slate-100/80"></div>
        </div>
      </div>
    </div>
  </section>

  <section class="px-5 py-5"><div class="mx-auto max-w-7xl"><div class="py-2"><div class="mb-2 flex items-center justify-end"><span class="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-300">Advertisement</span></div><div class="h-[120px] w-full overflow-hidden rounded-3xl bg-slate-100/80"></div></div></div></section>

  <section id="bankruptcy" class="relative mx-auto max-w-7xl overflow-hidden px-5 py-16">
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
    <div class="relative z-10 mx-auto max-w-7xl px-5">
      <p class="font-black uppercase tracking-[0.2em] text-accent">Incarceration records</p>
      <h2 class="mt-2 text-4xl font-black">Incarceration Records</h2>
      <p class="mt-3 max-w-3xl text-slate-600">Select a state above to load state incarceration records, or use the federal inmate locator below. State and federal inmate systems are maintained separately.</p>
      <div class="mt-5 flex flex-wrap gap-3 text-sm font-bold text-slate-600">
        <span class="rounded-full bg-orange-50 px-4 py-2 text-accent">State Corrections</span>
        <span class="rounded-full bg-slate-100 px-4 py-2">Federal Inmates</span>
        <span class="rounded-full bg-slate-100 px-4 py-2">County Jail Records</span>
      </div>
      <div class="mt-8 grid gap-5 md:grid-cols-3">
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
        <div class="py-1">
          <div class="mb-2 flex items-center justify-end"><span class="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-300">Advertisement</span></div>
          <div class="h-[140px] w-full overflow-hidden rounded-2xl bg-slate-100/80"></div>
        </div>
      </div>
    </div>
  </section>

  <section id="sex" class="relative mx-auto max-w-7xl overflow-hidden px-5 py-16">
    <div class="relative z-10">
      <p class="font-black uppercase tracking-[0.2em] text-accent">Public safety</p>
      <h2 class="mt-2 text-4xl font-black">National Sex Offender Registry</h2>
      <p class="mt-3 max-w-3xl text-slate-600">Search the official NSOPW registry by name or address-radius lookup. The National Sex Offender Public Website aggregates participating state, territorial, and tribal registry systems into one searchable platform.</p>
      <div class="mt-5 flex flex-wrap gap-3 text-sm font-bold text-slate-600">
        <span class="rounded-full bg-orange-50 px-4 py-2 text-accent">National Registry</span>
        <span class="rounded-full bg-slate-100 px-4 py-2">Address Radius Search</span>
        <span class="rounded-full bg-slate-100 px-4 py-2">Public Safety Records</span>
      </div>
    </div>
    <div class="relative z-10 mt-8">
      <a href="https://www.nsopw.gov/search-public-sex-offender-registries" target="_blank" class="block w-full rounded-xl bg-accent py-4 text-center font-black text-white shadow-md transition hover:bg-[#e55a25]">Open National Sex Offender Registry</a>
    </div>
    <p class="relative z-10 mt-5 text-sm text-slate-600">Address searches are completed on the official NSOPW website. RecordWatchdog does not host registry records.</p>
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
            <p class="mt-2 text-sm leading-6 text-slate-600">Click the provided buttons to be directed securely to the official government portal to perform your search.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
`, homeSchema);

console.log('✅ Static site generation complete! All pages are now true multi-page HTML files.');