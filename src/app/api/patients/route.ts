import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

// GET handler to retrieve patient profile
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get patient ID from query params or use the current user's patient ID
    const url = new URL(req.url);
    let patientId = url.searchParams.get("patientId");

    // If no patient ID is provided and the user is a patient, use their own ID
    if (!patientId && session.user.role === "PATIENT") {
      const patient = await prisma.patient.findUnique({
        where: { userId: session.user.id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
          nursePatients: {
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
            },
          },
        },
      });
      
      if (patient) {
        return NextResponse.json(patient, { status: 200 });
      } else {
        return NextResponse.json(
          { message: "Patient profile not found" },
          { status: 404 }
        );
      }
    }

    // If a specific patient ID is provided, check if the user has permission to access it
    if (patientId) {
      if (session.user.role === "NURSE") {
        // Nurses can only access their assigned patients
        const nurse = await prisma.nurse.findUnique({
          where: { userId: session.user.id },
          include: {
            nursePatients: {
              where: { patientId },
            },
          },
        });
        
        if (!nurse || nurse.nursePatients.length === 0) {
          return NextResponse.json(
            { message: "Unauthorized to access this patient's profile" },
            { status: 403 }
          );
        }
      } else if (session.user.role !== "ADMIN" && session.user.role !== "FACILITY_ADMIN") {
        return NextResponse.json(
          { message: "Unauthorized to access this patient's profile" },
          { status: 403 }
        );
      }

      const patient = await prisma.patient.findUnique({
        where: { id: patientId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
          nursePatients: {
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
            },
          },
        },
      });
      
      if (patient) {
        return NextResponse.json(patient, { status: 200 });
      } else {
        return NextResponse.json(
          { message: "Patient profile not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { message: "Patient ID is required" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error fetching patient profile:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching patient profile" },
      { status: 500 }
    );
  }
}

// PATCH handler to update patient profile
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, email, phone, address } = body;

    // Only allow patients to update their own profile
    if (session.user.role === "PATIENT") {
      const patient = await prisma.patient.findUnique({
        where: { userId: session.user.id },
      });
      
      if (!patient) {
        return NextResponse.json(
          { message: "Patient profile not found" },
          { status: 404 }
        );
      }

      // Update user information
      if (name || email) {
        await prisma.user.update({
          where: { id: session.user.id },
          data: {
            ...(name ? { name } : {}),
            ...(email ? { email } : {}),
          },
        });
      }

      // Update patient information
      const updatedPatient = await prisma.patient.update({
        where: { userId: session.user.id },
        data: {
          ...(phone ? { phone } : {}),
          ...(address ? { address } : {}),
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      });

      return NextResponse.json(updatedPatient, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Only patients can update their own profile" },
        { status: 403 }
      );
    }
  } catch (error) {
    console.error("Error updating patient profile:", error);
    return NextResponse.json(
      { message: "An error occurred while updating patient profile" },
      { status: 500 }
    );
  }
}
