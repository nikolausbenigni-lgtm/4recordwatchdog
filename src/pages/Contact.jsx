import React, { useState } from 'react';
import AdPlaceholder from '../components/AdPlaceholder';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send to a backend or email service
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <div className="mb-8">
        <p className="font-black uppercase tracking-[0.18em] text-[#ff6f36]">Get in Touch</p>
        <h1 className="mt-2 text-4xl font-black text-[#101943]">Contact Us</h1>
        <p className="mt-4 text-xl leading-8 text-slate-600">
          Have a question, correction, or business inquiry? We'd love to hear from you.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-black text-[#101943]">Direct Email</h2>
            <p className="mt-3 text-slate-600">For general inquiries, legal requests, or partnership opportunities, please email us directly.</p>
            <a href="mailto:niko@nwbventures.com" className="mt-4 block text-lg font-bold text-[#ff6f36] transition hover:underline">
              niko@nwbventures.com
            </a>
          </div>
          
          <AdPlaceholder className="mt-8" />

          <div className="mt-8 rounded-2xl border border-slate-200 bg-[#071638] p-8 text-white">
            <h2 className="text-xl font-black">Response Time</h2>
            <p className="mt-3 text-slate-300">We strive to respond to all legitimate inquiries within 2-3 business days. Please note that we cannot provide legal advice or assist with individual record expungement requests.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-2xl font-black text-[#101943]">Message Sent!</h3>
              <p className="mt-2 text-slate-600">Thank you for reaching out. We will get back to you shortly.</p>
              <button onClick={() => setSubmitted(false)} className="mt-6 text-sm font-bold text-[#ff6f36] hover:underline">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-xl font-black text-[#101943]">Send a Message</h2>
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">Name</label>
                <input required type="text" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#ff6f36] focus:ring-2 focus:ring-orange-100" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">Email</label>
                <input required type="email" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#ff6f36] focus:ring-2 focus:ring-orange-100" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">Subject</label>
                <select className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#ff6f36] focus:ring-2 focus:ring-orange-100" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}>
                  <option>General Inquiry</option>
                  <option>Website Correction</option>
                  <option>Business/Partnership</option>
                  <option>DMCA / Legal</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">Message</label>
                <textarea required rows={5} className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#ff6f36] focus:ring-2 focus:ring-orange-100" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
              </div>
              <button type="submit" className="w-full rounded-xl bg-[#ff6f36] py-4 font-black text-white shadow-md transition hover:bg-[#e55a25]">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
