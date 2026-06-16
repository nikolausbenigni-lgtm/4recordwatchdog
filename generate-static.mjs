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
  <header class="sticky top-0 z-50 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur-sm">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4">
      <a href="/" class="flex items-center gap-2 group">
        <img src="/recordwatchdog-logo.png" alt="RecordWatchdog" class="h-auto min-w-[150px] max-w-[160px] object-contain" />
      </a>
      <nav class="hidden flex-1 items-center justify-end gap-6 text-sm font-bold xl:flex">
        <a href="/" class="transition hover:text-accent">Home</a>
        <a href="/#business" class="transition hover:text-accent">Business</a>
        <a href="/#court" class="transition hover:text-accent">Lawsuits</a>
        <a href="/#inmates" class="transition hover:text-accent">Incarceration</a>
        <a href="/#bankruptcy" class="transition hover:text-accent">Bankruptcy</a>
        <a href="/#sex" class="transition hover:text-accent">Sex Offenders</a>
        <a href="/blog/" class="transition hover:text-accent">Blog</a>
      </nav>
    </div>
  </header>
  <main class="flex-grow">`;

const footer = `
  </main>
  <footer class="bg-[#071638] px-5 py-10 text-white">
    <div class="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <a href="/" class="flex items-center gap-2">
        <img src="/recordwatchdog-logo.png" alt="RecordWatchdog" class="h-auto min-w-[150px] max-w-[160px] object-contain" />
      </a>
      <div class="flex flex-wrap gap-5 text-sm font-bold text-slate-300">
        <a href="/privacy/" class="transition hover:text-white">Privacy Policy</a>
        <a href="/terms/" class="transition hover:text-white">Terms of Use</a>
        <a href="/about/" class="transition hover:text-white">About Us</a>
        <a href="/contact/" class="transition hover:text-white">Contact</a>
        <a href="/dmca/" class="transition hover:text-white">DMCA Policy</a>
      </div>
    </div>
    <div class="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-slate-400">
      <p>&copy; 2026 RecordWatchdog. All rights reserved. This site is a directory of public resources and is not a consumer reporting agency.</p>
    </div>
  </footer>
  <div id="cookie-banner" class="fixed bottom-0 left-0 right-0 z-[100] border-t border-slate-200 bg-white p-4 shadow-2xl sm:p-6 hidden">
    <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
      <div class="text-center sm:text-left">
        <p class="text-sm font-bold text-primary">We value your privacy</p>
        <p class="mt-1 text-sm text-slate-600">We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our <a href="/privacy/" class="font-bold text-accent underline">Privacy Policy</a>.</p>
      </div>
      <div class="flex shrink-0 gap-3">
        <button onclick="acceptCookies()" class="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#1a2a5e]">Accept All</button>
        <a href="/privacy/" class="rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50">Customize</a>
      </div>
    </div>
  </div>
  <script>
    if (!localStorage.getItem('cookieConsent')) document.getElementById('cookie-banner').classList.remove('hidden');
    function acceptCookies() { localStorage.setItem('cookieConsent', 'true'); document.getElementById('cookie-banner').classList.add('hidden'); }
  </script>
</body>
</html>`;

function writePage(folderPath, title, desc, content) {
  const dir = path.join(distDir, folderPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), header(title, desc) + content + footer);
  console.log('Generated:', path.join(folderPath, 'index.html'));
}

// 1. Privacy
writePage('privacy', 'Privacy Policy | RecordWatchdog', 'Read the RecordWatchdog Privacy Policy to understand how we handle your data and protect your privacy.', `
  <div class="mx-auto max-w-4xl px-5 py-16">
    <div class="mb-8"><p class="font-black uppercase tracking-[0.18em] text-accent">Legal</p><h1 class="mt-2 text-4xl font-black text-primary">Privacy Policy</h1><p class="mt-4 text-slate-600">Last Updated: June 1, 2026</p></div>
    <div class="prose max-w-none">
      <h2>1. Introduction</h2><p>RecordWatchdog respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
      <h2>2. Information We Collect</h2><p><strong>Non-Personal Information:</strong> We automatically collect certain information about your device, including your web browser, IP address, and cookies.</p><p><strong>Personal Information:</strong> We do not require you to create an account. If you contact us, we may collect your name and email address.</p>
      <h2>3. Advertising and Cookies</h2><p>We may use third-party advertising companies, such as Google AdSense, to serve ads. These companies may use cookies to provide advertisements about goods and services of interest to you.</p>
      <h2>4. Contact Us</h2><p>If you have any questions, please contact us at: <strong>niko@nwbventures.com</strong></p>
    </div>
  </div>`);

// 2. Terms
writePage('terms', 'Terms of Use | RecordWatchdog', 'Read the RecordWatchdog Terms of Use. We are not a consumer reporting agency under the FCRA.', `
  <div class="mx-auto max-w-4xl px-5 py-16">
    <div class="mb-8"><p class="font-black uppercase tracking-[0.18em] text-accent">Legal</p><h1 class="mt-2 text-4xl font-black text-primary">Terms of Use</h1><p class="mt-4 text-slate-600">Last Updated: June 1, 2026</p></div>
    <div class="prose max-w-none">
      <h2>1. Acceptance of Terms</h2><p>By accessing and using RecordWatchdog, you accept and agree to be bound by these Terms of Use.</p>
      <h2>2. Nature of the Service</h2><p>RecordWatchdog is an informational directory designed to help users locate official public-record resources. <strong>We do not host, generate, or maintain criminal records, court records, inmate databases, or sex offender registry records on our servers.</strong></p>
      <h2>3. Not a Consumer Reporting Agency (FCRA Disclaimer)</h2><p><strong>IMPORTANT:</strong> RecordWatchdog is NOT a "consumer reporting agency" as defined by the Fair Credit Reporting Act (FCRA). The information provided on this Site may not be used for employment screening, tenant screening, credit eligibility, or similar FCRA-regulated purposes.</p>
      <h2>4. Contact Information</h2><p>For questions regarding these Terms, please contact us at: <strong>niko@nwbventures.com</strong></p>
    </div>
  </div>`);

// 3. About
writePage('about', 'About Us | RecordWatchdog', 'Learn about RecordWatchdog, our mission to make public records accessible, and our core values.', `
  <div class="mx-auto max-w-4xl px-5 py-16">
    <div class="mb-8"><p class="font-black uppercase tracking-[0.18em] text-accent">About Us</p><h1 class="mt-2 text-4xl font-black text-primary">About RecordWatchdog</h1><p class="mt-4 text-xl leading-8 text-slate-600">Making public records accessible, understandable, and easy to navigate.</p></div>
    <div class="prose max-w-none">
      <p>RecordWatchdog was founded with a simple mission: to organize the fragmented landscape of public records into one streamlined, user-friendly directory. Whether you are researching a business partner, looking up county court records, or verifying a contractor's license, finding the correct official government portal can be frustrating.</p>
      <h2>Our Core Values</h2>
      <ul><li><strong>Official Sources Only:</strong> We prioritize direct links to .gov and official state/county websites.</li><li><strong>Privacy-Friendly:</strong> You can use our directory without creating an account or handing over your personal information.</li><li><strong>Transparency:</strong> We are clear about what we are: a directory. We are not a consumer reporting agency.</li></ul>
      <h2>Contact Us</h2><p>We welcome your feedback. Please reach out to us at: <strong>niko@nwbventures.com</strong></p>
    </div>
  </div>`);

// 4. Contact
writePage('contact', 'Contact Us | RecordWatchdog', 'Get in touch with the RecordWatchdog team for inquiries, corrections, or business opportunities.', `
  <div class="mx-auto max-w-4xl px-5 py-16">
    <div class="mb-8"><p class="font-black uppercase tracking-[0.18em] text-accent">Get in Touch</p><h1 class="mt-2 text-4xl font-black text-primary">Contact Us</h1><p class="mt-4 text-xl leading-8 text-slate-600">Have a question, correction, or business inquiry? We'd love to hear from you.</p></div>
    <div class="grid gap-10 lg:grid-cols-2">
      <div>
        <div class="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 class="text-xl font-black text-primary">Direct Email</h2>
          <p class="mt-3 text-slate-600">For general inquiries, legal requests, or partnership opportunities, please email us directly.</p>
          <a href="mailto:niko@nwbventures.com" class="mt-4 block text-lg font-bold text-accent transition hover:underline">niko@nwbventures.com</a>
        </div>
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
  </div>`);

// 5. DMCA
writePage('dmca', 'DMCA Policy | RecordWatchdog', 'Read the RecordWatchdog Digital Millennium Copyright Act (DMCA) policy and takedown procedures.', `
  <div class="mx-auto max-w-4xl px-5 py-16">
    <div class="mb-8"><p class="font-black uppercase tracking-[0.18em] text-accent">Legal</p><h1 class="mt-2 text-4xl font-black text-primary">DMCA Policy</h1><p class="mt-4 text-slate-600">Last Updated: June 1, 2026</p></div>
    <div class="prose max-w-none">
      <h2>1. Policy Overview</h2><p>RecordWatchdog respects the intellectual property rights of others. In accordance with the Digital Millennium Copyright Act (DMCA), we will respond expeditiously to claims of copyright infringement.</p>
      <h2>2. Notice of Copyright Infringement</h2><p>If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, please notify our designated copyright agent with: (1) A physical or electronic signature, (2) Identification of the copyrighted work, (3) Identification of the infringing material and its URL, (4) Your contact information, (5) A good faith statement, and (6) A statement of accuracy under penalty of perjury.</p>
      <h2>3. Designated Copyright Agent</h2><p>Please send all DMCA notices to our designated agent at: <strong>niko@nwbventures.com</strong> with the subject line "DMCA Takedown Request".</p>
    </div>
  </div>`);

// 6. Blog Listing
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

writePage('blog', 'Blog | RecordWatchdog', 'Read expert guides, tips, and insights on navigating public records, conducting due diligence, and understanding the U.S. legal system.', `
  <div class="mx-auto max-w-7xl px-5 py-16">
    <div class="mb-10 text-center">
      <p class="font-black uppercase tracking-[0.18em] text-accent">Resources & Insights</p>
      <h1 class="mt-2 text-4xl font-black text-primary md:text-5xl">The RecordWatchdog Blog</h1>
      <p class="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">Expert guides, tips, and insights on navigating public records, conducting due diligence, and understanding the U.S. legal and business filing systems.</p>
    </div>
    <div class="grid gap-8 lg:grid-cols-[1fr_350px]">
      <div class="grid gap-8 sm:grid-cols-2">${blogCards}</div>
      <aside class="space-y-8">
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 class="text-lg font-black text-primary">About the Blog</h3>
          <p class="mt-3 text-sm leading-6 text-slate-600">Our editorial team publishes practical guides to help individuals and businesses navigate public record systems safely, legally, and effectively.</p>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-[#071638] p-6 text-white shadow-sm">
          <h3 class="text-lg font-black">Need Help Searching?</h3>
          <p class="mt-3 text-sm leading-6 text-slate-300">Use our main directory to quickly jump to official state and county record portals.</p>
          <a href="/#business" class="mt-6 block w-full rounded-xl bg-accent py-3 text-center font-black text-white transition hover:bg-[#e55a25]">Go to Directory</a>
        </div>
      </aside>
    </div>
  </div>`);

// 7. Individual Blog Posts
blogPosts.forEach(post => {
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
  `);
});

console.log('✅ Static site generation complete! All pages are now true multi-page HTML files.');