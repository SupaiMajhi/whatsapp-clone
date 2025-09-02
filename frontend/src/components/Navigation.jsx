import { NavLink } from "react-router-dom";
import ChatSvg from "../svg/ChatSvg";
import StatusSvg from "../svg/StatusSvg";
import SettingSvg from "../svg/SettingSvg";
import ProfileSvg from "../svg/ProfileSvg";

const Navigation = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between items-center p-2 bg-offBlack">
        <div className="flex flex-col justify-center items-center gap-2">
            <NavLink to={'/'} className='hover-effect hover:rounded-full'>
                <ChatSvg />
            </NavLink>
            <NavLink to={'/status'} className='hover-effect hover:rounded-full'>
                <StatusSvg />
            </NavLink>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
            <NavLink to={'/settings'} className='hover-effect hover:rounded-full'>
                <SettingSvg />
            </NavLink>
            <NavLink to={'/profile'} className='hover-effect hover:rounded-full'>
                <ProfileSvg />
            </NavLink>
        </div>
    </div>
  )
}

export default Navigation;