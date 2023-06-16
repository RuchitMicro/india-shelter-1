import { useCallback, useState, useContext, createContext, useEffect } from 'react';
import { DropDown, TextInput, OtpInput } from '../../../components';
import { AuthContext } from '../../../context/AuthContext';
import { propertyIdentificationOptions, propertyDetailsMap } from '../utils';
import { editLeadById, getEmailOtp, verifyEmailOtp } from '../../../global';

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
  } = useContext(AuthContext);

  const handleLoanPursposeChange = useCallback(
    (value) => {
      setLoanPurpose(value);
      setFieldValue('purpose_of_loan', value);
    },
    [setFieldValue],
  );

  const handlePropertyType = useCallback(
    (value) => {
      setFieldValue('property_type', value);
    },
    [setFieldValue],
  );

  const value = {
    propertyCategory,
    setPropertyCategory,
    propertyIdentified,
    setPropertyIdentified,
  };

  const { email } = values;

  useEffect(() => {
    if (selectedLoanType !== 'loan-against-property') setFieldValue('purpose_type', '');
  }, [selectedLoanType, setFieldValue]);

  const handleOnEmailBlur = useCallback(async (email) => {
    const res = await editLeadById(45, { email });
    if (res.status === 200) {
      setShowOTPInput(true);
    }
  }, []);

  const sendEmailOTP = useCallback(async () => {
    const data = await getEmailOtp(email);
    if (data.status === 500) {
      setFieldError('otp', data.message);
    }
  }, [email, setFieldError]);

  const verifyLeadEmailOTP = useCallback(
    async (otp) => {
      try {
        const res = await verifyEmailOtp(email, { otp });
        if (res.status !== 200) {
          console.log('OTP verification failed');
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
              handleBlur(e);
              // validatedPromoCode(e.currentTarget.value).then(res => {
              // res.status
              // });
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
          onBlur={(e) => {
            handleOnEmailBlur(e.currentTarget.value);
            handleBlur(e);
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
