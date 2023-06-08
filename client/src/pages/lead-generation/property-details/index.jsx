import { useCallback, useState, useContext, createContext } from 'react';
import { DropDown, TextInput, OtpInput } from '../../../components';
import { AuthContext } from '../../../context/AuthContext';
import { propertyIdentificationOptions, propertyDetailsMap } from '../utils';

export const PropertyDetailContext = createContext(null);

const PropertyDetail = () => {
  const [propertyIdentified, setPropertyIdentified] = useState(null);
  const [propertyCategory, setPropertyCategory] = useState(null);
  const [loanPurpose, setLoanPurpose] = useState();
  const [showOTPInput, setShowOTPInput] = useState(false);
  const { values, errors, touched, handleBlur, handleChange, selectedLoanType } =
    useContext(AuthContext);

  const handleLoanPursposeChange = useCallback((value) => {
    setLoanPurpose(value);
  }, []);

  const value = {
    propertyCategory,
    setPropertyCategory,
    propertyIdentified,
    setPropertyIdentified,
  };

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

        {loanPurpose && propertyIdentificationOptions[0].value === propertyIdentified ? (
          <DropDown
            label='Property Type'
            required
            placeholder='Ex: Residential'
            options={propertyDetailsMap[selectedLoanType]['propertyTypeOptions'][loanPurpose]}
          />
        ) : null}

        <TextInput
          label='Promo Code'
          hint='To avail advantages or perks associated with a loan'
          placeholder='Ex: AH34bg'
          name='promoCode'
          value={values.promoCode}
          error={errors.promoCode}
          touched={touched.promoCode}
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
