import React from 'react';
import AdPlaceholder from '../components/AdPlaceholder';

export default function Terms() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <div className="mb-8">
        <p className="font-black uppercase tracking-[0.18em] text-[#ff6f36]">Legal</p>
        <h1 className="mt-2 text-4xl font-black text-[#101943]">Terms of Use</h1>
        <p className="mt-4 text-slate-600">Last Updated: January 1, 2024</p>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-[#101943]">1. Acceptance of Terms</h2>
        <p className="mt-4 leading-7 text-slate-700">
          By accessing and using RecordWatchdog (the "Site"), you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Site.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-[#101943]">2. Nature of the Service</h2>
        <p className="mt-4 leading-7 text-slate-700">
          RecordWatchdog is an informational directory designed to help users locate official public-record resources, government websites, and third-party legal research tools. <strong>We do not host, generate, or maintain criminal records, court records, inmate databases, bankruptcy records, or sex offender registry records on our servers.</strong> All searches are redirected to the respective official government or authorized third-party websites.
        </p>

        <AdPlaceholder />

        <h2 className="mt-8 text-2xl font-bold text-[#101943]">3. Not a Consumer Reporting Agency (FCRA Disclaimer)</h2>
        <p className="mt-4 leading-7 text-slate-700">
          <strong>IMPORTANT:</strong> RecordWatchdog is NOT a "consumer reporting agency" as defined by the Fair Credit Reporting Act (FCRA), 15 U.S.C. § 1681 et seq. The information provided on this Site may not be used for any purpose that requires FCRA compliance, including but not limited to:
        </p>
        <ul className="mt-4 list-disc pl-6 leading-7 text-slate-700">
          <li>Employment screening or background checks for hiring.</li>
          <li>Tenant screening or credit eligibility decisions.</li>
          <li>Insurance underwriting.</li>
          <li>Determining eligibility for government benefits.</li>
        </ul>
        <p className="mt-4 leading-7 text-slate-700">
          Users must verify all information directly with the official source and should not make adverse decisions based solely on information found via this directory.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-[#101943]">4. Intellectual Property</h2>
        <p className="mt-4 leading-7 text-slate-700">
          The Site and its original content, features, and functionality are owned by RecordWatchdog and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without express written permission.
        </p>

        <AdPlaceholder />

        <h2 className="mt-8 text-2xl font-bold text-[#101943]">5. Limitation of Liability</h2>
        <p className="mt-4 leading-7 text-slate-700">
          The Site is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, regarding the accuracy, completeness, or reliability of the information provided. We shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use of the Site or any third-party websites linked herein.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-[#101943]">6. Governing Law</h2>
        <p className="mt-4 leading-7 text-slate-700">
          These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-[#101943]">7. Contact Information</h2>
        <p className="mt-4 leading-7 text-slate-700">
          For questions regarding these Terms, please contact us at: <strong>niko@nwbventures.com</strong>
        </p>
      </div>
    </div>
  );
}
