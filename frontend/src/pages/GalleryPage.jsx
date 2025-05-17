import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import GalleryImage from "../components/GalleryImage";
import { Button } from "../components/ui/button";

export default function GalleryPage() {
  const [privateItems, setPrivateItems] = useState([]);
  const [publicItems, setPublicItems] = useState([]);
  const [source, setSource] = useState("my");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/media/private`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => {
        setPrivateItems(resp.data);
        console.log(privateItems.length);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load gallery");
      });
  }, [token]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/media/public`)
      .then((resp) => {
        setPublicItems(resp.data);
        console.log(publicItems.length);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load gallery");
      });
  }, []);

  const baseList = source === "all" 
    ? [...publicItems, ...privateItems] 
    : privateItems;

  const imageMap = new Map();
  for (const item of baseList) {
    if (!imageMap.has(item.fileName)) {
      imageMap.set(item.fileName, item);
    }
  }
  const uniqueItems = Array.from(imageMap.values());
  console.log(uniqueItems.length);

  // const privateMap = new Map();
  // for (const item of privateItems) {
  //   if (!privateMap.has(item.fileName)) {
  //     privateMap.set(item.fileName, item);
  //   }
  // }
  // const privateUniqueItems = Array.from(privateMap.values());

  // const publicMap = new Map();
  // for (const item of publicItems) {
  //   if (!publicMap.has(item.fileName)) {
  //     publicMap.set(item.fileName, item);
  //   }
  // }
  // const publicUniqueItems = Array.from(publicMap.values());

  return (
    <>
      <Navbar />
      <div className="p-4 bg-gradient-to-br from-slate-900 via-green-950 to-blue-900 h-screen pt-24">
        <div className="text-white text-2xl mb-4 flex gap-2">
          <Button
            variant={source == "all" ? "outline" : "ghost"}
            className={
              source == "all"
                ? "text-black rounded-full"
                : "text-white border rounded-full"
            }
            onClick={() => setSource("all")}
          >
            All Photos
          </Button>
          <Button
            variant={source == "my" ? "outline" : "ghost"}
            className={
              source == "my"
                ? "text-black rounded-full"
                : "text-white border rounded-full"
            }
            onClick={() => setSource("my")}
          >
            My Photos
          </Button>
        </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {uniqueItems.map((item) => (
              <GalleryImage key={item._id} item={item} />
            ))}
          </div>
        {/* {source === "all" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {publicUniqueItems.map((item) => (
              <GalleryImage key={item._id} item={item} />
            ))}
          </div>
        )} */}
      </div>
    </>
  );
}
