'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Copy, Check, LogIn } from 'lucide-react';
import { vendorAuthService } from '@/services/vendorAuthService';

export const VendorLoginSection: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const testCredentials = vendorAuthService.getTestCredentials();

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="py-16 px-6 md:px-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <LogIn size={40} className="text-green-600" />
            Vendor Portal Access
          </h2>
          <p className="text-xl text-gray-600">
            Test the vendor login and dashboard with pre-configured credentials
          </p>
        </motion.div>

        {/* Main CTA Button */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <Link
            href="/vendor-login"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <LogIn size={24} />
            Go to Vendor Login
          </Link>
        </motion.div>

        {/* Test Credentials Table */}
        <motion.div variants={itemVariants} className="overflow-x-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Test Case Credentials</h3>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Test Case ID</th>
                    <th className="px-6 py-4 text-left font-semibold">Company Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Email</th>
                    <th className="px-6 py-4 text-left font-semibold">Password</th>
                    <th className="px-6 py-4 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {testCredentials.map((cred, index) => (
                    <motion.tr
                      key={index}
                      variants={itemVariants}
                      className="border-b border-gray-200 hover:bg-green-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="inline-block bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full text-sm">
                          {cred.testCaseId}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700 font-medium">{cred.companyName}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <code className="bg-gray-100 px-3 py-2 rounded text-sm font-mono text-gray-700">
                            {cred.email}
                          </code>
                          <button
                            onClick={() => copyToClipboard(cred.email, index)}
                            className="p-2 hover:bg-gray-200 rounded transition-colors"
                            title="Copy email"
                          >
                            {copiedIndex === index ? (
                              <Check size={18} className="text-green-600" />
                            ) : (
                              <Copy size={18} className="text-gray-600" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <code className="bg-gray-100 px-3 py-2 rounded text-sm font-mono text-gray-700">
                            {cred.password}
                          </code>
                          <button
                            onClick={() => copyToClipboard(cred.password, index + 100)}
                            className="p-2 hover:bg-gray-200 rounded transition-colors"
                            title="Copy password"
                          >
                            {copiedIndex === index + 100 ? (
                              <Check size={18} className="text-green-600" />
                            ) : (
                              <Copy size={18} className="text-gray-600" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Link
                          href="/vendor-login"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 font-semibold rounded-lg hover:bg-green-200 transition-colors"
                        >
                          <LogIn size={16} />
                          Login
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div variants={itemVariants} className="mt-12 bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Test</h3>
          <ol className="space-y-3 text-lg text-gray-700">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </span>
              <span>Select a test case credential from the table above</span>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </span>
              <span>Click "Copy" to copy the email and password</span>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </span>
              <span>Click "Go to Vendor Login" button above or the "Login" link</span>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </span>
              <span>Paste the email in the Email field</span>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                5
              </span>
              <span>Paste the password in the Password field</span>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                6
              </span>
              <span>Click "Sign In" to access the vendor dashboard</span>
            </li>
          </ol>
        </motion.div>

        {/* Features Info */}
        <motion.div variants={itemVariants} className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-3">🔐</div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Secure Login</h4>
            <p className="text-gray-600">
              Test multiple vendor accounts with different credentials and company profiles
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-3">📊</div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Dashboard Access</h4>
            <p className="text-gray-600">
              View and manage your collector network, statistics, and operations
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-3">✅</div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Full Workflow</h4>
            <p className="text-gray-600">
              Experience the complete vendor journey from login to dashboard features
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
