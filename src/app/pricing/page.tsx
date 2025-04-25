"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const PricingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-500 to-teal-600 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-teal-50">
              Choose the plan that's right for you and get access to quality healthcare services.
            </p>
          </div>
        </section>
        
        {/* Pricing Cards */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Basic Plan */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-teal-500 transition-transform hover:scale-105">
                <div className="px-6 py-8">
                  <h3 className="text-2xl font-bold text-gray-900 text-center">Basic Plan</h3>
                  <div className="mt-4 flex justify-center">
                    <span className="text-5xl font-extrabold text-gray-900">₦2,500</span>
                    <span className="ml-1 text-xl font-medium text-gray-500 self-end">/month</span>
                  </div>
                  <p className="mt-4 text-center text-gray-600">
                    Essential health monitoring for individuals
                  </p>
                </div>
                <div className="px-6 pt-6 pb-8">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-teal-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Health alerts</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-teal-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Vital signs monitoring</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-teal-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Emergency alerts</span>
                    </li>
                    <li className="flex items-start text-gray-400">
                      <svg className="h-6 w-6 text-gray-300 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Nurse consultations</span>
                    </li>
                  </ul>
                  <div className="mt-8">
                    <Link
                      href="/auth/signup"
                      className="block w-full bg-teal-500 text-white text-center px-5 py-3 rounded-md font-medium hover:bg-teal-600 transition duration-150"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Premium Plan */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-purple-500 transform transition-transform hover:scale-105">
                <div className="absolute top-0 right-0 bg-purple-500 text-white px-3 py-1 rounded-bl-lg text-sm font-medium">
                  POPULAR
                </div>
                <div className="px-6 py-8">
                  <h3 className="text-2xl font-bold text-gray-900 text-center">Premium Plan</h3>
                  <div className="mt-4 flex justify-center">
                    <span className="text-5xl font-extrabold text-gray-900">₦5,000</span>
                    <span className="ml-1 text-xl font-medium text-gray-500 self-end">/month</span>
                  </div>
                  <p className="mt-4 text-center text-gray-600">
                    Complete healthcare solution with professional support
                  </p>
                </div>
                <div className="px-6 pt-6 pb-8">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-purple-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Health alerts</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-purple-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Vital signs monitoring</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-purple-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Emergency alerts</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-purple-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Nurse consultations</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-purple-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Priority support</span>
                    </li>
                  </ul>
                  <div className="mt-8">
                    <Link
                      href="/auth/signup"
                      className="block w-full bg-purple-500 text-white text-center px-5 py-3 rounded-md font-medium hover:bg-purple-600 transition duration-150"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900">How do I get started?</h3>
                <p className="mt-2 text-gray-600">
                  Simply sign up for an account, choose your subscription plan, and complete the payment process. Once your account is activated, you can start using all the features included in your plan.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900">Can I change my plan later?</h3>
                <p className="mt-2 text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900">What payment methods do you accept?</h3>
                <p className="mt-2 text-gray-600">
                  We accept all major credit cards, bank transfers, and mobile payment options available in Nigeria.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900">Is there a refund policy?</h3>
                <p className="mt-2 text-gray-600">
                  We offer a 7-day money-back guarantee if you're not satisfied with our service. Please contact our support team for assistance with refunds.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-teal-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Ready to take control of your health?
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Join 360Nurse today and experience quality healthcare services at your fingertips.
            </p>
            <div className="mt-8">
              <Link
                href="/auth/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 transition duration-150"
              >
                Sign Up Now
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PricingPage;
