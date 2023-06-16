import { useState, useEffect, useContext, useCallback } from 'react';
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
import { createLead, getPincode, sendMobileOTP, verifyMobileOtp } from '../../global';

const fieldsRequiredForLeadGeneration = ['first_name', 'phone_number', 'pincode'];

const PersonalDetail = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [otpVerified, setOTPVerified] = useState(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

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
    setFieldError,
    isLeadGenerated,
    setIsLeadGenearted,
  } = useContext(AuthContext);
  const { loan_request_amount, first_name, pincode, phone_number } = values;

  useEffect(() => {
    const moveToNextStep = () => {
      if (loan_request_amount && first_name && pincode && phone_number && otpVerified) {
        if (isTermsAccepted) setDisableNextStep(false);
      }
    };
    moveToNextStep();
  }, [
    loan_request_amount,
    first_name,
    pincode,
    phone_number,
    isTermsAccepted,
    setDisableNextStep,
    otpVerified,
  ]);

  const onOTPSendClick = useCallback(() => {
    sendMobileOTP(phone_number).then((data) => {
      if (data.status === 500) {
        setFieldError('otp', data.message);
      }
      // FIXME: Need to check this in https instance as this does not work on http
      if ('OTPCredential' in window) {
        window.addEventListener('DOMContentLoaded', (e) => {
          const ac = new AbortController();
          navigator.credentials
            .get({
              otp: { transport: ['sms'] },
              signal: ac.signal,
            })
            .then((otp) => {
              alert(otp.code);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      } else {
        alert('WebOTP not supported!.');
      }
    });
  }, [phone_number, setFieldError]);

  const handleOnLoanPurposeChange = (e) => {
    setSelectedLoanType(e.currentTarget.value);
    setFieldValue('loan_type', e.currentTarget.value);
  };

  const handleLoanAmountChange = useCallback(
    (e) => {
      setFieldValue('loan_request_amount', e.currentTarget.value);
    },
    [setFieldValue],
  );

  const verifyLeadOTP = useCallback(
    async (otp) => {
      try {
        const res = await verifyMobileOtp(phone_number, { otp });
        if (res.status !== 200) {
          console.log('OTP verification failed');
          setOTPVerified(false);
          return;
        }
        setOTPVerified(true);
      } catch {
        setOTPVerified(false);
      }
    },
    [phone_number],
  );

  useEffect(() => {
    if (isLeadGenerated) return;

    let canCreateLead = fieldsRequiredForLeadGeneration.reduce((acc, field) => {
      const keys = Object.keys(errors);
      if (!keys.length) return acc && false;
      return acc && !Object.keys(errors).includes(field);
    }, true);

    if (!canCreateLead) return;

    if (!pincode || pincode.toString().length < 5 || errors.pincode) return;

    getPincode(pincode).then((data) => {
      if (!data) {
        canCreateLead = false;
        return;
      }
      canCreateLead = !data.ogl;
      if (!canCreateLead) {
        setFieldError('pincode', 'Out of Geographic limit');
        return;
      }
      createLead({
        first_name,
        pincode,
        phone_number: phone_number.toString(),
      }).then((res) => {
        if (res.status !== 200) {
          setIsLeadGenearted(false);
          return;
        }
        setIsLeadGenearted(true);
        setFieldError('pincode', '');
      });
    });
  }, [
    errors,
    first_name,
    pincode,
    phone_number,
    isLeadGenerated,
    setFieldError,
    values.purpose_of_loan,
    setIsLeadGenearted,
  ]);

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
        name='loan_request_amount'
        value={loan_request_amount}
        onBlur={handleBlur}
        onChange={handleLoanAmountChange}
        displayError={false}
        inputClasses='font-semibold'
      />

      <RangeSlider
        minValueLabel='1 L'
        maxValueLabel='50 L'
        onChange={handleLoanAmountChange}
        initialValue={loan_request_amount}
        min={100000}
        max={5000000}
        step={50000}
      />

      <span className='text-xs text-primary-red mt-1'>
        {errors.loan_request_amount && touched.loan_request_amount
          ? errors.loan_request_amount
          : String.fromCharCode(160)}
      </span>

      <TextInput
        label='First Name'
        placeholder='Ex: Suresh, Priya'
        required
        name='first_name'
        value={values.first_name}
        error={errors.first_name}
        touched={touched.first_name}
        onBlur={handleBlur}
        onChange={(e) => {
          const value = e.currentTarget.value;
          const pattern = /[A-za-z]+/g;
          if (pattern.exec(value[value.length - 1])) {
            handleChange(e);
          }
        }}
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
        name='pincode'
        type='number'
        value={values.pincode}
        error={errors.pincode}
        touched={touched.pincode}
        onBlur={handleBlur}
        onChange={handleChange}
        inputClasses='hidearrow'
      />

      <TextInput
        label='Mobile number'
        placeholder='Please enter 10 digit mobile no'
        required
        name='phone_number'
        type='number'
        value={values.phone_number}
        error={errors.phone_number}
        touched={touched.phone_number}
        onBlur={handleBlur}
        onChange={handleChange}
        inputClasses='hidearrow'
      />

      <OtpInput
        label='Enter OTP'
        required
        verified={otpVerified}
        setOTPVerified={setOTPVerified}
        onSendOTPClick={onOTPSendClick}
        disableSendOTP={isLeadGenerated}
        verifyOTPCB={verifyLeadOTP}
      />

      <div className='flex gap-2'>
        <CheckBox
          name='terms-agreed'
          onChange={(e) => {
            setIsTermsAccepted(e.currentTarget.checked);
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
