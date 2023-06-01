import PropTypes from 'prop-types';
import { useCallback } from 'react';

const RangeSlider = ({ initialValue, onChange, minValueLabel, maxValueLabel, ...props }) => {
  const handleChange = useCallback(
    (e) => {
      const progress = (e.currentTarget.value / props.max) * 100;
      e.currentTarget.style.background = `linear-gradient(to right, #E33439 ${progress}%, #f7c3c4 ${progress}%)`;
      onChange(e);
    },
    [onChange, props.max],
  );

  return (
    <div className='flex flex-col gap-1'>
      <input
        {...props}
        className='w-full'
        type='range'
        value={initialValue}
        onChange={handleChange}
      />
      <div className='flex justify-between w-full'>
        <div className='text-sm text-light-grey'>{minValueLabel}</div>
        <div className='text-sm text-light-grey'>{maxValueLabel}</div>
      </div>
    </div>
  );
};

export default RangeSlider;

RangeSlider.propTypes = {
  initialValue: PropTypes.number,
  onChange: PropTypes.func,
  minValueLabel: PropTypes.string,
  maxValueLabel: PropTypes.string,
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
