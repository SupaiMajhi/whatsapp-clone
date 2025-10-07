import { useState, useEffect, useRef } from "react";
import ChatLeftSide from "../components/ChatLeftSide.jsx";
import ChatBox from "./ChatBox.jsx";
//store
import useUserStore from "../store/useUserStore.js";
import useMessageStore from "../store/useMessageStore.js";

const ChatPage = ({ isChatSelected, setIsChatSelected, setChatPartner, chatPartner }) => {

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const setStatus = useUserStore((state) => state.setStatus);
  const updatePrevChatList = useMessageStore((state) => state.updatePrevChatList);

  //socket
  useEffect(() => {
    const connection = new WebSocket('ws://localhost:8080');

    connection.onopen = (data) => {
      console.log('connection established');
    }

    connection.onmessage = (data) => {
      const message = JSON.parse(data.data);

      if (message.type === "USER_ONLINE") {
        setStatus(message.content);
      }

      if (message.type === "USER_OFFLINE") {
        setStatus(message.content);
      }
      
      //only when user is online
      if(message.type === 'NEW_MSG'){
        setMessages((prev) => [ ...prev, message.content.data ]);
        //todo: if possible send this event only from the receiver socket
        connection.send(JSON.stringify({
          type: 'markAsDelivered',
          content: {
            data: message.content.data,
            time: Date.now()
          }
        }));
      }

      if(message.type === 'offline_msg'){
        //message.content.data is an array
        updatePrevChatList(message.content.data);
        const messages = [];
        message.content.data.forEach((d) => d.message.forEach((m) => messages.push(m)));
        connection.send(JSON.stringify({
          type: 'markAsDelivered',
          content: {
            data: messages, //this is an array
            time: Date.now()
          }
        }))
        //todo: send ack to the servr that offline msges have successfully delivered to the user and make the appropriate changes to the server and back to the user UI. 
      }

      if(message.type === 'typing'){
        setIsTyping(true);
        //todo: isTyping is never false again, so typing effect will be shown forever. for now it will false when msg will be send, but there is a problem if suppose msg never sent then the typing effect will be shown forever.
      }

      if(message.type === 'msg_delivered'){
        console.log('msg_delivered', message.content.data)
        setMessages((prev) => prev.map((msg) => msg._id === message.content.data._id ? {...msg, isDelivered: message.content.data.isDelivered, deliveredAt: message.content.data.deliveredAt} : msg));
      }

      // if(message.type === 'message_seen'){
      //   const data = message.content.data;
      //   setMessages((prev) => prev.map((msg) => {
      //     const updated = data.find((d) => d._id === msg._id);
      //     return updated ? { ...msg, isSeen: updated.isSeen, readAt: updated.readAt} : msg;
      //   }));
      // }
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
