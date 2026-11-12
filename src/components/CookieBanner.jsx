import React, { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookieConsent');
    if (!hasAccepted) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] border-t border-slate-200 bg-white p-4 shadow-2xl sm:p-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-sm font-bold text-[#101943]">We value your privacy</p>
          <p className="mt-1 text-sm text-slate-600">
            We use cookies to enhance your browsing experience, serve personalized ads, and analyze our traffic. 
            By clicking "Accept All", you consent to our use of cookies. Read our{' '}
            <a href="/privacy-policy" className="font-bold text-[#ff6f36] underline hover:text-[#e55a25]">Privacy Policy</a>.
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button 
            onClick={handleAccept}
            className="rounded-lg bg-[#101943] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#1a2a5e]"
          >
            Accept All
          </button>
          <a 
            href="/privacy-policy"
            className="rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Customize
          </a>
        </div>
      </div>
    </div>
  );
}
