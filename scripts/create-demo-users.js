const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting to create demo users with subscriptions...');

    // First, let's check if the subscription plans exist
    const basicPlan = await prisma.subscriptionPlan.findFirst({
      where: {
        name: 'Basic Plan',
      },
    });

    const premiumPlan = await prisma.subscriptionPlan.findFirst({
      where: {
        name: 'Premium Plan',
      },
    });

    // If plans don't exist, create them
    if (!basicPlan) {
      console.log('Creating Basic Plan...');
      await prisma.subscriptionPlan.create({
        data: {
          name: 'Basic Plan',
          description: 'Essential health monitoring for individuals',
          price: 2500,
          currency: 'NGN',
          interval: 'MONTHLY',
          features: [
            'health_alerts',
            'vital_signs_monitoring',
            'emergency_alerts',
          ],
          isActive: true,
        },
      });
    }

    if (!premiumPlan) {
      console.log('Creating Premium Plan...');
      await prisma.subscriptionPlan.create({
        data: {
          name: 'Premium Plan',
          description: 'Complete healthcare solution with professional support',
          price: 5000,
          currency: 'NGN',
          interval: 'MONTHLY',
          features: [
            'health_alerts',
            'vital_signs_monitoring',
            'emergency_alerts',
            'nurse_consultations',
            'priority_support',
          ],
          isActive: true,
        },
      });
    }

    // Fetch the plans again to get their IDs
    const basicPlanData = await prisma.subscriptionPlan.findFirst({
      where: {
        name: 'Basic Plan',
      },
    });

    const premiumPlanData = await prisma.subscriptionPlan.findFirst({
      where: {
        name: 'Premium Plan',
      },
    });

    if (!basicPlanData || !premiumPlanData) {
      throw new Error('Failed to create or find subscription plans');
    }

    // Create Basic Plan User
    const basicUserEmail = 'basic@example.com';
    const basicUserExists = await prisma.user.findUnique({
      where: { email: basicUserEmail },
    });

    if (!basicUserExists) {
      console.log('Creating Basic Plan User...');
      const hashedPassword = await bcrypt.hash('password123', 10);
      
      const basicUser = await prisma.user.create({
        data: {
          name: 'Basic User',
          email: basicUserEmail,
          password: hashedPassword,
          role: 'PATIENT',
        },
      });

      // Create patient record
      await prisma.patient.create({
        data: {
          userId: basicUser.id,
          dateOfBirth: new Date('1990-01-15'),
          gender: 'MALE',
          phoneNumber: '+2348012345678',
          address: '123 Lagos Street, Lagos',
          emergencyContact: 'Emergency Contact',
          emergencyContactPhone: '+2348087654321',
        },
      });

      // Calculate subscription dates
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);

      // Create subscription for basic user
      await prisma.subscription.create({
        data: {
          userId: basicUser.id,
          planId: basicPlanData.id,
          status: 'ACTIVE',
          startDate,
          currentPeriodStart: startDate,
          currentPeriodEnd: endDate,
          paymentMethod: 'CARD',
          paymentReference: 'demo_basic_' + Date.now(),
        },
      });

      console.log('Basic Plan User created successfully with active subscription');
    } else {
      console.log('Basic Plan User already exists');
    }

    // Create Premium Plan User
    const premiumUserEmail = 'premium@example.com';
    const premiumUserExists = await prisma.user.findUnique({
      where: { email: premiumUserEmail },
    });

    if (!premiumUserExists) {
      console.log('Creating Premium Plan User...');
      const hashedPassword = await bcrypt.hash('password123', 10);
      
      const premiumUser = await prisma.user.create({
        data: {
          name: 'Premium User',
          email: premiumUserEmail,
          password: hashedPassword,
          role: 'PATIENT',
        },
      });

      // Create patient record
      await prisma.patient.create({
        data: {
          userId: premiumUser.id,
          dateOfBirth: new Date('1985-05-20'),
          gender: 'FEMALE',
          phoneNumber: '+2348023456789',
          address: '456 Abuja Street, Abuja',
          emergencyContact: 'Emergency Contact',
          emergencyContactPhone: '+2348098765432',
        },
      });

      // Calculate subscription dates
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);

      // Create subscription for premium user
      await prisma.subscription.create({
        data: {
          userId: premiumUser.id,
          planId: premiumPlanData.id,
          status: 'ACTIVE',
          startDate,
          currentPeriodStart: startDate,
          currentPeriodEnd: endDate,
          paymentMethod: 'CARD',
          paymentReference: 'demo_premium_' + Date.now(),
        },
      });

      console.log('Premium Plan User created successfully with active subscription');
    } else {
      console.log('Premium Plan User already exists');
    }

    console.log('Demo users creation completed successfully!');
    console.log('Login credentials:');
    console.log('Basic User: basic@example.com / password123');
    console.log('Premium User: premium@example.com / password123');

  } catch (error) {
    console.error('Error creating demo users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
