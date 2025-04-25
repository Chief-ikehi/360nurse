"use client";

import { useState } from "react";
import Link from "next/link";

// Mock data for alerts
const mockAlerts = [
  {
    id: "1",
    patientId: "4",
    patientName: "Mary Williams",
    type: "High Heart Rate",
    value: "120 bpm",
    status: "PENDING",
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    priority: "High",
  },
  {
    id: "2",
    patientId: "2",
    patientName: "Jane Smith",
    type: "Low Blood Sugar",
    value: "65 mg/dL",
    status: "ACKNOWLEDGED",
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    priority: "Medium",
  },
  {
    id: "3",
    patientId: "4",
    patientName: "Mary Williams",
    type: "Low Oxygen Level",
    value: "92%",
    status: "PENDING",
    timestamp: new Date(Date.now() - 10 * 60000).toISOString(),
    priority: "High",
  },
  {
    id: "4",
    patientId: "1",
    patientName: "John Doe",
    type: "High Blood Pressure",
    value: "160/95 mmHg",
    status: "RESOLVED",
    timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
    priority: "Medium",
  },
  {
    id: "5",
    patientId: "3",
    patientName: "Robert Johnson",
    type: "Elevated Temperature",
    value: "100.4°F",
    status: "ACKNOWLEDGED",
    timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
    priority: "Low",
  },
  {
    id: "6",
    patientId: "5",
    patientName: "Michael Brown",
    type: "Missed Medication",
    value: "Albuterol",
    status: "RESOLVED",
    timestamp: new Date(Date.now() - 180 * 60000).toISOString(),
    priority: "Medium",
  },
  {
    id: "7",
    patientId: "6",
    patientName: "Sarah Davis",
    type: "Fall Detected",
    value: "Bathroom",
    status: "DISPATCHED",
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
    priority: "High",
  },
];

export default function NurseAlertsPage() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

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
        alert.patientId === patientId && alert.status === "PENDING"
          ? { ...alert, status: "DISPATCHED" }
          : alert
      )
    );
  };

  // Function to handle resolving an alert
  const resolveAlert = (alertId: string) => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === alertId
          ? { ...alert, status: "RESOLVED" }
          : alert
      )
    );
  };

  // Filter alerts based on search term, status filter, and priority filter
  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || alert.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || alert.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 shadow-md overflow-hidden sm:rounded-xl">
        <div className="px-6 py-6 sm:px-8">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-white p-2 rounded-full">
              <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-xl leading-6 font-bold text-white">
                Patient Alerts
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-red-100">
                Monitor and respond to patient health alerts
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="bg-white bg-opacity-20 rounded-md px-3 py-2 text-white">
              <div className="text-xs font-medium text-red-300">Total Alerts</div>
              <div className="text-sm font-semibold text-red-500">{alerts.length}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-md px-3 py-2 text-white">
              <div className="text-xs font-medium text-red-300">Pending</div>
              <div className="text-sm font-semibold text-red-500">{alerts.filter(a => a.status === "PENDING").length}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-md px-3 py-2 text-white">
              <div className="text-xs font-medium text-red-300">Acknowledged</div>
              <div className="text-sm font-semibold text-red-500">{alerts.filter(a => a.status === "ACKNOWLEDGED").length}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-md px-3 py-2 text-white">
              <div className="text-xs font-medium text-red-300">Resolved</div>
              <div className="text-sm font-semibold text-red-500">{alerts.filter(a => a.status === "RESOLVED").length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-md overflow-hidden sm:rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-3 sm:mb-0">
              Alert Management
            </h3>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="focus:ring-red-500 focus:border-red-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="ACKNOWLEDGED">Acknowledged</option>
                <option value="DISPATCHED">Dispatched</option>
                <option value="RESOLVED">Resolved</option>
              </select>
              <select
                className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="All">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="bg-white">
          {filteredAlerts.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {filteredAlerts.map((alert) => (
                <li key={alert.id} className={`px-6 py-5 hover:bg-gray-50 transition-colors ${
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
                        ) : alert.type.includes("Oxygen") ? (
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                          </div>
                        ) : alert.type.includes("Blood Pressure") ? (
                          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                        ) : alert.type.includes("Temperature") ? (
                          <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                            <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          </div>
                        ) : alert.type.includes("Fall") ? (
                          <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                            <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
                          <Link href={`/dashboard/nurse/patients/${alert.patientId}`} className="text-sm font-semibold text-gray-900 hover:text-red-600">
                            {alert.patientName}
                          </Link>
                          <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            alert.priority === "High" ? "bg-red-100 text-red-800" :
                            alert.priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
                            "bg-green-100 text-green-800"
                          }`}>
                            {alert.priority}
                          </span>
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
                      {alert.status === "PENDING" && (
                        <>
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
                            Dispatch
                          </button>
                        </>
                      )}
                      {alert.status === "ACKNOWLEDGED" && (
                        <>
                          <button
                            onClick={() => resolveAlert(alert.id)}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-green-700 bg-green-100 hover:bg-green-200 transition-colors"
                          >
                            <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Resolve
                          </button>
                          <button
                            onClick={() => dispatchEmergency(alert.patientId)}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 transition-colors"
                          >
                            <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Dispatch
                          </button>
                        </>
                      )}
                      {(alert.status === "DISPATCHED" || alert.status === "RESOLVED") && (
                        <Link
                          href={`/dashboard/nurse/patients/${alert.patientId}`}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-teal-700 bg-teal-100 hover:bg-teal-200 transition-colors"
                        >
                          <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View Patient
                        </Link>
                      )}
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
              <p className="mt-2 text-sm font-medium text-gray-900">No alerts found</p>
              <p className="text-xs text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow-md overflow-hidden sm:rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Alert Management Actions
          </h3>
        </div>
        <div className="p-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
              onClick={() => {
                const pendingAlerts = alerts.filter(a => a.status === "PENDING");
                if (pendingAlerts.length > 0) {
                  pendingAlerts.forEach(alert => acknowledgeAlert(alert.id));
                  alert(`Acknowledged ${pendingAlerts.length} pending alerts`);
                } else {
                  alert("No pending alerts to acknowledge");
                }
              }}
            >
              <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Acknowledge All Pending
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 shadow-sm transition-colors"
              onClick={() => {
                const acknowledgedAlerts = alerts.filter(a => a.status === "ACKNOWLEDGED");
                if (acknowledgedAlerts.length > 0) {
                  acknowledgedAlerts.forEach(alert => resolveAlert(alert.id));
                  alert(`Resolved ${acknowledgedAlerts.length} acknowledged alerts`);
                } else {
                  alert("No acknowledged alerts to resolve");
                }
              }}
            >
              <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Resolve All Acknowledged
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 shadow-sm transition-colors"
              onClick={() => alert("Feature not implemented in demo")}
            >
              <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Generate Alert Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
