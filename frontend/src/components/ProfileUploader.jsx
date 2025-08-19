import React, { useState, useRef } from 'react';
import { Camera } from 'lucide-react';

export default function ProfilePhotoUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="rounded-lg p-8 text-center">
        
        {/* Profile Photo Upload Area */}
        <div className="relative inline-block">
          <div
            onClick={handleClick}
            className="relative w-32 h-32 bg-gray-800 rounded-full cursor-pointer overflow-hidden hover:bg-gray-700 transition-colors duration-200 group"
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-white">
                <Camera size={24} className="mb-2 opacity-70" />
                <span className="text-sm font-medium">Add profile</span>
                <span className="text-sm font-medium">photo</span>
              </div>
            )}
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <Camera size={20} className="text-white" />
            </div>
          </div>
          
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* File info and actions */}
        {selectedImage && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              Selected: {selectedImage.name}
            </p>
            <p className="text-xs text-gray-500 mb-3">
              Size: {(selectedImage.size / 1024).toFixed(1)} KB
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={handleClick}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 text-sm"
              >
                Change Photo
              </button>
              <button
                onClick={handleRemovePhoto}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        {/* {!selectedImage && (
          <p className="mt-4 text-gray-500 text-sm">
            Click the circle above to upload a profile photo
          </p>
        )} */}
      </div>
    </div>
  );
}
