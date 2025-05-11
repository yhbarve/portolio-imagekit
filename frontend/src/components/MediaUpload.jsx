import React, { useRef } from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';
import axios from 'axios';

export default function MediaUpload({ onUpload }) {
  const publicKey   = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
  const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;
  const backendURL  = import.meta.env.VITE_BACKEND_URL;

  // Prevent duplicate saves for the same file
  const savedFilesRef = useRef({});

  // Fetch ImageKit upload signature
  const authenticator = async () => {
    const resp = await fetch(`${backendURL}/api/media/upload/signature`);
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`Auth failed: ${resp.status} ${text}`);
    }
    const { signature, expire, token } = await resp.json();
    return { signature, expire, token };
  };

  const handleSuccess = async (res) => {
    const fileName = res.name;
    const extension = fileName.split('.').pop().toLowerCase();
    if (!['jpg','jpeg','png','gif','webp'].includes(extension)) {
      alert('Only image files are supported right now.');
      return;
    }
    // If we've already processed this file, skip
    if (savedFilesRef.current[fileName]) return;
    savedFilesRef.current[fileName] = true;

    const url      = res.url;
    const fileType = 'image';

    try {
      const jwt = localStorage.getItem('token');
      await axios.post(
        `${backendURL}/api/media`,
        { fileName, fileType, url },
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      if (onUpload) onUpload({ fileName, fileType, url });
    } catch (err) {
      console.error('Failed to save media:', err);
    }
  };

  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        fileName={`upload-${Date.now()}`}
        onError={err => console.error('Upload error', err)}
        onSuccess={handleSuccess}
      />
    </IKContext>
  );
}
