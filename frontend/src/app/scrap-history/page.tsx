'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Search,
  Download,
  ArrowLeft,
  Eye,
  Filter,
  Calendar,
  Tag,
  TrendingUp,
} from 'lucide-react';

interface ScrapTransaction {
  transactionId: string;
  dateTime: string;
  scrapName: string;
  category: string;
  quantity: number;
  unit: string;
  weight: number;
  esgScore: number;
  co2Saved: number;
  waterSaved: number;
  energySaved: number;
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED';
  vendorName: string;
  customerName: string;
  price: number;
}

// Mock transaction data
const MOCK_TRANSACTIONS: ScrapTransaction[] = [
  {
    transactionId: 'TXN-2024-001',
    dateTime: '2024-01-15 10:30 AM',
    scrapName: 'Copper Wire',
    category: 'Metal',
    quantity: 5,
    unit: 'kg',
    weight: 5,
    esgScore: 8.5,
    co2Saved: 12.5,
    waterSaved: 45.2,
    energySaved: 28.7,
    status: 'COMPLETED',
    vendorName: 'Ahmed Al-Mazrouei',
    customerName: 'John Doe',
    price: 125.50,
  },
  {
    transactionId: 'TXN-2024-002',
    dateTime: '2024-01-14 02:15 PM',
    scrapName: 'Aluminum Cans',
    category: 'Metal',
    quantity: 10,
    unit: 'kg',
    weight: 10,
    esgScore: 7.8,
    co2Saved: 8.3,
    waterSaved: 32.1,
    energySaved: 19.4,
    status: 'COMPLETED',
    vendorName: 'Fatima Al-Mansoori',
    customerName: 'Jane Smith',
    price: 85.00,
  },
  {
    transactionId: 'TXN-2024-003',
    dateTime: '2024-01-13 09:45 AM',
    scrapName: 'Cardboard Box',
    category: 'Paper',
    quantity: 20,
    unit: 'kg',
    weight: 20,
    esgScore: 6.2,
    co2Saved: 5.1,
    waterSaved: 18.9,
    energySaved: 12.3,
    status: 'COMPLETED',
    vendorName: 'Mohammed Al-Falahi',
    customerName: 'Ahmed Khan',
    price: 45.00,
  },
  {
    transactionId: 'TXN-2024-004',
    dateTime: '2024-01-12 04:20 PM',
    scrapName: 'Plastic Bottles',
    category: 'Plastic',
    quantity: 30,
    unit: 'kg',
    weight: 30,
    esgScore: 7.1,
    co2Saved: 6.8,
    waterSaved: 25.4,
    energySaved: 15.6,
    status: 'PENDING',
    vendorName: 'Layla Al-Hosni',
    customerName: 'Sara Ali',
    price: 62.50,
  },
  {
    transactionId: 'TXN-2024-005',
    dateTime: '2024-01-11 11:00 AM',
    scrapName: 'Old Laptop',
    category: 'Electronics',
    quantity: 1,
    unit: 'piece',
    weight: 2.5,
    esgScore: 9.2,
    co2Saved: 18.7,
    waterSaved: 62.3,
    energySaved: 35.8,
    status: 'COMPLETED',
    vendorName: 'Ahmed Al-Mazrouei',
    customerName: 'Michael Brown',
    price: 250.00,
  },
  {
    transactionId: 'TXN-2024-006',
    dateTime: '2024-01-10 03:30 PM',
    scrapName: 'Steel Scrap',
    category: 'Metal',
    quantity: 15,
    unit: 'kg',
    weight: 15,
    esgScore: 8.0,
    co2Saved: 14.2,
    waterSaved: 52.8,
    energySaved: 32.1,
    status: 'COMPLETED',
    vendorName: 'Fatima Al-Mansoori',
    customerName: 'Lisa White',
    price: 105.75,
  },
];

export default function ScrapHistoryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'esg'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedTransaction, setSelectedTransaction] = useState<ScrapTransaction | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get unique categories and statuses
  const categories = Array.from(new Set(MOCK_TRANSACTIONS.map((t) => t.category)));
  const statuses = Array.from(new Set(MOCK_TRANSACTIONS.map((t) => t.status)));

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    let result = [...MOCK_TRANSACTIONS];

    // Apply search
    if (searchQuery) {
      result = result.filter(
        (t) =>
          t.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.scrapName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.customerName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (selectedCategory) {
      result = result.filter((t) => t.category === selectedCategory);
    }
    if (selectedStatus) {
      result = result.filter((t) => t.status === selectedStatus);
    }

    // Apply sorting
    result.sort((a, b) => {
      let compareValue = 0;
      if (sortBy === 'date') {
        compareValue = new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
      } else if (sortBy === 'price') {
        compareValue = a.price - b.price;
      } else if (sortBy === 'esg') {
        compareValue = a.esgScore - b.esgScore;
      }
      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return result;
  }, [searchQuery, selectedCategory, selectedStatus, sortBy, sortOrder]);

  // Paginate
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handleExportCSV = () => {
    const headers = [
      'Transaction ID',
      'Date & Time',
      'Scrap Name',
      'Category',
      'Quantity',
      'Unit',
      'Weight',
      'ESG Score',
      'CO₂ Saved',
      'Water Saved',
      'Energy Saved',
      'Status',
      'Vendor Name',
      'Customer Name',
      'Price',
    ];
    const rows = filteredTransactions.map((t) => [
      t.transactionId,
      t.dateTime,
      t.scrapName,
      t.category,
      t.quantity,
      t.unit,
      t.weight,
      t.esgScore,
      t.co2Saved,
      t.waterSaved,
      t.energySaved,
      t.status,
      t.vendorName,
      t.customerName,
      t.price,
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scrap-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'PENDING':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/50';
      case 'CANCELLED':
        return 'bg-red-500/20 text-red-300 border-red-500/50';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return '✓';
      case 'PENDING':
        return '⏳';
      case 'CANCELLED':
        return '✕';
      default:
        return '?';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.back()}
              className="p-2 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-400 hover:bg-emerald-500/30 transition-all"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Scrap Generation History</h1>
              <p className="text-emerald-200">View all your previous scrap transactions and environmental impact</p>
            </div>
          </div>
        </motion.div>

        {/* Search and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-emerald-400" size={20} />
            <input
              type="text"
              placeholder="Search by Transaction ID, Scrap Name, Vendor, or Customer..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-white placeholder:text-emerald-300/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all"
            />
          </div>

          {/* Controls Row */}
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  showFilters
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'
                    : 'bg-emerald-950/50 border border-emerald-500/50 text-emerald-200 hover:border-emerald-400'
                }`}
              >
                <Filter size={18} />
                Filters
              </motion.button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'price' | 'esg')}
                className="px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-emerald-200 hover:border-emerald-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition-all cursor-pointer"
              >
                <option value="date">Sort by Date</option>
                <option value="price">Sort by Price</option>
                <option value="esg">Sort by ESG Score</option>
              </select>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-emerald-200 hover:border-emerald-400 transition-all"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExportCSV}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold flex items-center gap-2 hover:from-blue-500 hover:to-blue-400 transition-all"
            >
              <Download size={18} />
              Export CSV
            </motion.button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-semibold text-emerald-200 mb-2">Category</label>
                  <select
                    value={selectedCategory || ''}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value || null);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-emerald-200 hover:border-emerald-400 focus:outline-none focus:border-emerald-400 transition-all cursor-pointer"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-semibold text-emerald-200 mb-2">Status</label>
                  <select
                    value={selectedStatus || ''}
                    onChange={(e) => {
                      setSelectedStatus(e.target.value || null);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-emerald-200 hover:border-emerald-400 focus:outline-none focus:border-emerald-400 transition-all cursor-pointer"
                  >
                    <option value="">All Statuses</option>
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-emerald-200 flex items-center justify-between"
        >
          <p>
            Showing <span className="font-bold text-emerald-400">{paginatedTransactions.length}</span> of{' '}
            <span className="font-bold text-emerald-400">{filteredTransactions.length}</span> transactions
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900/80 border-b border-slate-700/50">
                  <th className="px-6 py-4 text-left font-semibold text-emerald-400">Transaction ID</th>
                  <th className="px-6 py-4 text-left font-semibold text-emerald-400">Date & Time</th>
                  <th className="px-6 py-4 text-left font-semibold text-emerald-400">Scrap Name</th>
                  <th className="px-6 py-4 text-left font-semibold text-emerald-400">Category</th>
                  <th className="px-6 py-4 text-left font-semibold text-emerald-400">Weight (kg)</th>
                  <th className="px-6 py-4 text-left font-semibold text-emerald-400">ESG Score</th>
                  <th className="px-6 py-4 text-left font-semibold text-emerald-400">Status</th>
                  <th className="px-6 py-4 text-left font-semibold text-emerald-400">Vendor</th>
                  <th className="px-6 py-4 text-center font-semibold text-emerald-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.map((transaction, idx) => (
                  <motion.tr
                    key={transaction.transactionId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-slate-700/30 hover:bg-slate-900/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    <td className="px-6 py-4 font-mono text-emerald-300">{transaction.transactionId}</td>
                    <td className="px-6 py-4 text-slate-300">{transaction.dateTime}</td>
                    <td className="px-6 py-4 text-white font-semibold">{transaction.scrapName}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold border border-blue-500/50">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{transaction.weight}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp size={16} className="text-emerald-400" />
                        <span className="font-semibold text-emerald-400">{transaction.esgScore}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border inline-flex items-center gap-1 ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        <span>{getStatusIcon(transaction.status)}</span>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{transaction.vendorName}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        className="p-2 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/40 rounded-lg transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTransaction(transaction);
                        }}
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 flex items-center justify-center gap-2"
          >
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-emerald-200 hover:border-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'
                    : 'bg-emerald-950/50 border border-emerald-500/50 text-emerald-200 hover:border-emerald-400'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-emerald-950/50 border border-emerald-500/50 rounded-lg text-emerald-200 hover:border-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </motion.div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedTransaction && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTransaction(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-emerald-500/50 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Transaction Details</h2>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-all"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Transaction ID and Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Transaction ID</p>
                  <p className="text-lg font-mono font-bold text-emerald-400">{selectedTransaction.transactionId}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Status</p>
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(
                      selectedTransaction.status
                    )}`}
                  >
                    <span>{getStatusIcon(selectedTransaction.status)}</span>
                    {selectedTransaction.status}
                  </div>
                </div>
              </div>

              {/* Scrap Information */}
              <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-emerald-400 flex items-center gap-2">
                  <Tag size={18} />
                  Scrap Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">Scrap Name</p>
                    <p className="text-white font-semibold">{selectedTransaction.scrapName}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Category</p>
                    <p className="text-white font-semibold">{selectedTransaction.category}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Quantity</p>
                    <p className="text-white font-semibold">
                      {selectedTransaction.quantity} {selectedTransaction.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Weight</p>
                    <p className="text-white font-semibold">{selectedTransaction.weight} kg</p>
                  </div>
                </div>
              </div>

              {/* Environmental Impact */}
              <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-emerald-400 flex items-center gap-2">
                  <TrendingUp size={18} />
                  Environmental Impact
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">ESG Score</p>
                    <p className="text-2xl font-bold text-emerald-400">{selectedTransaction.esgScore}/10</p>
                  </div>
                  <div>
                    <p className="text-slate-400">CO₂ Saved</p>
                    <p className="text-lg font-semibold text-emerald-300">{selectedTransaction.co2Saved} kg</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Water Saved</p>
                    <p className="text-lg font-semibold text-blue-300">{selectedTransaction.waterSaved} L</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Energy Saved</p>
                    <p className="text-lg font-semibold text-yellow-300">{selectedTransaction.energySaved} kWh</p>
                  </div>
                </div>
              </div>

              {/* Parties Involved */}
              <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-emerald-400">Parties Involved</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">Vendor</p>
                    <p className="text-white font-semibold">{selectedTransaction.vendorName}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Customer</p>
                    <p className="text-white font-semibold">{selectedTransaction.customerName}</p>
                  </div>
                </div>
              </div>

              {/* Date & Time and Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-400 flex items-center gap-2">
                    <Calendar size={16} />
                    Date & Time
                  </p>
                  <p className="text-white font-semibold">{selectedTransaction.dateTime}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Transaction Price</p>
                  <p className="text-xl font-bold text-emerald-400">د.إ{selectedTransaction.price.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTransaction(null)}
              className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold rounded-lg hover:from-emerald-500 hover:to-emerald-400 transition-all"
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}
