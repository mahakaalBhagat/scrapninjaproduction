'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

type PickupRow = {
  id: number;
  scrapType: string;
  weightKg: string;
};

const SCRAP_OPTIONS = [
  'Copper',
  'Aluminum',
  'Nickel',
  'Lead',
  'Zinc',
  'Iron & Steel',
  'Plastic (HDPE)',
  'Plastic (PET)',
  'Mixed Plastic',
  'Newspaper',
  'Cardboard',
  'White Paper',
  'Glass',
  'Rubber Tires',
];

export default function BookPickupPage() {
  const router = useRouter();
  const [rows, setRows] = useState<PickupRow[]>([{ id: 1, scrapType: '', weightKg: '' }]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [scrapImages, setScrapImages] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const updateRow = (id: number, key: 'scrapType' | 'weightKg', value: string) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, [key]: value } : row)));
  };

  const addRow = () => {
    const nextId = rows.length ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
    setRows((prev) => [...prev, { id: nextId, scrapType: '', weightKg: '' }]);
  };

  const removeRow = (id: number) => {
    setRows((prev) => (prev.length > 1 ? prev.filter((row) => row.id !== id) : prev));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-emerald-300 hover:text-emerald-200 transition-colors mb-8 px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg hover:bg-emerald-950/70"
        >
          <ChevronLeft size={20} />
          Back to Home
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">📦 Book Scrap Pickup</h1>
          <p className="text-emerald-200">Fast, Easy & Rewarding</p>
        </div>

        <p className="mb-8 text-emerald-100/80">
          Fill your scrap details below. Choose the scrap type from dropdown and enter weight in kg.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-emerald-900/20 p-8 shadow-2xl border border-emerald-500/30 backdrop-blur-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-emerald-200">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-emerald-500/50 bg-emerald-950/50 px-4 py-2.5 text-white placeholder:text-emerald-300/50 outline-none focus:border-emerald-400 focus:bg-emerald-950/70 focus:ring-2 focus:ring-emerald-500/30 transition-all"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-emerald-200">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full rounded-lg border border-emerald-500/50 bg-emerald-950/50 px-4 py-2.5 text-white placeholder:text-emerald-300/50 outline-none focus:border-emerald-400 focus:bg-emerald-950/70 focus:ring-2 focus:ring-emerald-500/30 transition-all"
                placeholder="+971 ..."
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-emerald-200">Pickup Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              rows={3}
              className="w-full rounded-lg border border-emerald-500/50 bg-emerald-950/50 px-4 py-2.5 text-white placeholder:text-emerald-300/50 outline-none focus:border-emerald-400 focus:bg-emerald-950/70 focus:ring-2 focus:ring-emerald-500/30 transition-all"
              placeholder="Enter pickup location"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-emerald-200">
              Scrap Images (Required)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              required
              onChange={(e) => setScrapImages(Array.from(e.target.files || []))}
              className="w-full rounded-lg border border-emerald-500/50 bg-emerald-950/50 px-3 py-2.5 text-emerald-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-600 file:text-white file:font-semibold file:cursor-pointer hover:file:bg-emerald-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all"
            />
            <p className="mt-1 text-xs text-emerald-300/70">
              Upload clear photos of your scrap so our team can verify item type and condition.
            </p>
            {scrapImages.length > 0 && (
              <ul className="mt-2 list-disc pl-5 text-xs text-emerald-200/80">
                {scrapImages.map((file) => (
                  <li key={`${file.name}-${file.size}`}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-emerald-100">♻️ Scrap Details</h2>
              <button
                type="button"
                onClick={addRow}
                className="rounded-lg border border-emerald-500/50 bg-emerald-600/30 px-3 py-1.5 text-sm font-medium text-emerald-300 hover:bg-emerald-600/50 transition-all"
              >
                + Add More
              </button>
            </div>

            <div className="space-y-3">
              {rows.map((row, index) => (
                <div key={row.id} className="grid grid-cols-1 gap-3 rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-4 md:grid-cols-[1fr_180px_80px]">
                  <select
                    value={row.scrapType}
                    onChange={(e) => updateRow(row.id, 'scrapType', e.target.value)}
                    required
                    className="rounded-lg border border-emerald-500/50 bg-emerald-950/50 px-3 py-2.5 text-white outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all"
                  >
                    <option value="" className="bg-slate-800">Select Scrap Type</option>
                    {SCRAP_OPTIONS.map((option) => (
                      <option key={option} value={option} className="bg-slate-800">
                        {option}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={row.weightKg}
                    onChange={(e) => updateRow(row.id, 'weightKg', e.target.value)}
                    required
                    className="rounded-lg border border-emerald-500/50 bg-emerald-950/50 px-3 py-2.5 text-white placeholder:text-emerald-300/50 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all"
                    placeholder="Weight (kg)"
                  />

                  <button
                    type="button"
                    onClick={() => removeRow(row.id)}
                    disabled={rows.length === 1}
                    className="rounded-lg border border-red-500/50 bg-red-950/30 px-3 py-2.5 text-sm font-medium text-red-300 hover:bg-red-950/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                  >
                    Remove
                  </button>

                  <p className="md:col-span-3 text-xs text-emerald-200/70">Item {index + 1}: select scrap type and enter corresponding weight.</p>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 font-semibold text-white hover:from-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-emerald-500/50 transition-all"
          >
            ✓ Submit Pickup Request
          </button>

          {submitted && (
            <p className="rounded-lg border border-emerald-500/50 bg-emerald-950/50 p-3 text-sm text-emerald-200">
              ✅ Pickup request captured successfully. Our team will contact you shortly.
            </p>
          )}
        </form>
      </div>
    </main>
  );
}