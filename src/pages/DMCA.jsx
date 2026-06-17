import React from 'react';
import AdPlaceholder from '../components/AdPlaceholder';

export default function DMCA() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <div className="mb-8">
        <p className="font-black uppercase tracking-[0.18em] text-[#ff6f36]">Legal</p>
        <h1 className="mt-2 text-4xl font-black text-[#101943]">DMCA Policy</h1>
        <p className="mt-4 text-slate-600">Last Updated: January 1, 2024</p>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-[#101943]">1. Policy Overview</h2>
        <p className="mt-4 leading-7 text-slate-700">
          RecordWatchdog respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act of 1998 ("DMCA"), we will respond expeditiously to claims of copyright infringement committed using our Site.
        </p>
        <p className="mt-4 leading-7 text-slate-700">
          It is our policy to remove or disable access to any material that we believe in good faith is infringing upon a valid copyright. We will also terminate the access of repeat infringers in appropriate circumstances.
        </p>

        <AdPlaceholder />

        <h2 className="mt-8 text-2xl font-bold text-[#101943]">2. Notice of Copyright Infringement</h2>
        <p className="mt-4 leading-7 text-slate-700">
          If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement and is accessible on this Site, please notify our designated copyright agent. Your notice must be in writing and contain the following information, as required by the DMCA:
        </p>
        <ul className="mt-4 list-disc pl-6 leading-7 text-slate-700">
          <li>A physical or electronic signature of a person authorized to act on behalf of the owner of the exclusive right that is allegedly infringed.</li>
          <li>Identification of the copyrighted work claimed to have been infringed, or, if multiple works are covered by a single notification, a representative list of such works.</li>
          <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate the material (e.g., the specific URL).</li>
          <li>Information reasonably sufficient to permit us to contact you, such as an address, telephone number, and an email address.</li>
          <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
          <li>A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
        </ul>

        <h2 className="mt-8 text-2xl font-bold text-[#101943]">3. Designated Copyright Agent</h2>
        <p className="mt-4 leading-7 text-slate-700">
          Please send all DMCA notices to our designated agent at:
        </p>
        <div className="mt-4 rounded-2xl bg-slate-100 p-6 font-bold text-[#101943]">
          Email: niko@nwbventures.com<br />
          Subject Line: "DMCA Takedown Request"
        </div>

        <AdPlaceholder />

        <h2 className="mt-8 text-2xl font-bold text-[#101943]">4. Counter-Notification</h2>
        <p className="mt-4 leading-7 text-slate-700">
          If you believe that material you posted on the Site was removed or access to it was disabled by mistake or misidentification, you may file a counter-notification with us. The counter-notification must be in writing and include the elements specified by the DMCA, including your consent to the jurisdiction of the federal court in your district and your agreement to accept service of process from the person who provided the original takedown notice.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-[#101943]">5. No Legal Advice</h2>
        <p className="mt-4 leading-7 text-slate-700">
          RecordWatchdog is a directory and does not provide legal advice. If you have complex intellectual property disputes, we recommend consulting with a qualified attorney.
        </p>
      </div>
    </div>
  );
}
