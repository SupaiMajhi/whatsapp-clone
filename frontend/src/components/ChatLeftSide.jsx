import LogoSvg from "../svg/LogoSvg.jsx";
import NewChatSvg from "../svg/NewChatSvg.jsx";
import MenuSvg from "../svg/MenuSvg.jsx";
import SearchSvg from "../svg/SearchSvg.jsx";
import ChatCard from "../components/ChatCard.jsx";
import Button from "./Button.jsx";

//store
import useMessageStore from "../store/useMessageStore.js";

const ChatLeftSide = ({ setIsChatSelected, setChatPartner }) => {

  const prevChatList = useMessageStore((state) => state.prevChatList);

  return (
      <div className="w-full h-full flex flex-col relative">
        <div className="sticky p-3">
          <div className="w-full flex justify-between items-center" >
            <div>
              <LogoSvg />
            </div>
            <div className="flex justify-center items-center gap-4">
              <Button className="hover-effect hover:rounded-full">
                <NewChatSvg />
              </Button>
              <Button className="hover-effect hover:rounded-full">
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
            <ChatCard key={chat._id} chat={chat} setIsChatSelected={setIsChatSelected} setChatPartner={setChatPartner} />
          ))}
        </div>
      </div>
  )
}

export default ChatLeftSide;