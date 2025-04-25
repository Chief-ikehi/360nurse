// components/CtaSection.tsx
import React from 'react';
import Link from 'next/link';

const CtaSection: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-teal-600 opacity-90"></div>
      <div className="absolute inset-y-0 right-0 w-1/3 bg-purple-600 opacity-10 transform -skew-x-12"></div>
      <div className="absolute bottom-0 right-0 w-full h-32 bg-white transform -skew-y-3 translate-y-16"></div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to transform healthcare delivery?
          </h2>
          <p className="mt-4 text-xl text-teal-50">
            Join thousands of healthcare professionals already using 360Nurse to provide better care in underserved regions.
          </p>
          
          <div className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12">
            <div className="rounded-md shadow">
              <Link 
                href="/auth/signup"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-teal-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition duration-150"
              >
                Get Started Free
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10 transition duration-150"
              >
                Contact Sales
              </Link>
            </div>
          </div>
          
          <p className="mt-6 text-sm text-teal-50">
            No credit card required. Free account includes basic monitoring for up to 10 patients.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;