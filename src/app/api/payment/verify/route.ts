import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { verifyTransaction } from '@/lib/paystack';

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
    const { reference } = body;

    if (!reference) {
      return NextResponse.json(
        { message: 'Reference is required' },
        { status: 400 }
      );
    }

    // Get the transaction from the database
    const transaction = await prisma.paymentTransaction.findUnique({
      where: { reference },
      include: { plan: true },
    });

    if (!transaction) {
      return NextResponse.json(
        { message: 'Transaction not found' },
        { status: 404 }
      );
    }

    // Check if the transaction belongs to the user
    if (transaction.userId !== session.user.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Verify the transaction with Paystack
    const paystackResponse = await verifyTransaction(reference);

    if (paystackResponse.status && paystackResponse.data.status === 'success') {
      // Update the transaction status
      await prisma.paymentTransaction.update({
        where: { reference },
        data: {
          status: 'COMPLETED',
          paymentDate: new Date(),
          paymentMethod: paystackResponse.data.channel,
          transactionId: paystackResponse.data.id.toString(),
        },
      });

      // Calculate subscription period
      const startDate = new Date();
      const endDate = new Date();

      // Set end date based on interval
      if (transaction.plan.interval === 'MONTHLY') {
        endDate.setMonth(endDate.getMonth() + 1);
      } else if (transaction.plan.interval === 'QUARTERLY') {
        endDate.setMonth(endDate.getMonth() + 3);
      } else if (transaction.plan.interval === 'YEARLY') {
        endDate.setFullYear(endDate.getFullYear() + 1);
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

      // Create a new subscription
      const subscription = await prisma.subscription.create({
        data: {
          userId: session.user.id,
          planId: transaction.planId,
          status: 'ACTIVE',
          startDate,
          currentPeriodStart: startDate,
          currentPeriodEnd: endDate,
          paymentMethod: paystackResponse.data.channel,
          paymentReference: reference,
        },
        include: { plan: true },
      });

      // Create a payment record
      await prisma.payment.create({
        data: {
          subscriptionId: subscription.id,
          amount: transaction.amount,
          currency: transaction.currency,
          status: 'COMPLETED',
          paymentMethod: paystackResponse.data.channel,
          paymentReference: reference,
          transactionId: paystackResponse.data.id.toString(),
          paymentDate: new Date(),
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully',
        subscription,
      });
    } else {
      // Update the transaction status
      await prisma.paymentTransaction.update({
        where: { reference },
        data: {
          status: 'FAILED',
        },
      });

      return NextResponse.json(
        { message: 'Payment verification failed', error: paystackResponse.message },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { message: 'An error occurred while verifying payment' },
      { status: 500 }
    );
  }
}
