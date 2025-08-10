import SearchSvg from '../svg/SearchSvg';
import MenuSvg from '../svg/MenuSvg';
import DefaultAvatar from './DefaultAvatar';
import Button from './Button';

const Header = ({ chatPartner }) => {
  
  return (
    <div className='w-full h-full flex justify-between items-center px-3 py-1'>
        <div className='w-[750px] flex justify-start items-center gap-3 cursor-pointer'>
            <DefaultAvatar className='w-10 h-10' />
            <div className='flex flex-col'>
                <h2 className='text-[0.9rem] font-semibold'>{chatPartner?.chatPartnerInfo.username}</h2>
                <p className='text-[0.8rem] font-light text-neutral-400'>last seen today 10.42 pm</p>
            </div>
        </div>
        <div className='flex justify-center items-center gap-3 p-2'>
          <Button className='hover-effect hover:rounded-full'>
            <SearchSvg />
          </Button>
          <Button className='hover-effect hover:rounded-full'>
            <MenuSvg />
          </Button>
        </div>
    </div>
  )
}

export default Header;