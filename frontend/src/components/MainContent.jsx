import { useRef, useEffect } from "react";
import { IoCheckmarkSharp, IoCheckmarkDoneSharp, IoTimeOutline } from "react-icons/io5";

const MainContent = ({ messages, chatPartner, scrollRef, isTyping, socket }) => {

  const observer = useRef(null);

  const setRef = (el, message) => {
    if(el && message.isSeen !== true){
      observer.current.observe(el);
    }
  }

  useEffect(() => {
    let messagesIds = [];
    observer.current = new IntersectionObserver((entries) => {
      console.log(entries);
      entries.map((entry) => {
        if(entry.isIntersecting){
          messagesIds.push(entry.target.id);
        }
      });
      if(messagesIds.length > 0){
        socket.send(JSON.stringify({
          type: 'markAsSeen',
          content: {
            data: messagesIds,
            senderId: chatPartner.otherUser._id
          }
        }))
      }
    }, { threshold: 1.0 })
  }, [])

  return (
    <div
      className="w-full h-full px-10 py-8 overflow-x-hidden overflow-y-auto"
      ref={scrollRef}
    >
      {messages.map((message) =>
        message.senderId === chatPartner.otherUser._id ? (
          <div
            className="chat chat-start"
            key={message._id}
            id={message._id}
            ref={(el) => setRef(el, message)}
          >
            <div className="chat-bubble message-text bg-slate-800">
              {message.content}
            </div>
          </div>
        ) : (
          <div 
            className="chat chat-end"
            key={message._id}
          >
            <div className="flex gap-2 chat-bubble message-text bg-green-900">
              {message.content}
              <div className="flex justify-center items-center gap-1 mt-[6px]">
                <span className="text-[0.6rem] text-gray-400">2.30 pm</span>
                <span>
                  {
                    !message.isSent ? (
                      <IoTimeOutline className="text-[0.9rem] text-gray-400" />
                    ) : !message.isDelivered ? (
                      <IoCheckmarkSharp className="text-[0.9rem] text-gray-400" />
                    ) : message.isSeen ? (
                      <IoCheckmarkDoneSharp className="text-[0.9rem] text-blue-300" />
                    ) : (
                      <IoCheckmarkDoneSharp className="text-[0.9rem] text-gray-400" />
                    )
                  }
                </span>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default MainContent;