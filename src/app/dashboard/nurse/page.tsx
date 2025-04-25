"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";

// Mock data for patients
const mockPatients = [
  {
    id: "1",
    name: "John Doe",
    age: 65,
    condition: "Hypertension",
    lastChecked: "2 hours ago",
    status: "Stable",
  },
  {
    id: "2",
    name: "Jane Smith",
    age: 72,
    condition: "Diabetes",
    lastChecked: "30 minutes ago",
    status: "Needs Attention",
  },
  {
    id: "3",
    name: "Robert Johnson",
    age: 58,
    condition: "Post-Surgery Recovery",
    lastChecked: "1 hour ago",
    status: "Stable",
  },
  {
    id: "4",
    name: "Mary Williams",
    age: 81,
    condition: "Chronic Heart Failure",
    lastChecked: "15 minutes ago",
    status: "Critical",
  },
];

// Mock data for alerts
const mockAlerts = [
  {
    id: "1",
    patientName: "Mary Williams",
    patientId: "4",
    type: "High Heart Rate",
    value: "120 bpm",
    status: "PENDING",
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
  },
  {
    id: "2",
    patientName: "Jane Smith",
    patientId: "2",
    type: "Low Blood Sugar",
    value: "65 mg/dL",
    status: "ACKNOWLEDGED",
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
  },
  {
    id: "3",
    patientName: "Mary Williams",
    patientId: "4",
    type: "Low Oxygen Level",
    value: "92%",
    status: "PENDING",
    timestamp: new Date(Date.now() - 10 * 60000).toISOString(),
  },
];

export default function NurseDashboard() {
  const { data: session } = useSession();
  const [patients, setPatients] = useState(mockPatients);
  const [alerts, setAlerts] = useState(mockAlerts);

  // Function to handle alert acknowledgement
  const acknowledgeAlert = (alertId: string) => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === alertId
          ? { ...alert, status: "ACKNOWLEDGED" }
          : alert
      )
    );
  };

  // Function to handle emergency dispatch
  const dispatchEmergency = (patientId: string) => {
    alert(`Emergency services dispatched for patient ID: ${patientId}`);
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.patientId === patientId
          ? { ...alert, status: "DISPATCHED" }
          : alert
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 shadow-md overflow-hidden sm:rounded-lg">
        <div className="px-6 py-6 sm:px-8 sm:py-7">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-white p-2 rounded-full">
              <svg className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-xl leading-6 font-bold text-white">
                Nurse Dashboard
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-teal-100">
                Welcome back, <span className="font-medium text-white">{session?.user?.name}</span>
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="bg-white bg-opacity-20 rounded-md px-3 py-2 text-white">
              <div className="text-xs font-medium text-teal-300">Today's Date</div>
              <div className="text-sm font-semibold text-teal-500">{new Date().toLocaleDateString()}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-md px-3 py-2 text-white">
              <div className="text-xs font-medium text-teal-300">Patients</div>
              <div className="text-sm font-semibold text-teal-500">{patients.length}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-md px-3 py-2 text-white">
              <div className="text-xs font-medium text-teal-300">Active Alerts</div>
              <div className="text-sm font-semibold text-red-500">{alerts.filter(a => a.status === "PENDING").length}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-md px-3 py-2 text-white">
              <div className="text-xs font-medium text-teal-300">Critical Patients</div>
              <div className="text-sm font-semibold text-red-500">{patients.filter(p => p.status === "Critical").length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
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
                Active Alerts
              </h3>
              <p className="mt-1 text-sm text-red-100">
                Alerts requiring your immediate attention
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/nurse/alerts"
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
          {alerts.filter((alert) => alert.status === "PENDING").length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {alerts
                .filter((alert) => alert.status === "PENDING")
                .map((alert) => (
                  <li key={alert.id} className="px-6 py-5 hover:bg-red-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
                          {alert.type.includes("Heart") ? (
                            <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          ) : alert.type.includes("Oxygen") ? (
                            <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                          ) : (
                            <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <p className="text-sm font-semibold text-gray-900">
                              {alert.patientName}
                            </p>
                            <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              {alert.status}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            {alert.type}: <span className="text-red-600">{alert.value}</span>
                          </p>
                          <p className="text-xs text-gray-500 mt-1 flex items-center">
                            <svg className="h-3 w-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {new Date(alert.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
                        >
                          <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Acknowledge
                        </button>
                        <button
                          onClick={() => dispatchEmergency(alert.patientId)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 transition-colors"
                        >
                          <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Dispatch Emergency
                        </button>
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
              <p className="mt-2 text-sm font-medium text-gray-900">No active alerts</p>
              <p className="text-xs text-gray-500">All patient alerts have been addressed</p>
            </div>
          )}
        </div>
      </div>

      {/* Patient List */}
      <div className="bg-white shadow-md overflow-hidden sm:rounded-xl border border-gray-200">
        <div className="px-6 py-5 sm:px-8 bg-gradient-to-r from-purple-500 to-purple-600 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-white p-2 rounded-full mr-4">
              <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg leading-6 font-bold text-white">
                Your Patients
              </h3>
              <p className="mt-1 text-sm text-purple-100">
                Patients under your care
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/nurse/patients"
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
                    Patient
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Age
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Condition
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Last Checked
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
                {patients.map((patient, index) => (
                  <tr key={patient.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-purple-50 transition-colors`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                          {patient.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                          <div className="text-xs text-gray-500">ID: {patient.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{patient.age}</div>
                      <div className="text-xs text-gray-500">years</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{patient.condition}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 flex items-center">
                        <svg className="h-4 w-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {patient.lastChecked}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          patient.status === "Stable"
                            ? "bg-green-100 text-green-800"
                            : patient.status === "Needs Attention"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        <span className={`h-2 w-2 rounded-full mr-1.5 mt-1 ${
                          patient.status === "Stable"
                            ? "bg-green-400"
                            : patient.status === "Needs Attention"
                            ? "bg-yellow-400"
                            : "bg-red-400"
                        }`}></span>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <Link
                          href={`/dashboard/nurse/patients/${patient.id}`}
                          className="text-purple-600 hover:text-purple-900 flex items-center"
                        >
                          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View
                        </Link>
                        <button
                          onClick={() => dispatchEmergency(patient.id)}
                          className="text-red-600 hover:text-red-900 flex items-center"
                        >
                          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          Emergency
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
              Common tasks you can perform
            </p>
          </div>
        </div>
        <div className="p-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Add New Patient</h4>
              <p className="text-xs text-gray-500 mb-3">Register a new patient to your care list</p>
              <button
                type="button"
                className="mt-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
                onClick={() => alert("Feature not implemented in demo")}
              >
                <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Patient
              </button>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Schedule Check-up</h4>
              <p className="text-xs text-gray-500 mb-3">Plan a routine check-up for your patients</p>
              <button
                type="button"
                className="mt-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 shadow-sm transition-colors"
                onClick={() => alert("Feature not implemented in demo")}
              >
                <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Schedule
              </button>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Generate Report</h4>
              <p className="text-xs text-gray-500 mb-3">Create a detailed health report for patients</p>
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
