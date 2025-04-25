"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function PatientDashboard() {
  const { data: session } = useSession();
  const [vitalSigns, setVitalSigns] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState({
    vitals: true,
    alerts: true,
  });

  // Fetch vital signs from API
  const fetchVitalSigns = async () => {
    try {
      setLoading(prev => ({ ...prev, vitals: true }));
      const response = await fetch("/api/vitals");

      if (!response.ok) {
        throw new Error("Failed to fetch vital signs");
      }

      const data = await response.json();

      if (data && data.length > 0) {
        setVitalSigns(data[0]);
      } else {
        // Generate new vital signs if none exist
        await generateNewVitalSigns();
      }
    } catch (error) {
      console.error("Error fetching vital signs:", error);
      toast.error("Failed to fetch vital signs");
    } finally {
      setLoading(prev => ({ ...prev, vitals: false }));
    }
  };

  // Generate new vital signs
  const generateNewVitalSigns = async () => {
    try {
      const response = await fetch("/api/vitals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error("Failed to generate vital signs");
      }

      const data = await response.json();
      setVitalSigns(data);
    } catch (error) {
      console.error("Error generating vital signs:", error);
      toast.error("Failed to generate vital signs");
    }
  };

  // Fetch alerts from API
  const fetchAlerts = async () => {
    try {
      setLoading(prev => ({ ...prev, alerts: true }));
      const response = await fetch("/api/alerts");

      if (!response.ok) {
        throw new Error("Failed to fetch alerts");
      }

      const data = await response.json();
      setAlerts(data.slice(0, 5)); // Show only the 5 most recent alerts
    } catch (error) {
      console.error("Error fetching alerts:", error);
      toast.error("Failed to fetch alerts");
    } finally {
      setLoading(prev => ({ ...prev, alerts: false }));
    }
  };

  // Initial data fetch
  useEffect(() => {
    if (session) {
      fetchVitalSigns();
      fetchAlerts();
    }
  }, [session]);

  // Refresh vital signs periodically
  useEffect(() => {
    if (!session) return;

    const interval = setInterval(() => {
      generateNewVitalSigns();
    }, 30000); // Generate new vitals every 30 seconds

    return () => clearInterval(interval);
  }, [session]);

  // Create emergency alert
  const createEmergencyAlert = async () => {
    try {
      const response = await fetch("/api/alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: "Emergency SOS - Patient initiated",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create emergency alert");
      }

      toast.success("Emergency alert sent to your nurse!");
      fetchAlerts(); // Refresh alerts
    } catch (error) {
      console.error("Error creating emergency alert:", error);
      toast.error("Failed to send emergency alert");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 shadow-md overflow-hidden sm:rounded-lg">
        <div className="px-6 py-6 sm:px-8 sm:py-7">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-white p-2 rounded-full">
              <svg className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-xl leading-6 font-bold text-white">
                Patient Dashboard
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
              <div className="text-xs font-medium text-teal-300">Last Check</div>
              <div className="text-sm font-semibold text-teal-500">{new Date().toLocaleTimeString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Vital Signs */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Current Vital Signs
          </h3>
          <Link
            href="/dashboard/patient/vitals"
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            View History
          </Link>
        </div>
        <div className="border-t border-gray-200">
          {loading.vitals ? (
            <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : vitalSigns ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-lg shadow-sm border border-teal-200 transition-all hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-teal-700">
                      Blood Pressure
                    </div>
                    <svg className="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="mt-2 text-2xl font-semibold text-gray-900">
                    {vitalSigns.bloodPressure || "N/A"} <span className="text-sm text-teal-600">mmHg</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg shadow-sm border border-purple-200 transition-all hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-purple-700">Heart Rate</div>
                    <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="mt-2 text-2xl font-semibold text-gray-900">
                    {vitalSigns.heartRate || "N/A"} <span className="text-sm text-purple-600">bpm</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg shadow-sm border border-red-200 transition-all hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-red-700">
                      Temperature
                    </div>
                    <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="mt-2 text-2xl font-semibold text-gray-900">
                    {vitalSigns.temperature || "N/A"} <span className="text-sm text-red-600">°C</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm border border-blue-200 transition-all hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-blue-700">
                      Oxygen Level
                    </div>
                    <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div className="mt-2 text-2xl font-semibold text-gray-900">
                    {vitalSigns.oxygenLevel || "N/A"} <span className="text-sm text-blue-600">%</span>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-xs text-gray-500">
                Last updated: {new Date(vitalSigns.recordedAt || Date.now()).toLocaleString()}
              </div>
            </>
          ) : (
            <div className="px-4 py-5 text-center text-sm text-gray-500">
              No vital signs data available
            </div>
          )}
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white shadow-md overflow-hidden sm:rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gradient-to-r from-purple-50 to-purple-100">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Alerts
            </h3>
          </div>
          <Link
            href="/dashboard/patient/alerts"
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-sm"
          >
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View All
          </Link>
        </div>
        <div>
          {loading.alerts ? (
            <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : alerts.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {alerts.map((alert) => (
                <li key={alert.id} className="px-4 py-4 hover:bg-purple-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                        alert.status === "PENDING"
                          ? "bg-yellow-100"
                          : alert.status === "ACKNOWLEDGED"
                          ? "bg-blue-100"
                          : alert.status === "DISPATCHED"
                          ? "bg-purple-100"
                          : "bg-green-100"
                      }`}>
                        <svg className={`h-4 w-4 ${
                          alert.status === "PENDING"
                            ? "text-yellow-600"
                            : alert.status === "ACKNOWLEDGED"
                            ? "text-blue-600"
                            : alert.status === "DISPATCHED"
                            ? "text-purple-600"
                            : "text-green-600"
                        }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {alert.status === "PENDING" ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          ) : alert.status === "ACKNOWLEDGED" ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          ) : alert.status === "DISPATCHED" ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          )}
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {alert.description?.split(' - ')[0] || "Alert"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {alert.description?.split(' - ')[1] || alert.description || "No details"}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${
                          alert.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : alert.status === "ACKNOWLEDGED"
                            ? "bg-blue-100 text-blue-800"
                            : alert.status === "DISPATCHED"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {alert.status}
                      </span>
                      <span className="mt-1 text-xs text-gray-500">
                        {new Date(alert.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <p className="mt-2 text-sm text-gray-500">No recent alerts</p>
              <p className="text-xs text-gray-400">You'll see alerts here when they occur</p>
            </div>
          )}
        </div>
      </div>

      {/* Emergency Button */}
      <div className="bg-gradient-to-r from-red-50 to-red-100 shadow-md overflow-hidden sm:rounded-lg border border-red-200">
        <div className="px-4 py-5 sm:px-6 flex items-center">
          <div className="mr-4 flex-shrink-0">
            <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Emergency Assistance
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-600">
              Press the button below if you need immediate medical assistance
            </p>
          </div>
        </div>
        <div className="border-t border-red-200 p-6 flex flex-col items-center justify-center bg-white">
          <p className="mb-4 text-sm text-gray-500 max-w-md text-center">
            This will alert your assigned healthcare provider and emergency services if needed. Only use in case of a medical emergency.
          </p>
          <button
            type="button"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all transform hover:scale-105"
            onClick={createEmergencyAlert}
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            SOS - Request Emergency Help
          </button>
        </div>
      </div>
    </div>
  );
}
