import React from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-136px)] flex items-center justify-center bg-[#f5f7fa] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">M</span>
          </div>

          <h2 className="text-3xl font-bold text-text">Login</h2>
          <p className="text-muted mt-2">
            Ministry of Statistics and Programme Implementation
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <button
            className="w-full bg-orange hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-md transition"
          >
            Login
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-secondary font-semibold hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};