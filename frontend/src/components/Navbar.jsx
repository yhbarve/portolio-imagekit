import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function Navbar() {
  const [user, setUser] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    async function fetchUser() {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/me`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (isMounted) setUser(data.username);
      } catch {
        if (isMounted) {
          setUser(null);
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    }
    if (token) {
      fetchUser();
    } else {
      setUser(null);
    }
    return () => {
      isMounted = false;
    };
  }, [token, navigate]);

  const handleLogout = () => {
    setUser("");
    localStorage.removeItem("token");
    navigate("/home");
  };
  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");
  const handleGallery = () => navigate("/gallery");
  const handleUpload = () => navigate("/upload");
  const handleAbout = () => navigate("/about");
  const handleTitle = () => navigate(user ? "/gallery" : "/");

  return (
    <div className="fixed top-2 inset-x-2 sm:top-4 sm:inset-x-4 z-50">
      <div
        className="
          bg-white/10 backdrop-blur-xl shadow-lg rounded-full
          px-4 py-2 sm:px-6 sm:py-4
          flex flex-col sm:flex-row
          justify-between items-center
          gap-3 text-white text-base sm:text-lg
        "
      >
        <button
          className="text-2xl md:text-3xl font-light"
          onClick={handleTitle}
        >
          Portolio
        </button>

        <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center">
          {user ? (
            <>
              <Badge className="bg-blue-100 text-blue-800 cursor-default">
                {user}
              </Badge>

              {location.pathname === "/upload" && (
                <Button
                  variant="outline"
                  onClick={handleGallery}
                  className="rounded-full text-sm sm:text-base text-black"
                >
                  Gallery
                </Button>
              )}

              {location.pathname === "/gallery" && (
                <Button
                  variant="outline"
                  onClick={handleUpload}
                  className="rounded-full text-sm sm:text-base text-black"
                >
                  Upload
                </Button>
              )}

              <Button
                variant="destructive"
                onClick={handleLogout}
                className="rounded-full text-sm sm:text-base"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={handleAbout}
                className="rounded-full text-sm sm:text-base text-black"
              >
                About
              </Button>
              <Button
                variant="outline"
                onClick={handleSignup}
                className="rounded-full text-sm sm:text-base text-black"
              >
                Signup
              </Button>
              <Button
                variant="outline"
                onClick={handleLogin}
                className="rounded-full text-sm sm:text-base text-black"
              >
                Login
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
