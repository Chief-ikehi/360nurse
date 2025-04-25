import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

// GET handler to retrieve emergency services
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
    const type = url.searchParams.get("type");
    const latitude = url.searchParams.get("latitude");
    const longitude = url.searchParams.get("longitude");

    // Get emergency services with optional filtering
    const emergencyServices = await prisma.emergencyService.findMany({
      where: {
        ...(type ? { type: type as any } : {}),
      },
      orderBy: { name: "asc" },
    });

    // If latitude and longitude are provided, calculate distance and sort by proximity
    if (latitude && longitude) {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);

      // Simple distance calculation (not accounting for Earth's curvature)
      // For a more accurate calculation, you would use the Haversine formula
      const servicesWithDistance = emergencyServices
        .filter(service => service.latitude && service.longitude)
        .map(service => {
          const distance = Math.sqrt(
            Math.pow((service.latitude! - lat), 2) + 
            Math.pow((service.longitude! - lng), 2)
          );
          return { ...service, distance };
        })
        .sort((a, b) => a.distance - b.distance);

      return NextResponse.json(servicesWithDistance, { status: 200 });
    }

    return NextResponse.json(emergencyServices, { status: 200 });
  } catch (error) {
    console.error("Error fetching emergency services:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching emergency services" },
      { status: 500 }
    );
  }
}

// POST handler to create a new emergency service (admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "FACILITY_ADMIN")) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { 
      name, 
      type, 
      address, 
      phone, 
      email, 
      latitude, 
      longitude, 
      serviceRadius, 
      operatingHours 
    } = body;

    // Validate required fields
    if (!name || !type) {
      return NextResponse.json(
        { message: "Name and type are required" },
        { status: 400 }
      );
    }

    // Create the emergency service
    const emergencyService = await prisma.emergencyService.create({
      data: {
        name,
        type: type as any,
        address,
        phone,
        email,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        serviceRadius: serviceRadius ? parseFloat(serviceRadius) : null,
        operatingHours,
      },
    });

    return NextResponse.json(emergencyService, { status: 201 });
  } catch (error) {
    console.error("Error creating emergency service:", error);
    return NextResponse.json(
      { message: "An error occurred while creating the emergency service" },
      { status: 500 }
    );
  }
}
