import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

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
    // outer fixed wrapper to float the bar
    <div className="fixed top-4 inset-x-4 z-50">
      {/* inner pill-shaped bar */}
      <div className="
        bg-white/10
        shadow-lg
        rounded-full
        px-6 py-3
        flex justify-between items-center
        text-gray-800 text-lg
        backdrop-blur-xl
      ">
        {/* Left: logo/title */}
        <button className="text-2xl font-light text-white" onClick={handleTitle}>
          Portolio
        </button>
  
        {/* Right: user actions */}
        {user ? (
          <div className="flex items-center gap-4">
            <Badge className="bg-blue-100 text-blue-800 cursor-default">{user}</Badge>
  
            {location.pathname === '/upload' && (
              <button
                className="px-3 py-1 hover:bg-gray-100 rounded-full transition"
                onClick={handleGallery}
              >
                Gallery
              </button>
            )}
  
            {location.pathname === '/gallery' && (
              <Button onClick={() => navigate('/upload')} variant="outline" className="rounded-full">
                Upload
              </Button>
            )}
  
            <Button variant="destructive" className="rounded-full" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Button variant="ghost" className="rounded-full" onClick={handleSignup}>
              About Portolio
            </Button>
            <Button variant="ghost" className="rounded-full" onClick={handleSignup}>
              Signup
            </Button>
            <Button variant="ghost" className="rounded-full" onClick={handleLogin}>
              Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );  
}
