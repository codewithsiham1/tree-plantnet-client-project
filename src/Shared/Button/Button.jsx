import PropTypes from 'prop-types'
const Button = ({ label, onClick, disabled, outline, small, icon: Icon,type='button' }) => {
  return (
    <button
    type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
          relative
          disabled:opacity-70
          disabled:cursor-not-allowed
          rounded-lg
          hover:opacity-80
          transition
          px-4
          w-full
          ${outline ? 'bg-red-400' : 'bg-lime-500'}
          ${outline ? 'border-red-300' : 'border-lime-500'}
          ${outline ? 'text-white' : 'text-white'}
          ${small ? 'text-sm' : 'text-md'}
          ${small ? 'py-1' : 'py-3'}
          ${small ? 'font-light' : 'font-semibold'}
          ${small ? 'border-[1px]' : 'border-2'}
        `}
    >
      {Icon && (
        <Icon
          size={24}
          className='
              absolute
              left-4
              top-3
            '
        />
      )}
      {label}
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  outline: PropTypes.bool,
  small: PropTypes.bool,
  icon: PropTypes.elementType,
}

export default Button