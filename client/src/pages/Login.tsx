import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { isAuthenticatedAtom, userDetailsAtom } from "../recoil/atoms";
import { ENDPOINT } from "../typs/constants";
import { toast } from "react-hot-toast";

const Loader = () => (
  <div className="w-6 h-6 rounded-full animate-spin border-4 border-white border-t-[#e2383a]"></div>
);

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setIsAuthenticated] = useRecoilState(isAuthenticatedAtom);
  const [, setUserDetails] = useRecoilState(userDetailsAtom);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${ENDPOINT}/auth/signin`, {
        email,
        password,
      });

      console.log(response.status);

      if (response.status === 200) {
        const user = response.data;

        setIsAuthenticated(true);
        setUserDetails({
          id: user.id,
          username: user.username,
          email: user.email,
        });

        toast.success("Login successful!");
        navigate("/home");

        console.log("Login successful", response.data);
      } else {
        setError("Login failed. Please check your email and password.");
        console.error("Login error", response);
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        if (axiosError.response?.status === 400) {
          const errorMessage = axiosError.response?.data.message as string;
          if (errorMessage) {
            toast.error(errorMessage);
          } else {
            toast.error("Invalid credentials. Please try again.");
          }
        } else {
          console.error("Unexpected error:", axiosError.message);
          toast.error("An unexpected error occurred. Please try again later.");
        }
      } else {
        console.error("Unexpected error:", error.message);
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
      setIsSubmitting(false);
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
          <div className="flex w-full flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="email"
              className="p-3 rounded-lg mt-2 outline-none border-2 border-slate-700 text-slate-900"
            />
          </div>
          <div className="flex w-full flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="password"
              className="p-3 rounded-lg mt-2 outline-none border-2 border-slate-700 text-slate-900"
            />
          </div>
          {loading ? (
            <div
              aria-disabled
              className="p-3 mt-4 cursor-not-allowed text-lg active:scale-[98%] flex items-center justify-center duration-200 font-bold text-center bg-[#e2383a] w-full hover:bg-[#f84548] rounded text-white"
            >
              <Loader />
            </div>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="p-3 bg-slate-900 shadow shadow-black text-white rounded-lg"
            >
              Login
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
