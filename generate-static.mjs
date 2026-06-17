import React from 'react';
import AdPlaceholder from '../components/AdPlaceholder';
import { ShieldCheck, Search, Building2 } from 'lucide-react';

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <div className="mb-8">
        <p className="font-black uppercase tracking-[0.18em] text-[#ff6f36]">About Us</p>
        <h1 className="mt-2 text-4xl font-black text-[#101943]">About RecordWatchdog</h1>
        <p className="mt-4 text-xl leading-8 text-slate-600">
          Making public records accessible, understandable, and easy to navigate.
        </p>
      </div>

      <div className="prose prose-slate max-w-none">
        <p className="mt-4 leading-7 text-slate-700">
          RecordWatchdog was founded with a simple mission: to organize the fragmented landscape of public records into one streamlined, user-friendly directory. Whether you are researching a business partner, looking up county court records, or verifying a contractor's license, finding the correct official government portal can be frustrating and time-consuming.
        </p>
        <p className="mt-4 leading-7 text-slate-700">
          We do the heavy lifting of cataloging and verifying the official search portals for all 50 states, federal systems, and major county jurisdictions, so you can find what matters without the guesswork.
        </p>

        <AdPlaceholder />

        <h2 className="mt-8 text-2xl font-bold text-[#101943]">Our Core Values</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <ShieldCheck className="mb-4 h-8 w-8 text-[#ff6f36]" />
            <h3 className="text-lg font-black text-[#101943]">Official Sources Only</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">We prioritize direct links to .gov and official state/county websites. We do not host or scrape sensitive personal data.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <Search className="mb-4 h-8 w-8 text-[#ff6f36]" />
            <h3 className="text-lg font-black text-[#101943]">Privacy-Friendly</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">You can use our directory without creating an account or handing over your personal information to data brokers.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <Building2 className="mb-4 h-8 w-8 text-[#ff6f36]" />
            <h3 className="text-lg font-black text-[#101943]">Transparency</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">We are clear about what we are: a directory. We are not a consumer reporting agency and do not provide background checks.</p>
          </div>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-[#101943]">Who We Are</h2>
        <p className="mt-4 leading-7 text-slate-700">
          RecordWatchdog is operated by NWB Ventures. Our team consists of legal researchers, data organizers, and web developers dedicated to improving public access to government information. We believe that transparency in public records strengthens communities and empowers individuals to make informed decisions.
        </p>

        <AdPlaceholder />

        <h2 className="mt-8 text-2xl font-bold text-[#101943]">Contact Us</h2>
        <p className="mt-4 leading-7 text-slate-700">
          We welcome your feedback, corrections, and partnership inquiries. Please reach out to us at: <strong>niko@nwbventures.com</strong>
        </p>
      </div>
    </div>
  );
}
