// app/not-found.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  // Auto-redirect after countdown
  useEffect(() => {
    if (countdown <= 0) {
      router.push('/');
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow flex items-center justify-center">
        <div className="relative overflow-hidden py-24 sm:py-32">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-teal-200 rounded-full opacity-20 transform translate-x-1/4 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-purple-200 rounded-full opacity-20 transform -translate-x-1/4 translate-y-1/4"></div>
          
          <div className="relative max-w-xl mx-auto px-6 text-center">
            <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-purple-600 mb-3">
              404
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Page Not Found
            </h1>
            
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-gray-500">Oops!</span>
              </div>
            </div>
            
            <p className="text-lg text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved. 
              Don't worry, we'll get you back on track!
            </p>
            
            <div className="mb-8">
              <div className="relative h-4 rounded-full bg-gray-100 shadow-inner overflow-hidden">
                <div 
                  className="absolute h-full left-0 top-0 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full transition-all duration-300"
                  style={{ width: `${(countdown / 10) * 100}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Redirecting to home page in {countdown} seconds...
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 transition duration-150"
              >
                Go to Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition duration-150"
              >
                Go Back
              </button>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition duration-150"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}