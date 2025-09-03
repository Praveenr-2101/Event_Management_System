"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { isAuthenticated } from "@/lib/auth"

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState({ firstName: "", lastName: "", email: "" });
  const [error, setError] = useState("");



  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await api.get("/user/profile/");
        const data = response.data;

        setProfile({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          email: data.email || "",
        });
      } catch (err) {
        console.error(err);
        setError("Unable to load profile. Please try again.");
      }
    };

    fetchProfile();
  }, [router]);

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
          <h1 className="text-2xl font-bold text-teal-400 mb-4">Profile</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">First Name</label>
              <p className="mt-1 text-lg bg-gray-700 p-2 rounded-md border border-gray-600">
                {profile.firstName || "N/A"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Last Name</label>
              <p className="mt-1 text-lg bg-gray-700 p-2 rounded-md border border-gray-600">
                {profile.lastName || "N/A"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <p className="mt-1 text-lg bg-gray-700 p-2 rounded-md border border-gray-600">
                {profile.email || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
