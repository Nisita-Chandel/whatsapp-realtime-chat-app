import React, { useState } from "react";
import { registerUser } from "../services/authService";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(formData);

      if (data.success) {
        alert("Registration Successful ✅");

        window.location.href = "/login";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0f766e]">
      <div className="w-[450px] backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">
  
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-4xl shadow-lg">
            🚀
          </div>
        </div>
  
        {/* Heading */}
        <h1 className="text-white text-4xl font-bold text-center mb-2">
          Create Account
        </h1>
  
        <p className="text-gray-300 text-center mb-8">
          Join the Chat App today
        </p>
  
        <form onSubmit={handleSubmit} className="space-y-5">
  
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-white/10 border border-gray-600 text-white placeholder-gray-400 outline-none focus:border-green-500 transition"
            required
          />
  
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-white/10 border border-gray-600 text-white placeholder-gray-400 outline-none focus:border-green-500 transition"
            required
          />
  
          <input
            type="password"
            name="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-white/10 border border-gray-600 text-white placeholder-gray-400 outline-none focus:border-green-500 transition"
            required
          />
  
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 transition-all duration-300 text-white p-4 rounded-xl font-bold text-lg shadow-lg"
          >
            Register
          </button>
  
          <div className="text-center">
            <span className="text-gray-300">
              Already have an account?{" "}
            </span>
  
            <button
              type="button"
              onClick={() => (window.location.href = "/login")}
              className="text-green-400 hover:text-green-300 font-semibold"
            >
              Login
            </button>
          </div>
  
        </form>
      </div>
    </div>
  );
};

export default Register;