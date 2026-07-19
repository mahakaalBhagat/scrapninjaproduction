'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  AlertCircle, 
  Leaf, 
  Zap, 
  Droplets, 
  Award,
  TrendingUp,
  Shield,
  Recycle,
  Globe,
  Download
} from 'lucide-react';
import { CartItem } from '@/types/cart';
import { generateESGReportPDF } from '@/utils/pdfExport';

interface ESGComplianceDashboardProps {
  cartItems: CartItem[];
}

export const ESGComplianceDashboard: React.FC<ESGComplianceDashboardProps> = ({ cartItems }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  // Calculate ESG metrics based on selected items
  const calculateMetrics = () => {
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    // Environmental metrics per kg
    const metricsPerKg = {
      carbonSaved: 2.5, // kg CO2 prevented per kg recycled
      landfillWasteReduced: 0.95, // kg diverted per kg recycled
      waterSaved: 12, // liters per kg recycled
      energySaved: 0.8, // kWh per kg recycled
    };

    const totalMetrics = {
      carbonSaved: (totalQuantity * metricsPerKg.carbonSaved).toFixed(2),
      landfillWasteReduced: (totalQuantity * metricsPerKg.landfillWasteReduced).toFixed(2),
      waterSaved: (totalQuantity * metricsPerKg.waterSaved).toFixed(2),
      energySaved: (totalQuantity * metricsPerKg.energySaved).toFixed(2),
    };

    return totalMetrics;
  };

  const metrics = calculateMetrics();
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // ESG Scores
  const environmentalScore = Math.min(95 + (cartItems.length * 2), 100);
  const socialScore = 88;
  const governanceScore = 92;
  const overallESGScore = Math.round((environmentalScore + socialScore + governanceScore) / 3);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      console.log('Starting PDF download...');
      const result = await generateESGReportPDF(
        cartItems,
        {
          carbonSaved: metrics.carbonSaved,
          landfillWasteReduced: metrics.landfillWasteReduced,
          waterSaved: metrics.waterSaved,
          energySaved: metrics.energySaved,
        },
        {
          environmental: Math.round(environmentalScore),
          social: socialScore,
          governance: governanceScore,
          overall: overallESGScore,
        }
      );
      console.log('PDF download result:', result);
      // Small delay to ensure download completes
      setTimeout(() => setIsDownloading(false), 800);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please check your browser console for details.');
      setIsDownloading(false);
    }
  };

  const certifications = [
    { name: 'ISO 14001', status: 'certified', icon: '🏆' },
    { name: 'Basel Convention', status: 'compliant', icon: '⚖️' },
    { name: 'UAE Environmental Law', status: 'certified', icon: '✅' },
    { name: 'Carbon Neutral Program', status: 'pending', icon: '⏳' },
  ];

  const regulations = [
    { name: 'Dubai Municipality Regulations', status: 'compliant' },
    { name: 'UAE National Environmental Strategy', status: 'compliant' },
    { name: 'UNFCCC Paris Agreement', status: 'compliant' },
    { name: 'Extended Producer Responsibility', status: 'compliant' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-start justify-between"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Globe className="text-emerald-500" size={32} />
            <h1 className="text-4xl font-bold text-white">ESG Regulatory Compliance Dashboard</h1>
          </div>
          <p className="text-emerald-200 text-lg">
            Track environmental impact and regulatory compliance for your scrap selection
          </p>
        </div>

        {/* Download Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownloadPDF}
          disabled={isDownloading || cartItems.length === 0}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-emerald-500/50 transition-all disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
        >
          <Download size={20} />
          {isDownloading ? 'Generating...' : 'Download PDF'}
        </motion.button>
      </motion.div>

      {/* Overall ESG Score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-8 p-8 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/50 rounded-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Overall Score */}
          <div className="text-center">
            <div className="text-5xl font-bold text-emerald-400 mb-2">{overallESGScore}</div>
            <p className="text-emerald-200 font-semibold">Overall ESG Score</p>
            <p className="text-sm text-emerald-300 mt-2">Excellent Rating</p>
          </div>

          {/* Individual Scores */}
          {[
            { label: 'Environmental', value: Math.round(environmentalScore), color: 'text-green-400' },
            { label: 'Social', value: socialScore, color: 'text-blue-400' },
            { label: 'Governance', value: governanceScore, color: 'text-purple-400' },
          ].map((score) => (
            <div key={score.label} className="text-center">
              <div className={`text-4xl font-bold ${score.color} mb-2`}>{score.value}</div>
              <p className="text-emerald-200 font-semibold text-sm">{score.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Environmental Impact Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Leaf className="text-emerald-400" />
          Environmental Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Zap, label: 'CO₂ Prevented', value: metrics.carbonSaved, unit: 'kg', color: 'from-red-500/20' },
            { icon: Droplets, label: 'Water Saved', value: metrics.waterSaved, unit: 'L', color: 'from-blue-500/20' },
            { icon: Recycle, label: 'Waste Diverted', value: metrics.landfillWasteReduced, unit: 'kg', color: 'from-green-500/20' },
            { icon: TrendingUp, label: 'Energy Saved', value: metrics.energySaved, unit: 'kWh', color: 'from-yellow-500/20' },
          ].map((metric, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className={`p-6 bg-gradient-to-br ${metric.color} to-emerald-950/50 border border-emerald-500/30 rounded-xl`}
            >
              <div className="flex items-center justify-between mb-4">
                <metric.icon className="text-emerald-400" size={24} />
                <span className="text-xs font-bold text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full">
                  {metric.unit}
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
              <p className="text-emerald-200 text-sm">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Certifications & Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Award className="text-amber-400" />
            Certifications
          </h2>
          <div className="space-y-4">
            {certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 5 }}
                className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cert.icon}</span>
                  <div>
                    <p className="font-semibold text-white">{cert.name}</p>
                    <p className="text-xs text-emerald-300 capitalize">{cert.status}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {cert.status === 'certified' && <CheckCircle className="text-green-400" size={20} />}
                  {cert.status === 'compliant' && <CheckCircle className="text-emerald-400" size={20} />}
                  {cert.status === 'pending' && <AlertCircle className="text-yellow-400" size={20} />}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Regulatory Compliance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Shield className="text-blue-400" />
            Regulatory Compliance
          </h2>
          <div className="space-y-4">
            {regulations.map((reg, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 5 }}
                className="p-4 bg-blue-950/40 border border-blue-500/30 rounded-lg flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-white">{reg.name}</p>
                  <p className="text-xs text-blue-300">Status: {reg.status}</p>
                </div>
                <CheckCircle className="text-green-400" size={20} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Total Selection Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border border-emerald-500/50 rounded-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Selection Summary</h3>
            <p className="text-emerald-200">Total Items: <span className="font-bold text-emerald-400">{cartItems.length}</span> • Total Quantity: <span className="font-bold text-emerald-400">{totalQuantity} kg</span></p>
          </div>
          <div className="text-right">
            <p className="text-sm text-emerald-300 mb-2">Impact Category</p>
            <p className="text-2xl font-bold text-emerald-400">Highly Beneficial</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
