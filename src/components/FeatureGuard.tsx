"use client";

import React, { ReactNode } from 'react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import Link from 'next/link';

interface FeatureGuardProps {
  feature: string;
  children: ReactNode;
  fallback?: ReactNode;
}

const FeatureGuard: React.FC<FeatureGuardProps> = ({ 
  feature, 
  children, 
  fallback 
}) => {
  const { hasFeature, isLoading } = useSubscription();

  if (isLoading) {
    return (
      <div className="animate-pulse flex flex-col items-center p-6 bg-gray-50 rounded-lg">
        <div className="h-8 w-40 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 w-60 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-52 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (hasFeature(feature)) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg text-center">
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Premium Feature
      </h3>
      <p className="text-gray-600 mb-4">
        This feature requires a subscription upgrade.
      </p>
      <Link
        href="/dashboard/subscription"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        Upgrade Subscription
      </Link>
    </div>
  );
};

export default FeatureGuard;
