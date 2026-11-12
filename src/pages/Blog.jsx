import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import AdPlaceholder from '../components/AdPlaceholder';

export default function Blog() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16">
      <div className="mb-10 text-center">
        <p className="font-black uppercase tracking-[0.18em] text-[#ff6f36]">Resources & Insights</p>
        <h1 className="mt-2 text-4xl font-black text-[#101943] md:text-5xl">The RecordWatchdog Blog</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Expert guides, tips, and insights on navigating public records, conducting due diligence, and understanding the U.S. legal and business filing systems.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
        <div className="grid gap-8 sm:grid-cols-2">
          {blogPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#ff6f36] hover:shadow-lg">
              <div className="mb-4 flex items-center gap-3 text-xs font-bold text-slate-500">
                <span className="rounded-full bg-orange-50 px-3 py-1 text-[#ff6f36]">Guide</span>
                <span>{post.date}</span>
              </div>
              <h2 className="text-xl font-black text-[#101943] transition group-hover:text-[#ff6f36]">{post.title}</h2>
              <p className="mt-3 flex-grow text-sm leading-6 text-slate-600">{post.excerpt}</p>
              <div className="mt-6 flex items-center gap-2 text-sm font-black text-[#ff6f36]">
                Read Article 
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </Link>
          ))}
        </div>

        <aside className="space-y-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-black text-[#101943]">About the Blog</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Our editorial team publishes practical guides to help individuals and businesses navigate public record systems safely, legally, and effectively.
            </p>
          </div>
          <AdPlaceholder className="my-0" />
          <div className="rounded-2xl border border-slate-200 bg-[#071638] p-6 text-white shadow-sm">
            <h3 className="text-lg font-black">Need Help Searching?</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Use our main directory to quickly jump to official state and county record portals.
            </p>
            <Link to="/#business" className="mt-6 block w-full rounded-xl bg-[#ff6f36] py-3 text-center font-black text-white transition hover:bg-[#e55a25]">
              Go to Directory
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
