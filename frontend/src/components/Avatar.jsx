import React from 'react'

const Avatar = ({ className='', ...props}) => {
  return (
    <div>
        <div className="avatar">
          <div className={`ring-primary ring-offset-base-100 rounded-full ring-2 ring-offset-2 ${className}`}>
            <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
          </div>
        </div>
    </div>
  )
}

export default Avatar;