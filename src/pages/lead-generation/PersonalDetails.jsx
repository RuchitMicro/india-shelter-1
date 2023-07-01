import { useState, useEffect, useContext, useCallback } from 'react';
import OtpInput from '../../components/OtpInput';
import RangeSlider from '../../components/RangeSlider';
import TextInput from '../../components/TextInput';
import otpVerified from '../../assets/icons/otp-verified.svg';
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
import privacyPolicy from '../../global/privacy-policy';
import {
  createLead,
  getLeadByPhoneNumber,
  getPincode,
  sendMobileOTP,
  verifyMobileOtp,
} from '../../global';
import { useSearchParams } from 'react-router-dom';

const fieldsRequiredForLeadGeneration = ['first_name', 'phone_number', 'pincode'];
const DISALLOW_CHAR = ['-', '_', '.', '+', 'ArrowUp', 'ArrowDown', 'Unidentified', 'e', 'E'];
const disableNextFields = ['loan_request_amount', 'first_name', 'pincode', 'phone_number'];

const PersonalDetail = () => {
  const [searchParams] = useSearchParams();

  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [leadExists, setLeadExists] = useState(false);

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
    setCurrentLeadId,
    inputDisabled,
    setInputDisabled,
    phoneNumberVerified,
    setPhoneNumberVerified,
    setProcessingBRE,
    setLoading,
    setIsQualified,
    setActiveStepIndex,
    setValues,
    acceptedTermsAndCondition,
    setAcceptedTermsAndCondition,
    updateFieldsFromServerData,
  } = useContext(AuthContext);
  const { loan_request_amount, first_name, pincode, phone_number } = values;

  const [disablePhoneNumber, setDisablePhoneNumber] = useState(phoneNumberVerified);
  const [showOTPInput, setShowOTPInput] = useState(searchParams.has('li') && !isLeadGenerated);

  useEffect(() => {
    let disableNext = disableNextFields.reduce((acc, field) => {
      const keys = Object.keys(errors);
      if (!keys.length) return acc && false;
      return acc && !keys.includes(field);
    }, !errors[disableNextFields[0]]);
    disableNext =
      disableNext && acceptedTermsAndCondition && phoneNumberVerified && selectedLoanType;
    setDisableNextStep(!disableNext);
  }, [
    acceptedTermsAndCondition,
    errors,
    phoneNumberVerified,
    selectedLoanType,
    setDisableNextStep,
  ]);

  const onOTPSendClick = useCallback(() => {
    setDisablePhoneNumber(true);
    const continueJourney = searchParams.has('li') || leadExists;
    sendMobileOTP(phone_number, continueJourney).then((res) => {
      if (res.status === 500) {
        setFieldError('otp', res.data.message);
        return;
      }
      if ('OTPCredential' in window) {
        window.addEventListener('DOMContentLoaded', (_) => {
          const ac = new AbortController();
          navigator.credentials
            .get({
              otp: { transport: ['sms'] },
              signal: ac.signal,
            })
            .then((otp) => {
              console.log(otp.code);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      } else {
        console.error('WebOTP is not supported in this browser');
      }
    });
  }, [leadExists, phone_number, searchParams, setFieldError]);

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
        if (res.status === 200) {
          setPhoneNumberVerified(true);
          setInputDisabled(false);
          setFieldError('phone_number', undefined);
          setShowOTPInput(false);
          return true;
        }
        setPhoneNumberVerified(false);
        return false;
      } catch {
        setPhoneNumberVerified(false);
        return false;
      }
    },
    [phone_number, setFieldError, setInputDisabled, setPhoneNumberVerified],
  );

  const handleOnPincodeChange = useCallback(async () => {
    if (!pincode || pincode.toString().length < 5 || errors.pincode) return;

    const data = await getPincode(pincode);
    if (!data) {
      setFieldError('pincode', 'Invalid Pincode');
      return;
    }
    setFieldValue('Out_Of_Geographic_Limit', data.ogl);
  }, [errors.pincode, pincode, setFieldError, setFieldValue]);

  const handleOnPhoneNumberChange = useCallback(async (e) => {
    const phoneNumber = e.currentTarget.value;
    if (phoneNumber?.length < 10) {
      setLeadExists(false);
      setShowOTPInput(false);
      return;
    }
    const data = await getLeadByPhoneNumber(phoneNumber);
    if (data.length) {
      setLeadExists(true);
      setShowOTPInput(true);
    }
  }, []);

  useEffect(() => {
    if (leadExists && phoneNumberVerified) {
      getLeadByPhoneNumber(values.phone_number).then((data) => {
        if (!data.length) return;
        const leadData = data[0];
        updateFieldsFromServerData(leadData);
        setCurrentLeadId(leadData.id);
        if (leadData.is_submitted) {
          setProcessingBRE(true);
          setIsQualified(true);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leadExists, phoneNumberVerified]);

  const onResumeJourneyClick = useCallback(() => {
    const resumeJourneyIndex = values.extra_params.resume_journey_index;
    if (resumeJourneyIndex) {
      setActiveStepIndex(parseInt(resumeJourneyIndex));
    }
  }, [setActiveStepIndex, values.extra_params.resume_journey_index]);

  useEffect(() => {
    if (isLeadGenerated || leadExists) return;
    const canCreateLead = fieldsRequiredForLeadGeneration.reduce((acc, field) => {
      const keys = Object.keys(errors);
      if (!keys.length) return acc && false;
      return acc && !Object.keys(errors).includes(field);
    }, true);
    if (canCreateLead) {
      createLead({
        first_name,
        pincode,
        phone_number: phone_number.toString(),
      })
        .then((res) => {
          if (res.status === 200) {
            setIsLeadGenearted(true);
            setShowOTPInput(true);
            setCurrentLeadId(res.data.id);
            setFieldError('phone_number', undefined);
            return;
          }
        })
        .catch((res) => {
          console.error(res);
        });

      setFieldError('pincode', undefined);
    }
  }, [
    errors,
    first_name,
    isLeadGenerated,
    leadExists,
    phone_number,
    pincode,
    setActiveStepIndex,
    setCurrentLeadId,
    setFieldError,
    setIsLeadGenearted,
    setIsQualified,
    setLoading,
    setProcessingBRE,
    setValues,
    values,
  ]);

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col gap-2'>
        <label htmlFor='loan-purpose' className='flex gap-0.5 font-medium text-black'>
          The loan I want is <span className='text-primary-red text-xs'>*</span>
        </label>
        <div
          className={`flex gap-4 w-full ${
            inputDisabled ? 'pointer-events-none cursor-not-allowed' : 'pointer-events-auto'
          }`}
        >
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
        disabled={inputDisabled}
        inputClasses='font-semibold'
      />

      <RangeSlider
        minValueLabel='1 L'
        maxValueLabel='50 L'
        onChange={handleLoanAmountChange}
        initialValue={loan_request_amount}
        min={100000}
        max={5000000}
        disabled={inputDisabled}
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
        disabled={inputDisabled}
        onChange={(e) => {
          const value = e.currentTarget.value;
          const pattern = /^[A-Za-z]+$/;
          if (pattern.exec(value[value.length - 1])) {
            setFieldValue('first_name', value.charAt(0).toUpperCase() + value.slice(1));
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
            disabled={inputDisabled}
            onBlur={handleBlur}
            onChange={(e) => {
              const value = e.currentTarget.value;
              const pattern = /^[A-Za-z]+$/;
              if (pattern.exec(value[value.length - 1])) {
                setFieldValue('middle_name', value.charAt(0).toUpperCase() + value.slice(1));
              }
            }}
            inputClasses='capitalize'
          />
        </div>
        <div className='w-full'>
          <TextInput
            value={values.last_name}
            onBlur={handleBlur}
            label='Last Name'
            placeholder='Ex: Swami, Singh'
            disabled={inputDisabled}
            name='last_name'
            onChange={(e) => {
              const value = e.currentTarget.value;
              const pattern = /^[A-Za-z]+$/;
              if (pattern.exec(value[value.length - 1])) {
                setFieldValue('last_name', value.charAt(0).toUpperCase() + value.slice(1));
              }
            }}
            inputClasses='capitalize'
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
        disabled={inputDisabled}
        onBlur={(e) => {
          handleBlur(e);
          handleOnPincodeChange();
        }}
        onChange={handleChange}
        onKeyDown={(e) => {
          //capturing ctrl V and ctrl C
          (e.key == 'v' && (e.metaKey || e.ctrlKey)) ||
          DISALLOW_CHAR.includes(e.key) ||
          e.key === 'ArrowUp' ||
          e.key === 'ArrowDown'
            ? e.preventDefault()
            : null;
        }}
        pattern='\d*'
        onFocus={(e) =>
          e.target.addEventListener(
            'wheel',
            function (e) {
              e.preventDefault();
            },
            { passive: false },
          )
        }
        onPaste={(e) => {
          e.preventDefault();
          const text = (e.originalEvent || e).clipboardData.getData('text/plain').replace('');
          e.target.value = text;
          handleChange(e);
        }}
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
        pattern='\d*'
        onFocus={(e) =>
          e.target.addEventListener(
            'wheel',
            function (e) {
              e.preventDefault();
            },
            { passive: false },
          )
        }
        onChange={(e) => {
          if (e.currentTarget.value < 0) {
            e.preventDefault();
            return;
          }
          if (values.phone_number.length >= 10) {
            return;
          }
          const value = e.currentTarget.value;
          if (value.charAt(0) === '0') {
            e.preventDefault();
            return;
          }
          setFieldValue('phone_number', value);
          handleOnPhoneNumberChange(e);
        }}
        onPaste={(e) => {
          e.preventDefault();
          const text = (e.originalEvent || e).clipboardData.getData('text/plain').replace('');
          e.target.value = text;
          handleChange(e);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Backspace') {
            setFieldValue(
              'phone_number',
              values.phone_number.slice(0, values.phone_number.length - 1),
            );
            e.preventDefault();
            return;
          }
          if (DISALLOW_CHAR.includes(e.key)) {
            e.preventDefault();
            return;
          }
        }}
        disabled={inputDisabled || disablePhoneNumber}
        inputClasses='hidearrow'
        message={
          phoneNumberVerified
            ? `OTP Verfied
          <img src="${otpVerified}" alt='Otp Verified' role='presentation' />
          `
            : null
        }
      />

      {!errors.phone_number && leadExists && !phoneNumberVerified && (
        <span className='text-xs text-primary-red -mt-4'>
          Lead with that phone number already exists. <br /> Verify OTP to resume your loan application.
        </span>
      )}

      {values?.extra_params?.resume_journey_index && leadExists && phoneNumberVerified && (
        <button onClick={onResumeJourneyClick} className='self-start my-2 text-xs text-primary-red'>
          Resume Loan Application
        </button>
      )}

      {showOTPInput && (
        <OtpInput
          label='Enter OTP'
          required
          verified={phoneNumberVerified}
          setOTPVerified={setPhoneNumberVerified}
          onSendOTPClick={onOTPSendClick}
          defaultResendTime={30}
          disableSendOTP={(isLeadGenerated && !phoneNumberVerified) || leadExists}
          verifyOTPCB={verifyLeadOTP}
          type='number'
        />
      )}

      <div className='flex gap-2'>
        <CheckBox
          checked={acceptedTermsAndCondition}
          name='terms-agreed'
          onChange={(e) => {
            setAcceptedTermsAndCondition(e.currentTarget.checked);
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
            T&C
          </span>{' '}
          and{' '}
          <span
            tabIndex={-1}
            onClick={() => setShowPrivacyPolicy(true)}
            onKeyDown={() => setShowPrivacyPolicy(true)}
            role='button'
            className='text-xs font-medium underline text-primary-black ml-1'
          >
            Privacy Policy
          </span>
          . I authorize India Shelter Finance or its representative to Call, WhatsApp, Email or SMS
          me with reference to my loan enquiry.
        </div>
      </div>
      <DesktopPopUp showpopup={showTerms} setShowPopUp={setShowTerms} title='Terms and Conditions'>
        {termsAndConditions}
      </DesktopPopUp>
      <DesktopPopUp
        showpopup={showPrivacyPolicy}
        setShowPopUp={setShowPrivacyPolicy}
        title='Privacy Policy'
      >
        {privacyPolicy}
      </DesktopPopUp>

      <TermsAndConditions setShow={setShowTerms} show={showTerms} title='Terms and Conditions'>
        {termsAndConditions}
      </TermsAndConditions>
      <TermsAndConditions
        show={showPrivacyPolicy}
        setShow={setShowPrivacyPolicy}
        title='Privacy Policy'
      >
        {privacyPolicy}
      </TermsAndConditions>
    </div>
  );
};

export default PersonalDetail;
