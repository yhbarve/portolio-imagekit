import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import UploadPage from './pages/UploadPage';
import GalleryPage from './pages/GalleryPage';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';

export default function App() {

  function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Routes>
        {/* Public */}
        <Route path='/' element={<LoginPage />} />
        <Route path='/home' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/about' element={<AboutPage />} />

        {/* Protected */}
        <Route
          path="/upload" 
          element={<ProtectedRoute><UploadPage/></ProtectedRoute>} 
        />
        <Route 
          path='/gallery' 
          element={<ProtectedRoute><GalleryPage/></ProtectedRoute>}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}
