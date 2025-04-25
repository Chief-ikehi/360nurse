"use client";

import { useState } from "react";
import Link from "next/link";

// Mock data for nurses
const mockNurses = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    specialization: "Cardiology",
    patientsCount: 12,
    isVerified: true,
    status: "Active",
    joinDate: "2022-03-15",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "(555) 234-5678",
    specialization: "Geriatrics",
    patientsCount: 15,
    isVerified: true,
    status: "Active",
    joinDate: "2022-05-20",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    phone: "(555) 345-6789",
    specialization: "Diabetes Care",
    patientsCount: 10,
    isVerified: true,
    status: "On Leave",
    joinDate: "2022-01-10",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@example.com",
    phone: "(555) 456-7890",
    specialization: "Post-Surgery",
    patientsCount: 8,
    isVerified: false,
    status: "Pending Verification",
    joinDate: "2023-02-05",
  },
  {
    id: "5",
    name: "Jessica Taylor",
    email: "jessica.taylor@example.com",
    phone: "(555) 567-8901",
    specialization: "Respiratory Care",
    patientsCount: 14,
    isVerified: true,
    status: "Active",
    joinDate: "2022-07-12",
  },
  {
    id: "6",
    name: "Robert Martinez",
    email: "robert.martinez@example.com",
    phone: "(555) 678-9012",
    specialization: "Wound Care",
    patientsCount: 9,
    isVerified: true,
    status: "Active",
    joinDate: "2022-09-30",
  },
];

export default function FacilityNursesPage() {
  const [nurses, setNurses] = useState(mockNurses);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [specializationFilter, setSpecializationFilter] = useState("All");

  // Function to handle nurse verification
  const verifyNurse = (nurseId: string) => {
    setNurses((prevNurses) =>
      prevNurses.map((nurse) =>
        nurse.id === nurseId
          ? { ...nurse, isVerified: true, status: "Active" }
          : nurse
      )
    );
    alert(`Nurse ID: ${nurseId} has been verified`);
  };

  // Get unique specializations for filter
  const specializations = ["All", ...new Set(nurses.map((nurse) => nurse.specialization))];

  // Filter nurses based on search term, status filter, and specialization filter
  const filteredNurses = nurses.filter((nurse) => {
    const matchesSearch = 
      nurse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nurse.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nurse.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || nurse.status === statusFilter;
    const matchesSpecialization = specializationFilter === "All" || nurse.specialization === specializationFilter;
    
    return matchesSearch && matchesStatus && matchesSpecialization;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 shadow-md overflow-hidden sm:rounded-xl">
        <div className="px-6 py-6 sm:px-8">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-white p-2 rounded-full">
              <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-xl leading-6 font-bold text-white">
                Nurse Management
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-purple-100">
                Manage healthcare providers at your facility
              </p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="bg-white bg-opacity-20 rounded-md px-3 py-2 text-white">
              <div className="text-xs font-medium text-purple-500">Total Nurses</div>
              <div className="text-sm font-semibold text-purple-300">{nurses.length}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-md px-3 py-2 text-white">
              <div className="text-xs font-medium text-purple-500">Active</div>
              <div className="text-sm font-semibold text-purple-300">{nurses.filter(n => n.status === "Active").length}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-md px-3 py-2 text-white">
              <div className="text-xs font-medium text-purple-500">On Leave</div>
              <div className="text-sm font-semibold text-purple-300">{nurses.filter(n => n.status === "On Leave").length}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-md px-3 py-2 text-white">
              <div className="text-xs font-medium text-purple-500">Pending Verification</div>
              <div className="text-sm font-semibold text-purple-300">{nurses.filter(n => n.status === "Pending Verification").length}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white shadow-md overflow-hidden sm:rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-3 sm:mb-0">
              Nurse Directory
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
                  className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search nurses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Pending Verification">Pending Verification</option>
              </select>
              <select
                className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                value={specializationFilter}
                onChange={(e) => setSpecializationFilter(e.target.value)}
              >
                {specializations.map((specialization) => (
                  <option key={specialization} value={specialization}>
                    {specialization === "All" ? "All Specializations" : specialization}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Nurses List */}
        <div className="bg-white">
          {filteredNurses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nurse
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Specialization
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patients
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNurses.map((nurse, index) => (
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
                        <div className="text-sm text-gray-900 flex items-center">
                          <svg className="h-4 w-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {nurse.email}
                        </div>
                        <div className="text-sm text-gray-900 flex items-center mt-1">
                          <svg className="h-4 w-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {nurse.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{nurse.specialization}</div>
                        <div className="text-xs text-gray-500">Since {new Date(nurse.joinDate).toLocaleDateString()}</div>
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
                              onClick={() => verifyNurse(nurse.id)}
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
          ) : (
            <div className="px-6 py-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <p className="mt-2 text-sm font-medium text-gray-900">No nurses found</p>
              <p className="text-xs text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white shadow-md overflow-hidden sm:rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Nurse Management Actions
          </h3>
        </div>
        <div className="p-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 shadow-sm transition-colors"
              onClick={() => alert("Feature not implemented in demo")}
            >
              <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Add New Nurse
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
              onClick={() => alert("Feature not implemented in demo")}
            >
              <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Manage Schedules
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 shadow-sm transition-colors"
              onClick={() => alert("Feature not implemented in demo")}
            >
              <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Nurse List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
