import { useEffect, useState } from "react";
import { data, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import useUserStore from "../store/userStore.js";
import useSocketStore from "../store/socketStore.js";


const HomePage = ({ currentRcvr }) => {

  const getPrevChatList = useUserStore((state) => state.getPrevChatList);
  const updateStatus = useUserStore((state) => state.updateStatus);
  const setSocket = useSocketStore((state) => state.setSocket);

  useEffect(() => {
    getPrevChatList();
    const socket = new WebSocket(`${import.meta.env.VITE_SOCKET_URL}`);
    setSocket(socket);

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      

      if(message.type === 'STATUS'){
        updateStatus(message.content);
      }
    }

    return () => {
      socket.close();
      setSocket(null);
    };
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