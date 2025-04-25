// components/Footer.tsx
import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Use Cases", href: "/use-cases" },
        { name: "API", href: "/developers" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Blog", href: "/blog" },
        { name: "Press", href: "/press" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "Tutorials", href: "/tutorials" },
        { name: "Case Studies", href: "/case-studies" },
        { name: "Support", href: "/support" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Security", href: "/security" },
        { name: "Compliance", href: "/compliance" },
      ]
    }
  ];
  
  const socialLinks = [
    {
      name: "Twitter",
      href: "#",
      icon: (
        <svg className="h-full w-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: (
        <svg className="h-full w-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "#",
      icon: (
        <svg className="h-full w-full" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (
        <svg className="h-full w-full" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:py-16 lg:px-8">
        {/* Top section */}
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Logo and company info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3">
            <div className="flex items-center">
              <svg className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-xl font-bold sm:text-2xl">
                360<span className="text-purple-300">Nurse</span>
              </span>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              A nurse-led remote patient monitoring platform designed to deliver quality healthcare in underserved regions.
            </p>
            
            {/* Social Links (larger on mobile) */}
            <div className="mt-6 flex space-x-5">
              {socialLinks.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="text-gray-400 hover:text-teal-400 transition-colors duration-300 h-8 w-8 sm:h-6 sm:w-6"
                  aria-label={item.name}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Footer sections in columns */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-9 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerSections.map((section) => (
              <div key={section.title} className="col-span-1">
                <h3 className="text-sm font-semibold text-purple-300 tracking-wider uppercase">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href} 
                        className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Newsletter section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-3 lg:gap-x-8 lg:items-center">
            <div className="lg:col-span-2">
              <h3 className="text-sm font-semibold text-teal-400 tracking-wider uppercase">
                Subscribe to our newsletter
              </h3>
              <p className="mt-2 text-sm sm:text-base text-gray-400">
                Stay updated with the latest features, use cases, and healthcare insights.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row sm:gap-2">
              <div className="flex-grow min-w-0">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent rounded-md focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mt-3 sm:mt-0">
                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-between sm:items-center">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} 360Nurse. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-y-2 gap-x-6">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;