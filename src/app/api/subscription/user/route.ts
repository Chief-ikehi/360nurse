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
    
    // Get user's active subscription
    const subscription = await prisma.subscription.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        plan: true,
      },
    });
    
    if (!subscription) {
      return NextResponse.json(
        { message: 'No subscription found', subscription: null },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ subscription });
  } catch (error) {
    console.error('Error fetching user subscription:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching subscription information' },
      { status: 500 }
    );
  }
}
