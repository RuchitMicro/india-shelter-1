import { useCallback, useState, useContext, createContext, useEffect } from 'react';
import { DropDown, TextInput, OtpInput } from '../../../components';
import { AuthContext } from '../../../context/AuthContext';
import { propertyIdentificationOptions, propertyDetailsMap } from '../utils';

export const PropertyDetailContext = createContext(null);

const PropertyDetail = () => {
  const [propertyIdentified, setPropertyIdentified] = useState(null);
  const [propertyCategory, setPropertyCategory] = useState(null);
  const [loanPurpose, setLoanPurpose] = useState();
  const [showOTPInput, setShowOTPInput] = useState(false);
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    selectedLoanType,
    setDisableNextStep,
  } = useContext(AuthContext);
  const { property_type, property_pincode } = values;

  const handleLoanPursposeChange = useCallback((value) => {
    setLoanPurpose(value);
    setFieldValue('purpose_of_loan', value);
  }, []);

  const handlePropertyType = useCallback((value) => {
    setFieldValue('property_type', value);
  }, []);

  const value = {
    propertyCategory,
    setPropertyCategory,
    propertyIdentified,
    setPropertyIdentified,
  };

  useEffect(() => {
    const moveToNextStep = () => {
      if (property_type && property_pincode) setDisableNextStep(false);
      else setDisableNextStep(true);
    };
    moveToNextStep();
  }, [property_pincode, property_type, setDisableNextStep]);

  useEffect(() => {
    const getPropertyIdentification = () => {
      if (selectedLoanType !== 'balance-transfer') setFieldValue('property_identification', propertyIdentified);
      else setFieldValue('property_identification', '');
    };
    getPropertyIdentification();
  }, [propertyIdentified]);

  useEffect(() => {
    const resetPropertyCategory = () => {
      if (selectedLoanType !== 'loan-against-property') setFieldValue('purpose_type', '');
    };
    resetPropertyCategory();
  }, [selectedLoanType]);

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

        <TextInput
          label='Promo Code'
          hint='To avail advantages or perks associated with a loan'
          placeholder='Ex: AH34bg'
          name='promo_code'
          value={values.promo_code}
          error={errors.promo_code}
          touched={touched.promo_code}
          onBlur={handleBlur}
          onChange={handleChange}
        />

        <TextInput
          label='Enter your Email ID'
          type='email'
          placeholder='Please enter your Email ID'
          name='email'
          onChange={(e) => {
            if (e.currentTarget.value) setShowOTPInput(true);
            else setShowOTPInput(false);
          }}
        />

        {showOTPInput ? <OtpInput label='Enter OTP' /> : null}
      </div>
    </PropertyDetailContext.Provider>
  );
};

export default PropertyDetail;
