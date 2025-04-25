import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get all payments for the user
    const payments = await prisma.payment.findMany({
      where: {
        subscription: {
          userId: session.user.id
        }
      },
      include: {
        subscription: {
          include: {
            plan: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // Also get payment transactions
    const transactions = await prisma.paymentTransaction.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        plan: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // Combine and format the payment data
    const paymentHistory = [
      ...payments.map(payment => ({
        id: payment.id,
        date: payment.paymentDate || payment.createdAt,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        paymentMethod: payment.paymentMethod || 'Unknown',
        reference: payment.paymentReference || '',
        planName: payment.subscription.plan.name,
        transactionId: payment.transactionId || '',
        type: 'subscription_payment'
      })),
      ...transactions.map(transaction => ({
        id: transaction.id,
        date: transaction.paymentDate || transaction.createdAt,
        amount: transaction.amount,
        currency: transaction.currency,
        status: transaction.status,
        paymentMethod: transaction.paymentMethod || 'Unknown',
        reference: transaction.reference,
        planName: transaction.plan.name,
        transactionId: transaction.transactionId || '',
        type: 'transaction'
      }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return NextResponse.json({ payments: paymentHistory });
  } catch (error) {
    console.error('Error fetching payment history:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching payment history' },
      { status: 500 }
    );
  }
}
