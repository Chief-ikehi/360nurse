// components/Header.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't close if clicking inside the mobile menu or its toggle button
      if (
        (mobileMenuRef.current && mobileMenuRef.current.contains(event.target as Node)) ||
        (menuButtonRef.current && menuButtonRef.current.contains(event.target as Node))
      ) {
        return;
      }

      // Close menu if clicking outside
      setIsMenuOpen(false);
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActive = (path: string): boolean => pathname === path;

  const toggleMenu = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Impact', path: '/impact' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="bg-gradient-to-r from-teal-500 to-teal-600 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center" onClick={handleLinkClick}>
              <h1 className="text-3xl font-bold text-white flex items-center">
                <svg className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                360<span className="text-purple-300">Nurse</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`font-medium text-lg transition duration-150 ${
                  isActive(item.path)
                    ? 'text-purple-200 border-b-2 border-purple-300'
                    : 'text-white hover:text-purple-200'
                }`}
                onClick={handleLinkClick}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/auth/signin"
              className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-full text-teal-700 bg-white hover:bg-purple-50 transition duration-150 shadow-sm"
              onClick={handleLinkClick}
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-purple-600 hover:bg-purple-700 transition duration-150 shadow-md"
              onClick={handleLinkClick}
            >
              Sign Up
            </Link>
          </div>

          {/* Hamburger - Isolated from other elements */}
          <div className="md:hidden z-40">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={toggleMenu}
              className="relative z-50 text-white p-2 focus:outline-none"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <div className="w-6 h-6 relative flex flex-col justify-center items-center">
                <span
                  className={`absolute h-0.5 w-6 bg-white transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                  }`}
                ></span>
                <span
                  className={`absolute h-0.5 w-6 bg-white transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                ></span>
                <span
                  className={`absolute h-0.5 w-6 bg-white transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Fixed positioning instead of transform-based display */}
      {isMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-teal-600 fixed inset-x-0 top-20 z-40 shadow-lg overflow-y-auto max-h-[calc(100vh-5rem)]"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`block px-3 py-3 text-center rounded-md font-medium transition-colors duration-150 ${
                  isActive(item.path)
                    ? 'bg-teal-700 text-white'
                    : 'text-white hover:bg-teal-700 hover:text-white'
                }`}
                onClick={handleLinkClick}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Auth */}
            <div className="pt-4 pb-3 flex flex-col space-y-3">
              <Link
                href="/auth/signin"
                className="w-full text-center py-2.5 border border-transparent text-sm font-medium rounded-md text-teal-700 bg-white hover:bg-purple-50 transition duration-150"
                onClick={handleLinkClick}
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="w-full text-center py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition duration-150"
                onClick={handleLinkClick}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;