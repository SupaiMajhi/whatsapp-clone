import { useState, useEffect, useRef } from "react";
import ChatLeftSide from "../components/ChatLeftSide.jsx";
import ChatBox from "./ChatBox.jsx";
//store
import useUserStore from "../store/useUserStore.js";

const ChatPage = ({ isChatSelected, setIsChatSelected, setChatPartner, chatPartner }) => {

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);
  const setStatus = useUserStore((state) => state.setStatus);

  //socket
  useEffect(() => {
    const connection = new WebSocket('ws://localhost:8080');

    connection.onopen = (data) => {
      console.log('connection established');
    }

    connection.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if(data.type === 'NEW_MSG'){
        setMessages((prev) => [ ...prev, data.content ]);
      }
      
      if(data.type === 'USER_ONLINE'){
        setStatus(data.content);
      }

      if(data.type === 'USER_OFFLINE'){
        setStatus(data.content);
      }
    }

    setSocket(connection);

    return () => {
      if(connection.readyState === WebSocket.OPEN){
        connection.close();
      }
    }
  }, []);

  //ref
  useEffect(() => {
    if(scrollRef.current){
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "instant"
      });
    }
  }, [ messages ]);

  return (
    <div className="flex w-full h-full">
      <div className="w-[30%] h-full">
        <ChatLeftSide 
          setIsChatSelected={setIsChatSelected}
          setChatPartner={setChatPartner}
        />
      </div>
      <div className="w-[calc(100%-30%)]">
        { isChatSelected && (
          <ChatBox
            chatPartner={chatPartner}
            setMessages={setMessages}
            messages={messages}
            scrollRef={scrollRef}
          />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
