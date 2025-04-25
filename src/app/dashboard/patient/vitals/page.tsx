"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import toast from "react-hot-toast";
import FeatureGuard from "@/components/FeatureGuard";

export default function VitalsHistoryPage() {
  const { data: session } = useSession();
  const [vitalRecords, setVitalRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("24h"); // 24h, 7d, 30d, all
  const [chartType, setChartType] = useState("all"); // all, heartRate, bloodPressure, temperature, oxygenLevel

  // Fetch vital records from API
  const fetchVitalRecords = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/vitals?range=${timeRange}`);

      if (!response.ok) {
        throw new Error("Failed to fetch vital records");
      }

      const data = await response.json();

      // Sort by recorded time
      const sortedData = data.sort((a: any, b: any) =>
        new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime()
      );

      // Process data for charts
      const processedData = sortedData.map((record: any) => {
        // Extract systolic and diastolic from blood pressure string (e.g., "120/80")
        let systolic = null;
        let diastolic = null;

        if (record.bloodPressure) {
          const bpParts = record.bloodPressure.split('/');
          if (bpParts.length === 2) {
            systolic = parseInt(bpParts[0], 10);
            diastolic = parseInt(bpParts[1], 10);
          }
        }

        return {
          ...record,
          systolic,
          diastolic,
          recordedTime: new Date(record.recordedAt).toLocaleTimeString(),
          recordedDate: new Date(record.recordedAt).toLocaleDateString(),
          formattedTime: formatTime(record.recordedAt),
        };
      });

      setVitalRecords(processedData);
    } catch (error) {
      console.error("Error fetching vital records:", error);
      toast.error("Failed to fetch vital records");
    } finally {
      setLoading(false);
    }
  };

  // Format time for chart display
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);

    if (timeRange === "24h") {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (timeRange === "7d" || timeRange === "30d") {
      return `${date.getMonth() + 1}/${date.getDate()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().substr(-2)}`;
    }
  };

  // Initial data fetch
  useEffect(() => {
    if (session) {
      fetchVitalRecords();
    }
  }, [session, timeRange]);

  // Generate a new vital record for testing
  const generateNewVitalRecord = async () => {
    try {
      const response = await fetch("/api/vitals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error("Failed to generate vital record");
      }

      toast.success("New vital record generated");
      fetchVitalRecords();
    } catch (error) {
      console.error("Error generating vital record:", error);
      toast.error("Failed to generate vital record");
    }
  };

  return (
    <FeatureGuard feature="vital_signs_monitoring">
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 shadow-md overflow-hidden sm:rounded-lg">
        <div className="px-6 py-6 sm:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-white p-2 rounded-full mr-4">
              <svg className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl leading-6 font-bold text-white">
                Vital Signs History
              </h3>
              <p className="mt-1 text-sm text-teal-100">
                Track your health metrics over time
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={generateNewVitalRecord}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-teal-700 bg-white hover:bg-teal-50 transition-all duration-200"
            >
              <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Generate New Reading
            </button>
          </div>
        </div>
        <div className="bg-white border-t border-teal-100 px-6 py-6">
          {/* Filter Controls in a Card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Time Range Selector */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <svg className="h-4 w-4 mr-1.5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Time Range
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setTimeRange("24h")}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                      timeRange === "24h"
                        ? "bg-teal-500 text-white shadow-sm"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    24 Hours
                  </button>
                  <button
                    onClick={() => setTimeRange("7d")}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                      timeRange === "7d"
                        ? "bg-teal-500 text-white shadow-sm"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    7 Days
                  </button>
                  <button
                    onClick={() => setTimeRange("30d")}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                      timeRange === "30d"
                        ? "bg-teal-500 text-white shadow-sm"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    30 Days
                  </button>
                  <button
                    onClick={() => setTimeRange("all")}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                      timeRange === "all"
                        ? "bg-teal-500 text-white shadow-sm"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    All Time
                  </button>
                </div>
              </div>

              {/* Chart Type Selector */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <svg className="h-4 w-4 mr-1.5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                  Chart Type
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setChartType("all")}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                      chartType === "all"
                        ? "bg-purple-500 text-white shadow-sm"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    All Vitals
                  </button>
                  <button
                    onClick={() => setChartType("heartRate")}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                      chartType === "heartRate"
                        ? "bg-purple-500 text-white shadow-sm"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    Heart Rate
                  </button>
                  <button
                    onClick={() => setChartType("bloodPressure")}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                      chartType === "bloodPressure"
                        ? "bg-purple-500 text-white shadow-sm"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    Blood Pressure
                  </button>
                  <button
                    onClick={() => setChartType("temperature")}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                      chartType === "temperature"
                        ? "bg-purple-500 text-white shadow-sm"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    Temperature
                  </button>
                  <button
                    onClick={() => setChartType("oxygenLevel")}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                      chartType === "oxygenLevel"
                        ? "bg-purple-500 text-white shadow-sm"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    Oxygen Level
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : vitalRecords.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No vital records available</p>
              <button
                onClick={generateNewVitalRecord}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600"
              >
                Generate Sample Data
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Heart Rate Chart */}
              {(chartType === "all" || chartType === "heartRate") && (
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <svg className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">Heart Rate</h4>
                    </div>
                    <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      Normal range: 60-100 bpm
                    </div>
                  </div>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={vitalRecords}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="formattedTime"
                          tick={{ fontSize: 12 }}
                          stroke="#888"
                        />
                        <YAxis
                          domain={[40, 180]}
                          label={{
                            value: 'bpm',
                            angle: -90,
                            position: 'insideLeft',
                            style: { textAnchor: 'middle', fill: '#888' }
                          }}
                          stroke="#888"
                        />
                        <Tooltip
                          formatter={(value) => [`${value} bpm`, 'Heart Rate']}
                          labelFormatter={(label) => `Time: ${label}`}
                          contentStyle={{ borderRadius: '8px', border: '1px solid #eee' }}
                        />
                        <Legend iconType="circle" />
                        <Line
                          type="monotone"
                          dataKey="heartRate"
                          stroke="#9333ea"
                          strokeWidth={2}
                          dot={{ r: 4, strokeWidth: 2 }}
                          activeDot={{ r: 8, stroke: '#9333ea', strokeWidth: 2 }}
                          name="Heart Rate"
                        />
                        {/* Reference areas for normal range */}
                        <svg>
                          <defs>
                            <linearGradient id="heartRateGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#9333ea" stopOpacity={0.1} />
                              <stop offset="100%" stopColor="#9333ea" stopOpacity={0.01} />
                            </linearGradient>
                          </defs>
                        </svg>
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Blood Pressure Chart */}
              {(chartType === "all" || chartType === "bloodPressure") && (
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Blood Pressure</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={vitalRecords}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="formattedTime"
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis
                          domain={[40, 200]}
                          label={{
                            value: 'mmHg',
                            angle: -90,
                            position: 'insideLeft',
                            style: { textAnchor: 'middle' }
                          }}
                        />
                        <Tooltip
                          formatter={(value) => [`${value} mmHg`, '']}
                          labelFormatter={(label) => `Time: ${label}`}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="systolic"
                          stroke="#00af9b"
                          name="Systolic"
                        />
                        <Line
                          type="monotone"
                          dataKey="diastolic"
                          stroke="#7d2ecc"
                          name="Diastolic"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Temperature Chart */}
              {(chartType === "all" || chartType === "temperature") && (
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Temperature</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={vitalRecords}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="formattedTime"
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis
                          domain={[35, 40]}
                          label={{
                            value: '°C',
                            angle: -90,
                            position: 'insideLeft',
                            style: { textAnchor: 'middle' }
                          }}
                        />
                        <Tooltip
                          formatter={(value) => [`${value}°C`, 'Temperature']}
                          labelFormatter={(label) => `Time: ${label}`}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="temperature"
                          stroke="#00af9b"
                          activeDot={{ r: 8 }}
                          name="Temperature"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Oxygen Level Chart */}
              {(chartType === "all" || chartType === "oxygenLevel") && (
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Oxygen Level</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={vitalRecords}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="formattedTime"
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis
                          domain={[90, 100]}
                          label={{
                            value: '%',
                            angle: -90,
                            position: 'insideLeft',
                            style: { textAnchor: 'middle' }
                          }}
                        />
                        <Tooltip
                          formatter={(value) => [`${value}%`, 'Oxygen Level']}
                          labelFormatter={(label) => `Time: ${label}`}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="oxygenLevel"
                          stroke="#00af9b"
                          activeDot={{ r: 8 }}
                          name="Oxygen Level"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white shadow-md overflow-hidden sm:rounded-xl border border-gray-200">
        <div className="px-6 py-5 bg-gradient-to-r from-teal-500 to-teal-600 sm:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg leading-6 font-bold text-white">
                Vital Records History
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-teal-100">
                Detailed history of your vital sign measurements
              </p>
            </div>
            <div className="flex-shrink-0 bg-white p-2 rounded-full">
              <svg className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
          </div>
        </div>
        <div>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          ) : vitalRecords.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="mt-2 text-gray-500">No records available</p>
              <button
                onClick={generateNewVitalRecord}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
              >
                Generate Sample Data
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date & Time
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Heart Rate
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Blood Pressure
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Temperature
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Oxygen Level
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vitalRecords.map((record, index) => (
                    <tr
                      key={record.id || index}
                      className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-teal-50 transition-colors`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{new Date(record.recordedAt).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-500">{new Date(record.recordedAt).toLocaleTimeString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {record.heartRate ? (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            record.heartRate > 100 ? 'bg-red-100 text-red-800' :
                            record.heartRate < 60 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {record.heartRate} bpm
                          </span>
                        ) : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.bloodPressure || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {record.temperature ? (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            record.temperature > 37.5 ? 'bg-red-100 text-red-800' :
                            record.temperature < 36 ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {record.temperature}°C
                          </span>
                        ) : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {record.oxygenLevel ? (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            record.oxygenLevel < 95 ? 'bg-red-100 text-red-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {record.oxygenLevel}%
                          </span>
                        ) : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
    </FeatureGuard>
  );
}
