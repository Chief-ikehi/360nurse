"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: string;
  features: string[];
}

interface Subscription {
  id: string;
  status: string;
  startDate: string;
  endDate: string | null;
  currentPeriodEnd: string;
  plan: SubscriptionPlan;
}

interface PaymentHistoryItem {
  id: string;
  date: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  reference: string;
  planName: string;
  transactionId: string;
  type: string;
}

export default function SubscriptionPage() {
  const { data: session } = useSession();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState({
    plans: true,
    subscription: true,
    payments: true,
  });
  const [processingAction, setProcessingAction] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryItem[]>([]);

  // Fetch subscription plans
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/subscription/plans');
        if (response.ok) {
          const data = await response.json();
          setPlans(data);
        } else {
          toast.error('Failed to load subscription plans');
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
        toast.error('An error occurred while loading subscription plans');
      } finally {
        setLoading(prev => ({ ...prev, plans: false }));
      }
    };

    fetchPlans();
  }, []);

  // Fetch user's subscription
  useEffect(() => {
    const fetchSubscription = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await fetch(`/api/subscription/user`);
        if (response.ok) {
          const data = await response.json();
          setSubscription(data.subscription);
        } else if (response.status !== 404) {
          // 404 means no subscription, which is fine
          toast.error('Failed to load subscription information');
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
        toast.error('An error occurred while loading your subscription');
      } finally {
        setLoading(prev => ({ ...prev, subscription: false }));
      }
    };

    fetchSubscription();
  }, [session?.user?.id]);

  // Fetch payment history
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await fetch(`/api/payment/history`);
        if (response.ok) {
          const data = await response.json();
          setPaymentHistory(data.payments);
        } else {
          console.error('Failed to load payment history');
        }
      } catch (error) {
        console.error('Error fetching payment history:', error);
      } finally {
        setLoading(prev => ({ ...prev, payments: false }));
      }
    };

    fetchPaymentHistory();
  }, [session?.user?.id]);

  const handleSubscribe = async (planId: string) => {
    if (!session?.user?.id) {
      toast.error('Please sign in to subscribe');
      return;
    }

    setProcessingAction(true);

    try {
      // Initialize payment with Paystack
      const response = await fetch('/api/payment/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Redirecting to payment page...');
        // Redirect to Paystack payment page
        window.location.href = data.authorization_url;
      } else {
        toast.error(data.message || 'Failed to initialize payment');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      toast.error('Failed to process subscription');
    } finally {
      setProcessingAction(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!subscription?.id) return;

    if (!confirm('Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your billing period.')) {
      return;
    }

    setProcessingAction(true);

    try {
      const response = await fetch(`/api/subscription/${subscription.id}/cancel`, {
        method: 'POST',
      });

      if (response.ok) {
        toast.success('Subscription canceled successfully');
        // Refresh subscription data
        const updatedSubscription = await response.json();
        setSubscription(updatedSubscription);
      } else {
        toast.error('Failed to cancel subscription');
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
      toast.error('An error occurred while canceling your subscription');
    } finally {
      setProcessingAction(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Use empty array if API call is still loading or failed
  const displayPlans = plans;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 shadow-md overflow-hidden sm:rounded-lg">
        <div className="px-6 py-6 sm:px-8">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-white p-2 rounded-full">
              <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-xl leading-6 font-bold text-white">
                Subscription Management
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-purple-100">
                Manage your 360Nurse subscription and billing information
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Subscription */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Current Subscription
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Details about your active subscription plan
          </p>
        </div>

        {loading.subscription ? (
          <div className="px-4 py-5 sm:p-6 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-40 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-60 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-52 bg-gray-200 rounded"></div>
            </div>
          </div>
        ) : subscription ? (
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h4 className="text-xl font-semibold text-gray-900">
                  {subscription.plan.name}
                </h4>
                <p className="mt-1 text-sm text-gray-600">
                  {formatCurrency(subscription.plan.price, subscription.plan.currency)} / {subscription.plan.interval.toLowerCase()}
                </p>
                <div className="mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    subscription.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                    subscription.status === 'CANCELED' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {subscription.status === 'ACTIVE' ? 'Active' :
                     subscription.status === 'CANCELED' ? 'Canceled' :
                     subscription.status}
                  </span>
                </div>
                <div className="mt-3 text-sm text-gray-500">
                  <p>Started on: {formatDate(subscription.startDate)}</p>
                  <p>Current period ends: {formatDate(subscription.currentPeriodEnd)}</p>
                </div>
              </div>

              <div className="mt-4 md:mt-0">
                {subscription.status === 'ACTIVE' && (
                  <button
                    onClick={handleCancelSubscription}
                    disabled={processingAction}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processingAction ? 'Processing...' : 'Cancel Subscription'}
                  </button>
                )}
                {subscription.status === 'CANCELED' && (
                  <div className="text-sm text-gray-500">
                    Your subscription will end on {formatDate(subscription.currentPeriodEnd)}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Included Features:</h5>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                {subscription.plan.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="px-4 py-5 sm:p-6 text-center">
            <p className="text-gray-500 mb-4">You don't have an active subscription.</p>
            <Link
              href="#subscription-plans"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              View Available Plans
            </Link>
          </div>
        )}
      </div>

      {/* Payment History */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Payment History
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Recent transactions for your subscription
          </p>
        </div>

        <div className="px-4 py-5 sm:p-6">
          {loading.payments ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-500">Loading payment history...</p>
            </div>
          ) : paymentHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paymentHistory.map((payment: PaymentHistoryItem) => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(payment.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.planName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(payment.amount, payment.currency)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          payment.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                          payment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                          payment.status === 'FAILED' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {payment.status.charAt(0) + payment.status.slice(1).toLowerCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.paymentMethod}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">
                        {payment.reference || payment.transactionId || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <p className="mt-2 text-sm text-gray-500">No payment history found</p>
              <p className="text-xs text-gray-400">Your payment history will appear here once you make a payment</p>
            </div>
          )}
        </div>
      </div>

      {/* Available Plans */}
      <div id="subscription-plans" className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Available Plans
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Choose a subscription plan that fits your needs
          </p>
        </div>

        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayPlans.map((plan) => (
              <div key={plan.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="px-6 py-4 bg-gray-50 border-b">
                  <h4 className="text-lg font-semibold text-gray-900">{plan.name}</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {formatCurrency(plan.price, plan.currency)}
                    <span className="text-sm font-normal text-gray-500">/{plan.interval.toLowerCase()}</span>
                  </p>
                </div>
                <div className="px-6 py-4">
                  <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={processingAction || (subscription?.plan.id === plan.id && subscription?.status === 'ACTIVE')}
                    className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      subscription?.plan.id === plan.id && subscription?.status === 'ACTIVE'
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500'
                    }`}
                  >
                    {processingAction
                      ? 'Processing...'
                      : subscription?.plan.id === plan.id && subscription?.status === 'ACTIVE'
                      ? 'Current Plan'
                      : 'Subscribe'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
