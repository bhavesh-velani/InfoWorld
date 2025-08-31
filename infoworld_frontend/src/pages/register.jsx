import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    accountType: "user",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    education: "",
    address: "",
    mobile: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = "Name required";
    if (!form.email) errs.email = "Email required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Invalid email";
    if (!form.password || form.password.length < 6) errs.password = "Min 6 chars";
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    if (form.accountType === "reporter") {
      if (!form.education) errs.education = "Education required";
      if (!form.address) errs.address = "Address required";
      if (!form.mobile) errs.mobile = "Mobile required";
      else if (!/^\d{10}$/.test(form.mobile)) errs.mobile = "Enter 10 digits";
    }
    return errs;
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleRadio = (e) => setForm({ ...form, accountType: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const data = { ...form };
    delete data.confirmPassword;

    try {
      const res = await axios.post("http://localhost:5000/api/register", data);
      if (res.data.success) {
        alert("🎉 Registration Successful! Redirecting to login...");
        navigate("/login");
      }
    } catch (err) {
      alert("Registration error: " + (err.response?.data?.msg || "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 to-blue-200 px-4">
      <div
        className="w-full max-w-md"
        style={{ minHeight: "540px", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full"
          style={{
            minHeight: "520px",
            maxHeight: "540px",
            display: "flex",
            flexDirection: "column",
            padding: "2.5rem 2.5rem 2rem 2.5rem",
          }}
        >
          <div className="flex-shrink-0">
            <h2 className="text-3xl md:text-4xl font-semibold text-center text-cyan-700 mb-6 drop-shadow-md">
              Create an Account
            </h2>
            {/* Account Type */}
            <div className="flex justify-center gap-8 mb-6">
              <label className="flex items-center space-x-2 text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  value="user"
                  checked={form.accountType === "user"}
                  onChange={handleRadio}
                  className="w-5 h-5"
                />
                <span className="text-lg font-medium">User</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  value="reporter"
                  checked={form.accountType === "reporter"}
                  onChange={handleRadio}
                  className="w-5 h-5"
                />
                <span className="text-lg font-medium">Reporter</span>
              </label>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            // Makes the form area grow/shrink and be scrollable if necessary
            className="flex-1 overflow-y-auto hide-scrollbar"
            style={{ minHeight: 0 }}
          >
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-1 select-none">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  autoComplete="name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-1 select-none">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  autoComplete="email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-1 select-none">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  autoComplete="new-password"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-1 select-none">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  }`}
                  autoComplete="new-password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
              {/* Reporter Fields */}
              {form.accountType === "reporter" && (
                <>
                  <div>
                    <label
                      htmlFor="education"
                      className="block text-gray-700 font-semibold mb-1 select-none"
                    >
                      Education
                    </label>
                    <input
                      id="education"
                      name="education"
                      placeholder="Enter your education"
                      value={form.education}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition ${
                        errors.education ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.education && (
                      <p className="text-red-500 text-sm mt-1">{errors.education}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-gray-700 font-semibold mb-1 select-none"
                    >
                      Address
                    </label>
                    <input
                      id="address"
                      name="address"
                      placeholder="Enter your address"
                      value={form.address}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-gray-700 font-semibold mb-1 select-none"
                    >
                      Mobile Number
                    </label>
                    <input
                      id="mobile"
                      name="mobile"
                      placeholder="Enter your mobile number"
                      value={form.mobile}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition ${
                        errors.mobile ? "border-red-500" : "border-gray-300"
                      }`}
                      maxLength={10}
                    />
                    {errors.mobile && (
                      <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                    )}
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-extrabold py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              Register
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-cyan-700 font-semibold hover:underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
      {/* Hide scrollbar utility style */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default Register;
