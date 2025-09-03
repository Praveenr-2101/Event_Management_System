"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import EventCard from "@/components/EventCard";
import Loader from "@/components/Loader";
import { isAuthenticated } from "@/lib/auth";
import { useRouter } from "next/navigation";

const normalizeUrl = (url) => {
  if (!url) return null;

  if (url.startsWith("http")) {
    const u = new URL(url);
    url = u.pathname + u.search;
  }

  if (url.startsWith("/api/")) {
    url = url.replace("/api", "");
  }
  return url;
};

export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }
  }, [router]);

  const fetchEvents = async (url = "/events/", params = {}) => {
    try {
      setLoading(true);
      const res = await api.get(normalizeUrl(url), { params });

      setEvents(res.data?.results ?? []);
      setNext(normalizeUrl(res.data?.next));
      setPrevious(normalizeUrl(res.data?.previous));
    } catch (err) {
      console.error("Error fetching events:", err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await api.delete(`/events/${id}/`);
      setEvents((prev) => prev.filter((event) => event.id !== id));
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchEvents("/events/", search.trim() ? { title: search } : {});
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-10 gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            All Events
          </h1>
          <Link
            href="/events/new"
            className="flex items-center bg-blue-600 dark:bg-blue-500 text-white px-6 py-2.5 rounded-md font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Event
          </Link>
        </div>

        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search events by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 
                         bg-white dark:bg-gray-900/70 text-gray-900 dark:text-gray-100 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
              />
            </svg>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-6 sm:p-8 text-center">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No events found. Start by{" "}
              <Link
                href="/events/new"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                creating an event
              </Link>
              .
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} onDelete={handleDelete} />
              ))}
            </div>

            <div className="flex justify-center gap-4 mt-8">
              {previous && (
                <button
                  onClick={() => fetchEvents(previous)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Previous
                </button>
              )}
              {next && (
                <button
                  onClick={() => fetchEvents(next)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Next
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
