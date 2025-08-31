"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthForm from "@/components/AuthForm";
import api from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async ({ email, password }) => {
    const res = await api.post("/user/login/", { email, password });
    localStorage.setItem("token", res.data.access);
    localStorage.setItem("refresh", res.data.refresh); 
    router.push("/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--background)]">
      <AuthForm type="login" onSubmit={handleLogin}>
        <p>
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-blue-600 dark:text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </AuthForm>
    </div>
  );
}