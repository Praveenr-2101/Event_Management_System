"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-teal-900 to-cyan-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0">
          <h3 className="text-lg font-semibold">Event Management App</h3>
          <p className="text-sm mt-1">Empowering unforgettable events, one click at a time.</p>
        </div>
        <nav className="flex flex-col sm:flex-row gap-4 mb-4 sm:mb-0">
          <Link href="/about" className="text-sm hover:text-teal-200 transition-colors duration-200">
            About
          </Link>
          <Link href="/contact" className="text-sm hover:text-teal-200 transition-colors duration-200">
            Contact
          </Link>
          <Link href="/privacy" className="text-sm hover:text-teal-200 transition-colors duration-200">
            Privacy
          </Link>
          <Link href="/terms" className="text-sm hover:text-teal-200 transition-colors duration-200">
            Terms
          </Link>
        </nav>
      </div>
      <div className="text-center text-xs mt-4">
        &copy; 2025 Event Management App. All rights reserved.
      </div>
    </footer>
  );
}