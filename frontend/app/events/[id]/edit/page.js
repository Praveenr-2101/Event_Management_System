"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import EventForm from "@/components/EventForm";
import api from "@/lib/api";
import Loader from "@/components/Loader";

export default function EditEventPage() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}/`);
        setEvent(res.data);
      } catch (err) {
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleUpdate = async (form) => {
    try {
      await api.put(`/events/${id}/`, form);
      router.push("/events");
    } catch (error) {
      console.error("Error updating event:", error);
      throw error; 
    }
  };

  if (loading) return <Loader />;
  if (!event) {
    return (
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-6 sm:p-8 text-center">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Event not found. Return to{" "}
              <Link href="/events" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                Events page
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-10 gap-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Update Info
          </h2>
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

        {/* Form Section */}
        <EventForm initialData={event} onSubmit={handleUpdate} />
      </div>
    </div>
  );
}