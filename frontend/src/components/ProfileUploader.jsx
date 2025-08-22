import { useState, useRef } from 'react';
import { Camera } from 'lucide-react';
import useUserStore from '../store/useUserStore.js';
import useAuthStore from '../store/useAuthStore.js';

export default function ProfilePhotoUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = useUserStore((state) => state.handleSubmit);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

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

  const handleOnSubmit = async () => {
    const newData = await handleSubmit(selectedImage);
    updateProfile(newData);
  }


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
                src={isAuthenticated?.profilePic?.url}
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
          { selectedImage && (
            <button onClick={handleOnSubmit} className='text-[0.8rem] mt-4 bg-green-600 text-white p-2 rounded-md cursor-pointer hover:bg-green-800'>Upload</button>
          )}
        </div>
      </div>
    </div>
  );
}
