import ProfileUploader from '../components/ProfileUploader';

const ProfileLeftSide = () => {
  return (
    <div className="left-side-container">
      <div className="w-full">
        <h1 className="h1">Profile</h1>
      </div>
      <div>
        <ProfileUploader />
      </div>
      <div className='flex flex-col gap-7'>
        <div className='flex flex-col gap-5'>
            <label htmlFor="name" className='light-title'>Your name</label>
            <input type="text" id='name' />
        </div>
        <p className='text-[0.8rem] text-neutral-400 font-nornal'>This is not your username or PIN. This name will be visible to your Whatsapp contacts.</p>
        <div className='flex flex-col gap-5 mt-4'>
            <label htmlFor="about" className='light-title'>About</label>
            <input type="text" id='about' />
        </div>
      </div>
    </div>
  )
}

export default ProfileLeftSide;