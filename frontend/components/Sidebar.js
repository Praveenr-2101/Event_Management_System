"use client";

import { logout } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Sidebar({ isOpen, onToggle, onLogout }) {
  const router = useRouter();

  const handleProfileClick = () => {
    onToggle(false);
    router.push("/profile");
  };

  const handleLogout = () => {
    onToggle(false);
    logout();
  };


  return (
    <div
      className={`absolute top-0 left-0 bottom-0 w-64 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-600 shadow-md transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } z-40`}
    >
      <div className="flex flex-col h-full p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Menu
          </h2>
          <button
            onClick={() => onToggle(false)}
            className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 lg:hidden p-1 rounded-full hover:bg-teal-100 dark:hover:bg-teal-900/20"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>
        <nav className="flex flex-col gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-colors duration-200 p-2 rounded-md hover:bg-teal-50 dark:hover:bg-teal-900/20"
            onClick={() => onToggle(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/events"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-colors duration-200 p-2 rounded-md hover:bg-teal-50 dark:hover:bg-teal-900/20"
            onClick={() => onToggle(false)}
          >
            Events
          </Link>
          <button
            onClick={handleProfileClick}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-colors duration-200 p-2 rounded-md hover:bg-teal-50 dark:hover:bg-teal-900/20 text-left"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors duration-200 p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-left"
          >
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
}
