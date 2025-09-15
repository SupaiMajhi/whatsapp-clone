import { useEffect } from "react";
import Header from "../components/Header.jsx";
import InputBox from "../components/InputBox.jsx";
import MainContent from "../components/MainContent.jsx";
//store
import useMessageStore from "../store/useMessageStore.js";

const ChatBox = ({ chatPartner, messages, setMessages, scrollRef, socket, isTyping }) => {

  const isLoading = useMessageStore((state) => state.isLoading);
  const PrevChats = useMessageStore((state) => state.PrevChats);
  
  useEffect(() => {
    setMessages(PrevChats);
  }, [ PrevChats ])

  return (
    <div className="relative w-full h-full flex flex-col justify-start items-center">
      <div className="sticky top-0 w-full h-[calc(100%-90%)] bg-customBlack">
        <Header chatPartner={chatPartner} />
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
        />
      </div>
    </div>
  );
}

export default ChatBox;