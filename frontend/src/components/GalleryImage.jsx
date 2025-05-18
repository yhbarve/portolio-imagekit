import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function GalleryImage({ item }) {
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [owner, setOwner] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        if (mounted) {
          setUser(data.username);
          setUserId(data._id);
        }
      })
      .catch(() => {
        if (mounted) {
          setUser(null);
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
    return () => {
      mounted = false;
    };
  }, [token, navigate]);

  useEffect(() => {
    let mounted = true;
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/user/${item.owner}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        if (mounted) setOwner(data.username || "Anonymous");
      })
      .catch(() => {
        if (mounted) setOwner("Anonymous");
      });
    return () => {
      mounted = false;
    };
  }, [item.owner, token]);

  const dateObj = new Date(item.createdAt);
  const dateStr = `${dateObj.getDate()} ${dateObj.toLocaleString("default", {
    month: "short",
  })} ${dateObj.getFullYear()}`;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      const { status, statusText } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/media/${item._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (status >= 200 && status < 300) {
        window.location.reload();
      } else {
        alert(`Failed to delete image: ${statusText}`);
      }
    } catch (err) {
      alert("Error deleting image: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="relative w-full bg-white/10 shadow-lg rounded-xl backdrop-blur-xl overflow-hidden">
      {userId === item.owner && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm px-2 py-0.5 text-sm font-semibold rounded-full shadow hover:bg-red-500 transition-colors z-10"
        >
          <span className="w-4 h-4 text-white">Delete</span>
        </button>
      )}

      <div className="bg-black rounded-t-xl overflow-hidden">
        <div className="aspect-[4/5] w-full">
          <img
            src={item.url}
            alt={item.fileName}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="p-2 flex flex-col gap-2">
        <div className="flex justify-between items-center bg-white/10 backdrop-blur-xl px-2 py-0.5 rounded-md text-xs sm:text-sm text-gray-200">
          <span className="font-semibold">{owner}</span>
          <span className="italic">{dateStr}</span>
        </div>
        <div className="pl-2 text-sm text-white">
          {item.caption || "Oops! No caption found."}
        </div>
      </div>
    </div>
  );
}
