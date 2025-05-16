import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import SignupForm from "../components/SignupForm";

export default function SignupPage() {
  const navigate = useNavigate();
  const imageURL =
    'https://ik.imagekit.io/yhbarve/p-home-3.jpg?updatedAt=1747250742152';

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 to-blue-900">
      <Navbar />
      <div className="flex-1 flex">
        {/* Left pane: image */}
        <div className="w-2/3">
          <img className='h-screen w-full object-cover' src={imageURL} alt="" />
        </div>

        {/* Right pane: buttons */}
        <div className="w-1/3 flex flex-col items-center justify-start pt-64 bg-gradient-to-tr from-green-950 via-slate-950 to-black border-l-8 border-black gap-8">
          <div className='text-white text-2xl font-light '>Welcome to Portolio!</div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}