"use client";

import React from 'react';
import Link from 'next/link';
import { useSubscription } from '@/contexts/SubscriptionContext';

const SubscriptionStatusCard: React.FC = () => {
  const { subscription, isLoading } = useSubscription();

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

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Subscription</h3>
        <p className="text-gray-600 mb-4">
          You don't have an active subscription. Subscribe now to access premium features.
        </p>
        <Link
          href="/dashboard/subscription"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          View Plans
        </Link>
      </div>
    );
  }

  const daysRemaining = getDaysRemaining(subscription.currentPeriodEnd);
  const isExpiringSoon = daysRemaining <= 7 && daysRemaining > 0;
  const isExpired = daysRemaining <= 0;

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 border ${
      isExpiringSoon ? 'border-yellow-300' : 
      isExpired ? 'border-red-300' : 
      'border-green-300'
    }`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">{subscription.plan.name}</h3>
          <p className="text-gray-600">
            {formatCurrency(subscription.plan.price, subscription.plan.currency)} / {subscription.plan.interval.toLowerCase()}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          subscription.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
          subscription.status === 'CANCELED' ? 'bg-yellow-100 text-yellow-800' : 
          'bg-gray-100 text-gray-800'
        }`}>
          {subscription.status === 'ACTIVE' ? 'Active' : 
           subscription.status === 'CANCELED' ? 'Canceled' : 
           subscription.status}
        </span>
      </div>

      <div className="mt-4">
        {subscription.status === 'ACTIVE' && (
          <>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Current period ends:</span>
                <span className="font-medium">{formatDate(subscription.currentPeriodEnd)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    isExpiringSoon ? 'bg-yellow-500' : 
                    isExpired ? 'bg-red-500' : 
                    'bg-green-500'
                  }`} 
                  style={{ width: `${Math.max(0, Math.min(100, (daysRemaining / 30) * 100))}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {isExpired ? (
                  <span className="text-red-600 font-medium">Subscription expired</span>
                ) : isExpiringSoon ? (
                  <span className="text-yellow-600 font-medium">{daysRemaining} days remaining</span>
                ) : (
                  <span>{daysRemaining} days remaining</span>
                )}
              </div>
            </div>
          </>
        )}

        {subscription.status === 'CANCELED' && (
          <p className="text-sm text-yellow-600 mb-2">
            Your subscription will end on {formatDate(subscription.currentPeriodEnd)}
          </p>
        )}

        <Link
          href="/dashboard/subscription"
          className="mt-2 inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800"
        >
          Manage Subscription
          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default SubscriptionStatusCard;
