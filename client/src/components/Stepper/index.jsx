import React from 'react';
import PropTypes from 'prop-types';

const Stepper = ({ steps, activeStep }) => {
  return (
    <div className='flex md:hidden justify-between mt-2'>
      {steps.map(
        (step, index) =>
          activeStep === index && (
            <span className='text-primary-black text-xl leading-[30px] font-semibold' key={index}>
              {step.label}
            </span>
          ),
      )}
      <div>
        {steps.map(
          (step, index) =>
            activeStep === index && (
              <h4 className='text-xs text-right leading-[18px]' key={index}>
                {step.value}
              </h4>
            ),
        )}
        <div className='flex gap-1'>
          {steps.map((_,index) => (
            <span
              key={index}
              className={` ${index <= activeStep ? 'bg-primary-red' : 'bg-stroke'}
                h-1 w-[10px] rounded-[10px]`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stepper;

Stepper.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.object),
  activeStep: PropTypes.number
};
