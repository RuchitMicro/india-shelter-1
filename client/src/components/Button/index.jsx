import PropTypes from 'prop-types';

const input = {
  name: 'Button',
  errorMessage: 'Error Message',
};
const Button = ({ primary, children, ...props }) => {
  return (
    <button
      className={`py-3 text-lg rounded-[4px] w-[156px] ${
        primary
          ? 'bg-primary-red text-white disabled:bg-light-red'
          : 'bg-neutral-white border border-primary-red text-primary-red disabled:text-light-red'
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
  children: PropTypes.elementType,
};

export default Button;
