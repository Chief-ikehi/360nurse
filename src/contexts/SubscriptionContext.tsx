"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
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

interface SubscriptionContextType {
  subscription: Subscription | null;
  isLoading: boolean;
  hasFeature: (featureName: string) => boolean;
  isSubscriptionActive: () => boolean;
  refreshSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}

interface SubscriptionProviderProps {
  children: ReactNode;
}

export function SubscriptionProvider({ children }: SubscriptionProviderProps) {
  const { data: session } = useSession();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // We no longer need mock subscription data as we'll use real data from the API

  const fetchSubscription = async () => {
    if (!session?.user?.id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/subscription/user');

      if (response.ok) {
        const data = await response.json();
        setSubscription(data.subscription);
      } else if (response.status !== 404) {
        // 404 means no subscription, which is fine
        console.error('Failed to load subscription information');
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, [session?.user?.id]);

  // Define feature access based on subscription plan
  const BASIC_FEATURES = [
    'health_alerts',
    'vital_signs_monitoring',
    'emergency_alerts'
  ];

  const PREMIUM_FEATURES = [
    'health_alerts',
    'vital_signs_monitoring',
    'emergency_alerts',
    'nurse_consultations',
    'priority_support'
  ];

  const hasFeature = (featureName: string): boolean => {
    // If no subscription, return false - no features available
    if (!subscription) return false;

    // If subscription is not active, return false
    if (subscription.status !== 'ACTIVE') return false;

    // Check if the feature is included in the subscription plan
    if (subscription.plan.name === 'Basic Plan') {
      return BASIC_FEATURES.includes(featureName);
    } else if (subscription.plan.name === 'Premium Plan') {
      return PREMIUM_FEATURES.includes(featureName);
    }

    // Default to checking the plan's features array
    return subscription.plan.features.includes(featureName);
  };

  const isSubscriptionActive = (): boolean => {
    return subscription?.status === 'ACTIVE';
  };

  const refreshSubscription = async (): Promise<void> => {
    await fetchSubscription();
  };

  const value = {
    subscription,
    isLoading,
    hasFeature,
    isSubscriptionActive,
    refreshSubscription,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}
