import ShowCard from "./ShowCard";
import useUserStore from "../store/userStore.js";

const ChatList = () => {

  const prevChatList = useUserStore((state) => state.prevChatList);

  return (
    <div className='w-full h-full'>
      { prevChatList.map((chat) => (
        <ShowCard chatInfo={chat} />
      ))}
    </div>
  )
}

export default ChatList;