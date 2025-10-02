import LogoSvg from "../svg/LogoSvg.jsx";
import NewChatSvg from "../svg/NewChatSvg.jsx";
import MenuSvg from "../svg/MenuSvg.jsx";
import SearchSvg from "../svg/SearchSvg.jsx";
import ChatCard from "../components/ChatCard.jsx";
import Button from "./Button.jsx";

//store
import useMessageStore from "../store/useMessageStore.js";
import useUserStore from "../store/useUserStore.js";
import { useState } from "react";
import NewChat from "./NewChat.jsx";

const ChatLeftSide = ({ setIsChatSelected, setChatPartner }) => {

  const [isDotsClicked, setIsDotsClicked] = useState(false);

  const prevChatList = useMessageStore((state) => state.prevChatList);
  const getAllUsers = useUserStore((state) => state.getAllUsers);

  const handleOnClick = () => {
    getAllUsers();
    setIsDotsClicked(true);
  }


  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden">
      <NewChat
        isDotsClicked={isDotsClicked}
        setIsDotsClicked={setIsDotsClicked}
        setIsChatSelected={setIsChatSelected}
        setChatPartner={setChatPartner}
      />
      <div className={`${isDotsClicked ? 'hidden' : 'hidden-none'}`}>
        <div className="sticky p-3">
          <div className="w-full flex justify-between items-center">
            <div>
              <LogoSvg />
            </div>
            <div className="flex justify-center items-center gap-4">
              <Button
                className="hover-effect hover:rounded-full"
                handleOnClick={handleOnClick}
              >
                <NewChatSvg />
              </Button>
              <Button 
                className="hover-effect hover:rounded-full"
              >
                <MenuSvg />
              </Button>
            </div>
          </div>

          {/* SEARCH INPUT */}
          <div className="w-[calc(100%-5%)] flex mx-auto relative justify-center items-center bg-darkSlateGray rounded-3xl mt-5">
            <SearchSvg className="absolute left-4 top-[10px] text-gray-400" />
            <input
              type="text"
              placeholder="Search or start a new chat"
              className="w-full min-h-10 pl-12 pr-5 py-1 border-none outline-none text-[0.9rem] font-normal"
            />
          </div>
        </div>

        <div className="w-full mt-[20px] flex flex-col justify-center items-center overflow-x-hidden overflow-y-auto px-4 py-2">
          {prevChatList.map((chat) => (
            <ChatCard
              key={chat.otherUser._id}
              chat={chat}
              setIsChatSelected={setIsChatSelected}
              setChatPartner={setChatPartner}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatLeftSide;