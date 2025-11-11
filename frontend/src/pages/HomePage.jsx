import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import useUserStore from "../store/userStore.js";


const HomePage = () => {

  const getPrevChatList = useUserStore((state) => state.getPrevChatList);

  useEffect(() => {
    getPrevChatList();
  }, []);

  return (
    <div className="w-screen h-screen flex">
      <div className="w-[70px] py-3 bg-primaryBg/30">
        <Navbar />
      </div>
      <div className="w-[calc(100%-70px)]">
        <Outlet />
      </div>
    </div>
  )
}

export default HomePage;