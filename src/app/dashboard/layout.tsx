"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-teal-600 text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Default to PATIENT if role is not specified
  const userRole = session?.user?.role || "PATIENT";
  const userName = session?.user?.name || "User";
  const userEmail = session?.user?.email || "";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-50 to-white">
      {/* Use our custom dashboard header */}
      <DashboardHeader 
        userName={userName}
        userEmail={userEmail}
        userRole={userRole}
      />

      {/* Main content with improved styling */}
      <main className="flex-grow py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Title - This would normally come from each page 
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back, {userName}
            </p>
          </div>
          */}
          
          {/* Content area with subtle shadow and rounded corners */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {children}
          </div>
        </div>
      </main>
      
      {/* Simple footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} 360Nurse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}