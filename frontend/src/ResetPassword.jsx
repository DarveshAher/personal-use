import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background gradient circles */}
      <div className="absolute top-20 right-52 w-60 h-60 rounded-full bg-gradient-to-br from-purple-900 to-purple-600 blur-3xl opacity-80"></div>
      <div className="absolute bottom-20 left-40 w-56 h-56 rounded-full bg-gradient-to-br from-purple-900 to-purple-600 blur-3xl opacity-80"></div>

      {/* Left Section */}
      <div className="flex-1 text-white pl-20 z-10">
        <h1 className="text-5xl font-bold">Welcome To Taxpal</h1>
        <p className="mt-6 inline-block border border-white px-4 py-2 text-lg italic font-semibold rounded">
          Update your Password!!
        </p>
      </div>

      {/* Reset Password Card */}
      <div className="flex-1 flex items-center justify-center z-10">
        <div className="bg-black/50 shadow-lg rounded-xl p-8 w-96 border border-gray-700 backdrop-blur-md">
          <h2 className="text-xl font-semibold text-white">Reset Password</h2>
          <p className="text-gray-400 text-sm mb-6">Set your New Password!!</p>

          {/* New Password with eye toggle */}
          <div className="relative mb-4">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              className="w-full px-4 py-2 pr-10 rounded border border-gray-600 bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span
              className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password with eye toggle */}
          <div className="relative mb-6">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 pr-10 rounded border border-gray-600 bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span
              className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Submit */}
          <button className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:opacity-90 transition">
            Submit
          </button>

          <p className="text-gray-400 text-sm mt-4 text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-purple-400 hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
