// pages/index.tsx
import type { NextPage } from 'next';
import Image from "next/image";
import Link from "next/link";
import Header from '../components/Header';
import FeaturedSection from '../components/FeaturedSection';
import StatsSection from '../components/StatsSection';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';

const Home: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Use the Header component */}
      <Header />

      {/* Hero Section - Enhanced with new design and colors */}
      <main className="flex-grow">
        <div className="relative bg-gradient-to-br from-teal-50 to-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <svg
                className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-teal-50 transform translate-x-1/2"
                fill="currentColor"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polygon points="50,0 100,0 50,100 0,100" />
              </svg>
              
              <div className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block">Healthcare for</span>
                    <span className="block text-teal-600">Underserved Regions</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    360Nurse is a nurse-led remote patient monitoring platform designed to deliver quality healthcare in underserved regions, with a core focus on Africa.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link
                        href="/auth/signup"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 transition duration-150 md:py-4 md:text-lg md:px-10"
                      >
                        Get Started
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Link
                        href="/features"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 transition duration-150 md:py-4 md:text-lg md:px-10"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex items-center justify-center p-8">
            <div className="h-64 w-full sm:h-72 md:h-96 lg:w-full lg:h-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl shadow-xl flex flex-col items-center justify-center p-8 text-white overflow-hidden">
                {/* Purple decorative elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500 opacity-20 rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500 opacity-20 rounded-full"></div>
                
                <h2 className="text-2xl font-bold mb-6 relative z-10">Key Features</h2>
                <ul className="space-y-3 relative z-10">
                  <li className="flex items-center">
                    <svg className="h-6 w-6 mr-3 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Remote Patient Monitoring
                  </li>
                  <li className="flex items-center">
                    <svg className="h-6 w-6 mr-3 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Emergency Dispatch
                  </li>
                  <li className="flex items-center">
                    <svg className="h-6 w-6 mr-3 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Facility Console
                  </li>
                  <li className="flex items-center">
                    <svg className="h-6 w-6 mr-3 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Nurse Verification
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* We'll update the rest of the page content later */}
        <FeaturedSection />
        <StatsSection />
        <CtaSection />
        <Footer />
      </main>
    </div>
  );
};

export default Home;