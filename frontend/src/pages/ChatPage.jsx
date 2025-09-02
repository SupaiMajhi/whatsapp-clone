import { useState, useEffect, useRef } from "react";
import ChatLeftSide from "../components/ChatLeftSide.jsx";
import ChatBox from "./ChatBox.jsx";
//store
import useUserStore from "../store/useUserStore.js";

const ChatPage = ({ isChatSelected, setIsChatSelected, setChatPartner, chatPartner }) => {

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
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

      if(data.type === 'typing'){
        setIsTyping(true);
        //todo: isTyping is never false again, so typing effect will be shown forever. for now it will false when msg will be send, but there is a problem if suppose msg never sent then the typing effect will be shown forever.
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
    <div className="page-container">
      <div className="left-side">
        <ChatLeftSide 
          setIsChatSelected={setIsChatSelected}
          setChatPartner={setChatPartner}
        />
      </div>
      <div className="right-side">
        { isChatSelected && (
          <ChatBox
            chatPartner={chatPartner}
            setMessages={setMessages}
            messages={messages}
            scrollRef={scrollRef}
            socket={socket}
            isTyping={isTyping}
            setIsTyping={setIsTyping}
          />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
