import LeftArrow from "../svg/LeftArrow";
import Button from "./Button";
import SearchSvg from "../svg/SearchSvg";
import Card from "./Card";
import NewGroupSvg from "../svg/NewGroupSvg";
import NewContactSvg from "../svg/NewContactSvg";
import NewCommunitySvg from "../svg/NewCommunitySvg";
import Avatar from "./Avatar";

import useUserStore from "../store/useUserStore.js";
import DefaultAvatar from "./DefaultAvatar.jsx";

const NewChat = ({ isDotsClicked, setIsDotsClicked }) => {

  const users = useUserStore((state) => state.users);

  return (
    <div className={`w-full h-full relative left-side-container ${ isDotsClicked ? 'hidden-none' : 'hidden' } ${ isDotsClicked ? 'animate-slideIn' : 'animate-slideOut' }`}>
      <div className="sticky top-0 left-0 flex flex-col mb-2">
        <div className="header flex items-center gap-5">
          <Button
            className="cursor-pointer hover-effect rounded-full"
            handleOnClick={() => setIsDotsClicked(false)}
          >
            <LeftArrow />
          </Button>
          <p className="text-[0.9rem] font-medium">New chat</p>
        </div>

          <div className="w-[calc(100%-5%)] flex mx-auto relative justify-center items-center bg-darkSlateGray rounded-3xl mt-5">
            <SearchSvg className="absolute left-4 top-[10px] text-gray-400" />
            <input
              type="text"
              placeholder="Search or start a new chat"
              className="w-full min-h-10 pl-12 pr-5 py-1 border-none outline-none text-[0.9rem] font-normal"
            />
          </div>
      </div>

      <div className="w-full h-full flex flex-col gap-2 overflow-x-hidden overflow-y-auto">
        <Card className="min-h-[60px]">
          <div className="green-circle">
            <NewGroupSvg className="w-6 h-6" />
          </div>
          <h1 className="font-medium text-[0.95rem]">New group</h1>
        </Card>

        <Card className="min-h-[60px]">
          <div className="green-circle">
            <NewContactSvg className="w-6 h-6" />
          </div>
          <h1 className="font-medium text-[0.95rem]">New contact</h1>
        </Card>

        <Card className="min-h-[60px]">
          <div className="green-circle">
            <NewCommunitySvg className="w-6 h-6" />
          </div>
          <h1 className="font-medium text-[0.95rem]">New community</h1>
        </Card>

        <div>
          {/**dyanamic rendering */}
          { users.map((user) => (
            <Card className="min-h-[60px]">
              <div>
                { user?.profilePic?.url ? (
                  <Avatar className="w-12" url={user?.profilePic?.url} />
                ) : (
                  <DefaultAvatar className="w-14" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-medium text-[0.9rem]">{user.username}</h1>
                <p className="font-normal text-[0.8rem] text-zinc-400">about them</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewChat;