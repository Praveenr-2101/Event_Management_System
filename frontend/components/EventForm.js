import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

export default function EventForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    venue: initialData.venue || "",
    date: initialData.date || "",
    time: initialData.time || "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(form);
      setError("");
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <div className="w-full bg-[var(--background)] text-[var(--foreground)]">
  <form
    onSubmit={handleSubmit}
    className="bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-lg mx-auto transition-all duration-200 hover:shadow-2xl"
  >
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
          {initialData.id ? "Edit Event" : "Create Event"}
        </h1>
        <ErrorMessage message={error} />

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={form.title}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 dark:placeholder-gray-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Event Description"
              value={form.description}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 dark:placeholder-gray-400"
              rows="4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Venue
            </label>
            <input
              type="text"
              name="venue"
              placeholder="Event Venue"
              value={form.venue}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 dark:placeholder-gray-400"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Time
              </label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 dark:placeholder-gray-400"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 dark:bg-blue-500 text-white py-2.5 rounded-md font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
        >
          {initialData.id ? "Update Event" : "Create Event"}
        </button>
      </form>
    </div>
  );
}