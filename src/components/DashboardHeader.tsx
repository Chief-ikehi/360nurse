"use client";

import { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';

interface DashboardHeaderProps {
  userName: string;
  userEmail: string;
  userRole: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  userEmail,
  userRole
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Check if the link is active
  const isActive = (path: string): boolean => {
    return pathname === path;
  };

  // State for profile dropdown
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // Toggle menu open/closed with preventing propagation
  const toggleMenu = (e: React.MouseEvent): void => {
    e.preventDefault(); 
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
    // Close profile dropdown if open
    if (isProfileOpen) setIsProfileOpen(false);
  };

  // Toggle profile dropdown
  const toggleProfile = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsProfileOpen(!isProfileOpen);
  };

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await signOut({ redirect: false });
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Prevent propagation on link clicks
  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Create refs for dropdown elements
  const profileRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't close if clicking inside the profile dropdown or its toggle button
      if (profileRef.current && profileRef.current.contains(event.target as Node)) {
        return;
      }

      // Don't close if clicking inside the mobile menu or its toggle button
      if (
        (mobileMenuRef.current && mobileMenuRef.current.contains(event.target as Node)) ||
        (menuButtonRef.current && menuButtonRef.current.contains(event.target as Node))
      ) {
        return;
      }

      // Close dropdowns if clicking outside
      setIsProfileOpen(false);
      setIsMenuOpen(false);
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gradient-to-r from-teal-500 to-teal-600 shadow-md relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/dashboard" className="flex items-center" onClick={handleLinkClick}>
              <h1 className="text-2xl font-bold text-white flex items-center">
                <svg className="h-7 w-7 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                360<span className="text-purple-300">Nurse</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/dashboard"
              className={`font-medium text-base transition duration-150 ${
                isActive('/dashboard')
                  ? 'text-white border-b-2 border-purple-300'
                  : 'text-teal-100 hover:text-white'
              }`}
              onClick={handleLinkClick}
            >
              Dashboard
            </Link>

            {userRole === "PATIENT" && (
              <>
                <Link
                  href="/dashboard/patient/vitals"
                  className={`font-medium text-base transition duration-150 ${
                    isActive('/dashboard/patient/vitals')
                      ? 'text-white border-b-2 border-purple-300'
                      : 'text-teal-100 hover:text-white'
                  }`}
                  onClick={handleLinkClick}
                >
                  My Vitals
                </Link>
                <Link
                  href="/dashboard/patient/alerts"
                  className={`font-medium text-base transition duration-150 ${
                    isActive('/dashboard/patient/alerts')
                      ? 'text-white border-b-2 border-purple-300'
                      : 'text-teal-100 hover:text-white'
                  }`}
                  onClick={handleLinkClick}
                >
                  Alerts
                </Link>
              </>
            )}

            {userRole === "NURSE" && (
              <>
                <Link
                  href="/dashboard/nurse/patients"
                  className={`font-medium text-base transition duration-150 ${
                    isActive('/dashboard/nurse/patients')
                      ? 'text-white border-b-2 border-purple-300'
                      : 'text-teal-100 hover:text-white'
                  }`}
                  onClick={handleLinkClick}
                >
                  My Patients
                </Link>
                <Link
                  href="/dashboard/nurse/alerts"
                  className={`font-medium text-base transition duration-150 ${
                    isActive('/dashboard/nurse/alerts')
                      ? 'text-white border-b-2 border-purple-300'
                      : 'text-teal-100 hover:text-white'
                  }`}
                  onClick={handleLinkClick}
                >
                  Alerts
                </Link>
              </>
            )}

            {userRole === "FACILITY_ADMIN" && (
              <>
                <Link
                  href="/dashboard/facility/nurses"
                  className={`font-medium text-base transition duration-150 ${
                    isActive('/dashboard/facility/nurses')
                      ? 'text-white border-b-2 border-purple-300'
                      : 'text-teal-100 hover:text-white'
                  }`}
                  onClick={handleLinkClick}
                >
                  Nurses
                </Link>
                <Link
                  href="/dashboard/facility/patients"
                  className={`font-medium text-base transition duration-150 ${
                    isActive('/dashboard/facility/patients')
                      ? 'text-white border-b-2 border-purple-300'
                      : 'text-teal-100 hover:text-white'
                  }`}
                  onClick={handleLinkClick}
                >
                  Patients
                </Link>
                <Link
                  href="/dashboard/facility/reports"
                  className={`font-medium text-base transition duration-150 ${
                    isActive('/dashboard/facility/reports')
                      ? 'text-white border-b-2 border-purple-300'
                      : 'text-teal-100 hover:text-white'
                  }`}
                  onClick={handleLinkClick}
                >
                  Reports
                </Link>
              </>
            )}
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative" ref={profileRef}>
              <button
                onClick={toggleProfile}
                className="flex items-center space-x-3 focus:outline-none"
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
              >
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-sm font-bold shadow-md ring-2 ring-white ring-opacity-30">
                  {userName?.charAt(0) || "U"}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-white font-medium">{userName}</span>
                  <span className="text-xs text-teal-100">{userRole.replace('_', ' ').toLowerCase()}</span>
                </div>
                <svg className={`h-4 w-4 text-white transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5"
                >
                  {userRole === "PATIENT" && (
                    <Link
                      href="/dashboard/patient/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleLinkClick}
                    >
                      <div className="flex items-center">
                        <svg className="h-4 w-4 mr-2 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        My Profile
                      </div>
                    </Link>
                  )}

                  <Link
                    href="/dashboard/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleLinkClick}
                  >
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-2 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </div>
                  </Link>

                  <hr className="my-1" />

                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <div className="flex items-center text-red-600">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign out
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button - Isolated from other elements */}
          <div className="md:hidden z-40">
            <button
              ref={menuButtonRef}
              className="text-white p-2 focus:outline-none"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <div className="w-6 h-6 relative flex flex-col justify-center items-center">
                <span
                  className={`absolute h-0.5 bg-white transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'w-6 rotate-45' : 'w-6 -translate-y-2'
                  }`}
                ></span>
                <span
                  className={`absolute h-0.5 bg-white transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'w-0 opacity-0' : 'w-6 opacity-100'
                  }`}
                ></span>
                <span
                  className={`absolute h-0.5 bg-white transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'w-6 -rotate-45' : 'w-6 translate-y-2'
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Positioned absolutely and separate from the main header */}
      {isMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-teal-600 fixed inset-x-0 top-16 z-30 shadow-lg overflow-y-auto max-h-[calc(100vh-4rem)]"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/dashboard"
              className={`block px-3 py-2 rounded-md font-medium ${
                isActive('/dashboard')
                  ? 'bg-teal-700 text-white'
                  : 'text-white hover:bg-teal-700 hover:text-white'
              }`}
              onClick={handleLinkClick}
            >
              Dashboard
            </Link>

            {userRole === "PATIENT" && (
              <>
                <Link
                  href="/dashboard/patient/vitals"
                  className={`block px-3 py-2 rounded-md font-medium ${
                    isActive('/dashboard/patient/vitals')
                      ? 'bg-teal-700 text-white'
                      : 'text-white hover:bg-teal-700 hover:text-white'
                  }`}
                  onClick={handleLinkClick}
                >
                  My Vitals
                </Link>
                <Link
                  href="/dashboard/patient/alerts"
                  className={`block px-3 py-2 rounded-md font-medium ${
                    isActive('/dashboard/patient/alerts')
                      ? 'bg-teal-700 text-white'
                      : 'text-white hover:bg-teal-700 hover:text-white'
                  }`}
                  onClick={handleLinkClick}
                >
                  Alerts
                </Link>
              </>
            )}

            {userRole === "NURSE" && (
              <>
                <Link
                  href="/dashboard/nurse/patients"
                  className={`block px-3 py-2 rounded-md font-medium ${
                    isActive('/dashboard/nurse/patients')
                      ? 'bg-teal-700 text-white'
                      : 'text-white hover:bg-teal-700 hover:text-white'
                  }`}
                  onClick={handleLinkClick}
                >
                  My Patients
                </Link>
                <Link
                  href="/dashboard/nurse/alerts"
                  className={`block px-3 py-2 rounded-md font-medium ${
                    isActive('/dashboard/nurse/alerts')
                      ? 'bg-teal-700 text-white'
                      : 'text-white hover:bg-teal-700 hover:text-white'
                  }`}
                  onClick={handleLinkClick}
                >
                  Alerts
                </Link>
              </>
            )}

            {userRole === "FACILITY_ADMIN" && (
              <>
                <Link
                  href="/dashboard/facility/nurses"
                  className={`block px-3 py-2 rounded-md font-medium ${
                    isActive('/dashboard/facility/nurses')
                      ? 'bg-teal-700 text-white'
                      : 'text-white hover:bg-teal-700 hover:text-white'
                  }`}
                  onClick={handleLinkClick}
                >
                  Nurses
                </Link>
                <Link
                  href="/dashboard/facility/patients"
                  className={`block px-3 py-2 rounded-md font-medium ${
                    isActive('/dashboard/facility/patients')
                      ? 'bg-teal-700 text-white'
                      : 'text-white hover:bg-teal-700 hover:text-white'
                  }`}
                  onClick={handleLinkClick}
                >
                  Patients
                </Link>
                <Link
                  href="/dashboard/facility/reports"
                  className={`block px-3 py-2 rounded-md font-medium ${
                    isActive('/dashboard/facility/reports')
                      ? 'bg-teal-700 text-white'
                      : 'text-white hover:bg-teal-700 hover:text-white'
                  }`}
                  onClick={handleLinkClick}
                >
                  Reports
                </Link>
              </>
            )}
          </div>

          <div className="pt-4 pb-3 border-t border-teal-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-lg font-bold shadow-md ring-2 ring-white ring-opacity-30">
                  {userName?.charAt(0) || "U"}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">{userName}</div>
                <div className="text-sm font-medium text-teal-100">{userEmail}</div>
                <div className="text-xs text-teal-200 mt-0.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-teal-800 text-teal-100">
                    {userRole.replace('_', ' ').toLowerCase()}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-2">
              {userRole === "PATIENT" && (
                <Link
                  href="/dashboard/patient/profile"
                  className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-teal-700 transition-colors"
                  onClick={handleLinkClick}
                >
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  My Profile
                </Link>
              )}

              <Link
                href="/dashboard/settings"
                className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-teal-700 transition-colors"
                onClick={handleLinkClick}
              >
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </Link>

              <div className="pt-2 mt-2 border-t border-teal-800">
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;