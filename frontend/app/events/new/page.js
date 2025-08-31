"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import EventForm from "@/components/EventForm";
import api from "@/lib/api";

export default function NewEventPage() {
  const router = useRouter();

  const handleCreate = async (form) => {
    try {
      await api.post("/events/", form);
      router.push("/events");
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto">
    
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-10 gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Create a New Event
          </h1>
          <Link
            href="/events"
            className="flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Events
          </Link>
        </div>

        <EventForm onSubmit={handleCreate} />
      </div>
    </div>
  );
}