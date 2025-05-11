import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [user, setUser] = useState("");
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  async function getUser(){
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/me`, { headers: { Authorization: `Bearer ${token}` } });
    if (!response){
      console.error("No user found");
      alert("Please login again");
      navigate('/login');
      return;
    }
    setUser(response.data.username);
    console.log(response.data);
  }

  if (token){
    getUser();
  }

  function handleLogout(){
    setUser("");
    localStorage.removeItem('token');
    navigate('/home');
  }

  function handleLogin(){
    navigate('/login');
  }

  function handleSignup(){
    navigate('/signup');
  }

  function handleGallery(){
    navigate('/gallery');
  }

  function handleUpload(){
    navigate('/upload');
  }

  function handleTitle(){
    if (user === ""){
      navigate('/');
    } else {
      navigate('/gallery');
    }
  }

  return (
    <div className='flex bg-black text-white text-xl p-2 py-6 justify-around items-center'>
        <button className='text-3xl' onClick={handleTitle}>Portafolio</button>
        {user !== "" && (
          <div className='flex gap-4'>
            <div className='rounded px-1'>{user}</div>
            {window.location.pathname == '/upload' && (
              <button className='pr-4 border-b hover:bg-white hover:text-black transition' onClick={handleGallery}>Gallery</button>
            )}
            {window.location.pathname == '/gallery' && (
              <button className='pr-4 border-b hover:bg-white hover:text-black transition' onClick={handleUpload}>Upload</button>
            )}
            <button className='pr-4 border-b border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition' onClick={handleLogout}>Logout</button>
          </div>
        )}
        {
          user == "" && (
            <div className='flex gap-4'>
              <button className='bg-white text-black px-1 rounded' onClick={handleSignup}>Signup</button>
              <button className='bg-white text-black px-1 rounded' onClick={handleLogin}>Login</button>
            </div>
          )
        }
    </div>
  )
}
