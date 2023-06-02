import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { IconCalendar } from '../../assets/icons';

const DatePickerInput = forwardRef(function DatePickerInput({ value, onClick }, ref) {
  return (
    <button
      onClick={onClick}
      ref={ref}
      className='px-4 py-3 border justify-between border-light-grey rounded-lg flex w-full items-center'
    >
      {value ? value : <span className='text-light-grey text-base'>DD/MM/YYYY</span>}
      <IconCalendar />
    </button>
  );
});

export default DatePickerInput;

DatePickerInput.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
};
