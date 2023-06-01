import React from 'react';

const RangeSlider = ({numberValue, handleRangeChange, minValueLabel, maxValueLabel}) => {
  
  return (
    <>
      <input
        id='rangeInput'
        className='w-[328px]'
        type='range'
        min='100000'
        max='5000000'
        step='50000'
        value={numberValue}
        onChange={handleRangeChange}
      />
      <div className='flex justify-between w-[full]'>
        <div className='text-sm'>{minValueLabel}</div>
        <div className='text-sm'>{maxValueLabel}</div>
      </div>
    </>
  );
};

export default RangeSlider;
