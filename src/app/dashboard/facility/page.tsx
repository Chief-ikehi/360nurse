"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

// Mock data for facility
const facilityData = {
  name: "Demo Medical Center",
  address: "123 Healthcare Ave, Medical District",
  phone: "+1 (555) 123-4567",
  email: "info@demomedical.com",
  patientsCount: 248,
  nursesCount: 32,
  activeAlertsCount: 5,
};

// Mock data for nurses
const mockNurses = [
  {
    id: "1",
    name: "Sarah Johnson",
    specialization: "Cardiology",
    patientsCount: 12,
    isVerified: true,
    status: "Active",
  },
  {
    id: "2",
    name: "Michael Chen",
    specialization: "Geriatrics",
    patientsCount: 15,
    isVerified: true,
    status: "Active",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    specialization: "Diabetes Care",
    patientsCount: 10,
    isVerified: true,
    status: "On Leave",
  },
  {
    id: "4",
    name: "David Kim",
    specialization: "Post-Surgery",
    patientsCount: 8,
    isVerified: false,
    status: "Pending Verification",
  },
];

// Mock data for recent alerts
const mockAlerts = [
  {
    id: "1",
    patientName: "Mary Williams",
    nurseAssigned: "Sarah Johnson",
    type: "High Heart Rate",
    status: "DISPATCHED",
    timestamp: new Date(Date.now() - 35 * 60000).toISOString(),
  },
  {
    id: "2",
    patientName: "Jane Smith",
    nurseAssigned: "Michael Chen",
    type: "Low Blood Sugar",
    status: "RESOLVED",
    timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
  },
  {
    id: "3",
    patientName: "Robert Johnson",
    nurseAssigned: "Emily Rodriguez",
    type: "High Temperature",
    status: "ACKNOWLEDGED",
    timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
  },
];

export default function FacilityDashboard() {
  const { data: session } = useSession();
  const [facility] = useState(facilityData);
  const [nurses] = useState(mockNurses);
  const [alerts] = useState(mockAlerts);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 shadow-md overflow-hidden sm:rounded-xl">
        <div className="px-6 py-6 sm:px-8 sm:py-7">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-white p-2 rounded-full">
              <svg className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-xl leading-6 font-bold text-white">
                Facility Dashboard
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-teal-100">
                Welcome back, <span className="font-medium text-white">{session?.user?.name}</span>
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white bg-opacity-20 rounded-lg p-5 text-white">
              <h4 className="text-lg font-semibold text-teal-500 flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {facility.name}
              </h4>
              <div className="mt-3 space-y-2">
                <p className="text-sm text-teal-300 flex items-center">
                  <svg className="h-4 w-4 mr-2 text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {facility.address}
                </p>
                <p className="text-sm text-teal-300 flex items-center">
                  <svg className="h-4 w-4 mr-2 text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {facility.phone}
                </p>
                <p className="text-sm text-teal-300 flex items-center">
                  <svg className="h-4 w-4 mr-2 text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {facility.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white mx-auto mb-2">
                  <svg className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-teal-500">
                  {facility.patientsCount}
                </div>
                <div className="text-sm text-teal-300">Patients</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white mx-auto mb-2">
                  <svg className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-teal-500">
                  {facility.nursesCount}
                </div>
                <div className="text-sm text-teal-300">Nurses</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white mx-auto mb-2">
                  <svg className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-teal-500">
                  {facility.activeAlertsCount}
                </div>
                <div className="text-sm text-teal-300">Active Alerts</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nurse Management */}
      <div className="bg-white shadow-md overflow-hidden sm:rounded-xl border border-gray-200">
        <div className="px-6 py-5 sm:px-8 bg-gradient-to-r from-purple-500 to-purple-600 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-white p-2 rounded-full mr-4">
              <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg leading-6 font-bold text-white">
                Nurse Management
              </h3>
              <p className="mt-1 text-sm text-purple-100">
                Manage your healthcare providers
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/facility/nurses"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-md text-purple-700 bg-white hover:bg-purple-50 transition-all"
          >
            <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View All
          </Link>
        </div>
        <div className="bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nurse
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Specialization
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Patients
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {nurses.map((nurse, index) => (
                  <tr key={nurse.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-purple-50 transition-colors`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                          {nurse.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900">{nurse.name}</span>
                            {nurse.isVerified && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <svg className="h-3 w-3 mr-0.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Verified
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">ID: {nurse.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{nurse.specialization}</div>
                      <div className="text-xs text-gray-500">Healthcare Provider</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <svg className="h-4 w-4 mr-1.5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {nurse.patientsCount}
                      </div>
                      <div className="text-xs text-gray-500">Assigned patients</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          nurse.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : nurse.status === "On Leave"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <span className={`h-2 w-2 rounded-full mr-1.5 mt-1 ${
                          nurse.status === "Active"
                            ? "bg-green-400"
                            : nurse.status === "On Leave"
                            ? "bg-yellow-400"
                            : "bg-gray-400"
                        }`}></span>
                        {nurse.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <Link
                          href={`/dashboard/facility/nurses/${nurse.id}`}
                          className="text-purple-600 hover:text-purple-900 flex items-center"
                        >
                          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View
                        </Link>
                        {!nurse.isVerified && (
                          <button
                            onClick={() => alert("Verification process initiated")}
                            className="text-green-600 hover:text-green-900 flex items-center"
                          >
                            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Verify
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white shadow-md overflow-hidden sm:rounded-xl border border-gray-200">
        <div className="px-6 py-5 sm:px-8 bg-gradient-to-r from-red-500 to-red-600 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-white p-2 rounded-full mr-4">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg leading-6 font-bold text-white">
                Recent Alerts
              </h3>
              <p className="mt-1 text-sm text-red-100">
                Monitor patient health alerts across the facility
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/facility/alerts"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-md text-red-700 bg-white hover:bg-red-50 transition-all"
          >
            <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View All
          </Link>
        </div>
        <div className="bg-white">
          {alerts.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {alerts.map((alert) => (
                <li key={alert.id} className={`px-6 py-5 hover:bg-red-50 transition-colors ${
                  alert.status === "PENDING" ? "border-l-4 border-red-500" :
                  alert.status === "ACKNOWLEDGED" ? "border-l-4 border-blue-500" :
                  alert.status === "DISPATCHED" ? "border-l-4 border-purple-500" :
                  "border-l-4 border-green-500"
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mr-4">
                        {alert.type.includes("Heart") ? (
                          <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                            <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </div>
                        ) : alert.type.includes("Blood") ? (
                          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                          </div>
                        ) : alert.type.includes("Temperature") ? (
                          <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                            <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          </div>
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="text-sm font-semibold text-gray-900">
                            {alert.patientName}
                          </p>
                          <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            alert.status === "PENDING" ? "bg-red-100 text-red-800" :
                            alert.status === "ACKNOWLEDGED" ? "bg-blue-100 text-blue-800" :
                            alert.status === "DISPATCHED" ? "bg-purple-100 text-purple-800" :
                            "bg-green-100 text-green-800"
                          }`}>
                            {alert.status}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {alert.type}
                        </p>
                        <div className="flex items-center mt-1">
                          <p className="text-xs text-gray-500 flex items-center mr-3">
                            <svg className="h-3 w-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            {alert.nurseAssigned}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center">
                            <svg className="h-3 w-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {new Date(alert.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Link
                        href={`/dashboard/facility/alerts/${alert.id}`}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Details
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-6 py-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <p className="mt-2 text-sm font-medium text-gray-900">No recent alerts</p>
              <p className="text-xs text-gray-500">All patient alerts have been addressed</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow-md overflow-hidden sm:rounded-xl border border-gray-200">
        <div className="px-6 py-5 sm:px-8 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center">
          <div className="flex-shrink-0 bg-white p-2 rounded-full mr-4">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg leading-6 font-bold text-white">
              Quick Actions
            </h3>
            <p className="mt-1 text-sm text-blue-100">
              Common facility management tasks
            </p>
          </div>
        </div>
        <div className="p-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Add New Nurse</h4>
              <p className="text-xs text-gray-500 mb-3">Register a new healthcare provider to your facility</p>
              <button
                type="button"
                className="mt-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
                onClick={() => alert("Feature not implemented in demo")}
              >
                <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Nurse
              </button>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                </svg>
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Import Patients</h4>
              <p className="text-xs text-gray-500 mb-3">Bulk import patients from external systems</p>
              <button
                type="button"
                className="mt-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 shadow-sm transition-colors"
                onClick={() => alert("Feature not implemented in demo")}
              >
                <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Import
              </button>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Generate Reports</h4>
              <p className="text-xs text-gray-500 mb-3">Create facility-wide analytics and reports</p>
              <button
                type="button"
                className="mt-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 shadow-sm transition-colors"
                onClick={() => alert("Feature not implemented in demo")}
              >
                <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
