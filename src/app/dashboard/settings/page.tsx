"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [saving, setSaving] = useState(false);
  
  // Form states
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [theme, setTheme] = useState("system");
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Settings saved successfully");
      setSaving(false);
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-md overflow-hidden sm:rounded-xl border border-gray-200">
        <div className="px-6 py-6 sm:px-8 bg-gradient-to-r from-teal-500 to-teal-600">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-white p-2 rounded-full mr-4">
              <svg className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl leading-6 font-bold text-white">
                Settings
              </h3>
              <p className="mt-1 text-sm text-teal-100">
                Manage your account preferences
              </p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="px-6 py-6 sm:p-8 bg-white">
          <div className="space-y-8">
            {/* Notifications Section */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Notifications</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="notifications" className="font-medium text-gray-700">Enable Notifications</label>
                    <p className="text-sm text-gray-500">Receive alerts and updates about your health</p>
                  </div>
                  <button
                    type="button"
                    className={`${
                      notificationsEnabled ? 'bg-teal-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2`}
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`${
                        notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                </div>
                
                {notificationsEnabled && (
                  <div className="ml-4 space-y-4 border-l-2 border-gray-100 pl-4">
                    <div className="flex items-center">
                      <input
                        id="email-notifications"
                        name="email-notifications"
                        type="checkbox"
                        checked={emailNotifications}
                        onChange={() => setEmailNotifications(!emailNotifications)}
                        className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <label htmlFor="email-notifications" className="ml-3 text-sm text-gray-700">
                        Email Notifications
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="sms-notifications"
                        name="sms-notifications"
                        type="checkbox"
                        checked={smsNotifications}
                        onChange={() => setSmsNotifications(!smsNotifications)}
                        className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <label htmlFor="sms-notifications" className="ml-3 text-sm text-gray-700">
                        SMS Notifications
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Appearance Section */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Appearance</h4>
              <div className="space-y-4">
                <div>
                  <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                    Theme
                  </label>
                  <select
                    id="theme"
                    name="theme"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  >
                    <option value="system">System Default</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Privacy Section */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Privacy</h4>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Coming Soon</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>
                        Privacy settings will be available in a future update. This will allow you to control how your data is shared with healthcare providers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              {saving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Settings
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      
      {/* Account Section */}
      <div className="bg-white shadow-md overflow-hidden sm:rounded-xl border border-gray-200">
        <div className="px-6 py-6 sm:px-8 bg-gradient-to-r from-red-500 to-red-600">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-white p-2 rounded-full mr-4">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl leading-6 font-bold text-white">
                Account
              </h3>
              <p className="mt-1 text-sm text-red-100">
                Manage your account settings
              </p>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-6 sm:p-8 bg-white">
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Danger Zone</h4>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Account Management</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>
                        These actions are irreversible. Please be certain before proceeding.
                      </p>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => toast.error("This feature is not available in the demo")}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
