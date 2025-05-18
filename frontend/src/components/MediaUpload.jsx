import React, { useRef } from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';

export default function MediaUpload({ onUpload }) {
  const publicKey   = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
  const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;
  const backendURL  = import.meta.env.VITE_BACKEND_URL;

  // Keep track of which files we've already emitted
  const handledFilesRef = useRef({});

  // Fetch ImageKit auth params from your backend
  const authenticator = async () => {
    const resp = await fetch(`${backendURL}/api/media/upload/signature`);
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`Signature request failed: ${resp.status} ${text}`);
    }
    const { signature, expire, token } = await resp.json();
    return { signature, expire, token };
  };

  // Called when ImageKit upload succeeds
  const handleSuccess = ({ name, url }) => {
    const fileName = name;
    console.log(name);
    // Only images allowed
    const ext = fileName.split('.').pop().toLowerCase();
    if (!['jpg','jpeg','png','gif','webp'].includes(ext)) {
      console.log(ext);
      alert('Only image files are supported right now.');
      return;
    }
    // Prevent duplicate emits for same file
    if (handledFilesRef.current[fileName]) return;
    handledFilesRef.current[fileName] = true;

    // Emit metadata to parent
    if (onUpload) onUpload({ fileName, fileType: 'image', url });
  };

  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        // fileName={`upload-${Date.now()}`}
        onError={err => console.error('Upload error', err)}
        onSuccess={handleSuccess}
        className="bg-white/10 backdrop-blur-xl rounded-md p-2 cursor-pointer text-white"
      />
    </IKContext>
  );
}
