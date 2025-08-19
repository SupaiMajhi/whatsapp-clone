import ProfileLeftSide from "../components/ProfileLeftSide";
import ProfilePageSvg from "../svg/ProfilePageSvg";

const Profile = () => {

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
  }


  return (
    <div className='page-container'>
      <div className='left-side'>
        <ProfileLeftSide />
      </div>
      <div className='right-side'>
        <div className="center flex flex-col gap-[50px]">
          <ProfilePageSvg />
          <h1 className="large-text">Profile</h1>
        </div>
      </div>
      {/* SOMETIMES THE UPLOADCLOUDINARY ERROR GIVES UNDEFINED. CHECK ON CHATGPT, WHY? */}

      {/* default avatar */}

    </div>
  )
}

export default Profile;