import PropTypes from 'prop-types';

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

export default Button;

Button.propTypes = {
  primary: PropTypes.bool,
  children: PropTypes.elementType,
};
