import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

export default function SignupForm(props) {
  const navigate = useNavigate();

  // 1) Define your Zod schema
  const signupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email:    z.string().email("Must be a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  // 2) Hook up React Hook Form with Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  // 3) onSubmit handler
  const onSubmit = async (data) => {
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/signup`,
        {
          username: data.username,
          email: data.email,
          password: data.password,
        }
      );
      localStorage.setItem("token", resp.data.token);
      navigate("/upload");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div
      className="flex w-full max-w-sm items-start justify-center md:p-5
                 bg-white/10 shadow-lg rounded-xl backdrop-blur-xl text-white"
      {...props}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full"
      >
        <div className="mb-6 pb-6 border-b border-gray-600">
          <h1 className="text-xl font-light mb-1">Signup</h1>
          <h3 className="text-sm text-gray-400">
            Create your account by filling in the fields
          </h3>
        </div>

        <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-gray-600">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm font-light">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="max_v33"
              className="rounded text-sm p-2 bg-white/10 backdrop-blur-xl"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-red-500 text-xs">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-light">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="osc@op81.com"
              className="rounded text-sm p-2 bg-white/10 backdrop-blur-xl"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
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
              <p className="text-red-500 text-xs">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50
                     text-white p-2 rounded text-sm font-medium transition mb-3"
        >
          {isSubmitting ? "Signing up…" : "Signup"}
        </button>

        <p className="text-sm text-gray-300 text-center">
          Already have an account?{" "}
          <button
            type="button"
            className="underline hover:text-white"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}


