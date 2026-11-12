import React from 'react';
import AdPlaceholder from '../components/AdPlaceholder';

export default function Privacy() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <div className="mb-8">
        <p className="font-black uppercase tracking-[0.18em] text-[#ff6f36]">Legal</p>
        <h1 className="mt-2 text-4xl font-black text-[#101943]">Privacy Policy</h1>
        <p className="mt-4 text-slate-600">Last Updated: January 1, 2024</p>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-[#101943]">1. Introduction</h2>
        <p className="mt-4 leading-7 text-slate-700">
          RecordWatchdog ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, recordwatchdog.com (the "Site"). 
        </p>
        <p className="mt-4 leading-7 text-slate-700">
          Please read this Privacy Policy carefully. By using the Site, you consent to the practices described in this policy. If you do not agree with the terms of this Privacy Policy, please do not access the Site.
        </p>

        <AdPlaceholder />

        <h2 className="mt-8 text-2xl font-bold text-[#101943]">2. Information We Collect</h2>
        <p className="mt-4 leading-7 text-slate-700">
          <strong>Non-Personal Information:</strong> When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. This helps us improve our Site and provide a better user experience.
        </p>
        <p className="mt-4 leading-7 text-slate-700">
          <strong>Personal Information:</strong> We do not require you to create an account or provide personal information to use our directory. However, if you contact us via email or a contact form, we may collect your name, email address, and the content of your message.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-[#101943]">3. How We Use Your Information</h2>
        <p className="mt-4 leading-7 text-slate-700">
          We use the information we collect to:
        </p>
        <ul className="mt-4 list-disc pl-6 leading-7 text-slate-700">
          <li>Operate, maintain, and improve the Site.</li>
          <li>Respond to your comments, questions, and requests.</li>
          <li>Monitor and analyze usage and trends to improve your experience.</li>
          <li>Deliver targeted advertising through third-party ad networks (see Section 5).</li>
        </ul>

        <AdPlaceholder />

        <h2 className="mt-8 text-2xl font-bold text-[#101943]">4. Third-Party Links and Services</h2>
        <p className="mt-4 leading-7 text-slate-700">
          RecordWatchdog is primarily a directory of official public-record resources. We provide links to external government websites, court systems, and third-party services. We do not control these external sites and are not responsible for their content or privacy practices. We encourage you to read the privacy policies of any third-party sites you visit.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-[#101943]">5. Advertising and Cookies</h2>
        <p className="mt-4 leading-7 text-slate-700">
          We may use third-party advertising companies, such as Google AdSense, to serve ads when you visit our Site. These companies may use cookies and web beacons to collect information about your visits to this and other websites to provide advertisements about goods and services of interest to you. You can opt out of targeted advertising by visiting the Network Advertising Initiative (NAI) opt-out page or the Google Ads Settings page.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-[#101943]">6. Data Security</h2>
        <p className="mt-4 leading-7 text-slate-700">
          We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-[#101943]">7. Contact Us</h2>
        <p className="mt-4 leading-7 text-slate-700">
          If you have any questions or concerns about this Privacy Policy, please contact us at: <strong>niko@nwbventures.com</strong>
        </p>
      </div>
    </div>
  );
}
