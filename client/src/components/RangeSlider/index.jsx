import PropTypes from 'prop-types';
import { useMemo } from 'react';

const RangeSlider = ({ initialValue, onChange, minValueLabel, maxValueLabel, ...props }) => {
  const inputBackground = useMemo(() => {
    if (isNaN(parseInt(initialValue)))
      return `linear-gradient(to right, #E33439 ${0}%, #f7c3c4 ${0}%)`;
    const progress = (parseInt(initialValue) / props.max) * 100;
    return `linear-gradient(to right, #E33439 ${progress}%, #f7c3c4 ${progress}%)`;
  }, [initialValue, props.max]);

  return (
    <div className='flex flex-col gap-1'>
      <input
        {...props}
        className='w-full'
        type='range'
        value={initialValue || 0}
        onChange={onChange}
        style={{
          background: inputBackground,
        }}
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
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  minValueLabel: PropTypes.string,
  maxValueLabel: PropTypes.string,
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
