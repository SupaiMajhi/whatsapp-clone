import Header from '../components/Header';
import MainContent from './mainContent';
import InputBox from './InputBox';

const ChatBox = ({ currentRcvr }) => {

  return (
    <div className='w-full h-full flex flex-col items-center'>
        <Header currentRcvr={currentRcvr} />
        <div className='relative w-full h-full cpadding bg-primaryBg'>
          <MainContent />
          <InputBox currentRcvr={currentRcvr} />
        </div>
    </div>
  )
}

export default ChatBox;