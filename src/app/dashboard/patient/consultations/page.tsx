"use client";

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import FeatureGuard from '@/components/FeatureGuard';
import toast from 'react-hot-toast';

interface Consultation {
  id: string;
  nurseName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'canceled';
  notes?: string;
}

export default function ConsultationsPage() {
  const { data: session } = useSession();
  const [consultations, setConsultations] = useState<Consultation[]>([
    {
      id: '1',
      nurseName: 'Jane Smith',
      date: '2023-06-15',
      time: '10:00 AM',
      status: 'completed',
      notes: 'Discussed blood pressure management and medication adherence.',
    },
    {
      id: '2',
      nurseName: 'Michael Johnson',
      date: '2023-07-02',
      time: '2:30 PM',
      status: 'completed',
      notes: 'Reviewed diet plan and exercise routine.',
    },
    {
      id: '3',
      nurseName: 'Sarah Williams',
      date: '2023-08-10',
      time: '11:15 AM',
      status: 'scheduled',
    },
  ]);

  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [newConsultation, setNewConsultation] = useState({
    date: '',
    time: '',
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewConsultation(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleScheduleConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!newConsultation.date || !newConsultation.time) {
      toast.error('Please select a date and time for your consultation');
      return;
    }

    // In a real app, we would send this to the server
    const consultation: Consultation = {
      id: Math.random().toString(36).substring(2, 9),
      nurseName: 'Available Nurse',
      date: newConsultation.date,
      time: newConsultation.time,
      status: 'scheduled',
      notes: newConsultation.notes,
    };

    setConsultations(prev => [...prev, consultation]);
    setNewConsultation({ date: '', time: '', notes: '' });
    setShowScheduleForm(false);
    toast.success('Consultation scheduled successfully!');
  };

  const handleCancelConsultation = (id: string) => {
    setConsultations(prev =>
      prev.map(consultation =>
        consultation.id === id
          ? { ...consultation, status: 'canceled' }
          : consultation
      )
    );
    toast.success('Consultation canceled');
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <FeatureGuard feature="nurse_consultations">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Nurse Consultations</h1>
          <button
            onClick={() => setShowScheduleForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Schedule Consultation
          </button>
        </div>

        {showScheduleForm && (
          <div className="bg-purple-50 p-6 rounded-lg shadow-sm border border-purple-100">
            <h2 className="text-lg font-medium text-purple-800 mb-4">Schedule a New Consultation</h2>
            <form onSubmit={handleScheduleConsultation} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={newConsultation.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={newConsultation.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={newConsultation.notes}
                  onChange={handleInputChange}
                  placeholder="Please describe the reason for your consultation..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowScheduleForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {consultations.length > 0 ? (
              consultations.map((consultation) => (
                <li key={consultation.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">
                            Nurse: {consultation.nurseName}
                          </h3>
                          <div className="mt-1 flex items-center">
                            <svg className="h-5 w-5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-gray-600">{formatDate(consultation.date)}</span>
                            <span className="mx-2 text-gray-500">•</span>
                            <svg className="h-5 w-5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-600">{consultation.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            consultation.status === 'scheduled'
                              ? 'bg-green-100 text-green-800'
                              : consultation.status === 'completed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                        </span>
                        {consultation.status === 'scheduled' && (
                          <button
                            onClick={() => handleCancelConsultation(consultation.id)}
                            className="ml-4 text-sm text-red-600 hover:text-red-800"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                    {consultation.notes && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Notes:</span> {consultation.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-6 text-center text-gray-500">
                No consultations found. Schedule your first consultation with a nurse.
              </li>
            )}
          </ul>
        </div>
      </div>
    </FeatureGuard>
  );
}
