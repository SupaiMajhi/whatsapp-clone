import SearchSvg from '../svg/SearchSvg';
import DefaultAvatar from '../components/DefaultAvatar';
import useAuthStore from '../store/useAuthStore';
import KeySvg from '../svg/KeySvg';
import LockSvg from "../svg/LockSvg";
import BellSvg from "../svg/BellSvg";
import KeyboardSvg from "../svg/KeyboardSvg";
import HelpSvg from "../svg/HelpSvg";
import ExitSvg from "../svg/ExitSvg";
import ChatSvg from '../svg/ChatSvg';
import Button from './Button';

const SettingsLeftSide = () => {

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="left-side-container">
      <div className=" w-full h-[17%] flex flex-col">
        <h1 className="h1">Settings</h1>
        <div className="relative flex flex-col mt-5">
          <SearchSvg className="absolute left-4 top-[25%]" />
          <input
            type="text"
            placeholder="Search settings"
            className="w-full h-full py-3 pl-14 pr-5 rounded-4xl bg-darkSlateGray text-[0.9rem] text-zinc-100"
          />
        </div>
      </div>

      <div className="w-full h-[calc(100%-17%)] overflow-y-auto overflow-x-hidden">
        <div className="customCard mb-5">
          <DefaultAvatar className="w-16" />
          <div>
            <h1 className="light-h1">{isAuthenticated?.username}</h1>
            <p className="light-title">about</p>
          </div>
        </div>
        <div className="line"></div>
        <div className="flex flex-col gap-1 mt-3 mb-2">
          <Button>
            <div className="customCard">
              <KeySvg />
              <div className='flex flex-col justify-center items-start'>
                <h1 className="light-h1">Account</h1>
                <p className="light-title">
                  Security notifications, account info
                </p>
              </div>
            </div>
          </Button>

          <Button>
            <div className="customCard">
              <LockSvg />
              <div className='flex flex-col justify-center items-start'>
                <h1 className="light-h1">Privacy</h1>
                <p className="light-title">
                  Blocked contacts, dissapearing messages
                </p>
              </div>
            </div>
          </Button>

          <Button>
            <div className="customCard">
              <ChatSvg />
              <div className='flex flex-col justify-center items-start'>
                <h1 className="light-h1">Chats</h1>
                <p className="light-title">Theme, wallpaper, chat settings</p>
              </div>
            </div>
          </Button>

          <Button>
            <div className="customCard">
              <BellSvg />
              <div className='flex flex-col justify-center items-start'>
                <h1 className="light-h1">Notifications</h1>
                <p className="light-title">Message notifications</p>
              </div>
            </div>
          </Button>

          <Button>
            <div className="customCard">
              <KeyboardSvg />
              <div className='flex flex-col justify-center items-start'>
                <h1 className="light-h1">Keyboard shortcuts</h1>
                <p className="light-title">Quick actions</p>
              </div>
            </div>
          </Button>

          <Button>
            <div className="customCard">
              <HelpSvg />
              <div className='flex flex-col justify-center items-start'>
                <h1 className="light-h1">Help</h1>
                <p className="light-title">
                  Help center, contact us, privacy policy
                </p>
              </div>
            </div>
          </Button>

          <Button>
            <div className="customCard">
              <ExitSvg className="text-red-500"/>
              <div>
                <h1 className="light-h1 text-red-500">Log out</h1>
              </div>
            </div>
          </Button>
        </div>
        <div className='line mb-20'></div>
      </div>
    </div>
  );
}

export default SettingsLeftSide;