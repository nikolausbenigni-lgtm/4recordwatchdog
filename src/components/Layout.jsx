import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck, Building2, Gavel, Landmark, FileText } from 'lucide-react';
import CookieBanner from './CookieBanner';

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2 group leading-none">
      <img src="/recordwatchdog-logo.png" alt="RecordWatchdog" className="h-auto min-w-[150px] max-w-[160px] object-contain" loading="lazy" decoding="async" />
    </a>
  );
}

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1280) setMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about/', label: 'About' },
    { href: '/blog/', label: 'Blog' },
    { href: '/faq/', label: 'FAQ' },
    { href: '/contact/', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-[#101943] flex flex-col">
      <CookieBanner />
      
      {/* Unified Sticky Header Wrapper - Ensures both menu and search bar stick together perfectly without overlapping */}
      <div className="sticky top-0 z-50 bg-white/95 shadow-sm backdrop-blur-sm">
        <header className="border-b border-slate-100">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-1.5">
            <Logo />
            <nav className="hidden xl:block flex-1">
              <ul className="flex items-center justify-end gap-6 text-sm font-bold">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a 
                      href={link.href} 
                      className="transition hover:text-[#ff6f36]"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="rounded-xl border p-2 xl:hidden" aria-label="Toggle menu">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {menuOpen && (
            <nav className="border-t bg-white px-5 py-4 xl:hidden">
              <ul className="grid gap-3 text-sm font-bold">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a 
                      href={link.href} 
                      className="block rounded-lg px-3 py-2 transition hover:bg-slate-50 hover:text-[#ff6f36]"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </header>

        {/* Top Quick Search Bar - Now part of the same sticky wrapper, so it never hides or overlaps */}
        <div className="border-b border-slate-200 bg-slate-50/80 py-3">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 sm:flex-row">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#101943]">Search Public Records:</h3>
            <div className="flex flex-wrap justify-center gap-2">
              <a href="/#business" className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-[#101943] shadow-sm transition hover:border-[#ff6f36] hover:bg-orange-50 hover:text-[#ff6f36]">
                <Building2 className="h-3.5 w-3.5" /> Business
              </a>
              <a href="/#court" className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-[#101943] shadow-sm transition hover:border-[#ff6f36] hover:bg-orange-50 hover:text-[#ff6f36]">
                <Gavel className="h-3.5 w-3.5" /> Lawsuits
              </a>
              <a href="/#inmates" className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-[#101943] shadow-sm transition hover:border-[#ff6f36] hover:bg-orange-50 hover:text-[#ff6f36]">
                <Landmark className="h-3.5 w-3.5" /> Incarceration
              </a>
              <a href="/#bankruptcy" className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-[#101943] shadow-sm transition hover:border-[#ff6f36] hover:bg-orange-50 hover:text-[#ff6f36]">
                <FileText className="h-3.5 w-3.5" /> Bankruptcy
              </a>
              <a href="/#sex" className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-[#101943] shadow-sm transition hover:border-[#ff6f36] hover:bg-orange-50 hover:text-[#ff6f36]">
                <ShieldCheck className="h-3.5 w-3.5" /> Sex Offenders
              </a>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-[#071638] px-5 py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/recordwatchdog-logo.png" alt="RecordWatchdog" className="h-auto min-w-[150px] max-w-[160px] object-contain" loading="lazy" decoding="async" />
          </a>
          <div className="flex flex-wrap gap-5 text-sm font-bold text-slate-300">
            <a href="/about/" className="transition hover:text-white">About</a>
            <a href="/blog/" className="transition hover:text-white">Blog</a>
            <a href="/privacy-policy/" className="transition hover:text-white">Privacy Policy</a>
            <a href="/terms/" className="transition hover:text-white">Terms</a>
            <a href="/faq/" className="transition hover:text-white">FAQ</a>
            <a href="/contact/" className="transition hover:text-white">Contact</a>
            <a href="/dmca/" className="transition hover:text-white">DMCA</a>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} RecordWatchdog. All rights reserved. This site is a directory of public resources and is not a consumer reporting agency.</p>
        </div>
      </footer>
    </div>
  );
}
