"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ImpactPage() {
  return (
    <div className="bg-white pt-20">
      <Header />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-teal-500 to-teal-600">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-600 mix-blend-multiply" aria-hidden="true"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Our Impact</h1>
          <p className="mt-6 max-w-3xl text-xl text-indigo-100">
            360Nurse is committed to improving healthcare access and outcomes through technology,
            contributing to the United Nations Sustainable Development Goals.
          </p>
        </div>
      </div>

      {/* SDG 3 Section */}
      <div className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8">
              <div className="text-base max-w-prose mx-auto lg:max-w-none">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  SDG 3 – Good Health and Well-Being
                </h2>
                <p className="mt-2 text-xl text-purple-600 font-semibold">
                  "Ensure healthy lives and promote well-being for all at all ages"
                </p>
              </div>
              <div className="mt-5 prose prose-indigo prose-lg text-gray-500 mx-auto lg:max-w-none">
                <p>
                  Our remote monitoring platform directly contributes to SDG 3 by:
                </p>
                <ul>
                  <li>Improving access to timely care, especially in underserved areas where healthcare facilities may be distant or understaffed</li>
                  <li>Reducing preventable deaths through early alerts and efficient triage of medical emergencies</li>
                  <li>Supporting the management of chronic illnesses through continuous monitoring and timely interventions</li>
                  <li>Reducing health inequalities by making quality healthcare more accessible to all</li>
                </ul>
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="relative h-64 w-full rounded-lg shadow-lg overflow-hidden">
                <Image
                  src="/images/sdg3.png"
                  alt="SDG 3 - Good Health and Well-Being"
                  fill
                  className="object-cover"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SDG 17 Section */}
      <div className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 md:pl-8">
              <div className="text-base max-w-prose mx-auto lg:max-w-none">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  SDG 17 – Partnerships for the Goals
                </h2>
                <p className="mt-2 text-xl text-purple-600 font-semibold">
                  "Strengthen the means of implementation and revitalize the global partnership for sustainable development"
                </p>
              </div>
              <div className="mt-5 prose prose-indigo prose-lg text-gray-500 mx-auto lg:max-w-none">
                <p>
                  360Nurse embodies the spirit of SDG 17 by:
                </p>
                <ul>
                  <li>Encouraging collaboration between nurses, technology partners, government agencies, NGOs, and donors</li>
                  <li>Creating a platform that can be scaled through public-private partnerships</li>
                  <li>Developing a solution that can be implemented in various contexts through grant-backed pilots</li>
                  <li>Building technology that connects different stakeholders in the healthcare ecosystem</li>
                </ul>
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="relative h-64 w-full rounded-lg shadow-lg overflow-hidden">
                <Image
                  src="/images/sdg17.png"
                  alt="SDG 17 - Partnerships for the Goals"
                  fill
                  className="object-cover"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Approach Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Our Approach</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Making Healthcare Accessible to All
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We believe that technology can bridge healthcare gaps and improve outcomes for everyone, regardless of location or socioeconomic status.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Remote Monitoring</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Our platform enables healthcare providers to monitor patients remotely, reducing the need for frequent hospital visits and enabling early intervention.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Emergency Alerts</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Timely alerts help healthcare providers respond quickly to emergencies, potentially saving lives in critical situations.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Nurse Consultations</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Our platform connects patients with qualified nurses for consultations, providing professional healthcare advice without the need to visit a facility.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Global Partnerships</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  We work with healthcare providers, technology partners, and community organizations to create a comprehensive healthcare solution that can be deployed globally.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Join us in making healthcare accessible to all</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            Whether you're a healthcare provider, technology partner, or potential user,
            we invite you to be part of our mission to improve healthcare access and outcomes.
          </p>
          <Link
            href="/contact"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-indigo-50 sm:w-auto"
          >
            Contact Us
          </Link>
        </div>
        <Footer />
      </div>
    </div>
  );
}
