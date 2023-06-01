import { useState } from 'react';
import PropTypes from 'prop-types';

const DropDown = ({ label, required, options, onChange }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [option, setOption] = useState('click me');
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option, index) => {
    setOption(option);
    setSelectedOption(index);
    // setTimeout(() => {
    //   setShowDropDown(false);
    // }, 1000);

    setShowDropDown(false);
  };
  return (
    <div className='dropdown relative'>
      <h3 className='flex gap-0.5 text-primary-black'>
        {label}
        {required && <span className='text-primary-red text-sm'>*</span>}
      </h3>
      <button
        onClick={() => {
          setShowDropDown(!showDropDown);
        }}
        className={`${
          selectedOption != null
            ? 'border-dark-grey text-primary-black'
            : 'border-stroke text-light-grey'
        } w-full flex justify-between py-3 px-4 rounded-lg border-x border-y mt-1`}
      >
        {option}
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M6 9L12 15L18 9'
            stroke='#373435'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
      {showDropDown && (
        <ul className='rounded-lg shadow-secondary p-2 mt-2 absolute top-100 w-full'>
          {options.map((option, index) => (
            <li
              key={index}
              id={index}
              onClick={() => handleSelect(option.label, index)}
              className={`${index === selectedOption && 'text-primary-red'} ${
                index === 0 && 'border-t-0'
              } border-t border-light-grey py-3 px-4 flex justify-between`}
            >
              {option.label}
              {index === selectedOption && (
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M20 6L9 17L4 12'
                    stroke='#E33439'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;

DropDown.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })),
  onChange: PropTypes.func,
};
