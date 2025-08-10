import AvatarSvg from "../svg/AvatarSvg";

const DefaultAvatar = ({ className='' }) => {
  return (
    <div className={`bg-avatar rounded-full ${className}`}>
        <AvatarSvg className="w-full h-full object-contain" />
    </div>
  )
}

export default DefaultAvatar;