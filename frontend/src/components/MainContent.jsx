import { useRef, useEffect } from "react";

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
        message.senderId !== chatPartner?.otherUser?._id ? (
          <div className="chat chat-end" key={message._id}>
            <div className="chat-bubble text-[0.78rem] font-normal bg-green-800">
              {message.content}
            </div>
          </div>
        ) : (
            <div 
              className="chat chat-start" 
              key={message._id}
              ref={(el) => setRef(el, message)}
              id={message._id}
            >
              <div className="chat-bubble text-[0.78rem] font-normal">
                {message.content}
              </div>
            </div>
        )
      )}
    </div>
  );
}

export default MainContent;