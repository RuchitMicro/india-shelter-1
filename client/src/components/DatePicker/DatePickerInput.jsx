import { forwardRef, useRef } from 'react';
import { IconCalendar } from '../../assets/icons';
import PropTypes from 'prop-types';

const DatePickerInput = forwardRef(function DatePickerInput({ name, ...props }, _ref) {
  const inputRef = useRef(null);
  return (
    <div className='flex flex-col gap-1'>
      <label
        role='presentation'
        onClick={() => inputRef.current?.focus()}
        onKeyDown={() => inputRef.current?.focus()}
        htmlFor={name}
        className='flex gap-0.5 items-center text-primary-black'
      >
        {props.label}
        {true && <span className='text-primary-red text-sm'>*</span>}
      </label>
      <div className='input-container px-4 py-3 border justify-between border-stroke rounded-lg flex w-full items-center'>
        <input {...props} placeholder='DD/MM/YYYY' className='w-full' name={name} ref={inputRef} />
        <IconCalendar />
      </div>
    </div>
  );
});

export default DatePickerInput;

DatePickerInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.string,
};
