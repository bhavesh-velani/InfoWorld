import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ accountType: "user", id: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleRadio = (e) => {
    setForm({ ...form, accountType: e.target.value, id: "", password: "" });
    setMsg("");
  };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", form);
      localStorage.setItem("user", JSON.stringify(res.data));
      setMsg(`✅ Logged in successfully! Hello, ${res.data.name}`);
      navigate("/home");
    } catch {
      setMsg("❌ Login failed. Check your ID and password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 to-blue-200 px-4">
      <div className="bg-white rounded-xl max-w-md w-full p-10 sm:p-12">
        {/* Title */}
        <h2 className="text-4xl font-semibold text-center text-cyan-700 mb-6 drop-shadow-md">
          Welcome Back
        </h2>

        {/* Message */}
        {msg && (
          <div
            className={`mb-6 py-3 px-4 rounded-lg text-center text-sm font-medium ${
              msg.startsWith("✅")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
            role="alert"
          >
            {msg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Account Type */}
          <fieldset className="flex justify-center gap-8" aria-label="Account Type">
            <label className="flex items-center space-x-2 text-gray-700 cursor-pointer">
              <input
                type="radio"
                value="user"
                checked={form.accountType === "user"}
                onChange={handleRadio}
                className=" w-5 h-5"
              />
              <span className="select-none text-lg font-medium">User</span>
            </label>
            <label className="flex items-center space-x-2 text-gray-700 cursor-pointer">
              <input
                type="radio"
                value="reporter"
                checked={form.accountType === "reporter"}
                onChange={handleRadio}
                className="w-5 h-5"
              />
              <span className="select-none text-lg font-medium">Reporter</span>
            </label>
          </fieldset>

          {/* ID Input */}
          <div>
            <label
              htmlFor="id"
              className="block text-gray-700 font-semibold mb-1 select-none"
            >
              {form.accountType === "user" ? "User ID" : "Reporter ID"}
            </label>
            <input
              id="id"
              type="text"
              name="id"
              placeholder={`Enter your ${form.accountType} ID`}
              value={form.id}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition"
              autoComplete="username"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-1 select-none"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition"
              autoComplete="current-password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-extrabold py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-8 text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-cyan-700 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
