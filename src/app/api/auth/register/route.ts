import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";

const prisma = new PrismaClient();

// Define validation schema
const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["PATIENT", "NURSE", "FACILITY_ADMIN", "EMERGENCY_SERVICE", "ADMIN"]),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate request body
    const validation = userSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: validation.error.format() },
        { status: 400 }
      );
    }

    const { name, email, password, role } = validation.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user transaction
    const user = await prisma.$transaction(async (tx) => {
      // Create user
      const newUser = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
        },
      });

      // Create role-specific record
      if (role === "PATIENT") {
        // Create patient record
        const patient = await tx.patient.create({
          data: {
            userId: newUser.id,
          },
        });

        // Create mock vital records for the new patient
        const now = new Date();
        const vitalRecords = [];

        for (let i = 0; i < 10; i++) {
          const recordTime = new Date(now.getTime() - i * 3600000); // Each record 1 hour apart

          vitalRecords.push({
            patientId: patient.id,
            bloodPressure: `${Math.floor(Math.random() * 40) + 100}/${Math.floor(Math.random() * 20) + 60}`,
            heartRate: Math.floor(Math.random() * 40) + 60,
            temperature: parseFloat((Math.random() * 1.5 + 36).toFixed(1)),
            oxygenLevel: Math.floor(Math.random() * 5) + 95,
            recordedAt: recordTime,
            isSimulated: true,
          });
        }

        // Create vital records
        await tx.vitalRecord.createMany({
          data: vitalRecords,
        });

        // Create mock emergency alerts for the new patient
        const alertTypes = [
          {
            description: "High Heart Rate detected: 115 bpm",
            status: "ACKNOWLEDGED",
            createdAt: new Date(now.getTime() - 24 * 3600000) // 1 day ago
          },
          {
            description: "Low Oxygen Level: 93%",
            status: "RESOLVED",
            createdAt: new Date(now.getTime() - 48 * 3600000), // 2 days ago
            resolvedAt: new Date(now.getTime() - 47 * 3600000) // Resolved 1 hour later
          },
          {
            description: "Elevated Temperature: 38.2°C",
            status: "PENDING",
            createdAt: new Date(now.getTime() - 2 * 3600000) // 2 hours ago
          }
        ];

        // Create each alert
        for (const alert of alertTypes) {
          await tx.emergencyAlert.create({
            data: {
              patientId: patient.id,
              status: alert.status as any,
              description: alert.description,
              location: "Home",
              createdAt: alert.createdAt,
              resolvedAt: alert.status === "RESOLVED" ? alert.resolvedAt : null,
            },
          });
        }
      } else if (role === "NURSE") {
        // Create nurse record
        const nurse = await tx.nurse.create({
          data: {
            userId: newUser.id,
            isVerified: true, // Auto-verify for demo purposes
            isIndependent: true,
            specialization: "General Care", // Default specialization
          },
        });

        // Find a patient to assign to this nurse (for demo purposes)
        const patient = await tx.patient.findFirst({
          orderBy: { createdAt: 'desc' },
        });

        // If there's a patient, create a nurse-patient relationship
        if (patient) {
          await tx.nursePatient.create({
            data: {
              nurseId: nurse.id,
              patientId: patient.id,
            },
          });

          // Update any unassigned alerts for this patient to assign them to the new nurse
          await tx.emergencyAlert.updateMany({
            where: {
              patientId: patient.id,
              nurseId: null,
            },
            data: {
              nurseId: nurse.id,
            },
          });
        }
      } else if (role === "FACILITY_ADMIN") {
        // For facility admin, we would typically need a facilityId
        // For demo purposes, we'll create a more complete facility
        const facility = await tx.facility.create({
          data: {
            name: `${name}'s Medical Center`,
            address: "123 Healthcare Ave, Medical District",
            phone: "+1 (555) 123-4567",
            email: email,
          },
        });

        // Create facility admin record
        await tx.facilityAdmin.create({
          data: {
            userId: newUser.id,
            facilityId: facility.id,
          },
        });

        // Create an emergency service for this facility
        await tx.emergencyService.create({
          data: {
            name: "City General Hospital",
            type: "HOSPITAL",
            address: "789 Emergency Blvd, City",
            phone: "+1 (555) 911-1234",
            email: "emergency@citygeneral.com",
            serviceRadius: 10.0,
            operatingHours: "24/7",
          },
        });
      }

      return newUser;
    });

    // Return success response without sensitive data
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
