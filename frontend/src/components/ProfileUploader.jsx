import { useState, useRef } from 'react';
import { Image } from 'lucide-react';
import useUserStore from '../store/useUserStore.js';
import useAuthStore from '../store/useAuthStore.js';
import DefaultAvatar from "./DefaultAvatar.jsx";

export default function ProfilePhotoUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = useUserStore((state) => state.handleSubmit);
  const updateProfile = useAuthStore((state) => state.updateProfile);

  function handleClick() {
    fileInputRef.current?.click();
  }

  const handleOnChange = (e) => {
    const file = e.target?.files[0];
    if(file){
      const blobObject = URL.createObjectURL(file);
      setPreviewUrl(blobObject);
      setSelectedImage(file);
    }
  }

  const handleOnSubmit = async () => {
    const newData = 
    updateProfile(newData);
  }


  return (
    <div className="min-h-[200px] flex flex-col items-center justify-center p-8 mt-5 cursor-pointer">
      <div onClick={handleClick} className="cursor-pointer">
        <div className="relative flex flex-col justify-center items-center">
          {/** DEFAULT UI */}
          <div className="absoulte top-0 flex justify-center items-center">
            {previewUrl ? (
              <div>
                <img src={previewUrl} alt="previewImg" />
              </div>
            ) : (
              <>
                <DefaultAvatar className="w-[130px]" />
                <div className="absolute top-[20%] left-[40%]">
                  <Image />
                </div>
                <div className="absolute text-center top-[40%] left-[20%] font-normal">
                  <p className="text-[0.9rem]">Add Profile</p>
                  <p className="text-[0.9rem]">Photo</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* input box */}
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleOnChange}
        />
      </div>
      {selectedImage && (
        <button
          className="text-center bg-green-600 cursor-pointer text-[0.75rem] text-white p-2 mt-3 rounded-md hover:bg-green-800"
          onClick={handleOnSubmit}
        >
          Upload
        </button>
      )}
    </div>
  );
}
