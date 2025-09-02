"use client";

import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

export default function AuthForm({ onSubmit, children }) {
  const [form, setForm] = useState({ email: "", password: "" });
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
      setError("Authentication failed");
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 w-full"
      >
        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Login
        </h1>
        <ErrorMessage message={error} />

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 dark:placeholder-gray-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 dark:placeholder-gray-400"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
        >
          Login
        </button>
      </form>

      {children && (
        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          {children}
        </div>
      )}
    </div>
  );
}
