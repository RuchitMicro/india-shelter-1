import { useContext, useCallback, useEffect } from 'react';
import { CardRadio, CurrencyInput, TextInput } from '../../../components';
import { propertyCategoryOptions, propertyIdentificationOptions } from '../utils';
import { AuthContext } from '../../../context/AuthContext';
import { PropertyDetailContext } from '.';

const LoanAgainstPropertyFields = () => {
  const { setPropertyIdentified, propertyIdentified, propertyCategory, setPropertyCategory } =
    useContext(PropertyDetailContext);
  const { values, errors, touched, handleBlur, handleChange, setFieldValue, selectedLoanType } =
    useContext(AuthContext);

  const handleOnPropertyCategoryChange = useCallback(
    (e) => {
      setPropertyCategory(e.currentTarget.value);
      setFieldValue('purpose_type', e.currentTarget.value);
    },
    [setPropertyCategory],
  );

  const handleOnPropertyIdentificationChange = useCallback(
    (e) => {
      setPropertyIdentified(e.currentTarget.value);
    },
    [setPropertyIdentified],
  );

  return (
    <>
      <div className='flex flex-col gap-2'>
        <label htmlFor='property-category' className='flex gap-0.5 font-medium text-black'>
          Property category <span className='text-primary-red text-xs'>*</span>
        </label>
        <div className='flex gap-4'>
          {propertyCategoryOptions.map((option) => {
            return (
              <CardRadio
                key={option.value}
                label={option.label}
                name='property-category'
                value={option.value}
                current={propertyCategory}
                onChange={handleOnPropertyCategoryChange}
              >
                {option.icon}
              </CardRadio>
            );
          })}
        </div>
      </div>

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
          />
        </div>
      ) : null}
    </>
  );
};

export default LoanAgainstPropertyFields;
