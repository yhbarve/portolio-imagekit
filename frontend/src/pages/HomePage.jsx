import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const videoURL = "https://ik.imagekit.io/yhbarve/portolio_home_03.1?updatedAt=1746998408277";
    const imageURL = "https://ik.imagekit.io/yhbarve/p-home-1.avif?updatedAt=1746999379288";

    const navigate = useNavigate();

    function handleLogin(){
        navigate('/login');
    }

    function handleSignup(){
        navigate('/signup');
    }

  return (
    <div className='h-screen flex bg-black'>
        <div className='h-screen w-3/5 overflow-hidden'>
            {/* <video className='w-full h-full object-center object-cover align-middle shadow-md' src={videoURL} autoPlay muted loop></video> */}
            <img src={imageURL} alt="" className='h-full w-full object-cover object-center shadow-md' />
        </div>
        <div className='flex w-1/3 h-full flex-col'>
            <div className='h-1/3'></div>
            <div className='flex flex-col justify-around gap-16 w-full h-2/3'>
                <div className='flex flex-col gap-2 text-5xl border-b pb-8 ml-8 pr-24 text-white font-light'>
                    <div>Hey there.</div>
                    <div>Welcome to Portolio.</div>
                </div>
                <div className='flex flex-col text-3xl ml-8 items-start'>
                    <button className='border-b text-white px-3 py-3 shadow-md w-full text-start hover:bg-white hover:text-black transition ease-in-out' onClick={handleLogin}>Login</button>
                    <button className='border-b text-white px-3 py-3 shadow-md w-full text-start hover:bg-white hover:text-black transition ease-in-out' onClick={handleSignup}>Signup</button>
                </div>
            </div>
        </div>
    </div>
  )
}
