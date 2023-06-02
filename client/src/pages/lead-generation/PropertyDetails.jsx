import { useCallback, useState } from 'react';
import { IconPropertyIdentified, IconPropertyUnIdentified, IconRupee } from '../../assets/icons';
import {
  CardRadio,
  CheckBox,
  DropDown,
  TextInput,
  TermsAndConditions,
  OtpInput,
} from '../../components';

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
  const [propertyIdentified, setPropertyIdentified] = useState();
  const [loanPurpose, setLoanPurpose] = useState();
  const [showTerms, setShowTerms] = useState(false);
  const [showOTPInput, setShowOTPInput] = useState(false);

  const handleOnPropertyIdentificationChange = useCallback((e) => {
    setPropertyIdentified(e.currentTarget.value);
  }, []);

  const handleLoanPursposeChange = useCallback((value) => {
    setLoanPurpose(value);
  }, []);

  return (
    // TODO:  Remove the margin on top
    <div
      className='flex flex-col gap-2'
    >
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
            name='property-value'
            label='My property value is estimated to be'
            required
            Icon={IconRupee}
            placeholder='1,00,000'
          />
          <TextInput
            name='property-pincode'
            label='Property Pincode'
            required
            placeholder='123456'
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
        name='promo-code'
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

      {/* TODO: Show OTP input if the email is verified */}
      {showOTPInput ? <OtpInput label='Enter OTP' /> : null}

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

export default PropertyDetail;
