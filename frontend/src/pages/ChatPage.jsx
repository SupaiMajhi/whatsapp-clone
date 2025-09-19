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

    connection.onmessage = (data) => {
      const message = JSON.parse(data.data);
      
      //only when user is online
      if(message.type === 'NEW_MSG'){
        setMessages((prev) => [ ...prev, message.content.data ]);
        connection.send(JSON.stringify({
          type: 'markAsDelivered',
          content: {
            data: message.content.data
          }
        }));
      }
      
      if(message.type === 'USER_ONLINE'){
        setStatus(message.content);
      }

      if(message.type === 'USER_OFFLINE'){
        setStatus(message.content);
      }

      if(message.type === 'typing'){
        setIsTyping(true);
        //todo: isTyping is never false again, so typing effect will be shown forever. for now it will false when msg will be send, but there is a problem if suppose msg never sent then the typing effect will be shown forever.
      }

      if(message.type === 'msg_delivered'){
        setMessages((prev) => prev.map((msg) => msg._id === message.content.data._id ? { ...msg, isDelivered: message.content.data.isDelivered } : msg));
      }

      if(message.type === 'message_seen'){
        const data = message.content.data;
        setMessages((prev) => prev.map((msg) => data.some(d => d === msg._id) ? { ...msg, isSeen: true } : msg));
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
