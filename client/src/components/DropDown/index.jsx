import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { IconArrowDown, IconTick } from '../../assets/icons';

const DropDown = ({ placeholder, label, required, options, onChange, optionsMaxHeight }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const containerRef = useRef(null);

  const handleSelect = useCallback(
    (option) => {
      setSelectedOption(option);
      setShowDropDown(false);
      onChange && onChange(option.value);
    },
    [onChange],
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div ref={containerRef} className='dropdown relative'>
      <h3 className='flex gap-0.5 text-primary-black'>
        {label}
        {required && <span className='text-primary-red text-sm'>*</span>}
      </h3>
      <button
        title='Show options'
        type='button'
        onClick={() => {
          setShowDropDown(!showDropDown);
        }}
        className={`${
          selectedOption ? 'border-dark-grey text-primary-black' : 'border-stroke text-light-grey'
        } w-full flex justify-between py-3 px-4 rounded-lg border-x border-y mt-1`}
      >
        {selectedOption ? selectedOption.label : placeholder || 'Click me'} <IconArrowDown />
      </button>
      {showDropDown && (
        <div
          style={{
            maxHeight: optionsMaxHeight ?? 250,
          }}
          className='rounded-lg shadow-secondary p-2 mt-2 absolute top-100 w-full overflow-y-auto'
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`${
                option.value === selectedOption?.value ? 'text-primary-red' : 'text-black'
              } 
              ${
                index === 0 ? 'border-t-0' : 'border-t'
              } border-light-grey py-3 px-4 flex justify-between w-full overflow-y-auto`}
            >
              {option.label}
              {selectedOption?.value === option.value && <IconTick />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;

DropDown.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })),
  onChange: PropTypes.func,
  optionsMaxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
