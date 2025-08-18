import axios from 'axios';
import { useState } from 'react';
import Avatar from '../components/Avatar';
import DefaultAvatar from "../components/DefaultAvatar";

const Profile = () => {

  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const handleOnChange = (e) => {
    const f = e.target.files?.[0];
    if(f){
      setFile(f)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!file){
      alert('please provide a file');
      return;
    }
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if(!allowedTypes.includes(file.type)){
      alert('provide a valid format');
      return;
    }
    if(file.size > 5 * 1024 * 1024){
      alert('please provide a small file');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);
    const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/user/update/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    });
    console.log(response.data.data.profilePic)
    setAvatar(response.data.data);
  }


  return (
    <div>
      <form 
        onSubmit={handleSubmit}
        encType='multipart/form-data'
      >
        <input type="file" name="avatar" onChange={handleOnChange} />
        <button type="submit">submit</button>
      </form>

      {/* SOMETIMES THE UPLOADCLOUDINARY ERROR GIVES UNDEFINED. CHECK ON CHATGPT, WHY? */}

      {/* default avatar */}
      {!avatar?.profilePic ? (
        <DefaultAvatar className='w-30' />
      ) : (<Avatar className='w-30' url={avatar?.profile?.url} />)}   

    </div>
  )
}

export default Profile;