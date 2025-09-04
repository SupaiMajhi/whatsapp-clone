

const Card = ({ children, className='', ...props }) => {
  return (
    <div
        className={`customCard ${className}`}
    >
        {children}
    </div>
  )
}

export default Card;