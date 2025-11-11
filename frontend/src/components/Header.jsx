import Avatar from "./Avatar";
import VideoIcon from "../assets/VideoIcon";
import MenuIcon from '../assets/MenuIcon';
import SearchIcon from '../assets/SearchIcon';

const Header = () => {
  return (
    <div className="w-full min-h-14 max-h-16 flex justify-center items-center gap-3 bg-primaryBg cpadding">
      <div className="w-10"><Avatar /></div>
      <div className="grow flex flex-col">
        <h1 className="chat-heading">Zomato</h1>
        <p className="time-text">last seen today at 1.00 am</p>
      </div>
      <div className="flex justify-evenly items-center gap-10">
        <VideoIcon className='icon text-white'/>
        <SearchIcon className='icon text-white'/>
        <MenuIcon className='icon text-white'/>
      </div>
    </div>
  )
}

export default Header;