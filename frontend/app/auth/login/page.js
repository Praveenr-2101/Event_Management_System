"use client";

import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import api from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async ({ email, password }) => {
    try {
      const res = await api.post("/user/login/", { email, password });

      localStorage.setItem("accessToken", res.data.access);
      localStorage.setItem("refreshToken", res.data.refresh);

      router.push("/dashboard");
      
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      throw new Error("Authentication failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--background)]">
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
}
