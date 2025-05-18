import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import GalleryImage from "../components/GalleryImage";
import { Button } from "../components/ui/button";

export default function GalleryPage() {
  const [privateItems, setPrivateItems] = useState([]);
  const [publicItems, setPublicItems] = useState([]);
  const [source, setSource] = useState("all");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/media/private`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => setPrivateItems(resp.data))
      .catch(() => alert("Failed to load gallery"));
  }, [token]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/media/public`)
      .then((resp) => setPublicItems(resp.data))
      .catch(() => alert("Failed to load gallery"));
  }, []);

  const baseList =
    source === "all" ? [...publicItems, ...privateItems] : privateItems;

  const imageMap = new Map();
  baseList.forEach((item) => {
    if (!imageMap.has(item.fileName)) {
      imageMap.set(item.fileName, item);
    }
  });
  const uniqueItems = Array.from(imageMap.values());

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-950 to-blue-900 pt-32 py-4 sm:pt-24 px-4 sm:px-6 md:px-8">
        {/* toggle buttons */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-8">
          <Button
            variant={source === "all" ? "outline" : "ghost"}
            className={source === "all"
              ? "text-black rounded-full"
              : "text-white border rounded-full"}
            onClick={() => setSource("all")}
          >
            All Photos
          </Button>
          <Button
            variant={source === "my" ? "outline" : "ghost"}
            className={source === "my"
              ? "text-black rounded-full"
              : "text-white border rounded-full"}
            onClick={() => setSource("my")}
          >
            My Photos
          </Button>
        </div>

        {/* image grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {uniqueItems.map((item) => (
            <GalleryImage key={item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
