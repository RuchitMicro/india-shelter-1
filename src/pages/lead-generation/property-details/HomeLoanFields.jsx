import { useContext, useCallback, useEffect } from 'react';
import { CardRadio, CurrencyInput, TextInput } from '../../../components';
import { propertyIdentificationOptions } from '../utils';
import { AuthContext } from '../../../context/AuthContext';
import { PropertyDetailContext } from '.';
import { updateLeadDataOnBlur } from '../../../global';
import { currencyToFloat } from '../../../components/CurrencyInput';

const disableSubmitMap = {
  done: ['property_estimation', 'property_pincode', 'purpose_of_loan', 'property_type'],
  'not-yet': ['purpose_of_loan'],
};

const HomeLoanFields = () => {
  const { setPropertyIdentified, propertyIdentified } = useContext(PropertyDetailContext);
  const { values, errors, touched, handleBlur, handleChange, setDisableNextStep, currentLeadId } =
    useContext(AuthContext);

  const handleOnPropertyIdentificationChange = useCallback(
    (e) => {
      const value = e.currentTarget.value;
      setPropertyIdentified(value);
      updateLeadDataOnBlur(currentLeadId, 'property_identification', value);
    },
    [currentLeadId, setPropertyIdentified],
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
            onBlur={(e) => {
              const target = e.currentTarget;
              handleBlur(e);
              updateLeadDataOnBlur(
                currentLeadId,
                target.getAttribute('name'),
                currencyToFloat(target.value),
              );
              updateLeadDataOnBlur(
                currentLeadId,
                'Total_Property_Value',
                currencyToFloat(target.value),
              );
            }}
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
            type='number'
            inputClasses='hidearrow'
            onBlur={(e) => {
              handleBlur(e);
              updateLeadDataOnBlur(
                currentLeadId,
                'property_pincode',
                parseInt(e.currentTarget.value),
              );
            }}
            onChange={(e) => {
              const value = e.currentTarget.value;
              if (!value) {
                handleChange(e);
                return;
              }
              const pattern = /[0-9]+/g;
              if (pattern.exec(value[value.length - 1])) {
                handleChange(e);
              }
            }}
          />
        </div>
      ) : null}
    </>
  );
};

export default HomeLoanFields;
