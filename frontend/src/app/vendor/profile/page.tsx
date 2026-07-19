'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Building2, Edit, Download } from 'lucide-react';
import { Input, Button, Card, Badge } from '@/components/common';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const profile = {
    name: 'Green Waste Solutions',
    contact: 'Ahmed Al-Mazrouei',
    email: 'vendor@scrapninja.com',
    phone: '+971 50 123 4567',
    address: 'Dubai, United Arab Emirates',
    businessType: 'Waste Management & Recycling',
    employees: 8,
    since: '2024-03-15',
    license: 'GWS-2024-001',
    rating: 4.8,
    reviews: 47,
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Vendor Profile</h1>
          <p className="text-slate-600 mt-2">Manage your business information</p>
        </div>
        <Button
          variant={isEditing ? 'primary' : 'outline'}
          size="lg"
          icon={isEditing ? <Edit size={20} /> : <Edit size={20} />}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      {/* Profile Card */}
      <Card>
        <div className="bg-gradient-to-r from-primary-600 to-emerald-600 text-white p-8 rounded-[12px] flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{profile.name}</h2>
            <p className="text-primary-100 mb-4">{profile.businessType}</p>
            <div className="flex items-center gap-4 flex-wrap">
              <Badge variant="warning" size="md">
                ⭐ {profile.rating} ({profile.reviews} reviews)
              </Badge>
              <Badge variant="success" size="md">
                Active
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <h3 className="text-xl font-bold text-slate-900 mb-6">Contact Person</h3>
          <form className="space-y-4">
            <Input
              label="Name"
              type="text"
              defaultValue={profile.contact}
              disabled={!isEditing}
            />
            <Input
              label="Email"
              type="email"
              icon={<Mail size={18} />}
              defaultValue={profile.email}
              disabled={!isEditing}
            />
            <Input
              label="Phone"
              type="tel"
              icon={<Phone size={18} />}
              defaultValue={profile.phone}
              disabled={!isEditing}
            />
          </form>
        </Card>

        {/* Business Information */}
        <Card>
          <h3 className="text-xl font-bold text-slate-900 mb-6">Business Information</h3>
          <form className="space-y-4">
            <Input
              label="Business Name"
              type="text"
              defaultValue={profile.name}
              disabled={!isEditing}
            />
            <Input
              label="License Number"
              type="text"
              defaultValue={profile.license}
              disabled={!isEditing}
            />
            <Input
              label="Number of Employees"
              type="number"
              defaultValue={profile.employees}
              disabled={!isEditing}
            />
          </form>
        </Card>
      </div>

      {/* Service Area */}
      <Card>
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <MapPin size={24} className="text-primary-600" />
          Service Area
        </h3>
        <Input
          label="Address"
          type="text"
          defaultValue={profile.address}
          disabled={!isEditing}
        />
      </Card>

      {/* Documents */}
      <Card>
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Building2 size={24} className="text-primary-600" />
          Documents
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-[12px] hover:bg-slate-50 transition-colors">
            <p className="font-semibold text-slate-900">Business License</p>
            <Button variant="ghost" size="sm" icon={<Download size={16} />}>
              Download
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-[12px] hover:bg-slate-50 transition-colors">
            <p className="font-semibold text-slate-900">Insurance Certificate</p>
            <Button variant="ghost" size="sm" icon={<Download size={16} />}>
              Download
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
