import ShowCard from "./ShowCard";
import useUserStore from "../store/userStore.js";
import { useState } from "react";

const ChatList = ({ setCurrentRcvr, setIsChatSelected }) => {

  const prevChatList = useUserStore((state) => state.prevChatList);
  const [isActive, setIsActive] = useState(false);

  return (
    <div className='w-full h-full'>
      { prevChatList.map((chat) => (
        <ShowCard key={chat.otherUser._id} chatInfo={chat} setCurrentRcvr={setCurrentRcvr} setIsChatSelected={setIsChatSelected} isActive={isActive} setIsActive={setIsActive} />
      ))}
    </div>
  )
}

export default ChatList;