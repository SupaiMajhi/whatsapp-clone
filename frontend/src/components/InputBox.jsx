import { useState } from "react";
import PlusSvg from "../svg/PlusSvg";
import EmojiSvg from '../svg/EmojiSvg';
import MicSvg from '../svg/MicSvg';
import Button from './Button';
import SendSvg from "../svg/SendSvg";
import useMessageStore from "../store/useMessageStore.js";

const InputBox = ({ chatPartner, setMessages }) => {

  const [message, setMessage] = useState('');
  const sendNewMsg = useMessageStore((state) => state.sendNewMsg);


  const handleOnClick = async () => {
    const response = await sendNewMsg(chatPartner._id, message);
    setMessages((prev) => [...prev, response.data]);
    setMessage('');
  }

  return (
    <div className="w-full h-full flex justify-start items-center gap-2 relative bg-avatar rounded-3xl px-2 py-1">
      <div className="flex justify-center items-center gap-1">
        <Button className="hover-effect hover:rounded-full">
          <PlusSvg />
        </Button>

        <Button className="hover-effect hover:rounded-full">
          <EmojiSvg />
        </Button>
      </div>

      <div className="w-full h-full basis-full">
        <input
          type="text"
          placeholder="Type a message"
          className="w-full h-full border-none outline-none text-[0.9rem] font-normal"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="flex justify-center items-center">
        {message.length > 0 ? (
          <Button 
            className="p-2 cursor-pointer bg-green-500 rounded-full hover:rounded-full"
            handleOnClick={handleOnClick}
          >
            <SendSvg />
          </Button>
        ) : (
          <Button className="p-2 cursor-pointer hover:rounded-full hover:bg-green-500">
            <MicSvg />
          </Button>
        )}
      </div>
    </div>
  );
}

export default InputBox;