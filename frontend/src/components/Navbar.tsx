'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useScrollPosition } from '@/hooks';
import { useAuthContext } from '@/hooks';
import { useCart } from '@/context/CartContext';
import { AuthModal } from './AuthModal';
import { buttonAnimation } from '@/utils/animations';
import { trackClick } from '@/utils/analytics';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();
  const scrollPosition = useScrollPosition();
  const { isAuthenticated, user, login, register, logout, isLoading, error } = useAuthContext();
  const { totalQuantity } = useCart();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    trackClick('navbar_sign_out_click', { location: isOpen ? 'mobile' : 'desktop' });
    logout();
    setIsOpen(false);
  };

  const handleAuthOpen = (source: 'desktop' | 'mobile') => {
    trackClick('navbar_sign_in_click', { location: source });
    setShowAuthModal(true);
    if (source === 'mobile') {
      setIsOpen(false);
    }
  };

  const handleBookPickupClick = (source: 'desktop' | 'mobile') => {
    trackClick('navbar_book_pickup_click', { location: source });
    router.push('/book-pickup');
    if (source === 'mobile') {
      setIsOpen(false);
    }
  };

  const handleScrapItemsClick = (source: 'desktop' | 'mobile') => {
    trackClick('navbar_scrap_items_click', { location: source });
    router.push('/scrap-items');
    if (source === 'mobile') {
      setIsOpen(false);
    }
  };

  const handleCartClick = (source: 'desktop' | 'mobile') => {
    trackClick('navbar_cart_click', { location: source });
    router.push('/cart');
    if (source === 'mobile') {
      setIsOpen(false);
    }
  };

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#problem', label: 'Problem' },
    { href: '#solution', label: 'Solution' },
    { href: '#metal-index', label: 'Metal Index' },
    { href: '#team', label: 'Team' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrollPosition > 50
            ? 'bg-white shadow-md'
            : 'bg-transparent'
        }`}
      >
        <div className="container-responsive flex items-center h-16 md:h-32 px-4 md:px-6">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="hover:opacity-80 transition-opacity flex items-center">
              <Image
                src="/ScrapNinja Logo Without Background.png"
                alt="ScrapNinja"
                width={420}
                height={140}
                className="object-contain w-32 h-auto md:w-[280px]"
                priority
              />
            </Link>
          </div>

          {/* Nav links + buttons pushed to the right */}
          <div className="hidden md:flex items-center gap-6 h-full ml-auto">
            {navLinks.map(({ href, label }) => (
              <motion.a
                key={href}
                href={href}
                className="text-base font-semibold text-neutral-700 hover:text-primary-600 transition-colors whitespace-nowrap flex items-center h-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {label}
              </motion.a>
            ))}
          </div>

          {/* Right Section - Buttons */}
          <motion.div 
            className="hidden md:flex items-center gap-4 h-full ml-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {isAuthenticated && user ? (
              <>
                <motion.span 
                  className="text-sm font-medium text-neutral-600 flex items-center whitespace-nowrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Hi, {user.firstName}!
                </motion.span>
                {totalQuantity > 0 && (
                  <motion.button
                    onClick={() => handleCartClick('desktop')}
                    className="relative p-2 text-neutral-600 hover:text-primary-600 transition-colors"
                    {...buttonAnimation}
                  >
                    <ShoppingCart size={20} />
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-primary-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                    >
                      {totalQuantity}
                    </motion.span>
                  </motion.button>
                )}
                <motion.button
                  onClick={handleLogout}
                  className="btn-ghost text-sm px-5 py-2.5 flex items-center h-11"
                  {...buttonAnimation}
                >
                  Sign Out
                </motion.button>
                <motion.button 
                  onClick={() => handleScrapItemsClick('desktop')}
                  className="btn-secondary text-sm px-5 py-2.5 flex items-center h-11 gap-1"
                  {...buttonAnimation}
                >
                  📦 Scrap Items
                </motion.button>
                <motion.button 
                  onClick={() => handleBookPickupClick('desktop')}
                  className="btn-primary text-sm px-6 py-2.5 flex items-center h-11"
                  {...buttonAnimation}
                >
                  Book Pickup
                </motion.button>
              </>
            ) : (
              <>
                {totalQuantity > 0 && (
                  <motion.button
                    onClick={() => handleCartClick('desktop')}
                    className="relative p-2 text-neutral-600 hover:text-primary-600 transition-colors"
                    {...buttonAnimation}
                  >
                    <ShoppingCart size={20} />
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-primary-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                    >
                      {totalQuantity}
                    </motion.span>
                  </motion.button>
                )}
                <motion.button
                  onClick={() => handleAuthOpen('desktop')}
                  className="btn-ghost text-sm px-5 py-2.5 flex items-center h-11"
                  {...buttonAnimation}
                >
                  Sign In
                </motion.button>
                <motion.button 
                  onClick={() => handleScrapItemsClick('desktop')}
                  className="btn-secondary text-sm px-5 py-2.5 flex items-center h-11 gap-1"
                  {...buttonAnimation}
                >
                  📦 Scrap Items
                </motion.button>
                <motion.button
                  onClick={() => handleBookPickupClick('desktop')}
                  className="btn-primary text-sm px-6 py-2.5 flex items-center h-11"
                  {...buttonAnimation}
                >
                  Book Pickup
                </motion.button>
              </>
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`md:hidden ml-auto p-2 rounded-lg transition-colors ${
              scrollPosition > 50 ? 'text-neutral-900' : 'text-primary-600'
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-neutral-200">
            <div className="container-responsive py-4 flex flex-col gap-4">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="py-2 text-neutral-700 hover:text-primary-600 transition-colors"
                >
                  {label}
                </a>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                {isAuthenticated && user ? (
                  <>
                    <span className="text-sm text-neutral-600 px-3">Hi, {user.firstName}!</span>
                    {totalQuantity > 0 && (
                      <button
                        onClick={() => handleCartClick('mobile')}
                        className="btn-secondary w-full justify-center gap-2 relative"
                      >
                        <ShoppingCart size={18} />
                        Cart ({totalQuantity})
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="btn-ghost w-full justify-center"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    {totalQuantity > 0 && (
                      <button
                        onClick={() => handleCartClick('mobile')}
                        className="btn-secondary w-full justify-center gap-2 relative"
                      >
                        <ShoppingCart size={18} />
                        Cart ({totalQuantity})
                      </button>
                    )}
                    <button
                      onClick={() => handleAuthOpen('mobile')}
                      className="btn-ghost w-full justify-center"
                    >
                      Sign In
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleScrapItemsClick('mobile')}
                  className="btn-secondary w-full justify-center gap-2"
                >
                  📦 Scrap Items
                </button>
                <button
                  onClick={() => handleBookPickupClick('mobile')}
                  className="btn-primary w-full justify-center"
                >
                  Book Pickup
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={login}
        onRegister={register}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
};
