import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

// GET handler to retrieve a specific alert
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get the alert
    const alert = await prisma.emergencyAlert.findUnique({
      where: { id },
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

    if (!alert) {
      return NextResponse.json(
        { message: "Alert not found" },
        { status: 404 }
      );
    }

    // Check if the user has permission to view this alert
    if (session.user.role === "PATIENT") {
      const patient = await prisma.patient.findUnique({
        where: { userId: session.user.id },
      });

      if (!patient || patient.id !== alert.patientId) {
        return NextResponse.json(
          { message: "Unauthorized to view this alert" },
          { status: 403 }
        );
      }
    } else if (session.user.role === "NURSE") {
      const nurse = await prisma.nurse.findUnique({
        where: { userId: session.user.id },
      });

      if (!nurse || nurse.id !== alert.nurseId) {
        return NextResponse.json(
          { message: "Unauthorized to view this alert" },
          { status: 403 }
        );
      }
    } else if (session.user.role !== "FACILITY_ADMIN" && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Unauthorized to view alerts" },
        { status: 403 }
      );
    }

    return NextResponse.json(alert, { status: 200 });
  } catch (error) {
    console.error("Error fetching alert:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the alert" },
      { status: 500 }
    );
  }
}

// PATCH handler to update an alert's status
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { status, emergencyServiceId } = body;

    // Validate required fields
    if (!status) {
      return NextResponse.json(
        { message: "Status is required" },
        { status: 400 }
      );
    }

    // Get the alert
    const alert = await prisma.emergencyAlert.findUnique({
      where: { id },
    });

    if (!alert) {
      return NextResponse.json(
        { message: "Alert not found" },
        { status: 404 }
      );
    }

    // Check if the user has permission to update this alert
    if (session.user.role === "NURSE") {
      const nurse = await prisma.nurse.findUnique({
        where: { userId: session.user.id },
      });

      if (!nurse || nurse.id !== alert.nurseId) {
        return NextResponse.json(
          { message: "Unauthorized to update this alert" },
          { status: 403 }
        );
      }
    } else if (session.user.role !== "FACILITY_ADMIN" && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Unauthorized to update alerts" },
        { status: 403 }
      );
    }

    // Update the alert
    const updatedAlert = await prisma.emergencyAlert.update({
      where: { id },
      data: {
        status: status as any,
        ...(status === "RESOLVED" ? { resolvedAt: new Date() } : {}),
        ...(emergencyServiceId ? { emergencyServiceId } : {}),
      },
    });

    return NextResponse.json(updatedAlert, { status: 200 });
  } catch (error) {
    console.error("Error updating alert:", error);
    return NextResponse.json(
      { message: "An error occurred while updating the alert" },
      { status: 500 }
    );
  }
}