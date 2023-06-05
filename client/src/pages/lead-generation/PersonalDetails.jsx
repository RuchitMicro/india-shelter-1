import { useState, useEffect, useReducer } from 'react';
import OtpInput from '../../components/OtpInput';
import RangeSlider from '../../components/RangeSlider';
import TextInput from '../../components/TextInput';
import { IconRupee } from '../../assets/icons';

const PersonalDetail = () => {
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(false);
  const [time, setTime] = useState('0:' + 0 + 's');
  const [loanAmount, setLoanAmount] = useState(100000);

  const otpReducer = (verified, action) => {
    switch (action.type) {
      case 'NOT_VERIFIED':
        return null;
      case 'VERIFIED_SUCCESS':
        return true;
      case 'VERIFIED_FAILED':
        return false;
      default:
        verified;
    }
  };

  const [verified, dispatch] = useReducer(otpReducer, null);

  useEffect(() => {
    timer && dispatch({ type: 'NOT_VERIFIED' });

    const runTimer = () => {
      var upto = 0;
      const counts = setInterval(() => {
        upto += 1;
        setTime('0:' + upto + 's');

        if (upto >= 30) {
          clearInterval(counts);
          dispatch({ type: 'VERIFIED_SUCCESS' });
          setTimer(false);
        }
      }, 1000);
    };

    timer && runTimer();

    return () => {
      clearInterval(runTimer);
    };
  }, [timer, verified, error]);

  const onClick = () => {
    setTimer(true);
  };

  const onChange = (e) => {
    setLoanAmount(e.target.value);
  };

  return (
    <div className='flex flex-col gap-2'>
      <TextInput
        label='I want a loan of'
        Icon={IconRupee}
        placeholder='1,00,000'
        required
        name='loan'
        value={loanAmount}
        onChange={onChange}
      />
      <RangeSlider
        minValueLabel='1 L'
        maxValueLabel='50 L'
        onChange={onChange}
        initialValue={loanAmount}
        min={100000}
        max={5000000}
      />
      <TextInput label='First Name' placeholder='Ex: Suresh, Priya' required name='firstName' />
      <TextInput label='Middle Name' placeholder='Ex: Ramji, Sreenath' required name='middleName' />
      <TextInput label='Last Name' placeholder='Ex: Swami, Singh' required name='lastName' />
      <TextInput label='Current Pincode' placeholder='Ex: 123456' required name='pinCode' />
      <TextInput
        label='Mobile number'
        placeholder='Please enter 10 digit mobile no'
        required
        name='mobileNo'
      />
      <OtpInput
        label='Enter OTP'
        required
        error={error}
        verified={verified}
        timer={timer}
        time={time}
        onClick={onClick}
      />
    </div>
  );
};

export default PersonalDetail;
