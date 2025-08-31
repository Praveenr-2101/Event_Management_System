"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { logout, isAuthenticated } from "@/lib/auth";

const Sidebar = dynamic(() => import("@/components/Sidebar"), { ssr: false });

export default function ClientLayout({ children }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(isAuthenticated());

    const authCheckInterval = setInterval(() => {
      const authStatus = isAuthenticated();
      setIsAuth(authStatus);
      if (!authStatus) setIsSidebarOpen(false);
    }, 100);

    const handleStorageChange = () => {
      const authStatus = isAuthenticated();
      setIsAuth(authStatus);
      if (!authStatus) setIsSidebarOpen(false);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleStorageChange);
      clearInterval(authCheckInterval);
    };
  }, [isSidebarOpen]);

  const handleLogout = () => {
    logout();
    setIsAuth(false);
    setIsSidebarOpen(false);
    router.push("/auth/login");
  };

  return (
    <>
      <Navbar onToggleSidebar={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
      <div className="flex flex-1 min-h-screen">
        {isAuth && (
          <Sidebar
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            onLogout={handleLogout}
          />
        )}
        <main
          className={`flex-1 p-6 sm:p-8 lg:p-10 mx-auto max-w-7xl transition-all duration-300 ${
            isAuth ? "ml-0 lg:ml-4" : "w-full"
          }`}
        >
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}