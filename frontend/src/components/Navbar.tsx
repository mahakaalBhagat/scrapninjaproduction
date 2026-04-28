'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useScrollPosition } from '@/hooks';
import { useAuthContext } from '@/hooks';
import { AuthModal } from './AuthModal';
import { buttonAnimation } from '@/utils/animations';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const scrollPosition = useScrollPosition();
  const { isAuthenticated, user, login, register, logout, isLoading, error } = useAuthContext();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
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
        <div className="container-responsive flex items-center h-32 px-6">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="hover:opacity-80 transition-opacity flex items-center">
              <Image
                src="/ScrapNinja Logo Without Background.png"
                alt="ScrapNinja"
                width={420}
                height={140}
                className="object-contain"
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
                <motion.button
                  onClick={handleLogout}
                  className="btn-ghost text-sm px-5 py-2.5 flex items-center h-11"
                  {...buttonAnimation}
                >
                  Sign Out
                </motion.button>
                <motion.button 
                  className="btn-primary text-sm px-6 py-2.5 flex items-center h-11"
                  {...buttonAnimation}
                >
                  Book Pickup
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  onClick={() => setShowAuthModal(true)}
                  className="btn-ghost text-sm px-5 py-2.5 flex items-center h-11"
                  {...buttonAnimation}
                >
                  Sign In
                </motion.button>
                <motion.button
                  onClick={() => setShowAuthModal(true)}
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
            className={`md:hidden p-2 rounded-lg transition-colors ${
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
                    <button
                      onClick={handleLogout}
                      className="btn-ghost w-full justify-center"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setShowAuthModal(true);
                        setIsOpen(false);
                      }}
                      className="btn-ghost w-full justify-center"
                    >
                      Sign In
                    </button>
                  </>
                )}
                <button className="btn-primary w-full justify-center">Book Pickup</button>
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
