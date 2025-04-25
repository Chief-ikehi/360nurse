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
      <main className="flex-grow pt-20">
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
                    <span className="block">Quality Healthcare</span>
                    <span className="block text-teal-600">At Your Fingertips</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    360Nurse is a nurse-led remote patient monitoring platform designed to deliver quality healthcare services to everyone, anywhere.
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

        {/* SDG Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Supporting Sustainable Development Goals
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                360Nurse is proud to contribute to the United Nations Sustainable Development Goals
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-teal-500 rounded-md shadow-lg">
                        <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-xl font-medium text-gray-900 tracking-tight">SDG 3 – Good Health and Well-Being</h3>
                    <p className="mt-2 text-base text-gray-500">
                      "Ensure healthy lives and promote well-being for all at all ages"
                    </p>
                    <ul className="mt-5 space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-500">Remote monitoring improves access to timely care, especially in underserved areas</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-500">Reduces preventable deaths through early alerts and triage</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-500">Supports management of chronic illnesses and reduces health inequalities</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg">
                        <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-xl font-medium text-gray-900 tracking-tight">SDG 17 – Partnerships for the Goals</h3>
                    <p className="mt-2 text-base text-gray-500">
                      "Strengthen the means of implementation and revitalize the global partnership for sustainable development"
                    </p>
                    <ul className="mt-5 space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-500">Encourages collaboration between nurses, tech partners, government, NGOs, and donors</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-500">Scalable through public-private partnerships and grant-backed pilots</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-500">Building technology that connects different stakeholders in the healthcare ecosystem</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/impact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700"
              >
                Learn More About Our Impact
              </Link>
            </div>
          </div>
        </div>

        <FeaturedSection />
        <StatsSection />
        <CtaSection />
        <Footer />
      </main>
    </div>
  );
};

export default Home;