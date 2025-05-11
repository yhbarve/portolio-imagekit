import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const signupSchema = z.object({
  username: z.string().min(3),
  email:    z.string().email(),
  password: z.string().min(6),
});

export default function SignupPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data) => {
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/signup`,
        data
      );
      localStorage.setItem('token', resp.data.token);
      navigate('/gallery');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className='flex max-w-xl mx-auto justify-center'>
        <div className="p-4 bg-white rounded shadow mt-24">
          <h1 className="text-xl mb-4">Sign Up</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label>Username</label>
              <input {...register('username')} className="w-full border p-2" />
              {errors.username && <p className="text-red-500">{errors.username.message}</p>}
            </div>
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
            <button disabled={isSubmitting} className="w-full bg-blue-500 text-white p-2 rounded">
              {isSubmitting ? 'Signing up…' : 'Sign Up'}
            </button>
          </form>
          <p className="mt-4 text-sm">
            Already have an account? <Link to="/login" className="text-blue-500">Log in</Link>
          </p>
        </div>
      </div>
    </>
  );
}
