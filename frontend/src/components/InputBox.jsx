import PlusIcon from "../assets/PlusIcon";
import StickerIcon from "../assets/StickerIcon";
import MicIcon from "../assets/MicIcon";

const InputBox = () => {
  return (
    <div className="absolute bottom-5 min-w-[calc(100%-2em)] max-w-[calc(100%-1.5em)] min-h-12 max-h-14 flex items-center gap-4 bg-secondaryClr/50 rounded-4xl px-5 mx-auto"> 
      <div className="flex justify-center items-center gap-5">
        <PlusIcon className='icon text-white' />
        <StickerIcon className='icon text-white' />
      </div>
      <div className="grow">
        <input type="text" placeholder="Type a message" className="w-full h-full outline-0 text-[1rem] font-semibold " />
      </div>
      <div><MicIcon className='icon text-white' /></div>
    </div>
  )
}

export default InputBox;