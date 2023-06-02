import PropTypes from 'prop-types';

const CardRadio = ({ label, current, children, value, name, onChange }) => {
  return (
    <label htmlFor={value} className='flex flex-col gap-2 w-full'>
      <div
        className={`w-full border-2 rounded-lg py-4 px-7 flex items-center justify-center
      ${
        current === value
          ? 'bg-light-green border-secondary-green stroke-secondary-green'
          : 'bg-transparent stroke-light-grey border-stroke'
      } `}
      >
        <input
          type='radio'
          name={name}
          value={value}
          id={value}
          className='hidden'
          onChange={onChange}
        />
        {children}
      </div>

      {label && (
        <div
          className={`text-center text-xs  leading-normal
        ${
          current === value
            ? 'text-secondary-green font-semibold'
            : 'text-primary-black font-normal'
        }
        `}
        >
          {label}
        </div>
      )}
    </label>
  );
};

CardRadio.propTypes = {
  label: PropTypes.string,
  current: PropTypes.string,
  children: PropTypes.element,
  value: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

export default CardRadio;
