import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(6),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
        data
      );
      localStorage.setItem('token', resp.data.token);
      navigate('/gallery');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
    <Navbar />
    <div className='flex max-w-md mx-auto bg-white justify-center'>
    <div className="mt-24 rounded shadow p-4">
      <h1 className="text-xl mb-4">Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Email</label>
          <input {...register('email')} type="email" className="w-full border p-2" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label>Password</label>
          <input {...register('password')} type="password" className="w-full border p-2" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <button disabled={isSubmitting} className="w-full bg-green-500 text-white p-2 rounded">
          {isSubmitting ? 'Logging in…' : 'Log In'}
        </button>
      </form>
      <p className="mt-4 text-sm">
        Don’t have an account? <Link to="/signup" className="text-blue-500">Sign up</Link>
      </p>
    </div>
    </div>
    </>
  );
}
