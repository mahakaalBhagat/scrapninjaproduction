'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type CollectorDoc = {
  id: number;
  type: string;
  fileName: string;
};

const EMIRATES = [
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Ajman',
  'Ras Al Khaimah',
  'Fujairah',
  'Umm Al Quwain',
];

const VEHICLE_TYPES = ['Pickup Van', 'Small Truck', 'Medium Truck', 'Large Truck', 'On Foot / Bike'];

export default function BecomeCollectorPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [emirate, setEmirate] = useState('Dubai');
  const [vehicleType, setVehicleType] = useState('Pickup Van');
  const [experienceYears, setExperienceYears] = useState('');
  const [serviceArea, setServiceArea] = useState('');
  const [availability, setAvailability] = useState('');
  const [docs, setDocs] = useState<CollectorDoc[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleDocUpload = (id: number, type: string, fileList: FileList | null) => {
    const fileName = fileList && fileList[0] ? fileList[0].name : '';
    setDocs((prev) => {
      const exists = prev.some((doc) => doc.id === id);
      if (exists) {
        return prev.map((doc) => (doc.id === id ? { ...doc, type, fileName } : doc));
      }
      return [...prev, { id, type, fileName }];
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-neutral-50 py-8 md:py-12">
      <div className="container-responsive">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-600">Collector onboarding</p>
            <h1 className="heading-1 mt-2">Become a Collector</h1>
          </div>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="btn-ghost btn-sm"
          >
            Back to Home
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.45fr]">
          <aside className="card-elevated overflow-hidden p-0">
            <div className="bg-gradient-to-br from-primary-700 via-primary-600 to-emerald-600 p-8 text-white">
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold">
                Verified Collector Network
              </div>
              <h2 className="mt-6 text-3xl font-bold leading-tight">
                Join our verified collector network in Dubai and across the UAE.
              </h2>
              <p className="mt-4 text-white/90 body-sm">
                Build trust with a professional profile, upload verification documents, and start receiving pickup opportunities.
              </p>
            </div>

            <div className="space-y-4 p-8">
              {[
                'Verified collector onboarding',
                'Upload ID and vehicle photos',
                'Choose your emirate and service area',
                'Get pickup leads once approved',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4">
                  <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold">✓</span>
                  <p className="text-sm leading-6 text-neutral-700">{item}</p>
                </div>
              ))}
            </div>
          </aside>

          <section className="card-elevated">
            <div className="mb-8">
              <h2 className="heading-2">Collector Application</h2>
              <p className="mt-2 body-sm text-neutral-600">
                Fill in your details and upload verification images so we can review your application.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="form-input"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="form-input"
                    placeholder="+971 ..."
                  />
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="form-label">Emirate</label>
                  <select
                    value={emirate}
                    onChange={(e) => setEmirate(e.target.value)}
                    required
                    className="form-input"
                  >
                    {EMIRATES.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="form-label">Vehicle Type</label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    required
                    className="form-input"
                  >
                    {VEHICLE_TYPES.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label">Experience (Years)</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    required
                    className="form-input"
                    placeholder="5"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Service Area</label>
                <input
                  type="text"
                  value={serviceArea}
                  onChange={(e) => setServiceArea(e.target.value)}
                  required
                  className="form-input"
                  placeholder="Al Quoz, Business Bay, Dubai Marina..."
                />
              </div>

              <div>
                <label className="form-label">Availability</label>
                <textarea
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  required
                  rows={4}
                  className="form-input resize-none"
                  placeholder="Weekdays, weekends, morning/evening availability"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="form-label">Upload ID / License Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => handleDocUpload(1, 'ID / License', e.target.files)}
                    className="form-input file:mr-4 file:rounded-md file:border-0 file:bg-primary-600 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-primary-700"
                  />
                </div>
                <div>
                  <label className="form-label">Upload Vehicle Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => handleDocUpload(2, 'Vehicle Photo', e.target.files)}
                    className="form-input file:mr-4 file:rounded-md file:border-0 file:bg-primary-600 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-primary-700"
                  />
                </div>
              </div>

              <div className="card-outline bg-neutral-50">
                <p className="text-sm font-semibold text-neutral-800">Uploaded verification items</p>
                <div className="mt-2 space-y-2 text-sm text-neutral-600">
                  <p>1. ID / License: {docs.find((doc) => doc.id === 1)?.fileName || 'Not uploaded yet'}</p>
                  <p>2. Vehicle Photo: {docs.find((doc) => doc.id === 2)?.fileName || 'Not uploaded yet'}</p>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full btn-lg"
              >
                Submit Collector Application
              </button>

              {submitted && (
                <p className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                  Your collector application has been submitted for review. We will contact you after verification.
                </p>
              )}
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}