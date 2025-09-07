import { formatDate } from "../util/util.js";
import Avatar from "./Avatar";
import Button from "./Button.jsx";
//store
import useMessageStore from "../store/useMessageStore.js";


const ChatCard = ({ chat, setIsChatSelected, setChatPartner }) => {

  const getPrevChats = useMessageStore((state) => state.getPrevChats);

  const handleOnClick = async () => {
    setIsChatSelected(true);
    getPrevChats(chat.otherUser._id);
    setChatPartner(chat);
  }

  return (
    <Button 
      className="w-full h-[80px] flex gap-3 px-3 py-1 items-center rounded-2xl hover-effect cursor-pointer"
      handleOnClick={handleOnClick}
    >      
        <div className="w-[calc(100%-80%)] flex justify-center items-center">
          <Avatar className="w-12 mr-3" />        
        </div>

        <div className="w-[calc(100%-40%)] min-w-[200px] flex items-start flex-col gap-1">
          <h2 className="text-[0.95rem] font-normal text-white">{chat.otherUser.username}</h2>
          <p className="text-[0.75rem] font-light text-gray-300">{chat.lastMessage.content}</p>
        </div>

        <div className="w-[calc(100%-80%)] flex">
          <p className="text-[0.7rem] font-light text-gray-300">{formatDate(chat.lastMessage.createdAt)}</p>
        </div>
    </Button>
  );
}

export default ChatCard;