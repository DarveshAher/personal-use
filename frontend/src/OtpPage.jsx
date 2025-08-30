
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { showToast } from "./components/Toast";

const API = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export default function OtpPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);

  async function requestOtp(e) {
    e.preventDefault();
    setLoadingSend(true);
    try {
      const r = await fetch(`${API}/auth/request-login-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await r.json();
      if (r.ok) {
        showToast(data.message || "OTP sent", "success");
        if (data.code) {
          showToast(`DEV OTP: ${data.code}`, "warning", 5000);
        }
      } else {
        showToast(data.message || "Failed to send OTP", "error");
      }
    } catch (err) {
      showToast("Network error requesting OTP", "error");
    } finally {
      setLoadingSend(false);
    }
  }

  async function verifyOtp(e) {
    e.preventDefault();
    setLoadingVerify(true);
    try {
      const r = await fetch(`${API}/auth/verify-login-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await r.json();
      if (r.ok) {
        showToast(data.message || "OTP verified", "success");
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
      } else {
        showToast(data.message || "Invalid code", "error");
      }
    } catch (err) {
      showToast("Network error verifying OTP", "error");
    } finally {
      setLoadingVerify(false);
    }
  }

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background gradient circles (kept) */}
      <div className="absolute top-20 right-52 w-60 h-60 rounded-full bg-gradient-to-br from-purple-900 to-purple-600 blur-3xl opacity-80"></div>
      <div className="absolute bottom-20 left-40 w-56 h-56 rounded-full bg-gradient-to-br from-purple-900 to-purple-600 blur-3xl opacity-80"></div>

      <div className="flex gap-12 items-stretch w-[1100px]">
        {/* Left */}
        <div className="flex-1 text-white pl-10 z-10 flex flex-col justify-center">
          <h1 className="text-5xl font-bold">Welcome To Taxpal</h1>
          <p className="mt-6 inline-block border border-white px-4 py-2 text-lg italic font-semibold rounded">
            Verify to Continue..
          </p>
        </div>

        {/* Right Card */}
        <div className="w-[520px] bg-white rounded-2xl shadow-2xl p-8 z-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Login via OTP</h2>

          <form className="space-y-4" onSubmit={requestOtp}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              disabled={loadingSend}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-700 to-purple-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loadingSend ? "Sending..." : "Request OTP"}
            </button>
          </form>

          <div className="my-6 h-px bg-gray-200" />

          <form className="space-y-4" onSubmit={verifyOtp}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                pattern="\d{6}"
                title="6-digit code"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500 tracking-widest"
              />
            </div>

            <button
              type="submit"
              disabled={loadingVerify}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loadingVerify ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          <div className="flex items-center justify-between mt-6">
            <Link to="/login" className="text-purple-700 font-medium hover:underline">
              Back to Login
            </Link>
            <Link
              to="/reset-password"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-700 to-purple-600 text-white font-semibold hover:opacity-90 transition"
            >
              Reset Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
