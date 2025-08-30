import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/forgot-password", { email });
      toast.success(res.data.message, { position: "top-right" });
      setTimeout(() => navigate("/reset-password"), 1000); // optional redirect
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed", { position: "top-right" });
    }
  };

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-20 right-52 w-60 h-60 rounded-full bg-gradient-to-br from-purple-900 to-purple-600 blur-3xl opacity-80"></div>
      <div className="absolute bottom-20 left-40 w-56 h-56 rounded-full bg-gradient-to-br from-purple-900 to-purple-600 blur-3xl opacity-80"></div>

      <div className="flex-1 text-white pl-20 z-10">
        <h1 className="text-5xl font-bold">Welcome To Taxpal</h1>
        <p className="mt-6 inline-block border border-white px-4 py-2 text-lg italic font-semibold rounded">
          Don’t worry. We’ve got you..!
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center z-10">
       
        <div className="bg-black/50 shadow-lg rounded-xl p-8 w-96 border border-gray-700 backdrop-blur-md">
          <h2 className="text-xl font-semibold text-white">Forgot Password ?</h2>
          <p className="text-gray-400 text-sm mb-6">Please enter your email</p>

          {/* Email Input */}
          <input
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-6 px-4 py-2 rounded border border-gray-600 bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Submit Button */}
          <button
            onClick={handleForgotPassword}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:opacity-90 transition"
          >
            Submit
          </button>

          <p className="text-gray-400 text-sm mt-4 text-center">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-purple-400 hover:underline"
            >
              Signup
            </button>
          </p>
        </div>
      </div>

      {/* Toastify */}
      <ToastContainer position="top-right" />
    </div>
  );
}
