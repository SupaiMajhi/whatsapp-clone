import NewGroupSvg from "../svg/NewGroupSvg";
import StarSvg from "../svg/StarSvg";
import SelectSvg from "../svg/SelectSvg";
import ExitSvg from "../svg/ExitSvg";


const DropDownMenu = () => {
  return (
    <div className="absolute z-50 min-w-[200px] bg-neutral-800 text-white rounded-2xl p-2 tracking-tight animate-pop origin-top-left">
      {/** todo:it only closes when you click on the button only */}
      <div className="mini-flex-box rounded-lg hover:bg-neutral-600/50">
        <NewGroupSvg className="menu-svg" />
        <p className="menu-text">New group</p>
      </div>
      <div className="mini-flex-box rounded-lg hover:bg-neutral-600/50">
        <StarSvg className="menu-svg" />
        <p className="menu-text">Starred messages</p>
      </div>
      <div className="mini-flex-box rounded-lg hover:bg-neutral-600/50">
        <SelectSvg className="menu-svg" />
        <p className="menu-text">Select chats</p>
      </div>
      <div className="line"></div>
      <div className="mini-flex-box rounded-lg hover:bg-red-800/10 group">
        <ExitSvg className="menu-svg group-hover:text-rose-300" />
        <p className="menu-text group-hover:text-rose-300">Log out</p>
      </div>
    </div>
  );
}

export default DropDownMenu;