import { useState, useEffect, useReducer, useContext, useCallback } from 'react';
import OtpInput from '../../components/OtpInput';
import RangeSlider from '../../components/RangeSlider';
import TextInput from '../../components/TextInput';
import { AuthContext } from '../../context/AuthContext';
import {
  CheckBox,
  TermsAndConditions,
  CardRadio,
  CurrencyInput,
  DesktopPopUp,
} from '../../components';
import { loanTypeOptions } from './utils';
import termsAndConditions from '../../global/terms-conditions';

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
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [time, setTime] = useState('0:' + 30 + 's');
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    selectedLoanType,
    setSelectedLoanType,
    setDisableNextStep,
    setFieldValue,
  } = useContext(AuthContext);
  const { loanAmount, firstName, pinCode, mobileNo } = values;

  const [verified, dispatch] = useReducer(otpReducer, null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const moveToNextStep = () => {
      if (loanAmount && firstName && pinCode && mobileNo && verified) {
        if (checked) setDisableNextStep(false);
      }
    };
    moveToNextStep();
  }, [loanAmount, firstName, pinCode, mobileNo, verified, checked, setDisableNextStep]);

  useEffect(() => {
    timer && dispatch({ type: 'NOT_VERIFIED' });

    const runTimer = () => {
      var upto = 1;
      const counts = setInterval(() => {
        upto -= 1;
        setTime('0:' + upto + 's');

        if (upto <= 0) {
          clearInterval(counts);
          dispatch({ type: 'VERIFIED_SUCCESS' });
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

  const handleOnLoanPurposeChange = (e) => {
    setSelectedLoanType(e.currentTarget.value);
  };

  const handleLoanAmountChange = useCallback(
    (e) => {
      setFieldValue('loanAmount', e.currentTarget.value);
    },
    [setFieldValue],
  );

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

      <CurrencyInput
        label='I want a loan of'
        placeholder='1,00,000'
        required
        name='loanAmount'
        value={loanAmount}
        onBlur={handleBlur}
        onChange={handleLoanAmountChange}
        displayError={false}
        inputClasses='font-semibold'
      />

      <RangeSlider
        minValueLabel='1 L'
        maxValueLabel='50 L'
        onChange={handleLoanAmountChange}
        initialValue={loanAmount}
        min={100000}
        max={5000000}
        step={50000}
      />

      <span className='text-xs text-primary-red mt-1'>
        {errors.loanAmount && touched.loanAmount ? errors.loanAmount : String.fromCharCode(160)}
      </span>

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
        inputClasses='capitalize'
      />
      <div className='flex flex-col md:flex-row gap-2 md:gap-6'>
        <div className='w-full'>
          <TextInput
            value={values.middle_name}
            label='Middle Name'
            placeholder='Ex: Ramji, Sreenath'
            name='middle_name'
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className='w-full'>
          <TextInput
            value={values.last_name}
            onChange={handleChange}
            onBlur={handleBlur}
            label='Last Name'
            placeholder='Ex: Swami, Singh'
            name='last_name'
          />
        </div>
      </div>
      <TextInput
        label='Current Pincode'
        placeholder='Ex: 123456'
        required
        name='pinCode'
        type='number'
        value={values.pinCode}
        error={errors.pinCode}
        touched={touched.pinCode}
        onBlur={handleBlur}
        onChange={handleChange}
        inputClasses='hidearrow'
      />
      <TextInput
        label='Mobile number'
        placeholder='Please enter 10 digit mobile no'
        required
        name='mobileNo'
        type='tel'
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
        <CheckBox
          name='terms-agreed'
          onChange={(e) => {
            setChecked(e.currentTarget.checked);
          }}
        />
        <div className='text-xs text-dark-grey'>
          I agree with the
          <span
            tabIndex={-1}
            onClick={() => setShowTerms(true)}
            onKeyDown={() => setShowTerms(true)}
            role='button'
            className='text-xs font-medium underline text-primary-black ml-1'
          >
            T&C and Privacy Policy
          </span>
          . I authorize India Shelter Finance or its representative to Call, WhatsApp, Email or SMS
          me with reference to my loan enquiry.
        </div>
      </div>
      <DesktopPopUp showpopup={showTerms} setShowPopUp={setShowTerms}>
        {termsAndConditions}
      </DesktopPopUp>
      <TermsAndConditions setShow={setShowTerms} show={showTerms}>
        {termsAndConditions}
      </TermsAndConditions>
    </div>
  );
};

export default PersonalDetail;
