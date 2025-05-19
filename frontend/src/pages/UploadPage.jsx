// src/pages/UploadPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import MediaUpload from "../components/MediaUpload";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";

export default function UploadPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const placeholderURL =
    "https://ik.imagekit.io/yhbarve/upload-1747005121989_kATOxUK8E?updatedAt=1747005125913";

  const [media, setMedia] = useState(null);
  const [caption, setCaption] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleUploadMeta = ({ fileName, fileType, url }) => {
    setMedia({ fileName, fileType, url });
  };

  useEffect(() => {
    console.log("isPublic changed →", isPublic);
  }, [isPublic]);

  const handleSubmit = async () => {
    if (!media) {
      alert("Please select an image first");
      return;
    }
    try {
      const payload = {
        ...media,
        caption,
        makePublic: isPublic,
      };
      console.log(payload);
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/media`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/gallery");
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save media");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-green-950 to-blue-900">
        {/* Form pane */}
        <div className="w-full flex flex-col items-center justify-center mt-32 p-4">
          <div className="text-xl font-light mb-4 text-white">Upload Image</div>
          <div className="max-w-lg bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg p-4 flex flex-col gap-6">
            <MediaUpload onUpload={handleUploadMeta} />

            <div className="flex flex-col gap-1">
              <Label htmlFor="caption" className="text-white">
                Caption
              </Label>
              <input
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Add a caption..."
                className="w-full rounded text-sm p-2 bg-white/10 backdrop-blur-xl text-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="isPublic"
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Label htmlFor="isPublic" className="text-white">
                Make Image Public?
              </Label>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!media}
              className="w-full"
            >
              {media ? "Upload to Gallery" : "Select an Image First"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
