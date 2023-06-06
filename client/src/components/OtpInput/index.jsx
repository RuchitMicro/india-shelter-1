import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

let currentOtpIndex = 0;
// const tries = 0;

const OtpInput = ({ label, required, error, verified, timer, time, onClick }) => {
  const [otp, setOtp] = useState(new Array(5).fill(''));
  const [activeOtpIndex, setActiveOtpIndex] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const inputRef = useRef(null);

  const handleOnChange = (e) => {
    const { value } = e.target;
    const newOTP = [...otp];
    newOTP[currentOtpIndex] = value.substring(value.length - 1);

    if (!value) setActiveOtpIndex(currentOtpIndex - 1);
    else setActiveOtpIndex(currentOtpIndex + 1);

    setOtp(newOTP);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  const handleKeyDown = (e, index) => {
    currentOtpIndex = index;
    if (e.key === 'Backspace') setActiveOtpIndex(currentOtpIndex - 1);
    if (e.key === 'Enter') setActiveOtpIndex(currentOtpIndex + 1);
  };

  return (
    <div className='otp-container'>
      <h3 className='flex gap-0.5 text-primary-black'>
        {label}
        {required && <span className='text-primary-red text-sm'>*</span>}
      </h3>
      <div className='flex gap-2 mt-1'>
        {otp.map((_, index) => (
          <input
            disabled={disabled}
            ref={index === activeOtpIndex ? inputRef : null}
            key={index}
            type='number'
            className={`${
              (error && 'border-primary-red shadow-primary') ||
              (verified && 'border-dark-grey') ||
              (activeOtpIndex === null ? 'border-stroke' : 'border-secondary-blue shadow-primary')
            } w-full h-12 border-y border-x bg-transparent outline-none text-center text-base font-normal text-primary-black transition spin-button-none rounded-lg hidearrow`}
            onChange={handleOnChange}
            onKeyDown={(e) => handleKeyDown(e, index)}
            value={otp[index]}
          />
        ))}
      </div>
      <div className='mt-3 flex justify-between items-center'>
        <div className='flex gap-0.5'>
          {timer && <span className='text-primary-red text-xs leading-[18px]'>{time}</span>}
          {verified === true && (
            <>
              <span className='text-primary-black text-xs leading-[18px]'>OTP Verified</span>
              <svg
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M15 4.5L6.75 12.75L3 9'
                  stroke='#00C30C'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </>
          )}
          {verified === false && (
            <>
              <span className='text-primary-black text-xs leading-[18px]'>OTP not Verified</span>
              <svg
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M13.5 4.5L4.5 13.5'
                  stroke='#E33439'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M4.5 4.5L13.5 13.5'
                  stroke='#E33439'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </>
          )}
        </div>
        <button
          type='button'
          className='text-primary-red cursor-pointer font-semibold'
          onClick={() => {
            setActiveOtpIndex(0);
            setDisabled(false);
            onClick();
          }}
        >
          {verified === null && <span> {timer ? 'Resend OTP' : 'Send OTP'} </span>}
        </button>
      </div>
    </div>
  );
};

export default OtpInput;

OtpInput.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  error: PropTypes.bool,
  verified: PropTypes.any,
  timer: PropTypes.bool,
  time: PropTypes.string,
  onClick: PropTypes.func,
};
