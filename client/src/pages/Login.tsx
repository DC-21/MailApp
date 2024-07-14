import React, { useState } from "react";
import axios from "axios";
import { ENDPOINT } from "../typs/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${ENDPOINT}/signin`, {
        email,
        password,
      });

      const { token, user } = response.data;

      // Save token and user details in local storage
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to the dashboard or any other page
      // window.location.href = "/dashboard"; // Uncomment and adjust the path as needed

      console.log("Login successful", response.data);
    } catch (error) {
      setError("Login failed. Please check your email and password.");
      console.error("Login error", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-slate-300">
      <form
        className="w-1/3 flex flex-col p-4 rounded-xl bg-white shadow shadow-black"
        onSubmit={handleSubmit}
      >
        <p className="text-center text-xl font-bold text-slate-900">Login</p>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="gap-6 flex flex-col w-full mt-4">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email"
            className="p-3 rounded-lg outline-none border-2 border-slate-700 text-slate-900"
          />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="password"
            className="p-3 rounded-lg outline-none border-2 border-slate-700 text-slate-900"
          />
          <button className="p-3 bg-slate-900 shadow shadow-black text-white rounded-lg">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
