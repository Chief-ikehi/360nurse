"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [plan, setPlan] = useState<SubscriptionPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  
  // Form state
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const planId = searchParams.get('plan');

  // Fetch plan details
  useEffect(() => {
    const fetchPlan = async () => {
      if (!planId) {
        toast.error('No plan selected');
        router.push('/dashboard/subscription');
        return;
      }

      try {
        // In a real implementation, we would fetch the plan from the API
        // For now, we'll use mock data
        const mockPlans: SubscriptionPlan[] = [
          {
            id: 'basic-plan',
            name: 'Basic Plan',
            description: 'Essential health monitoring for individuals',
            price: 2500,
            currency: 'NGN',
            interval: 'MONTHLY',
            features: [
              'Health alerts',
              'Vital signs monitoring',
              'Emergency alerts',
            ],
          },
          {
            id: 'premium-plan',
            name: 'Premium Plan',
            description: 'Complete healthcare solution with professional support',
            price: 5000,
            currency: 'NGN',
            interval: 'MONTHLY',
            features: [
              'Health alerts',
              'Vital signs monitoring',
              'Emergency alerts',
              'Nurse consultations',
              'Priority support',
            ],
          },
        ];

        const selectedPlan = mockPlans.find(p => p.id === planId);
        if (selectedPlan) {
          setPlan(selectedPlan);
        } else {
          toast.error('Invalid plan selected');
          router.push('/dashboard/subscription');
        }
      } catch (error) {
        console.error('Error fetching plan:', error);
        toast.error('Failed to load plan details');
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [planId, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.user?.id) {
      toast.error('Please sign in to continue');
      return;
    }

    if (!plan) {
      toast.error('No plan selected');
      return;
    }

    setProcessing(true);

    try {
      // In a real implementation, we would process the payment and create a subscription
      // For now, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate a successful payment
      toast.success('Payment successful! Your subscription is now active.');
      
      // Redirect to subscription page
      router.push('/dashboard/subscription');
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Failed to process payment');
    } finally {
      setProcessing(false);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="h-6 w-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Plan Not Found</h2>
        <p className="text-gray-600 mb-6">The selected subscription plan could not be found.</p>
        <Link
          href="/dashboard/subscription"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Back to Subscriptions
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href="/dashboard/subscription"
          className="inline-flex items-center text-sm text-purple-600 hover:text-purple-800"
        >
          <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Subscriptions
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-purple-600 text-white">
          <h1 className="text-2xl font-bold">Complete Your Subscription</h1>
          <p className="text-purple-100">You're subscribing to {plan.name}</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Payment Form */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h2>
              
              <div className="mb-6">
                <div className="flex space-x-4 mb-4">
                  <button
                    type="button"
                    onClick={() => handlePaymentMethodChange('card')}
                    className={`flex-1 py-2 px-4 border rounded-md ${
                      paymentMethod === 'card'
                        ? 'bg-purple-50 border-purple-500 text-purple-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePaymentMethodChange('bank')}
                    className={`flex-1 py-2 px-4 border rounded-md ${
                      paymentMethod === 'bank'
                        ? 'bg-purple-50 border-purple-500 text-purple-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Bank Transfer
                  </button>
                </div>
              </div>

              {paymentMethod === 'card' ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.cardNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      id="cardHolder"
                      name="cardHolder"
                      placeholder="John Doe"
                      value={cardDetails.cardHolder}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={cardDetails.expiryDate}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processing ? 'Processing...' : `Pay ${formatCurrency(plan.price, plan.currency)}`}
                  </button>
                </form>
              ) : (
                <div>
                  <div className="bg-gray-50 p-4 rounded-md mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Bank Transfer Instructions</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Please transfer the exact amount to the following bank account:
                    </p>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Bank:</span> First Bank of Nigeria</p>
                      <p><span className="font-medium">Account Name:</span> 360Nurse Healthcare Ltd</p>
                      <p><span className="font-medium">Account Number:</span> 1234567890</p>
                      <p><span className="font-medium">Amount:</span> {formatCurrency(plan.price, plan.currency)}</p>
                      <p><span className="font-medium">Reference:</span> SUB-{session?.user?.id?.substring(0, 8)}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-6">
                    After making the transfer, please click the button below to confirm your payment. We will verify your payment and activate your subscription within 24 hours.
                  </p>
                  
                  <button
                    onClick={handleSubmit}
                    disabled={processing}
                    className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processing ? 'Processing...' : 'Confirm Bank Transfer'}
                  </button>
                </div>
              )}
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  By subscribing, you agree to our <Link href="/terms" className="text-purple-600 hover:text-purple-800">Terms of Service</Link> and <Link href="/privacy" className="text-purple-600 hover:text-purple-800">Privacy Policy</Link>.
                </p>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="bg-gray-50 p-6 rounded-md">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">{plan.name}</span>
                  <span className="font-medium">{formatCurrency(plan.price, plan.currency)}</span>
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  Billed {plan.interval.toLowerCase()}
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="font-bold text-gray-900">{formatCurrency(plan.price, plan.currency)}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">What's included:</h3>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-md border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-3">
                  If you have any questions about your subscription, please contact our support team.
                </p>
                <Link
                  href="/contact"
                  className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
