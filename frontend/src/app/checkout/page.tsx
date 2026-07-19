'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Truck, MapPin, CheckCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRider } from '@/context/RiderContext';
import { RiderAssignmentModal } from '@/components/rider/RiderAssignmentModal';
import { RiderAssignmentRequest } from '@/types/rider';

interface CheckoutStep {
  id: number;
  title: string;
  icon: React.ReactNode;
  completed: boolean;
}

interface ShippingData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface PickupData {
  pickupDate: string;
  pickupTimeSlot: string;
  specialInstructions: string;
  preferredLocation: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, totalQuantity } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [currency, setCurrency] = useState<'USD' | 'AED'>('AED');

  // Form states
  const [shippingData, setShippingData] = useState<ShippingData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'UAE',
  });

  const [pickupData, setPickupData] = useState<PickupData>({
    pickupDate: '',
    pickupTimeSlot: '09:00-12:00',
    specialInstructions: '',
    preferredLocation: 'Dubai Downtown',
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showRiderModal, setShowRiderModal] = useState(false);
  const [riderAssignmentRequest, setRiderAssignmentRequest] = useState<RiderAssignmentRequest | null>(null);
  const [orderId, setOrderId] = useState<string>('');

  const { assignRider } = useRider();

  const conversionRates = { USD: 1, AED: 3.67 };
  const currencySymbols = { USD: '$', AED: 'د.إ' };

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.pricePerUnit || 0; // Default to 0 if missing
    return sum + (price * item.quantity * conversionRates[currency]);
  }, 0).toFixed(2);

  // Calculate AED amount for rider assignment
  const totalPriceUSD = cartItems.reduce((sum, item) => {
    const price = item.pricePerUnit || 0;
    return sum + (price * item.quantity);
  }, 0);
  const orderAmountInAED = parseFloat((totalPriceUSD * 3.67).toFixed(2));

  const steps: CheckoutStep[] = [
    { id: 1, title: 'Shipping', icon: <Truck size={24} />, completed: currentStep > 1 },
    { id: 2, title: 'Pickup', icon: <MapPin size={24} />, completed: currentStep > 2 },
    { id: 3, title: 'Confirmation', icon: <CheckCircle size={24} />, completed: orderPlaced },
  ];

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (shippingData.fullName && shippingData.email && shippingData.address) {
      setCurrentStep(2);
    }
  };

  const handlePickupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pickupData.pickupDate) {
      setCurrentStep(3);
      setTimeout(() => {
        setOrderPlaced(true);
      }, 500);
    }
  };

  const handlePlaceOrder = () => {
    // Place order
    const newOrderId = `SN-${Date.now()}`;
    setOrderId(newOrderId);

    // Create rider assignment request
    const request: RiderAssignmentRequest = {
      orderId: newOrderId,
      pickupLocation: {
        latitude: 25.1972,
        longitude: 55.2744,
        address: shippingData.address || 'Downtown Dubai',
      },
      pickupTimeSlot: pickupData.pickupTimeSlot,
      customerPhone: shippingData.phone,
      cartValue: orderAmountInAED,
      itemCount: cartItems.length,
    };

    setRiderAssignmentRequest(request);
    setOrderPlaced(true);
    setShowRiderModal(true);

    // Show success message
    alert(`✅ Order Placed Successfully!\n\nAmount Deducted: د.إ${orderAmountInAED.toFixed(2)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="p-2 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-400 hover:bg-emerald-500/30"
            >
              <ArrowLeft size={24} />
            </motion.button>
            <h1 className="text-4xl font-bold text-white">Checkout</h1>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-12 bg-emerald-900/30 border border-emerald-500/30 rounded-lg p-8"
            >
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      onClick={() => currentStep >= step.id && setCurrentStep(step.id)}
                      className={`flex items-center justify-center w-12 h-12 rounded-full border-2 cursor-pointer transition-all ${
                        currentStep >= step.id
                          ? 'bg-emerald-500 border-emerald-400 text-white'
                          : 'bg-slate-700/50 border-slate-600 text-slate-400'
                      }`}
                    >
                      {step.completed ? <Check size={20} /> : step.icon}
                    </motion.div>
                    <p
                      className={`ml-3 font-semibold ${
                        currentStep >= step.id ? 'text-emerald-300' : 'text-slate-400'
                      }`}
                    >
                      {step.title}
                    </p>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-12 h-0.5 mx-4 ${
                          currentStep > step.id ? 'bg-emerald-500' : 'bg-slate-700'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Step 1: Shipping Details */}
            {currentStep === 1 && (
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleShippingSubmit}
                className="bg-emerald-900/30 border border-emerald-500/30 rounded-lg p-8 space-y-6"
              >
                <h2 className="text-2xl font-bold text-emerald-300 flex items-center gap-3">
                  <Truck size={28} /> Shipping Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-emerald-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={shippingData.fullName}
                      onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-emerald-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-emerald-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={shippingData.email}
                      onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-emerald-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-emerald-300 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={shippingData.phone}
                      onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-emerald-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      placeholder="+971 50 123 4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-emerald-300 mb-2">
                      Country
                    </label>
                    <select
                      value={shippingData.country}
                      onChange={(e) => setShippingData({ ...shippingData, country: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-emerald-500/30 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="UAE">United Arab Emirates</option>
                      <option value="SA">Saudi Arabia</option>
                      <option value="KW">Kuwait</option>
                      <option value="QA">Qatar</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-emerald-300 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    value={shippingData.address}
                    onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-emerald-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    placeholder="123 Main Street"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-emerald-300 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={shippingData.city}
                      onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-emerald-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      placeholder="Dubai"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-emerald-300 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={shippingData.postalCode}
                      onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-emerald-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      placeholder="12345"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  Continue to Pickup <ArrowRight size={20} />
                </motion.button>
              </motion.form>
            )}

            {/* Step 2: Pickup Details */}
            {currentStep === 2 && (
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handlePickupSubmit}
                className="bg-emerald-900/30 border border-emerald-500/30 rounded-lg p-8 space-y-6"
              >
                <h2 className="text-2xl font-bold text-emerald-300 flex items-center gap-3">
                  <MapPin size={28} /> Pickup Details
                </h2>

                <div>
                  <label className="block text-sm font-semibold text-emerald-300 mb-2">
                    Preferred Pickup Location *
                  </label>
                  <select
                    value={pickupData.preferredLocation}
                    onChange={(e) => setPickupData({ ...pickupData, preferredLocation: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-emerald-500/30 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Dubai Downtown">Dubai Downtown Collection Center</option>
                    <option value="Abu Dhabi">Abu Dhabi Collection Center</option>
                    <option value="Sharjah">Sharjah Collection Center</option>
                    <option value="Ajman">Ajman Collection Center</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-emerald-300 mb-2">
                      Pickup Date *
                    </label>
                    <input
                      type="date"
                      value={pickupData.pickupDate}
                      onChange={(e) => setPickupData({ ...pickupData, pickupDate: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-emerald-500/30 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-emerald-300 mb-2">
                      Time Slot
                    </label>
                    <select
                      value={pickupData.pickupTimeSlot}
                      onChange={(e) => setPickupData({ ...pickupData, pickupTimeSlot: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-emerald-500/30 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="09:00-12:00">09:00 - 12:00</option>
                      <option value="12:00-15:00">12:00 - 15:00</option>
                      <option value="15:00-18:00">15:00 - 18:00</option>
                      <option value="18:00-21:00">18:00 - 21:00</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-emerald-300 mb-2">
                    Special Instructions
                  </label>
                  <textarea
                    value={pickupData.specialInstructions}
                    onChange={(e) => setPickupData({ ...pickupData, specialInstructions: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-emerald-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                    placeholder="Any special instructions for pickup..."
                    rows={4}
                  />
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg transition-colors"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    Review Order <ArrowRight size={20} />
                  </motion.button>
                </div>
              </motion.form>
            )}

            {/* Step 3: Order Confirmation */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-900/30 border border-emerald-500/30 rounded-lg p-8 text-center space-y-6"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                  className="flex justify-center"
                >
                  <CheckCircle size={80} className="text-emerald-400" />
                </motion.div>

                <h2 className="text-3xl font-bold text-emerald-300">Order Ready!</h2>
                <p className="text-emerald-200 text-lg">
                  Review your order details below and confirm to place the order.
                </p>

                <div className="bg-slate-800/50 border border-emerald-500/30 rounded-lg p-6 text-left space-y-3">
                  <h3 className="text-xl font-bold text-emerald-300 mb-4">Order Summary</h3>
                  <div className="flex justify-between text-emerald-200">
                    <span>Shipping To:</span>
                    <span className="font-semibold text-white">{shippingData.fullName}</span>
                  </div>
                  <div className="flex justify-between text-emerald-200">
                    <span>Address:</span>
                    <span className="font-semibold text-white">{shippingData.address}, {shippingData.city}</span>
                  </div>
                  <div className="flex justify-between text-emerald-200">
                    <span>Pickup Date:</span>
                    <span className="font-semibold text-white">{pickupData.pickupDate}</span>
                  </div>
                  <div className="flex justify-between text-emerald-200">
                    <span>Time Slot:</span>
                    <span className="font-semibold text-white">{pickupData.pickupTimeSlot}</span>
                  </div>
                  <div className="border-t border-emerald-500/30 pt-3 mt-3 flex justify-between text-lg font-bold">
                    <span className="text-emerald-300">Total Items:</span>
                    <span className="text-emerald-400">{totalQuantity} kg</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-emerald-300">Total Amount:</span>
                    <span className="text-emerald-400">
                      {currencySymbols[currency]} {totalPrice}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg transition-colors"
                  >
                    Edit Details
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <Check size={20} /> Place Order
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-emerald-900/30 border border-emerald-500/30 rounded-lg p-6 sticky top-8 space-y-6"
            >
              <h3 className="text-xl font-bold text-emerald-300">Order Summary</h3>

              {/* Currency Toggle */}
              <div className="flex gap-2">
                {(['USD', 'AED'] as const).map((curr) => (
                  <motion.button
                    key={curr}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrency(curr)}
                    className={`px-3 py-2 rounded font-semibold transition-all ${
                      currency === curr
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {curr}
                  </motion.button>
                ))}
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-emerald-200">
                    <span>
                      {item.emoji} {item.name}
                    </span>
                    <span className="font-semibold">
                      {currencySymbols[currency]}
                      {(((item.pricePerUnit || 0) * item.quantity * conversionRates[currency])).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-emerald-500/30 pt-4 space-y-4">
                {/* Order Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-emerald-200">
                    <span>Subtotal:</span>
                    <span>{currencySymbols[currency]} {totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-emerald-200">
                    <span>Shipping:</span>
                    <span className="text-emerald-400 font-semibold">FREE</span>
                  </div>
                  <div className="flex justify-between text-emerald-200">
                    <span>Taxes:</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-emerald-500/30 pt-4 flex justify-between text-lg font-bold">
                <span className="text-emerald-300">Total:</span>
                <span className="text-emerald-400">
                  {currencySymbols[currency]} {totalPrice}
                </span>
              </div>

              {/* Info Box */}
              <div className="bg-slate-800/50 border border-emerald-500/30 rounded p-4">
                <p className="text-sm text-emerald-200">
                  ✓ Secure payment processing
                  <br />✓ Free shipping to all emirates
                  <br />✓ Same-day pickup available
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Rider Assignment Modal */}
        {riderAssignmentRequest && (
          <RiderAssignmentModal
            isOpen={showRiderModal}
            request={riderAssignmentRequest}
            onAssignmentComplete={() => {
              setTimeout(() => {
                router.push(`/tracker`);
              }, 1000);
            }}
          />
        )}
      </div>
    </div>
  );
}
