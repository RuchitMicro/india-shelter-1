import { useContext, useCallback, useEffect } from 'react';
import { CardRadio, CurrencyInput, TextInput } from '../../../components';
import { propertyIdentificationOptions } from '../utils';
import { AuthContext } from '../../../context/AuthContext';
import { PropertyDetailContext } from '.';

const disableSubmitMap = {
  done: ['property_estimation', 'property_pincode', 'purpose_of_loan', 'property_type'],
  'not-yet': ['purpose_of_loan'],
};

const HomeLoanFields = () => {
  const { setPropertyIdentified, propertyIdentified } = useContext(PropertyDetailContext);
  const { values, errors, touched, handleBlur, handleChange, setDisableNextStep } =
    useContext(AuthContext);

  const handleOnPropertyIdentificationChange = useCallback(
    (e) => {
      setPropertyIdentified(e.currentTarget.value);
    },
    [setPropertyIdentified],
  );

  useEffect(() => {
    if (!propertyIdentified) return;

    let disableSubmitting = disableSubmitMap[propertyIdentified].reduce((acc, field) => {
      const keys = Object.keys(errors);
      if (!keys.length) return acc && false;
      return acc && !Object.keys(errors).includes(field);
    }, true);

    setDisableNextStep(!disableSubmitting);
  }, [propertyIdentified, errors, setDisableNextStep]);

  return (
    <>
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
          <CurrencyInput
            name='property_estimation'
            label='My property value is estimated to be'
            required
            placeholder='1,00,000'
            value={values.property_estimation}
            error={errors.property_estimation}
            touched={touched.property_estimation}
            onBlur={handleBlur}
            onChange={handleChange}
            inputClasses='font-semibold'
          />
          <TextInput
            name='property_pincode'
            label='Property Pincode'
            required
            placeholder='123456'
            value={values.property_pincode}
            error={errors.property_pincode}
            touched={touched.property_pincode}
            onBlur={handleBlur}
            onChange={handleChange}
            type="number"
            inputClasses="hidearrow"
          />
        </div>
      ) : null}
    </>
  );
};

export default HomeLoanFields;
