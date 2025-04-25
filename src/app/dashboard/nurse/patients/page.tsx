"use client";

import { useState } from "react";
import Link from "next/link";

// Mock data for patients
const mockPatients = [
  {
    id: "1",
    name: "John Doe",
    age: 65,
    gender: "Male",
    condition: "Hypertension",
    lastChecked: "2 hours ago",
    status: "Stable",
    address: "123 Main St, Anytown, USA",
    phone: "(555) 123-4567",
    email: "john.doe@example.com",
    assignedDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    age: 72,
    gender: "Female",
    condition: "Diabetes",
    lastChecked: "30 minutes ago",
    status: "Needs Attention",
    address: "456 Oak Ave, Somewhere, USA",
    phone: "(555) 987-6543",
    email: "jane.smith@example.com",
    assignedDate: "2023-02-20",
  },
  {
    id: "3",
    name: "Robert Johnson",
    age: 58,
    gender: "Male",
    condition: "Post-Surgery Recovery",
    lastChecked: "1 hour ago",
    status: "Stable",
    address: "789 Pine Rd, Elsewhere, USA",
    phone: "(555) 456-7890",
    email: "robert.johnson@example.com",
    assignedDate: "2023-03-10",
  },
  {
    id: "4",
    name: "Mary Williams",
    age: 81,
    gender: "Female",
    condition: "Chronic Heart Failure",
    lastChecked: "15 minutes ago",
    status: "Critical",
    address: "101 Cedar Ln, Nowhere, USA",
    phone: "(555) 321-0987",
    email: "mary.williams@example.com",
    assignedDate: "2023-01-05",
  },
  {
    id: "5",
    name: "Michael Brown",
    age: 45,
    gender: "Male",
    condition: "Asthma",
    lastChecked: "3 hours ago",
    status: "Stable",
    address: "202 Elm St, Anytown, USA",
    phone: "(555) 789-0123",
    email: "michael.brown@example.com",
    assignedDate: "2023-04-15",
  },
  {
    id: "6",
    name: "Sarah Davis",
    age: 67,
    gender: "Female",
    condition: "Arthritis",
    lastChecked: "1 day ago",
    status: "Stable",
    address: "303 Maple Ave, Somewhere, USA",
    phone: "(555) 234-5678",
    email: "sarah.davis@example.com",
    assignedDate: "2023-02-28",
  },
];

export default function NursePatientsPage() {
  const [patients, setPatients] = useState(mockPatients);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Function to handle emergency dispatch
  const dispatchEmergency = (patientId: string) => {
    alert(`Emergency services dispatched for patient ID: ${patientId}`);
  };

  // Filter patients based on search term and status filter
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || patient.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 shadow-md overflow-hidden sm:rounded-xl">
        <div className="px-6 py-6 sm:px-8">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-white p-2 rounded-full">
              <svg className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-xl leading-6 font-bold text-white">
                My Patients
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-teal-100">
                Manage and monitor your assigned patients
              </p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="bg-white bg-opacity-20 rounded-md px-3 py-2 text-white">
              <div className="text-xs font-medium text-teal-300">Total Patients</div>
              <div className="text-sm font-semibold text-teal-500">{patients.length}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-md px-3 py-2 text-white">
              <div className="text-xs font-medium text-teal-300">Stable</div>
              <div className="text-sm font-semibold text-teal-500">{patients.filter(p => p.status === "Stable").length}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-md px-3 py-2 text-white">
              <div className="text-xs font-medium text-yellow-500">Needs Attention</div>
              <div className="text-sm font-semibold text-yellow-500">{patients.filter(p => p.status === "Needs Attention").length}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-md px-3 py-2 text-white">
              <div className="text-xs font-medium text-red-500">Critical</div>
              <div className="text-sm font-semibold text-red-500">{patients.filter(p => p.status === "Critical").length}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white shadow-md overflow-hidden sm:rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-3 sm:mb-0">
              Patient List
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
                  className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Stable">Stable</option>
                <option value="Needs Attention">Needs Attention</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Patient List */}
        <div className="bg-white">
          {filteredPatients.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Checked
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient, index) => (
                    <tr key={patient.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-teal-50 transition-colors`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold">
                            {patient.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                            <div className="text-xs text-gray-500">ID: {patient.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{patient.age} years, {patient.gender}</div>
                        <div className="text-sm text-gray-500">{patient.condition}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          <span className="inline-flex items-center">
                            <svg className="h-3 w-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {patient.email}
                          </span>
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 flex items-center">
                          <svg className="h-4 w-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {patient.lastChecked}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <Link
                            href={`/dashboard/nurse/patients/${patient.id}`}
                            className="text-teal-600 hover:text-teal-900 flex items-center"
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
          ) : (
            <div className="px-6 py-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="mt-2 text-sm font-medium text-gray-900">No patients found</p>
              <p className="text-xs text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white shadow-md overflow-hidden sm:rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Patient Management
          </h3>
        </div>
        <div className="p-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-colors"
              onClick={() => alert("Feature not implemented in demo")}
            >
              <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Patient
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
              onClick={() => alert("Feature not implemented in demo")}
            >
              <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Patient List
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 shadow-sm transition-colors"
              onClick={() => alert("Feature not implemented in demo")}
            >
              <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule Check-ups
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
