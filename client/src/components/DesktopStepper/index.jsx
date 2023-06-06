import React from 'react';
import PropTypes from 'prop-types';

const DesktopStepper = ({ steps, activeStep }) => {
  return (
    <div className='hidden md:flex justify-between pt-14 pr-[174px] gap-6'>
      {steps.map((step, index) => (
        <div key={index}>
          <div
            className={`${
              index <= activeStep ? 'bg-primary-red' : 'bg-stroke'
            } w-[162px] h-1.5 rounded-md`}
          ></div>
          <div className='mt-2'>
            <h2
              className={`${
                index <= activeStep ? 'text-primary-red' : 'text-stroke'
              } text-xs leading-[18px] font-medium`}
            >
              {step.desktopValue}
            </h2>
            <p
              className={`${index <= activeStep ? 'text-primary-black' : 'text-stroke'} ${
                index < activeStep ? 'font-normal' : 'font-semibold'
              } text-xs leading-[18px] mt-1`}
            >
              {step.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DesktopStepper;

DesktopStepper.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.object),
  activeStep: PropTypes.number,
};
