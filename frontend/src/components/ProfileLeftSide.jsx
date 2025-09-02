import ProfileUploader from '../components/ProfileUploader';
import useAuthStore from '../store/useAuthStore.js';
import PenSvg from '../svg/PenSvg.jsx';
import Avatar from './Avatar.jsx';

const ProfileLeftSide = () => {

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="left-side-container">
      <div className="w-full">
        <h1 className="h1">Profile</h1>
      </div>
      <div className='min-h-[150px] flex justify-center items-center my-10'>
        { isAuthenticated?.profilePic?.url ? (
          <Avatar className='w-[120px] cursor-pointer' url={isAuthenticated?.profilePic?.url} />
        ) : (
          <ProfileUploader />
        ) }
      </div>
      <div className='flex flex-col gap-7'>
        <div className='flex flex-col gap-5'>
            <label htmlFor="name" className='light-title'>Name</label>
            <div className='relative flex justify-between items-center'>
              <input type="text" id='name' />
              <PenSvg className='text-neutral-400' />
            </div>
        </div>
        <p className='text-[0.8rem] text-neutral-400 font-nornal'>This is not your username or PIN. This name will be visible to your Whatsapp contacts.</p>
        <div className='flex flex-col gap-5 mt-4'>
            <label htmlFor="about" className='light-title'>About</label>
            <div className='relative flex justify-between items-center'>
              <input type="text" id='about' />
              <PenSvg className='text-neutral-400' />
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileLeftSide;