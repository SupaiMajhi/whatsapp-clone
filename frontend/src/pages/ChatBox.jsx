import { useEffect } from "react";
import Header from "../components/Header.jsx";
import InputBox from "../components/InputBox.jsx";
import MainContent from "../components/MainContent.jsx";
//store
import useMessageStore from "../store/useMessageStore.js";
import useUserStore from "../store/useUserStore.js";

const ChatBox = ({ chatPartner, messages, setMessages, scrollRef, socket, isTyping, setIsTyping }) => {

  const isLoading = useMessageStore((state) => state.isLoading);
  const PrevChats = useMessageStore((state) => state.PrevChats);
  const status = useUserStore((state) => state.status);
  const getUserStatus = useUserStore((state) => state.getUserStatus);
  
  useEffect(() => {
    setMessages(PrevChats);
  }, [ PrevChats ])
    
  //status
  useEffect(() => {
    async function fetchData(){
      getUserStatus(chatPartner._id);
    };

    fetchData();
  }, [])

  return (
    <div className="relative w-full h-full flex flex-col justify-start items-center">
      <div className="sticky top-0 w-full h-[calc(100%-90%)] bg-customBlack">
        <Header
          chatPartner={chatPartner}
          status={status}
        />
      </div>
      <div className="w-full h-[calc(100%-17%)]">
        <MainContent
          messages={messages}
          chatPartner={chatPartner}
          scrollRef={scrollRef}
          isTyping={isTyping}
        />
      </div>
      <div className="sticky z-10 bottom-3 w-full h-[calc(100%-93%)] px-2 mx-auto">
        <InputBox
          chatPartner={chatPartner}
          setMessages={setMessages}
          socket={socket}
          setIsTyping={setIsTyping}
        />
      </div>
    </div>
  )
}

export default ChatBox;