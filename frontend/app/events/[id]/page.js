"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import Loader from "@/components/Loader";
import { ArrowLeft, Edit, Trash2, MapPin, Calendar } from "lucide-react";

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await api.delete(`/events/${id}/`);
      router.push("/events"); // Redirect to events list after delete
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  if (loading) return <Loader />;
  if (!event)
    return (
      <p className="text-center text-gray-500 mt-8 text-lg">
        Event not found
      </p>
    );

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900 dark:text-white">
          Event Details
        </h1>

        {/* Event Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-teal-600 to-cyan-700 px-6 py-5">
            <h2 className="text-2xl font-bold text-white">{event.title}</h2>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {event.description || "No description provided."}
            </p>

            {/* Info Section */}
            <div className="space-y-3">
              <p className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <span className="font-medium">Venue:</span> {event.venue || "TBA"}
              </p>
              <p className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                <Calendar className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <span className="font-medium">Date & Time:</span> {event.date} at {event.time}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-3 justify-end">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={() => router.push(`/events/${id}/edit`)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-medium transition-all"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
