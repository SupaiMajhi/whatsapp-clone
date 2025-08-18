import React from 'react'

const Avatar = ({ className='', ...props}) => {
  return (
    <div>
        <div className="avatar">
          <div className={`ring-primary ring-offset-base-100 rounded-full ring-2 ring-offset-2 ${className}`}>
            <img src={props.url} />
          </div>
        </div>
    </div>
  )
}

export default Avatar;