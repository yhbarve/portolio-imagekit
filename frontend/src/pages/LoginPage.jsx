import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';
import { LoginForm } from "../components/LoginForm"

export default function HomePage() {
  const navigate = useNavigate();
  const imageURL =
    'https://ik.imagekit.io/yhbarve/upload-1747005121989_kATOxUK8E?updatedAt=1747005125913';

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 to-blue-900">
      <Navbar />

      <div className="flex-1 flex h-full">
        {/* Left pane: image */}
        <div className="w-2/3">
          <img className='h-full w-full object-cover' src={imageURL} alt="" srcset="" />
        </div>

        {/* Right pane: buttons */}
        <div className="w-1/3 flex flex-col items-center justify-center bg-gradient-to-tr from-green-950 via-slate-950 to-black border-l-8 border-black">
          <div className='text-white text-2xl font-light'>Welcome back to Portolio!</div>
          <Page />
        </div>
      </div>
    </div>
  );
}

function Page() {
  return (
    <div className="flex w-full items-center justify-center md:p-10">
      <div className="">
        <LoginForm />
      </div>
    </div>
  )
}

