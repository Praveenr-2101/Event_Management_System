"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthForm from "@/components/AuthForm";
import api from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async ({ email, password }) => {
    await api.post("/user/register/", { email, password });
    router.push("/auth/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--background)]">
      <AuthForm type="register" onSubmit={handleRegister}>
        <p>
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 dark:text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </AuthForm>
    </div>
  );
}