import useAuthStore from "../store/authStore.js";
import useMessageStore from "../store/messageStore.js";
import { IoCheckmarkSharp } from "react-icons/io5";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { validateTime } from "../lib.js";

const MainContent = () => {

  const messages = useMessageStore((state) => state.messages);
  const user = useAuthStore((state) => state.user);

  return (
    <div className="w-full h-[560px] overflow-x-hidden overflow-y-auto">
      {messages.map((message) =>
        message.senderId === user._id ? (
          <div className="chat chat-end" key={message._id}>
            <div className="chat-bubble bg-green-900 text flex justify-between items-center gap-2">
              {message.text}
              <div className="flex justify-center items-center gap-1 mt-3">
                { message.isSent ? (
                  <p className="time-text">{validateTime(message.createdAt)}</p>
                ) : message.isDelivered ? (
                  <p className="time-text">{validateTime(message.deliveredAt)}</p>
                ) : message.isSeen ? (
                  <p className="time-text">{validateTime(message.readAt)}</p>
                ) : (
                  <p></p>
                )}

                { message.isSent ? (
                <IoCheckmarkSharp className="text-baseClr" />
                ) : message.isDelivered ? (
                <IoCheckmarkDoneSharp className="text-baseClr" />
                ) : message.isSeen ? (
                <IoCheckmarkDoneSharp className="text-blue-400" />
                ) : (
                  <FaRegClock className="text-baseClr" />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="chat chat-start" key={message._id}>
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