import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { IconArrowDown, IconTick } from '../../assets/icons';

const DropDown = ({
  placeholder,
  label,
  required,
  options,
  onChange,
  optionsMaxHeight,
  showError = true,
}) => {
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
    setSelectedOption(null);
  }, [options]);

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
        } w-full flex justify-between gap-1 py-3 px-4 rounded-lg border-x border-y mt-1`}
      >
        {selectedOption ? selectedOption.label : placeholder || 'Click me'} <IconArrowDown />
      </button>
      {showDropDown && (
        <div
          style={{
            maxHeight: optionsMaxHeight ?? 160,
            maxHeight: optionsMaxHeight ?? 160,
          }}
          className='rounded-lg bg-white shadow-secondary p-2 mt-2 absolute top-100 w-full overflow-y-auto z-20 border border-stroke'
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`${
                option.value === selectedOption?.value
                  ? 'text-primary-red'
                  : 'text-primary-black hover:bg-grey-white'
              } 
              ${
                index ? 'border-t border-stroke' : 'border-none'
              } border-b border-stroke py-3 gap-2 px-4 flex justify-between w-full overflow-y-auto transition-colors duration-300 ease-out`}
            >
              {option.label}
              {selectedOption?.value === option.value ? <IconTick /> : <div></div>}
            </button>
          ))}
        </div>
      )}
      {showError ? (
        <span className='text-sm text-primary-red mt-1'>{false || String.fromCharCode(160)}</span>
      ) : (
        ''
      )}
    </div>
  );
};

export default DropDown;

DropDown.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })),
  onChange: PropTypes.func,
  optionsMaxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showError: PropTypes.bool,
};
