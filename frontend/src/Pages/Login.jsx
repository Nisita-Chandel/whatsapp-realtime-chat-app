import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const data = await loginUser(formData);
  
      if (data.success) {
        // Save token
        localStorage.setItem("token", data.token);
  
        // Save user
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
  
        alert("Login Successful ✅");
  
        // Navigate to chat
        navigate("/chat", { replace: true });
  
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
      <div className="w-[420px] backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">
  
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-4xl shadow-lg">
            💬
          </div>
        </div>
  
        {/* Heading */}
        <h1 className="text-white text-4xl font-bold text-center mb-2">
          Welcome Back
        </h1>
  
        <p className="text-gray-300 text-center mb-8">
          Login to continue chatting
        </p>
  
        <form onSubmit={handleSubmit} className="space-y-5">
  
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-white/10 border border-gray-600 text-white placeholder-gray-400 outline-none focus:border-green-500 transition"
          />
  
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-white/10 border border-gray-600 text-white placeholder-gray-400 outline-none focus:border-green-500 transition"
          />
  
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 transition-all duration-300 text-white p-4 rounded-xl font-bold text-lg shadow-lg"
          >
            Login
          </button>
  
          <div className="text-center">
            <span className="text-gray-300">
              Don't have an account?{" "}
            </span>
  
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-green-400 hover:text-green-300 font-semibold"
            >
              Register
            </button>
          </div>
  
        </form>
      </div>
    </div>
  );
};

export default Login;