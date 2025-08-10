import Navigation from "../components/Navigation";
import { Outlet } from "react-router-dom";

//store
import useMessageStore from "../store/useMessageStore.js";
import { useEffect } from "react";

const HomeLayout = () => {

  const getAllprevChatList = useMessageStore((state) => state.getAllprevChatList);

  useEffect(() => {
    getAllprevChatList();
  }, [])
  
  return (
    <div className="flex w-screen h-screen">
      <div className="w-[4%] h-full bg-offBlack p-2 border-r border-r-zinc-700">
        <Navigation />
      </div>
      <div className="w-[96%] h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default HomeLayout;