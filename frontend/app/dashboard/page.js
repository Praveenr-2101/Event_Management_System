"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";


export default function DashboardPage() {

  const router = useRouter();
  
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
    }
  }, [router]);


  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto">

        <div className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Event Management Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-base sm:text-lg">
            Your central hub for planning, organizing, and tracking unforgettable events.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-6 sm:p-8 mb-6 transition-all duration-200 hover:shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
            Welcome to Your Event Management Hub
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Our platform simplifies event management, empowering you to create seamless experiences for any occasion—be it a small meetup, corporate seminar, or large-scale conference. With intuitive tools and a user-friendly interface, you can focus on what matters most: delivering memorable moments for your attendees.
          </p>
        </div>

      
        <div className="bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-6 sm:p-8 mb-6 transition-all duration-200 hover:shadow-2xl">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Event Planning Tips
          </h2>
          <ul className="space-y-4 text-gray-600 dark:text-gray-300">
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <span className="font-medium">Set Clear Goals</span>: Define the purpose of your event, whether it’s networking, education, or celebration, to guide your planning process.
              </div>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <span className="font-medium">Choose the Right Venue</span>: Select a location that aligns with your event’s size, theme, and accessibility needs.
              </div>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <span className="font-medium">Engage Your Audience</span>: Incorporate interactive elements like Q&A sessions or live polls to keep attendees involved.
              </div>
            </li>
          </ul>
        </div>

       
        <div className="bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-6 sm:p-8 mb-6 transition-all duration-200 hover:shadow-2xl">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Why Choose Our Platform?
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Streamlined event creation and management with a user-friendly interface.
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Centralized dashboard for all your events with detailed insights.
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Flexible editing tools to update event details in real time.
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Secure authentication to protect your data and ensure privacy.
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-200 hover:shadow-2xl">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Start Managing Your Events
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Ready to take control of your events? Visit the{" "}
            <Link href="/events" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              Events page
            </Link>{" "}
            to create, view, and manage your events with ease.
          </p>
        </div>
      </div>
    </div>
  );
}