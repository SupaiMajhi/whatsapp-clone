
const CustomInput = ({ className='', children, props }) => {
  return (
    <div
        className={`${className}`}
    >
        {children}
    </div>
  )
}

export default CustomInput;