import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { initializeTransaction } from '@/lib/paystack';

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
    const { planId } = body;

    if (!planId) {
      return NextResponse.json(
        { message: 'Plan ID is required' },
        { status: 400 }
      );
    }

    // Get the plan from the database
    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      return NextResponse.json(
        { message: 'Invalid plan' },
        { status: 400 }
      );
    }

    // Get the user's email
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { email: true },
    });

    if (!user?.email) {
      return NextResponse.json(
        { message: 'User email not found' },
        { status: 400 }
      );
    }

    // Generate a unique reference
    const reference = `sub_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

    // Initialize Paystack transaction
    const paystackResponse = await initializeTransaction({
      email: user.email,
      amount: plan.price * 100, // Paystack amount is in kobo (100 kobo = 1 Naira)
      currency: plan.currency,
      reference,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/subscription/verify?reference=${reference}&planId=${planId}`,
      metadata: {
        userId: session.user.id,
        planId: plan.id,
        custom_fields: [
          {
            display_name: 'Plan Name',
            variable_name: 'plan_name',
            value: plan.name,
          },
          {
            display_name: 'Subscription Type',
            variable_name: 'subscription_type',
            value: plan.interval,
          },
        ],
      },
    });

    if (paystackResponse.status) {
      // Store the transaction reference in the database
      await prisma.paymentTransaction.create({
        data: {
          reference,
          userId: session.user.id,
          planId: plan.id,
          amount: plan.price,
          currency: plan.currency,
          status: 'PENDING',
        },
      });

      return NextResponse.json({
        success: true,
        authorization_url: paystackResponse.data.authorization_url,
        reference,
      });
    } else {
      return NextResponse.json(
        { message: 'Failed to initialize payment', error: paystackResponse.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error initializing payment:', error);
    return NextResponse.json(
      { message: 'An error occurred while initializing payment' },
      { status: 500 }
    );
  }
}
