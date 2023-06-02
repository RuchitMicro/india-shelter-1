import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import DatePickerHeader from './DatePickerHeader';
import { useRef } from 'react';
import DatePickerInput from './DatePickerInput';

const DatePicker = ({ startDate, setStartDate }) => {
  const datePickerRef = useRef(null);

  return (
    <ReactDatePicker
      customInput={<DatePickerInput />}
      ref={datePickerRef}
      className='bg-white'
      shouldCloseOnSelect={false}
      selected={startDate}
      renderCustomHeader={(props) => <DatePickerHeader {...props} />}
      showYearDropdown
      showMonthDropdown
      calendarClassName='bg-white border border-light-grey border-opacity-20 px-5 shadow-calendar rounded-lg'
      dayClassName={(date) => {
        const defaultDateStyles =
          'font-normal h-8 w-8 rounded-full hover:rounded-full text-base inline-flex items-center justify-center ';
        if (!startDate) return defaultDateStyles;
        if (date.getMonth() !== startDate.getMonth()) return defaultDateStyles + ' text-light-grey';
        if (date.toDateString() === startDate.toDateString())
          return (
            defaultDateStyles +
            ' bg-secondary-green text-neutral-white font-normal hover:bg-secondary-green'
          );
        else return defaultDateStyles + ' text-primary-black';
      }}
      weekDayClassName={(_) => 'mx-1.5 text-light-grey font-semibold text-base mx-auto my-0'}
      onChange={(date) => setStartDate(date)}
    >
      <div className='w-full h-fit flex justify-end'>
        <button
          onClick={() => {
            datePickerRef.current.setOpen(false);
          }}
          className='px-4 py-2 bg-primary-red text-white font-semibold rounded-lg ml-auto'
          type='button'
          title='Apply'
        >
          Apply
        </button>
      </div>
    </ReactDatePicker>
  );
};

export default DatePicker;

DatePicker.propTypes = {
  startDate: PropTypes.object,
  setStartDate: PropTypes.func.isRequired,
};
