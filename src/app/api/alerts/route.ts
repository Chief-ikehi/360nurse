import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

// GET handler to retrieve alerts
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const patientId = url.searchParams.get("patientId");

    let alerts;

    // Filter alerts based on user role
    if (session.user.role === "PATIENT") {
      // Patients can only see their own alerts
      const patient = await prisma.patient.findUnique({
        where: { userId: session.user.id },
      });

      if (!patient) {
        return NextResponse.json(
          { message: "Patient record not found" },
          { status: 404 }
        );
      }

      alerts = await prisma.emergencyAlert.findMany({
        where: {
          patientId: patient.id,
          ...(status ? { status: status as any } : {}),
        },
        orderBy: { createdAt: "desc" },
        include: {
          nurse: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
          emergencyService: true,
        },
      });
    } else if (session.user.role === "NURSE") {
      // Nurses can see alerts for their assigned patients
      const nurse = await prisma.nurse.findUnique({
        where: { userId: session.user.id },
      });

      if (!nurse) {
        return NextResponse.json(
          { message: "Nurse record not found" },
          { status: 404 }
        );
      }

      alerts = await prisma.emergencyAlert.findMany({
        where: {
          nurseId: nurse.id,
          ...(patientId ? { patientId } : {}),
          ...(status ? { status: status as any } : {}),
        },
        orderBy: { createdAt: "desc" },
        include: {
          patient: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
          emergencyService: true,
        },
      });
    } else if (session.user.role === "FACILITY_ADMIN" || session.user.role === "ADMIN") {
      // Facility admins and admins can see all alerts
      alerts = await prisma.emergencyAlert.findMany({
        where: {
          ...(patientId ? { patientId } : {}),
          ...(status ? { status: status as any } : {}),
        },
        orderBy: { createdAt: "desc" },
        include: {
          patient: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
          nurse: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
          emergencyService: true,
        },
      });
    } else {
      return NextResponse.json(
        { message: "Unauthorized to access alerts" },
        { status: 403 }
      );
    }

    return NextResponse.json(alerts, { status: 200 });
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching alerts" },
      { status: 500 }
    );
  }
}

// POST handler to create a new alert
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { patientId, description, location } = body;

    // Validate required fields
    if (!patientId) {
      return NextResponse.json(
        { message: "Patient ID is required" },
        { status: 400 }
      );
    }

    // If the user is a patient, verify they are creating an alert for themselves
    if (session.user.role === "PATIENT") {
      const patient = await prisma.patient.findUnique({
        where: { userId: session.user.id },
      });

      if (!patient || patient.id !== patientId) {
        return NextResponse.json(
          { message: "Unauthorized to create an alert for this patient" },
          { status: 403 }
        );
      }
    }

    // Find the patient's assigned nurse
    const nursePatient = await prisma.nursePatient.findFirst({
      where: { patientId },
      include: { nurse: true },
    });

    // Create the alert
    const alert = await prisma.emergencyAlert.create({
      data: {
        patientId,
        nurseId: nursePatient?.nurseId,
        status: "PENDING",
        description: description || "Emergency assistance requested",
        location: location || "Unknown",
      },
    });

    return NextResponse.json(alert, { status: 201 });
  } catch (error) {
    console.error("Error creating alert:", error);
    return NextResponse.json(
      { message: "An error occurred while creating the alert" },
      { status: 500 }
    );
  }
}
