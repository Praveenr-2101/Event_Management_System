"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState({ firstName: "", lastName: "", email: "" });
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/user/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch profile");
        const data = await response.json();
        setProfile({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          email: data.email || "",
        });
      } catch (err) {
        setError("Unable to load profile. Please try again.");
      }
    };

    fetchProfile();
  }, [token, router]);

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8 ml-64 lg:ml-72">
        <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
          <div className="flex items-center space-x-6 mb-6">
            <div className="relative w-24 h-24">
              <svg
                className="w-full h-full text-teal-600 bg-gray-700 rounded-full p-2 border-2 border-teal-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-teal-400">Profile</h1>
              <p className="text-sm text-gray-400">Welcome to your personal dashboard</p>
            </div>
          </div>
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