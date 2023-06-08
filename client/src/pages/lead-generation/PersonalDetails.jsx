import { useState, useEffect, useReducer, useContext } from 'react';
import OtpInput from '../../components/OtpInput';
import RangeSlider from '../../components/RangeSlider';
import TextInput from '../../components/TextInput';
import { IconRupee } from '../../assets/icons';
import { AuthContext } from '../../context/AuthContext';
import { CheckBox, TermsAndConditions, CardRadio } from '../../components';
import { loanTypeOptions } from './utils';

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

const PersonalDetail = () => {
  const { selectedLoanType, setSelectedLoanType } = useContext(AuthContext);

  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [time, setTime] = useState('0:' + 0 + 's');
  const [loanAmount, setLoanAmount] = useState(100000);
  const { values, errors, touched, handleBlur, handleChange } = useContext(AuthContext);

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
          dispatch({ type: 'VERIFIED_FAILED' });
          if (!verified) setError(true);
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

  const handleOnLoanPurposeChange = (e) => {
    setSelectedLoanType(e.currentTarget.value);
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col gap-2'>
        <label htmlFor='loan-purpose' className='flex gap-0.5 font-medium text-black'>
          The loan I want is <span className='text-primary-red text-xs'>*</span>
        </label>
        <div className='flex gap-4 w-full'>
          {loanTypeOptions.map((option) => {
            return (
              <CardRadio
                key={option.value}
                label={option.label}
                name='loan-type'
                value={option.value}
                current={selectedLoanType}
                onChange={handleOnLoanPurposeChange}
                containerClasses='flex-1'
              >
                {option.icon}
              </CardRadio>
            );
          })}
        </div>
      </div>

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
        step={50000}
      />
      <TextInput
        label='First Name'
        placeholder='Ex: Suresh, Priya'
        required
        name='firstName'
        value={values.firstName}
        error={errors.firstName}
        touched={touched.firstName}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <div className='flex flex-col md:flex-row gap-2 md:gap-6'>
        <div className='w-full'>
          <TextInput label='Middle Name' placeholder='Ex: Ramji, Sreenath' name='middleName' />
        </div>
        <div className='w-full'>
          <TextInput label='Last Name' placeholder='Ex: Swami, Singh' name='lastName' />
        </div>
      </div>
      <TextInput
        label='Current Pincode'
        placeholder='Ex: 123456'
        required
        name='pinCode'
        value={values.pinCode}
        error={errors.pinCode}
        touched={touched.pinCode}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <TextInput
        label='Mobile number'
        placeholder='Please enter 10 digit mobile no'
        required
        name='mobileNo'
        value={values.mobileNo}
        error={errors.mobileNo}
        touched={touched.mobileNo}
        onBlur={handleBlur}
        onChange={handleChange}
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

      <div className='flex gap-2'>
        <CheckBox name='terms-agreed' />
        <span className='text-xs text-dark-grey'>
          Please read and accept our &nbsp;
          <span
            tabIndex={-1}
            onClick={() => setShowTerms(true)}
            onKeyDown={() => setShowTerms(true)}
            role='button'
            className='text-xs font-medium underline text-primary-black'
          >
            Terms and Conditions
          </span>
        </span>
      </div>

      <TermsAndConditions setShow={setShowTerms} show={showTerms} />
    </div>
  );
};

export default PersonalDetail;
