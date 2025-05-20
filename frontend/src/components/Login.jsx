import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    // Handle login logic here (e.g., send data to an API)
    console.log("Logging in with", { email, password });

    // Redirect or handle success/failure
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-[#000080] text-center">Login</h2>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      
      <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg text-[#000080]">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-lg text-[#000080]">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-[#007BFF] text-white rounded-lg hover:bg-[#0056b3] transition"
        >
          Login
        </button>
      </form>

      <div className="text-center mt-6">
        <p className="text-lg">Don't have an account?</p>
        <Link to="/signup" className="text-[#007BFF] font-semibold">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
