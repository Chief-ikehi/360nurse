"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      const userRole = session?.user?.role;
      
      // Redirect based on user role
      if (userRole === "PATIENT") {
        router.push("/dashboard/patient");
      } else if (userRole === "NURSE") {
        router.push("/dashboard/nurse");
      } else if (userRole === "FACILITY_ADMIN") {
        router.push("/dashboard/facility");
      }
    }
  }, [status, session, router]);

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Please sign in to access the dashboard</h1>
    </div>
  );
}
