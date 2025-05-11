import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MediaUpload from '../components/MediaUpload';
import Navbar from '../components/Navbar';

export default function UploadPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleUpload = async ({ fileName, fileType, url }) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/media`,
        { fileName, fileType, url },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/gallery');
    } catch (err) {
      console.error(err);
      alert('Failed to save media');
    }
  };

  return (
    <>
      <Navbar />
      <div className='flex flex-col justify-center max-w-md mx-auto'>
        <div className='text-5xl mt-4 border-b border-black pb-4 w-full'>Upload</div>
        <div className="p-4 shadow mt-8 rounded">
          <h1 className="text-xl mb-4">Upload Photo or Video</h1>
          <MediaUpload onUpload={handleUpload} />
        </div>
      </div>
    </>
  );
}
