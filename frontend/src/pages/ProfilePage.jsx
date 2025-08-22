import ProfileLeftSide from "../components/ProfileLeftSide";
import ProfilePageSvg from "../svg/ProfilePageSvg";

const Profile = () => {


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