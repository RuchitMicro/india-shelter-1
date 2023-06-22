import { useCallback, useState, useContext, createContext, useEffect } from 'react';
import { DropDown, TextInput, OtpInput } from '../../../components';
import { AuthContext } from '../../../context/AuthContext';
import { propertyIdentificationOptions, propertyDetailsMap } from '../utils';
import { editLeadById, getEmailOtp, updateLeadDataOnBlur, verifyEmailOtp } from '../../../global';

export const PropertyDetailContext = createContext(null);

const PropertyDetail = () => {
  const [propertyIdentified, setPropertyIdentified] = useState(null);
  const [propertyCategory, setPropertyCategory] = useState(null);
  const [loanPurpose, setLoanPurpose] = useState();
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [emailOTPVerified, setEmailOTPVerified] = useState(null);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    selectedLoanType,
    setFieldError,
    hidePromoCode,
    currentLeadId,
    setDisableNextStep,
  } = useContext(AuthContext);

  const handleLoanPursposeChange = useCallback(
    (value) => {
      setLoanPurpose(value);
      setFieldValue('purpose_of_loan', value);
      updateLeadDataOnBlur(currentLeadId, 'purpose_of_loan', value);
    },
    [currentLeadId, setFieldValue],
  );

  const handlePropertyType = useCallback(
    (value) => {
      setFieldValue('property_type', value);
      updateLeadDataOnBlur(currentLeadId, 'property_type', value);
    },
    [currentLeadId, setFieldValue],
  );

  const value = {
    propertyCategory,
    setPropertyCategory,
    propertyIdentified,
    setPropertyIdentified,
  };

  const { email } = values;

  useEffect(() => {
    if (showOTPInput && emailOTPVerified) setDisableNextStep(false);
  }, [emailOTPVerified, setDisableNextStep, showOTPInput]);

  useEffect(() => {
    if (selectedLoanType !== 'LAP') setFieldValue('purpose_type', '');
  }, [selectedLoanType, setFieldValue]);

  const handleOnEmailBlur = useCallback(
    async (email) => {
      await editLeadById(currentLeadId, { email });
    },
    [currentLeadId],
  );

  const sendEmailOTP = useCallback(async () => {
    const res = await getEmailOtp(email);
    if (res.status !== 200) {
      setFieldError('otp', res.data.message);
    }
  }, [email, setFieldError]);

  const verifyLeadEmailOTP = useCallback(
    async (otp) => {
      try {
        const res = await verifyEmailOtp(email, { otp });
        if (res.status !== 200) {
          setEmailOTPVerified(false);
          return;
        }
        setEmailOTPVerified(true);
      } catch {
        setEmailOTPVerified(false);
      }
    },
    [email],
  );

  return (
    <PropertyDetailContext.Provider value={value}>
      <div className='flex flex-col gap-2'>
        {propertyDetailsMap[selectedLoanType].fields}

        <span className='text-xl font-semibold text-primary-black'>Last thing, promise!</span>

        <DropDown
          label='Purpose of Loan'
          required
          placeholder='Ex: Purchase'
          options={propertyDetailsMap[selectedLoanType]['loanPurposeOptions']}
          onChange={handleLoanPursposeChange}
        />

        {loanPurpose &&
        (propertyIdentificationOptions[0].value === propertyIdentified ||
          selectedLoanType === 'balance-transfer') ? (
          <DropDown
            label='Property Type'
            required
            placeholder='Ex: Residential'
            options={propertyDetailsMap[selectedLoanType]['propertyTypeOptions'][loanPurpose]}
            onChange={handlePropertyType}
          />
        ) : null}

        {hidePromoCode ? (
          ''
        ) : (
          <TextInput
            label='Promo Code'
            hint='To avail advantages or perks associated with a loan'
            placeholder='Ex: AH34bg'
            name='promo_code'
            value={values.promo_code}
            error={errors.promo_code}
            touched={touched.promo_code}
            onBlur={(e) => {
              const target = e.currentTarget;
              handleBlur(e);
              updateLeadDataOnBlur(currentLeadId, target.getAttribute('name'), target.value);
            }}
            onChange={handleChange}
          />
        )}

        <TextInput
          label='Enter your Email ID'
          type='email'
          value={email}
          placeholder='Please enter your Email ID'
          name='email'
          autoComplete='off'
          onBlur={(e) => {
            const target = e.currentTarget;
            handleOnEmailBlur(target.value);
            handleBlur(e);
            updateLeadDataOnBlur(currentLeadId, target.getAttribute('name'), target.value);
          }}
          onInput={(e) => {
            if (e.currentTarget.value && !errors.email) {
              setDisableNextStep(true);
              setShowOTPInput(true);
            } else {
              setShowOTPInput(false);
            }
          }}
          onChange={handleChange}
        />

        {showOTPInput ? (
          <OtpInput
            label='Enter OTP'
            required
            verified={emailOTPVerified}
            setOTPVerified={setEmailOTPVerified}
            disableSendOTP={true}
            onSendOTPClick={sendEmailOTP}
            verifyOTPCB={verifyLeadEmailOTP}
          />
        ) : null}
      </div>
    </PropertyDetailContext.Provider>
  );
};

export default PropertyDetail;
