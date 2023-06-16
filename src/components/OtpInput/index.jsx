import { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import otpVerified from '../../assets/icons/otp-verified.svg';
import otpNotVerified from '../../assets/icons/otp-not-verified.svg';

let currentOtpIndex = 0;

const OtpInput = ({
  label,
  required,
  verified,
  setOTPVerified,
  onSendOTPClick,
  disableSendOTP,
  verifyOTPCB,
  defaultResendTime,
}) => {
  const [otp, setOtp] = useState(new Array(5).fill(''));
  const [error, setError] = useState(false);
  const [activeOtpIndex, setActiveOtpIndex] = useState(null);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [timer, setTimer] = useState(false);
  const [resendTime, setResendTime] = useState(defaultResendTime || 30);

  const inputRef = useRef(null);

  const handleOnChange = useCallback(
    (e) => {
      const { value } = e.target;
      const newOTP = [...otp];
      newOTP[currentOtpIndex] = value.substring(value.length - 1);

      if (!value) setActiveOtpIndex(currentOtpIndex - 1);
      else setActiveOtpIndex(currentOtpIndex + 1);

      setOtp(newOTP);
      const otpAsString = newOTP.join('');
      if (otpAsString.length >= 5) {
        setInputDisabled(true);
        verifyOTPCB(otpAsString);
        setTimer(false);
      }
    },
    [otp, verifyOTPCB],
  );

  const handleOnOTPSend = useCallback(() => {
    setActiveOtpIndex(0);
    setInputDisabled(false);
    onSendOTPClick();
    setTimer(true);
  }, [onSendOTPClick]);

  useEffect(() => {
    let interval = null;
    if (timer) {
      setOTPVerified(null);
      let time = 30;
      interval = setInterval(() => {
        time -= 1;
        setResendTime(time);

        if (time <= 0) {
          clearInterval(interval);
          if (!verified) setError(true);
          setTimer(false);
        }
      }, 1000);
    } else {
      clearInterval(interval);
      setTimer(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [verified, timer, setOTPVerified]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  const handleKeyDown = useCallback((e, index) => {
    currentOtpIndex = index;
    if (e.key === 'Backspace') setActiveOtpIndex(currentOtpIndex - 1);
    if (e.key === 'Enter') setActiveOtpIndex(currentOtpIndex + 1);
  }, []);

  return (
    <div className='otp-container'>
      <h3 className='flex gap-0.5 text-primary-black'>
        {label}
        {required && <span className='text-primary-red text-sm'>*</span>}
      </h3>
      <div className='flex gap-2 mt-1'>
        {otp.map((_, index) => (
          <input
            disabled={inputDisabled}
            ref={index === activeOtpIndex ? inputRef : null}
            key={index}
            type='number'
            className={`${
              (error && 'border-primary-red shadow-primary shadow-primary-red') ||
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
          {verified === null && timer && (
            <span className='text-primary-red text-xs leading-[18px]'>0:{resendTime}s</span>
          )}
          {verified === true && (
            <span className='flex text-primary-black text-xs leading-[18px]'>
              OTP Verified
              <img src={otpVerified} alt='Otp Verified' role='presentation' />
            </span>
          )}
          {verified === false && (
            <span className='flex text-primary-black text-xs leading-[18px]'>
              OTP not Verified
              <img src={otpNotVerified} alt='Otp Verified' role='presentation' />
            </span>
          )}
        </div>
        {disableSendOTP ? (
          <button
            type='button'
            className='text-primary-red cursor-pointer font-semibold'
            onClick={handleOnOTPSend}
          >
            {verified === null && <span>Send OTP</span>}
          </button>
        ) : (
          ''
        )}
        {!timer && verified === false && (
          <button
            type='button'
            className='text-sm text-primary-red cursor-pointer font-semibold'
            onClick={() => {
              setOtp(new Array(5).fill(''));
              handleOnOTPSend();
            }}
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
};

export default OtpInput;

OtpInput.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  verified: PropTypes.any,
  setOTPVerified: PropTypes.func,
  onSendOTPClick: PropTypes.func,
  disableSendOTP: PropTypes.bool,
  verifyOTPCB: PropTypes.func,
  defaultResendTime: PropTypes.number,
};
