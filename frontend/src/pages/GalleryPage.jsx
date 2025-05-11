import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function GalleryPage() {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/media`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(resp => {
      setItems(resp.data);
      console.log(items.length);
    }).catch(err => {
      console.error(err);
      alert('Failed to load gallery');
    });
  }, [token]);

  const map = new Map();
  for (const item of items) {
    if (!map.has(item.fileName)) {
      map.set(item.fileName, item);
    }
  }
  const uniqueItems = Array.from(map.values());

  return (
    <>
    <Navbar />
    <div className="p-4">
      <div className='text-5xl mb-12 mt-4 border-b border-black pb-4 w-1/3'>Gallery</div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {uniqueItems.map(item => (
          <div key={item._id} className="bg-black rounded overflow-hidden shadow">
          {/* Fixed 1:1 square container */}
          <div className="aspect-square h-xl w-xl">
            <img
              src={item.url}
              alt={item.fileName}
              className="w-full h-full object-cover bg-black"
            />
          </div>
          <div className="p-2 text-sm text-gray-200 text-center">
            {new Date(item.createdAt).toLocaleString()}
          </div>
        </div>
        ))}
      </div>
    </div>
    </>
  );
}
