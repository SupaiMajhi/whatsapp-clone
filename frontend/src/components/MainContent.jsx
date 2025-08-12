
const MainContent = ({ messages, chatPartner, scrollRef }) => {

  return (
    <div 
      className="w-full h-full px-10 py-8 overflow-x-hidden overflow-y-auto"
      ref={scrollRef}  
    >
      {messages.map((message) =>
        message.senderId !== chatPartner._id ? (
          <div className="chat chat-end" key={message._id}>
            <div className="chat-bubble text-[0.78rem] font-normal">
              {message.content}
            </div>
          </div>
        ) : (
          <div className="chat chat-start" key={message._id}>
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