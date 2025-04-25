import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seeding...');

  // Create a facility
  const facility = await prisma.facility.upsert({
    where: { id: 'demo-facility' },
    update: {},
    create: {
      id: 'demo-facility',
      name: 'Demo Medical Center',
      address: '123 Healthcare Ave, Medical District',
      phone: '+1 (555) 123-4567',
      email: 'info@demomedical.com',
    },
  });

  console.log('Created facility:', facility.name);

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@360nurse.com' },
    update: {},
    create: {
      name: 'System Administrator',
      email: 'admin@360nurse.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  console.log('Created admin user:', admin.email);

  // Create patient user
  const patientPassword = await bcrypt.hash('patient123', 10);
  const patientUser = await prisma.user.upsert({
    where: { email: 'patient@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'patient@example.com',
      password: patientPassword,
      role: 'PATIENT',
      patient: {
        create: {
          address: '456 Patient St, City',
          phone: '+1 (555) 987-6543',
        },
      },
    },
  });

  console.log('Created patient user:', patientUser.email);

  // Create nurse user
  const nursePassword = await bcrypt.hash('nurse123', 10);
  const nurseUser = await prisma.user.upsert({
    where: { email: 'nurse@example.com' },
    update: {},
    create: {
      name: 'Sarah Johnson',
      email: 'nurse@example.com',
      password: nursePassword,
      role: 'NURSE',
      nurse: {
        create: {
          licenseNumber: 'RN12345',
          specialization: 'Cardiology',
          isVerified: true,
          isIndependent: false,
          facilityId: facility.id,
        },
      },
    },
  });

  console.log('Created nurse user:', nurseUser.email);

  // Create facility admin user
  const facilityAdminPassword = await bcrypt.hash('facilityadmin123', 10);
  const facilityAdminUser = await prisma.user.upsert({
    where: { email: 'facilityadmin@example.com' },
    update: {},
    create: {
      name: 'Michael Chen',
      email: 'facilityadmin@example.com',
      password: facilityAdminPassword,
      role: 'FACILITY_ADMIN',
      facilityAdmin: {
        create: {
          facilityId: facility.id,
        },
      },
    },
  });

  console.log('Created facility admin user:', facilityAdminUser.email);

  // Create nurse-patient relationship
  const nursePatient = await prisma.nursePatient.upsert({
    where: {
      nurseId_patientId: {
        nurseId: (await prisma.nurse.findUnique({ where: { userId: nurseUser.id } }))!.id,
        patientId: (await prisma.patient.findUnique({ where: { userId: patientUser.id } }))!.id,
      },
    },
    update: {},
    create: {
      nurseId: (await prisma.nurse.findUnique({ where: { userId: nurseUser.id } }))!.id,
      patientId: (await prisma.patient.findUnique({ where: { userId: patientUser.id } }))!.id,
    },
  });

  console.log('Created nurse-patient relationship');

  // Create some vital records for the patient
  const patient = await prisma.patient.findUnique({ where: { userId: patientUser.id } });
  
  if (patient) {
    // Create a few vital records with different timestamps
    const now = new Date();
    
    for (let i = 0; i < 10; i++) {
      const recordTime = new Date(now.getTime() - i * 3600000); // Each record 1 hour apart
      
      await prisma.vitalRecord.create({
        data: {
          patientId: patient.id,
          bloodPressure: `${Math.floor(Math.random() * 40) + 100}/${Math.floor(Math.random() * 20) + 60}`,
          heartRate: Math.floor(Math.random() * 40) + 60,
          temperature: parseFloat((Math.random() * 1.5 + 36).toFixed(1)),
          oxygenLevel: Math.floor(Math.random() * 5) + 95,
          recordedAt: recordTime,
          isSimulated: true,
        },
      });
    }
    
    console.log('Created 10 vital records for patient');
  }

  // Create an emergency service
  const emergencyService = await prisma.emergencyService.upsert({
    where: { id: 'demo-emergency' },
    update: {},
    create: {
      id: 'demo-emergency',
      name: 'City General Hospital',
      type: 'HOSPITAL',
      address: '789 Emergency Blvd, City',
      phone: '+1 (555) 911-1234',
      email: 'emergency@citygeneral.com',
      latitude: 37.7749,
      longitude: -122.4194,
      serviceRadius: 10.0,
      operatingHours: '24/7',
    },
  });

  console.log('Created emergency service:', emergencyService.name);

  // Create an emergency alert
  if (patient && nurseUser) {
    const nurse = await prisma.nurse.findUnique({ where: { userId: nurseUser.id } });
    
    if (nurse) {
      const alert = await prisma.emergencyAlert.create({
        data: {
          patientId: patient.id,
          nurseId: nurse.id,
          status: 'ACKNOWLEDGED',
          description: 'High heart rate detected',
          location: 'Home',
          emergencyServiceId: emergencyService.id,
        },
      });
      
      console.log('Created emergency alert');
    }
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
