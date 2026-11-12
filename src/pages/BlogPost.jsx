import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostBySlug, blogPosts } from '../data/blogData';
import AdPlaceholder from '../components/AdPlaceholder';
import { ArrowLeft } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-32 text-center">
        <h1 className="text-4xl font-black text-[#101943]">Post Not Found</h1>
        <p className="mt-4 text-slate-600">The article you are looking for does not exist or has been removed.</p>
        <button onClick={() => navigate(-1)} className="mt-6 flex items-center gap-2 mx-auto font-bold text-[#ff6f36] hover:underline">
          <ArrowLeft className="h-4 w-4" /> Go Back
        </button>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-5 py-16">
      <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-[#ff6f36]">
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </button>

      <div className="grid gap-10 lg:grid-cols-[1fr_350px]">
        <article>
          <div className="mb-6 flex items-center gap-3 text-sm font-bold text-slate-500">
            <span className="rounded-full bg-orange-50 px-3 py-1 text-[#ff6f36]">Guide</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.author}</span>
          </div>
          
          <h1 className="text-3xl font-black leading-tight text-[#101943] md:text-5xl">{post.title}</h1>
          <p className="mt-6 text-xl leading-8 text-slate-600">{post.excerpt}</p>

          <AdPlaceholder />

          <div 
            className="prose prose-slate prose-headings:font-black prose-headings:text-[#101943] prose-a:text-[#ff6f36] max-w-none mt-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <AdPlaceholder />

          <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h3 className="text-xl font-black text-[#101943]">Disclaimer</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The information provided in this article is for general informational and educational purposes only and does not constitute legal advice. Public record systems and laws vary by jurisdiction and are subject to change. Always verify information directly with the official government agency or consult with a qualified attorney for matters requiring legal expertise. RecordWatchdog is not a consumer reporting agency.
            </p>
          </div>
        </article>

        <aside className="space-y-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-black text-[#101943]">Related Articles</h3>
            <div className="mt-4 space-y-4">
              {relatedPosts.map((related) => (
                <Link key={related.id} to={`/blog/${related.slug}`} className="group block">
                  <h4 className="text-sm font-bold text-[#101943] transition group-hover:text-[#ff6f36]">{related.title}</h4>
                  <p className="mt-1 text-xs text-slate-500">{related.date}</p>
                </Link>
              ))}
            </div>
          </div>
          
          <AdPlaceholder className="my-0" />

          <div className="rounded-2xl border border-slate-200 bg-[#071638] p-6 text-white shadow-sm">
            <h3 className="text-lg font-black">Start Your Search</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Ready to look up public records? Use our free directory to access official state and county databases.
            </p>
            <Link to="/" className="mt-6 block w-full rounded-xl bg-[#ff6f36] py-3 text-center font-black text-white transition hover:bg-[#e55a25]">
              Go to Directory
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
