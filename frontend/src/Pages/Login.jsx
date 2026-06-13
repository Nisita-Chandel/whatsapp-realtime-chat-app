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
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login Successful ✅");
        navigate("/chat");

        console.log(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111b21]">
      <div className="bg-[#202c33] p-8 rounded-xl w-[400px] shadow-xl">
        <h1 className="text-white text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-[#2a3942] text-white outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded bg-[#2a3942] text-white outline-none"
          />

        

<button
  type="submit"
  className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded font-semibold"
>
  Login
</button>

<div className="text-center mt-4">
  <span className="text-gray-300">
    Don't have an account?{" "}
  </span>

  <button
    type="button"
    onClick={() => navigate("/register")}
    className="text-green-400 hover:text-green-500 font-semibold"
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