import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

export default function LoginForm(props) {
  const navigate = useNavigate();

  // 1) Define your Zod schema
  const loginSchema = z.object({
    email:    z.string().email("Must be a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  // 2) Hook up React Hook Form with Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // 3) onSubmit handler
  const onSubmit = async (data) => {
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
        data
      );
      localStorage.setItem("token", resp.data.token);
      navigate("/gallery");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="flex w-full max-w-sm items-center justify-center md:p-5
                 bg-white/10 shadow-lg rounded-xl backdrop-blur-xl text-white"
      {...props}
    >
      {/* 4) Turn your inner wrapper into a form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
        <div className="mb-3 pb-3 border-b border-gray-600">
          <h1 className="text-xl font-light mb-1">Login</h1>
          <p className="text-sm text-gray-400">
            Enter your credentials to access your account
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-light">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="charles@cl16.com"
            className="rounded text-sm p-2 bg-white/10 backdrop-blur-xl"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 border-b mb-6 pb-6 border-gray-600">
          <label htmlFor="password" className="text-sm font-light">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="rounded text-sm p-2 bg-white/10 backdrop-blur-xl"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50
                     text-white p-2 rounded text-sm font-medium mb-3"
        >
          {isSubmitting ? "Logging in…" : "Login"}
        </button>

        <p className="text-sm text-gray-300 text-center">
          Don’t have an account?{" "}
          <button
            type="button"
            className="underline hover:text-white"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
}

