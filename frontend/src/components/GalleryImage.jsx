import axios from "axios";
import React, { useEffect, useState } from "react";

export default function GalleryImage({ item }) {
  const [user, setUser] = useState("");

  const token = localStorage.getItem("token");

  async function getUser() {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/${item.owner}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response) {
      console.error("No user found");
      setUser("Anonymous");
    } else {
      setUser(response.data.username);
    }
  }

  getUser();

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const itemDate = new Date(item.createdAt);
  const date = itemDate.getDate();
  const month = months[itemDate.getMonth()];
  const year = itemDate.getFullYear();

  return (
    <div className="p-1 bg-white/10 shadow-lg rounded-xl backdrop-blur-xl">
      <div key={item._id} className="bg-black rounded-xl overflow-hidden shadow">
        <div className="aspect-[4/5] object-cover h-xl w-xl">
          <img
            src={item.url}
            alt={item.fileName}
            className="w-full h-full object-cover bg-black"
          />
        </div>
        <div className="p-2 text-xs text-gray-200 flex justify-between items-center">
          <div className="bg-white px-2.5 py-0.5 text-black rounded-md font-semibold cursor-default">{user}</div>
          <div className="italic">{`${date} ${month} ${year}`}</div>
        </div>
      </div>
    </div>
  );
}
