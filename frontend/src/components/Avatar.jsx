
const Avatar = ({ className='', ...props}) => {
  
  return (
    <div>
        <div className="avatar">
          <div className={`ring-primary ring-offset-base-100 rounded-full ring-2 ring-offset-2 ${className}`}>
            <img src={props.url} className='w-full h-full object-contain object-center' />
          </div>
        </div>
    </div>
  )
}

export default Avatar;