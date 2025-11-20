import { IoCheckmarkSharp } from "react-icons/io5";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { validateTime } from "../lib.js";
import { useCallback, useEffect, useRef } from "react";

//store imports
import useAuthStore from "../store/authStore.js";
import useMessageStore from "../store/messageStore.js";
import useSocketStore from "../store/socketStore.js";

const MainContent = () => {

  const messages = useMessageStore((state) => state.messages);
  const user = useAuthStore((state) => state.user);
  const socket = useSocketStore((state) => state.socket);
  const observer = useRef(null);
  const rootRef = useRef(null);
  const messagesIds = [];


  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting){
        messagesIds.push(entry.target.id);
        observer.current.unobserve(entry.target);
      }
    })
    socket.send(JSON.stringify({
      type: 'markAsSeen',
      content: {
        data: messagesIds
      }
    }))
  }

  useEffect(() => {
    observer.current = new IntersectionObserver(observerCallback, {
      root: rootRef.current,
      threshold: 0.5
    });

    return () => {
      if(observer.current){
        observer.current.disconnect();
      }
    }
  }, [messages]);


  const setRef = useCallback((elem) => {
    if(elem && !messagesIds.includes(elem.target?.id)){
      if(observer.current){
        observer.current.observe(elem);
      }
    }
  }, [])

  return (
    <div 
      className="w-full h-[560px] overflow-x-hidden overflow-y-auto"
      ref={rootRef}
    >
      {messages.map((message) =>
        message.senderId === user._id ? (
          <div 
            className="chat chat-end" 
            key={message._id}
            id={message._id}
          >
            <div className="chat-bubble bg-green-900 text flex justify-between items-center gap-2">
              {message.text}
              <div className="flex justify-center items-center gap-1 mt-3">
                { message.isSeen ? (
                  <p className="time-text">{validateTime(message.readAt)}</p>
                ) : message.isDelivered ? (
                  <p className="time-text">{validateTime(message.deliveredAt)}</p>
                ) : message.isSent ? (
                  <p className="time-text">{validateTime(message.createdAt)}</p>
                ) : (
                  <p></p>
                )}

                { message.isSeen ? (
                  <IoCheckmarkDoneSharp className="text-blue-400" />
                ) : message.isDelivered ? (
                <IoCheckmarkDoneSharp className="text-baseClr" />
                ) : message.isSent ? (
                  <IoCheckmarkSharp className="text-baseClr" />
                ) : (
                  <FaRegClock className="text-baseClr" />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div 
            className="chat chat-start" 
            key={message._id}
            ref={(elem) => setRef(elem)}
            id={message._id}
          >
            <div className="chat-bubble bg-secondaryClr text">
              {message.text}
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default MainContent;