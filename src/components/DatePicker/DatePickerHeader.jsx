import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Selector from './Selector';
import { months, years } from './utils';
import { getYear } from 'date-fns';

function getMonthFromDate(date) {
  if (date) return months.indexOf(date.toLocaleString('default', { month: 'long' }));
  return -1;
}

function getYearFromDate(date) {
  return years.indexOf(getYear(date || new Date()));
}

const DatePickerHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(() => getMonthFromDate(date));
  const [selectedYearIndex, setSelectedYearIndex] = useState(() => getYearFromDate(date));

  useEffect(() => {
    if (!date) return;
    setSelectedMonthIndex(() => getMonthFromDate(date));
    setSelectedYearIndex(() => getYearFromDate(date));
  }, [date]);

  return (
    <div className='flex gap-4 p-4'>
      <Selector
        label={date.toLocaleString('default', { month: 'long' })}
        options={months}
        currentDate={date}
        onOptionClick={(month) => {
          const monthIndex = months.indexOf(month);
          setSelectedMonthIndex(monthIndex);
          changeMonth(monthIndex);
        }}
        selectedIndex={selectedMonthIndex}
      />

      <Selector
        label={date.getFullYear()}
        options={years}
        onOptionClick={(year, index) => {
          setSelectedYearIndex(index);
          changeYear(year);
        }}
        selectedIndex={selectedYearIndex}
      />
    </div>
  );
};

export default DatePickerHeader;

DatePickerHeader.propTypes = {
  date: PropTypes.any,
  changeYear: PropTypes.func,
  changeMonth: PropTypes.func,
  decreaseMonth: PropTypes.func,
  increaseMonth: PropTypes.func,
  prevMonthButtonDisabled: PropTypes.bool,
  nextMonthButtonDisabled: PropTypes.bool,
};
