"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export default function Navbar({ onToggleSidebar, isSidebarOpen }) {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(null); 

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated();
      setIsAuth(authStatus);
    };

    checkAuth();

    const handleAuthChange = async () => {
      const authStatus = await isAuthenticated();
      setIsAuth(authStatus);
    };

    window.addEventListener("storage", handleAuthChange);
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const toggleSidebar = () => {
    console.log("Toggling sidebar, new state:", !isSidebarOpen);
    onToggleSidebar(!isSidebarOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-white hover:text-teal-200 focus:outline-none p-2 rounded-full hover:bg-teal-500/20 transition-all duration-200"
          aria-label="Toggle sidebar"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold text-white hover:text-teal-200 transition-colors duration-200"
        >
          Event Management
        </Link>
      </div>
      <div className="flex items-center gap-3">
        {isAuth === null ? null : !isAuth ? (
          <Link
            href="/auth/login"
            className="bg-white text-teal-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 hover:text-teal-700 transition-all duration-200 shadow-md"
          >
            Login
          </Link>
        ) : null}
      </div>
    </nav>
  );
}