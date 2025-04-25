"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import FeatureGuard from "@/components/FeatureGuard";

export default function AlertsHistoryPage() {
  const { data: session } = useSession();
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, acknowledged, dispatched, resolved

  // Fetch alerts from API
  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/alerts${filter !== "all" ? `?status=${filter.toUpperCase()}` : ""}`);

      if (!response.ok) {
        throw new Error("Failed to fetch alerts");
      }

      const data = await response.json();

      // Sort by created time (newest first)
      const sortedData = data.sort((a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setAlerts(sortedData);
    } catch (error) {
      console.error("Error fetching alerts:", error);
      toast.error("Failed to fetch alerts");
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    if (session) {
      fetchAlerts();
    }
  }, [session, filter]);

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
      fetchAlerts();
    } catch (error) {
      console.error("Error creating emergency alert:", error);
      toast.error("Failed to send emergency alert");
    }
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "ACKNOWLEDGED":
        return "bg-blue-100 text-blue-800";
      case "DISPATCHED":
        return "bg-purple-100 text-purple-800";
      case "RESOLVED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <FeatureGuard feature="health_alerts">
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 shadow-md overflow-hidden sm:rounded-lg">
        <div className="px-6 py-6 sm:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-white p-2 rounded-full mr-4">
              <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl leading-6 font-bold text-white">
                Alerts History
              </h3>
              <p className="mt-1 text-sm text-purple-100">
                Track and manage your emergency alerts
              </p>
            </div>
          </div>
          <button
            onClick={createEmergencyAlert}
            className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-full shadow-md text-white bg-red-600 hover:bg-red-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-purple-600"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Create Emergency Alert
          </button>
        </div>
        <div className="border-t border-purple-400 bg-white px-6 py-6">
          {/* Filter Controls */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <svg className="h-4 w-4 mr-1.5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter by Status
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                  filter === "all"
                    ? "bg-purple-500 text-white shadow-sm"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                All Alerts
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all flex items-center ${
                  filter === "pending"
                    ? "bg-yellow-500 text-white shadow-sm"
                    : "bg-yellow-50 text-yellow-800 hover:bg-yellow-100 border border-yellow-200"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-yellow-400 mr-1.5"></span>
                Pending
              </button>
              <button
                onClick={() => setFilter("acknowledged")}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all flex items-center ${
                  filter === "acknowledged"
                    ? "bg-blue-500 text-white shadow-sm"
                    : "bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-blue-400 mr-1.5"></span>
                Acknowledged
              </button>
              <button
                onClick={() => setFilter("dispatched")}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all flex items-center ${
                  filter === "dispatched"
                    ? "bg-purple-500 text-white shadow-sm"
                    : "bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-purple-400 mr-1.5"></span>
                Dispatched
              </button>
              <button
                onClick={() => setFilter("resolved")}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all flex items-center ${
                  filter === "resolved"
                    ? "bg-green-500 text-white shadow-sm"
                    : "bg-green-50 text-green-800 hover:bg-green-100 border border-green-200"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-green-400 mr-1.5"></span>
                Resolved
              </button>
            </div>
          </div>

          {/* Alerts List */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : alerts.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
              <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No alerts found</h3>
              <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                {filter !== "all"
                  ? `No alerts with "${filter}" status found. Try changing the filter or create a new alert.`
                  : `You don't have any alerts yet. Create an emergency alert if you need assistance.`}
              </p>
              <button
                onClick={createEmergencyAlert}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
              >
                <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Create New Alert
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className={`h-2 ${
                    alert.status === "PENDING" ? "bg-yellow-400" :
                    alert.status === "ACKNOWLEDGED" ? "bg-blue-400" :
                    alert.status === "DISPATCHED" ? "bg-purple-400" :
                    "bg-green-400"
                  }`}></div>
                  <div className="px-6 py-5 flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {alert.description?.split(" - ")[0] || "Alert"}
                        </h4>
                        <span
                          className={`ml-2 px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(
                            alert.status
                          )}`}
                        >
                          {alert.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {alert.description?.split(" - ")[1] || alert.description || "No details provided"}
                      </p>
                      <div className="mt-3 flex items-center text-xs text-gray-500">
                        <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Created: {new Date(alert.createdAt).toLocaleString()}
                      </div>
                      {alert.resolvedAt && (
                        <div className="mt-1 flex items-center text-xs text-gray-500">
                          <svg className="h-4 w-4 mr-1 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Resolved: {new Date(alert.resolvedAt).toLocaleString()}
                        </div>
                      )}
                    </div>
                    {alert.nurse && (
                      <div className="bg-gray-50 px-4 py-3 rounded-lg">
                        <div className="text-xs font-medium text-gray-500 mb-1">
                          Assigned Nurse
                        </div>
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium mr-2">
                            {alert.nurse.user?.name?.charAt(0) || "N"}
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {alert.nurse.user?.name || "Unknown"}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {alert.emergencyService && (
                    <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <div>
                          <span className="font-medium text-gray-900">{alert.emergencyService.name}</span>
                          {alert.emergencyService.phone && (
                            <span className="ml-2 text-gray-500 text-sm">
                              {alert.emergencyService.phone}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {alert.status === "PENDING" && (
                    <div className="border-t border-gray-200 px-6 py-4 bg-yellow-50">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium text-yellow-800">
                          Waiting for nurse acknowledgment
                        </span>
                      </div>
                    </div>
                  )}
                  {alert.status === "ACKNOWLEDGED" && (
                    <div className="border-t border-gray-200 px-6 py-4 bg-blue-50">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium text-blue-800">
                          Your nurse has acknowledged this alert and is reviewing it
                        </span>
                      </div>
                    </div>
                  )}
                  {alert.status === "DISPATCHED" && (
                    <div className="border-t border-gray-200 px-6 py-4 bg-purple-50">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-sm font-medium text-purple-800">
                          Emergency services have been dispatched to your location
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Emergency Information */}
      <div className="bg-white shadow-md overflow-hidden sm:rounded-xl border border-gray-200">
        <div className="px-6 py-5 bg-gradient-to-r from-red-500 to-red-600 sm:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg leading-6 font-bold text-white">
                Emergency Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-red-100">
                What to expect when you create an emergency alert
              </p>
            </div>
            <div className="flex-shrink-0 bg-white p-2 rounded-full">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="px-6 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <svg className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-base font-semibold text-gray-900">Alert Process</h4>
              </div>
              <ol className="list-none text-sm text-gray-600 space-y-3 pl-2">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-2 text-xs font-bold">1</span>
                  <span>You create an emergency alert</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-2 text-xs font-bold">2</span>
                  <span>Your assigned nurse receives an immediate notification</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-2 text-xs font-bold">3</span>
                  <span>The nurse acknowledges the alert and assesses the situation</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-2 text-xs font-bold">4</span>
                  <span>If needed, emergency services are dispatched to your location</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-2 text-xs font-bold">5</span>
                  <span>The alert is resolved once you receive appropriate care</span>
                </li>
              </ol>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <svg className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h4 className="text-base font-semibold text-gray-900">When to Create an Alert</h4>
              </div>
              <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <li className="flex items-center bg-white p-2 rounded-lg border border-gray-100">
                  <svg className="h-4 w-4 text-red-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Severe symptoms
                </li>
                <li className="flex items-center bg-white p-2 rounded-lg border border-gray-100">
                  <svg className="h-4 w-4 text-red-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Vital sign changes
                </li>
                <li className="flex items-center bg-white p-2 rounded-lg border border-gray-100">
                  <svg className="h-4 w-4 text-red-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Fall or injury
                </li>
                <li className="flex items-center bg-white p-2 rounded-lg border border-gray-100">
                  <svg className="h-4 w-4 text-red-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Breathing issues
                </li>
                <li className="flex items-center bg-white p-2 rounded-lg border border-gray-100">
                  <svg className="h-4 w-4 text-red-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Severe pain
                </li>
                <li className="flex items-center bg-white p-2 rounded-lg border border-gray-100">
                  <svg className="h-4 w-4 text-red-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Medical emergency
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 bg-red-50 p-5 rounded-xl border border-red-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-red-800">Important Note</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>
                    This is a demonstration system. In a real emergency, always call your local emergency number (e.g., 911 in the US) directly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </FeatureGuard>
  );
}
