'use client';
import React from 'react';

const Step7ScrapSourceDeclaration = ({ data, onChange, onboardingId }: any) => (
  <div className="space-y-6">
    <textarea value={data?.sourceOfScrap || ''} onChange={(e) => onChange({ sourceOfScrap: e.target.value })} placeholder="Describe where you source your scrap" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
    <div><label className="block text-sm font-semibold text-gray-900 mb-4">Types of Scrap Traded</label><div className="space-y-3">{['Ferrous Metal', 'Non-Ferrous Metal', 'Plastic', 'Paper', 'Glass', 'Electronics'].map((type) => (<label key={type} className="flex items-center"><input type="checkbox" checked={(data?.typesOfScrapTraded || []).includes(type)} onChange={(e) => { const types = data?.typesOfScrapTraded || []; const updated = e.target.checked ? [...types, type] : types.filter((t: string) => t !== type); onChange({ typesOfScrapTraded: updated }); }} className="w-4 h-4 rounded" /><span className="ml-3 text-sm">{type}</span></label>))}</div></div>
    <select value={data?.importStatus ? 'yes' : 'no'} onChange={(e) => onChange({ importStatus: e.target.value === 'yes' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg"><option value="no">Import: No</option><option value="yes">Import: Yes</option></select>
    <select value={data?.exportStatus ? 'yes' : 'no'} onChange={(e) => onChange({ exportStatus: e.target.value === 'yes' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg"><option value="no">Export: No</option><option value="yes">Export: Yes</option></select>
    <select value={data?.originType || ''} onChange={(e) => onChange({ originType: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg"><option value="">Select Origin Type...</option><option value="industrial">Industrial</option><option value="demolition">Demolition</option><option value="manufacturing">Manufacturing</option><option value="trading">Trading</option><option value="other">Other</option></select>
    <label className="flex items-start"><input type="checkbox" checked={data?.scrapLegalSourceDeclaration || false} onChange={(e) => onChange({ scrapLegalSourceDeclaration: e.target.checked })} className="w-4 h-4 mt-1 rounded" /><span className="ml-3 text-sm">I confirm all scrap originates from legal and authorized sources.</span></label>
  </div>
);
export default Step7ScrapSourceDeclaration;
