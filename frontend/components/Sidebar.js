"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function Sidebar({ isOpen, onToggle, onLogout }) {
  const router = useRouter();

  const handleProfileClick = async () => {
    try {
      const response = await api.get("/user/profile/");
      console.log("Profile data:", response.data);
      onToggle(false);
      router.push("/profile");
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      if (error.response?.status === 401) onLogout();
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-600 shadow-md transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } z-40 lg:static lg:translate-x-0 lg:w-64 lg:min-h-screen`}
    >
      <div className="flex flex-col h-full p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Menu</h2>
          <button
            onClick={() => onToggle(false)}
            className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 lg:hidden p-1 rounded-full hover:bg-teal-100 dark:hover:bg-teal-900/20"
            aria-label="Close sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-colors duration-200 p-2 rounded-md hover:bg-teal-50 dark:hover:bg-teal-900/20"
            onClick={() => onToggle(false)}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Dashboard
          </Link>
          <Link
            href="/events"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-colors duration-200 p-2 rounded-md hover:bg-teal-50 dark:hover:bg-teal-900/20"
            onClick={() => onToggle(false)}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Events
          </Link>
          <button
            onClick={handleProfileClick}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-colors duration-200 p-2 rounded-md hover:bg-teal-50 dark:hover:bg-teal-900/20 text-left"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Profile
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors duration-200 p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h3a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
}