import SearchSvg from '../svg/SearchSvg';

const SettingsLeftSide = () => {
  return (
    <div className='left-side-container'>
        <div className=" w-full h-[17%] flex flex-col">
            <h1 className="h1">Settings</h1>
            <div className='relative flex flex-col mt-5'>
                <SearchSvg className="absolute left-4 top-[25%]" />
                <input type="text" placeholder='Search settings' className='w-full h-full py-2 pl-14 pr-5 rounded-4xl bg-darkSlateGray text-[0.9rem] text-zinc-100' />
            </div>
        </div>
        
        <div className='w-full h-[calc(100%-17%)] overflow-y-auto overflow-x-hidden'>

        </div>
    </div>
  )
}

export default SettingsLeftSide;