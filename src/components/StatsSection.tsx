// components/StatsSection.tsx

'use client';

import React, { useEffect, useState } from 'react';

interface StatProps {
  value: number;
  label: string;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const CountUpStat: React.FC<StatProps> = ({ 
  value, 
  label, 
  duration = 2000, 
  suffix = "", 
  prefix = "" 
}) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const step = Math.ceil(value / (duration / 50));
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current > value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 50);
    
    return () => {
      clearInterval(timer);
    };
  }, [value, duration]);
  
  return (
    <div className="text-center">
      <div className="relative">
        {/* Decorative circle */}
        <div className="absolute -inset-4 rounded-full bg-teal-100 opacity-50 transform -rotate-3"></div>
        <div className="relative">
          <p className="text-4xl md:text-5xl font-bold text-teal-600">
            {prefix}{count.toLocaleString()}{suffix}
          </p>
        </div>
      </div>
      <p className="mt-3 text-lg font-medium text-gray-700">{label}</p>
    </div>
  );
};

const StatsSection: React.FC = () => {
  const stats = [
    { value: 150000, label: "Patients Monitored", suffix: "+" },
    { value: 40, label: "Response Time Reduction", suffix: "%" },
    { value: 3500, label: "Healthcare Professionals", suffix: "+" },
    { value: 25, label: "Regions Served", prefix: "" }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-purple-200 rounded-full opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-teal-200 rounded-full opacity-20 transform translate-x-1/4 translate-y-1/4"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our <span className="text-teal-600">Impact</span>
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            360Nurse is making a real difference in healthcare accessibility across underserved regions.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <CountUpStat
              key={index}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              prefix={stat.prefix}
            />
          ))}
        </div>
        
        <div className="mt-16 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 bg-gradient-to-br from-teal-500 to-teal-600 text-white">
              <h3 className="text-2xl font-bold mb-4">Transforming Healthcare Delivery</h3>
              <p className="text-teal-50 mb-6">
                Our platform bridges the gap between patients and healthcare providers in regions with limited access to medical facilities.
              </p>
              <ul className="space-y-2">
                {[
                  "Reduced hospital readmissions by 35%",
                  "Increased preventative care by 45%",
                  "Improved patient outcomes in rural areas",
                  "Lowered healthcare costs by 30%"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-purple-300 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 md:p-12 bg-white">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                360Nurse is committed to expanding healthcare access to the most remote and underserved communities across Africa and beyond.
              </p>
              <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                <p className="text-gray-700 italic">
                  "Our goal is to ensure that quality healthcare is not a privilege but a right accessible to all, regardless of geographical location or economic status."
                </p>
                <p className="mt-2 text-teal-600 font-medium">— Founder, Favour Edozie</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;