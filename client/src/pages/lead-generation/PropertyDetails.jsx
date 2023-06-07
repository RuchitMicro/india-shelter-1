import { useCallback, useState, useContext } from 'react';
import { IconPropertyIdentified, IconPropertyUnIdentified, IconRupee } from '../../assets/icons';
import { CardRadio, DropDown, TextInput, OtpInput } from '../../components';
import { AuthContext } from '../../context/AuthContext';

const propertyIdentificationOptions = [
  {
    label: 'Done!',
    value: 'done',
    icon: <IconPropertyIdentified />,
  },
  {
    label: 'Not yet...',
    value: 'not-yet',
    icon: <IconPropertyUnIdentified />,
  },
];

const loanPurposeOptions = [
  { label: 'Purchase', value: 'purchase' },
  { label: 'Construction', value: 'construction' },
  { label: 'Renovation/Extension', value: 'renovation-extension' },
];

const propertyTypeOptions = {
  purchase: [
    { label: 'Residential House', value: 'residential-house' },
    { label: 'Plot + Construction', value: 'plot-construction' },
    { label: 'Ready Built Flat', value: 'ready-build-flat' },
  ],
  construction: [
    { label: 'Owned Plot', value: 'owned-plot' },
    { label: 'Under Construction Property', value: 'under-construction-property' },
  ],
  'renovation-extension': [{ label: 'Residential House', value: 'residential-house' }],
};

const PropertyDetail = () => {
  const [propertyIdentified, setPropertyIdentified] = useState(null);
  const [loanPurpose, setLoanPurpose] = useState();
  const [showOTPInput, setShowOTPInput] = useState(false);
  const { values, errors, touched, handleBlur, handleChange } = useContext(AuthContext);

  const handleOnPropertyIdentificationChange = useCallback((e) => {
    setPropertyIdentified(e.currentTarget.value);
  }, []);

  const handleLoanPursposeChange = useCallback((value) => {
    setLoanPurpose(value);
  }, []);

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col gap-2'>
        <label htmlFor='property-identication' className='flex gap-0.5 font-medium text-black'>
          The Property identification is <span className='text-primary-red text-xs'>*</span>
        </label>
        <div className='flex gap-4'>
          {propertyIdentificationOptions.map((option) => {
            return (
              <CardRadio
                key={option.value}
                label={option.label}
                name='property-identification'
                value={option.value}
                current={propertyIdentified}
                onChange={handleOnPropertyIdentificationChange}
              >
                {option.icon}
              </CardRadio>
            );
          })}
        </div>
      </div>

      {propertyIdentificationOptions[0].value === propertyIdentified ? (
        <div className='flex flex-col gap-2'>
          <TextInput
            name='estimatePropertyValue'
            label='My property value is estimated to be'
            required
            Icon={IconRupee}
            placeholder='1,00,000'
            value={values.estimatePropertyValue}
            error={errors.estimatePropertyValue}
            touched={touched.estimatePropertyValue}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <TextInput
            name='propertyPincode'
            label='Property Pincode'
            required
            placeholder='123456'
            value={values.propertyPincode}
            error={errors.propertyPincode}
            touched={touched.propertyPincode}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
      ) : null}

      <span className='text-xl font-semibold'>Last thing, promise!</span>

      <DropDown
        label='Purpose of Loan!'
        required
        placeholder='Ex: Purchase'
        options={loanPurposeOptions}
        onChange={handleLoanPursposeChange}
      />

      {propertyIdentificationOptions[0].value === propertyIdentified ? (
        <DropDown
          label='Property Type'
          required
          placeholder='Ex: Residential'
          options={propertyTypeOptions[loanPurpose] || []}
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
  );
};

export default PropertyDetail;
