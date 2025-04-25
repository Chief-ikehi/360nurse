import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get the subscription
    const subscription = await prisma.subscription.findUnique({
      where: { id },
      include: { plan: true },
    });
    
    if (!subscription) {
      return NextResponse.json(
        { message: 'Subscription not found' },
        { status: 404 }
      );
    }
    
    // Check if the subscription belongs to the user
    if (subscription.userId !== session.user.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    // Update the subscription status to CANCELED
    const updatedSubscription = await prisma.subscription.update({
      where: { id },
      data: {
        status: 'CANCELED',
        canceledAt: new Date(),
      },
      include: { plan: true },
    });
    
    return NextResponse.json(updatedSubscription);
  } catch (error) {
    console.error('Error canceling subscription:', error);
    return NextResponse.json(
      { message: 'An error occurred while canceling the subscription' },
      { status: 500 }
    );
  }
}
