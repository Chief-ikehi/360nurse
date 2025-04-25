import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

// Generate random vital signs
function generateVitalSigns() {
  return {
    bloodPressure: `${Math.floor(Math.random() * 40) + 100}/${Math.floor(Math.random() * 20) + 60}`,
    heartRate: Math.floor(Math.random() * 40) + 60,
    temperature: parseFloat((Math.random() * 1.5 + 36).toFixed(1)),
    oxygenLevel: Math.floor(Math.random() * 5) + 95,
  };
}

// GET handler to retrieve vital signs for a patient
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
      });
      
      if (patient) {
        patientId = patient.id;
      }
    }

    // If still no patient ID, return an error
    if (!patientId) {
      return NextResponse.json(
        { message: "Patient ID is required" },
        { status: 400 }
      );
    }

    // Check if the user has permission to access this patient's data
    if (session.user.role === "PATIENT") {
      const patient = await prisma.patient.findUnique({
        where: { userId: session.user.id },
      });
      
      if (!patient || patient.id !== patientId) {
        return NextResponse.json(
          { message: "Unauthorized to access this patient's data" },
          { status: 403 }
        );
      }
    } else if (session.user.role === "NURSE") {
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
          { message: "Unauthorized to access this patient's data" },
          { status: 403 }
        );
      }
    } else if (session.user.role !== "ADMIN" && session.user.role !== "FACILITY_ADMIN") {
      return NextResponse.json(
        { message: "Unauthorized to access patient data" },
        { status: 403 }
      );
    }

    // Get the latest vital records for the patient
    const vitalRecords = await prisma.vitalRecord.findMany({
      where: { patientId },
      orderBy: { recordedAt: "desc" },
      take: 10,
    });

    // If there are no records, generate a new one
    if (vitalRecords.length === 0) {
      const newVitals = generateVitalSigns();
      
      const newRecord = await prisma.vitalRecord.create({
        data: {
          patientId,
          ...newVitals,
          isSimulated: true,
        },
      });
      
      return NextResponse.json([newRecord], { status: 200 });
    }

    return NextResponse.json(vitalRecords, { status: 200 });
  } catch (error) {
    console.error("Error fetching vital signs:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching vital signs" },
      { status: 500 }
    );
  }
}

// POST handler to create a new vital sign record
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get request body
    const body = await req.json();
    const { patientId } = body;

    // If no patient ID is provided and the user is a patient, use their own ID
    let finalPatientId = patientId;
    if (!finalPatientId && session.user.role === "PATIENT") {
      const patient = await prisma.patient.findUnique({
        where: { userId: session.user.id },
      });
      
      if (patient) {
        finalPatientId = patient.id;
      }
    }

    // If still no patient ID, return an error
    if (!finalPatientId) {
      return NextResponse.json(
        { message: "Patient ID is required" },
        { status: 400 }
      );
    }

    // Generate new vital signs
    const newVitals = generateVitalSigns();
    
    // Create a new vital record
    const newRecord = await prisma.vitalRecord.create({
      data: {
        patientId: finalPatientId,
        ...newVitals,
        isSimulated: true,
      },
    });

    // Check if any vital signs are outside normal ranges and create an alert if needed
    const { heartRate, oxygenLevel, temperature } = newVitals;
    
    if (heartRate > 100 || oxygenLevel < 95 || temperature > 37.5) {
      // Find the patient's assigned nurse
      const nursePatient = await prisma.nursePatient.findFirst({
        where: { patientId: finalPatientId },
        include: { nurse: true },
      });
      
      if (nursePatient) {
        // Create an alert
        await prisma.emergencyAlert.create({
          data: {
            patientId: finalPatientId,
            nurseId: nursePatient.nurseId,
            status: "PENDING",
            description: `Abnormal vital signs detected: ${
              heartRate > 100 ? `Heart Rate: ${heartRate} bpm` : ""
            } ${oxygenLevel < 95 ? `Oxygen Level: ${oxygenLevel}%` : ""} ${
              temperature > 37.5 ? `Temperature: ${temperature}°C` : ""
            }`.trim(),
          },
        });
      }
    }

    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    console.error("Error creating vital sign record:", error);
    return NextResponse.json(
      { message: "An error occurred while creating vital sign record" },
      { status: 500 }
    );
  }
}
