import React from 'react';

/**
 * AdSense-Compliant Ad Placeholder
 * 
 * Google AdSense Policy Notes:
 * - Ads must be clearly labeled as "Advertisement".
 * - Ads must not be placed too close to clickable elements (buttons, links) to prevent accidental clicks.
 * - Ads should have adequate spacing (margin) from surrounding content.
 * - Do not place ads in a way that encourages accidental clicks (e.g., right next to "Download" or "Search" buttons).
 */
export default function AdPlaceholder({ className = "my-12" }) {
  return (
    <div className={`${className} w-full`}>
      <div className="mb-3 flex items-center justify-center">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Advertisement
        </span>
      </div>
      <div className="flex min-h-[250px] w-full items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 text-slate-400">
        <div className="text-center">
          <p className="text-sm font-medium">Google AdSense Unit</p>
          <p className="mt-1 text-xs text-slate-400">Replace this div with your &lt;ins&gt; tag</p>
        </div>
      </div>
    </div>
  );
}
