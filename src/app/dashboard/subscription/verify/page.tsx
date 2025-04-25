"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function VerifyPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reference = searchParams.get('reference');
  const planId = searchParams.get('planId');

  useEffect(() => {
    if (!session?.user?.id || !reference || !planId) {
      setVerifying(false);
      setError('Invalid payment session. Missing required parameters.');
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reference }),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess(true);
          toast.success('Payment successful! Your subscription is now active.');
        } else {
          setError(data.message || 'Payment verification failed');
          toast.error(data.message || 'Payment verification failed');
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        setError('An error occurred while verifying your payment');
        toast.error('An error occurred while verifying your payment');
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [session?.user?.id, reference, planId]);

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-purple-600 text-white">
          <h1 className="text-2xl font-bold">Payment Verification</h1>
        </div>

        <div className="p-6">
          {verifying ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Verifying your payment...</p>
            </div>
          ) : success ? (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="mt-4 text-xl font-medium text-gray-900">Payment Successful!</h2>
              <p className="mt-2 text-gray-600">
                Your subscription has been activated successfully. You now have access to all the features included in your plan.
              </p>
              <div className="mt-6">
                <Link
                  href="/dashboard/subscription"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Go to Subscription
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="mt-4 text-xl font-medium text-gray-900">Payment Failed</h2>
              <p className="mt-2 text-gray-600">
                {error || 'We could not verify your payment. Please try again or contact support.'}
              </p>
              <div className="mt-6 space-x-3">
                <Link
                  href="/dashboard/subscription"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Back to Subscription
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
