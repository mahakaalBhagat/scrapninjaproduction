'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    <main className="min-h-screen bg-neutral-50 px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-neutral-900">Book Scrap Pickup</h1>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Back to Home
          </button>
        </div>

        <p className="mb-8 text-neutral-600">
          Fill your scrap details below. Choose the scrap type from dropdown and enter weight in kg.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-white p-6 shadow-sm border border-neutral-200">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 outline-none focus:border-primary-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 outline-none focus:border-primary-500"
                placeholder="+971 ..."
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">Pickup Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              rows={3}
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 outline-none focus:border-primary-500"
              placeholder="Enter pickup location"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Scrap Images (Required)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              required
              onChange={(e) => setScrapImages(Array.from(e.target.files || []))}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-primary-500"
            />
            <p className="mt-1 text-xs text-neutral-500">
              Upload clear photos of your scrap so our team can verify item type and condition.
            </p>
            {scrapImages.length > 0 && (
              <ul className="mt-2 list-disc pl-5 text-xs text-neutral-600">
                {scrapImages.map((file) => (
                  <li key={`${file.name}-${file.size}`}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-neutral-900">Scrap Details</h2>
              <button
                type="button"
                onClick={addRow}
                className="rounded-lg border border-primary-300 px-3 py-1.5 text-sm font-medium text-primary-700 hover:bg-primary-50"
              >
                + Add More
              </button>
            </div>

            <div className="space-y-3">
              {rows.map((row, index) => (
                <div key={row.id} className="grid grid-cols-1 gap-3 rounded-xl border border-neutral-200 p-3 md:grid-cols-[1fr_180px_80px]">
                  <select
                    value={row.scrapType}
                    onChange={(e) => updateRow(row.id, 'scrapType', e.target.value)}
                    required
                    className="rounded-lg border border-neutral-300 px-3 py-2.5 outline-none focus:border-primary-500"
                  >
                    <option value="">Select Scrap Type</option>
                    {SCRAP_OPTIONS.map((option) => (
                      <option key={option} value={option}>
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
                    className="rounded-lg border border-neutral-300 px-3 py-2.5 outline-none focus:border-primary-500"
                    placeholder="Weight (kg)"
                  />

                  <button
                    type="button"
                    onClick={() => removeRow(row.id)}
                    disabled={rows.length === 1}
                    className="rounded-lg border border-neutral-300 px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Remove
                  </button>

                  <p className="md:col-span-3 text-xs text-neutral-500">Item {index + 1}: select scrap type and enter corresponding weight.</p>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-primary-600 px-4 py-3 font-semibold text-white hover:bg-primary-700"
          >
            Submit Pickup Request
          </button>

          {submitted && (
            <p className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              Pickup request captured successfully. Our team will contact you shortly.
            </p>
          )}
        </form>
      </div>
    </main>
  );
}