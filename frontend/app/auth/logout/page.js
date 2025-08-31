"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        // Call backend logout endpoint
        await api.post("/user/logout/");
      } catch (err) {
        console.error("Logout failed:", err);
      } finally {
        // Clear token from localStorage and redirect to login
        localStorage.removeItem("token");
        router.replace("/auth/login");
      }
    };

    logout();
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <p className="text-lg">Logging out...</p>
    </div>
  );
}
