// Paystack API helper functions
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || 'sk_test_your_test_key_here';
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

// Initialize a transaction
export async function initializeTransaction(data: {
  email: string;
  amount: number;
  currency?: string;
  reference?: string;
  callback_url?: string;
  metadata?: any;
}) {
  try {
    const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error('Error initializing Paystack transaction:', error);
    throw error;
  }
}

// Verify a transaction
export async function verifyTransaction(reference: string) {
  try {
    const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error verifying Paystack transaction:', error);
    throw error;
  }
}

// Get transaction details
export async function getTransaction(id: string) {
  try {
    const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error getting Paystack transaction:', error);
    throw error;
  }
}
