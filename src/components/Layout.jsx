import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';
import CookieBanner from './CookieBanner';

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2 group">
      <img src="/recordwatchdog-logo.png" alt="RecordWatchdog" className="h-auto min-w-[150px] max-w-[160px] object-contain" />
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
    { href: '/#business', label: 'Business' },
    { href: '/#court', label: 'Lawsuits' },
    { href: '/#inmates', label: 'Incarceration' },
    { href: '/#bankruptcy', label: 'Bankruptcy' },
    { href: '/#sex', label: 'Sex Offenders' },
    { href: '/blog/', label: 'Blog' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-[#101943] flex flex-col">
      <CookieBanner />
      
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4">
          <Logo />
          <nav className="hidden flex-1 items-center justify-end gap-6 text-sm font-bold xl:flex">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className="transition hover:text-[#ff6f36]"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="rounded-xl border p-2 xl:hidden" aria-label="Toggle menu">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t bg-white px-5 py-4 xl:hidden">
            <div className="grid gap-3 text-sm font-bold">
              {navLinks.map((link) => (
                <a 
                  key={link.href} 
                  href={link.href} 
                  className="rounded-lg px-3 py-2 transition hover:bg-slate-50 hover:text-[#ff6f36]"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-[#071638] px-5 py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/recordwatchdog-logo.png" alt="RecordWatchdog" className="h-auto min-w-[150px] max-w-[160px] object-contain" />
          </a>
          <div className="flex flex-wrap gap-5 text-sm font-bold text-slate-300">
            <a href="/privacy/" className="transition hover:text-white">Privacy Policy</a>
            <a href="/terms/" className="transition hover:text-white">Terms of Use</a>
            <a href="/about/" className="transition hover:text-white">About Us</a>
            <a href="/contact/" className="transition hover:text-white">Contact</a>
            <a href="/dmca/" className="transition hover:text-white">DMCA Policy</a>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} RecordWatchdog. All rights reserved. This site is a directory of public resources and is not a consumer reporting agency.</p>
        </div>
      </footer>
    </div>
  );
}
