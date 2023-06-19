import { useContext, useCallback, useEffect } from 'react';
import { CardRadio, CurrencyInput, TextInput } from '../../../components';
import { propertyCategoryOptions, propertyIdentificationOptions } from '../utils';
import { AuthContext } from '../../../context/AuthContext';
import { PropertyDetailContext } from '.';
import { updateLeadDataOnBlur } from '../../../global';

const disableSubmitMap = {
  done: ['property_estimation', 'property_pincode', 'purpose_of_loan', 'property_type'],
  'not-yet': ['purpose_of_loan'],
};

const LoanAgainstPropertyFields = () => {
  const { setPropertyIdentified, propertyIdentified, propertyCategory, setPropertyCategory } =
    useContext(PropertyDetailContext);
  const { values, errors, touched, handleBlur, handleChange, setFieldValue, setDisableNextStep } =
    useContext(AuthContext);

  const handleOnPropertyCategoryChange = useCallback(
    (e) => {
      setPropertyCategory(e.currentTarget.value);
      setFieldValue('purpose_type', e.currentTarget.value);
      updateLeadDataOnBlur(49, 'purpose_type', e.currentTarget.value)
    },
    [setFieldValue, setPropertyCategory],
  );

  const handleOnPropertyIdentificationChange = useCallback(
    (e) => {
      setPropertyIdentified(e.currentTarget.value);
      setFieldValue('property_identification', e.currentTarget.value);
      updateLeadDataOnBlur(49, 'property_identification', e.currentTarget.value)
      // console.log(49, 'property_identification', e.currentTarget.value);
    },
    [setFieldValue, setPropertyIdentified],
  );

  useEffect(() => {
    if (!propertyIdentified) return;

    let disableSubmitting = disableSubmitMap[propertyIdentified].reduce((acc, field) => {
      const keys = Object.keys(errors);
      if (!keys.length) return acc && false;
      return acc && !Object.keys(errors).includes(field);
    }, true);

    disableSubmitting = disableSubmitting && !errors.purpose_type;

    setDisableNextStep(!disableSubmitting);
  }, [propertyIdentified, errors, setDisableNextStep]);

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
            // onBlur={handleBlur}
            onBlur={(e)=> {
              handleBlur(e);
              updateLeadDataOnBlur(49, e.currentTarget.name, e.currentTarget.value);
              // console.log(49, e.currentTarget.name, e.currentTarget.value);
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
            // onBlur={handleBlur}
            onBlur={(e)=>{
              handleBlur(e);
              updateLeadDataOnBlur(49, e.currentTarget.name, e.currentTarget.value)
            }}
            onChange={handleChange}
          />
        </div>
      ) : null}
    </>
  );
};

export default LoanAgainstPropertyFields;
