import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get request body
    const body = await request.json();
    const { planId, paymentMethod, paymentReference } = body;
    
    if (!planId) {
      return NextResponse.json(
        { message: 'Plan ID is required' },
        { status: 400 }
      );
    }
    
    // Check if the plan exists
    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    });
    
    if (!plan) {
      return NextResponse.json(
        { message: 'Invalid plan' },
        { status: 400 }
      );
    }
    
    // Check if user already has an active subscription
    const existingSubscription = await prisma.subscription.findFirst({
      where: {
        userId: session.user.id,
        status: { in: ['ACTIVE', 'TRIALING'] },
      },
    });
    
    if (existingSubscription) {
      // Cancel the existing subscription
      await prisma.subscription.update({
        where: { id: existingSubscription.id },
        data: {
          status: 'CANCELED',
          canceledAt: new Date(),
        },
      });
    }
    
    // Calculate subscription period
    const startDate = new Date();
    const endDate = new Date();
    
    // Set end date based on interval
    if (plan.interval === 'MONTHLY') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (plan.interval === 'QUARTERLY') {
      endDate.setMonth(endDate.getMonth() + 3);
    } else if (plan.interval === 'YEARLY') {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }
    
    // Create a new subscription
    const subscription = await prisma.subscription.create({
      data: {
        userId: session.user.id,
        planId: plan.id,
        status: 'ACTIVE',
        startDate,
        currentPeriodStart: startDate,
        currentPeriodEnd: endDate,
        paymentMethod: paymentMethod || 'card',
        paymentReference: paymentReference || null,
      },
      include: { plan: true },
    });
    
    // Create a payment record
    await prisma.payment.create({
      data: {
        subscriptionId: subscription.id,
        amount: plan.price,
        currency: plan.currency,
        status: 'COMPLETED',
        paymentMethod: paymentMethod || 'card',
        paymentReference: paymentReference || null,
        paymentDate: new Date(),
      },
    });
    
    return NextResponse.json({ subscription });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json(
      { message: 'An error occurred while creating the subscription' },
      { status: 500 }
    );
  }
}
