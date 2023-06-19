import { CurrencyInput, DropDown, TextInput } from '../../../components';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { IconRupee } from '../../../assets/icons';
import { loanTenureOptions } from '../utils';
import { updateLeadDataOnBlur } from '../../../global';

const fieldsRequiredForSubmitting = [
  'banker_name',
  'loan_tenure',
  'loan_amount',
  'purpose_of_loan',
  'property_type',
];

const BalanceTransferFields = () => {
  const { values, errors, touched, handleBlur, handleChange, setDisableNextStep } =
    useContext(AuthContext);

  useEffect(() => {
    let disablSubmit = fieldsRequiredForSubmitting.reduce((acc, field) => {
      const keys = Object.keys(errors);
      if (!keys.length) return acc && false;
      return acc && !Object.keys(errors).includes(field);
    }, true);
    setDisableNextStep(!disablSubmit);
  }, [errors, setDisableNextStep]);

  return (
    <div className='flex flex-col gap-2'>
      <TextInput
        name='banker_name'
        label='Banker Name'
        required
        placeholder='Ex: Axis'
        value={values.banker_name}
        error={errors.banker_name}
        touched={touched.banker_name}
        // onBlur={handleBlur}
        onBlur={(e)=>{
          handleBlur(e);
          updateLeadDataOnBlur(49, e.currentTarget.name, e.currentTarget.value);
        }}
        onChange={handleChange}
      />

      <div className='flex gap-2 items-center'>
        <div className='flex-1'>
          <TextInput
            name='loan_tenure'
            placeholder='Ex: 10'
            label='Loan Tenure'
            required
            value={values.loan_tenure}
            error={errors.loan_tenure}
            touched={touched.loan_tenure}
            // onBlur={handleBlur}
            onBlur={(e)=>{
              handleBlur(e);
              updateLeadDataOnBlur(49, e.currentTarget.name, e.currentTarget.value)
            }}
            onChange={handleChange}
          />
        </div>
        <div className='mt-1'>
          <DropDown options={loanTenureOptions} placeholder='Months' showError={false} />
        </div>
      </div>

      <CurrencyInput
        name='loan_amount'
        label='Loan Amount'
        required
        Icon={IconRupee}
        placeholder='1,00,000'
        value={values.loan_amount}
        error={errors.loan_amount}
        touched={touched.loan_amount}
        // onBlur={handleBlur}
        onBlur={(e)=>{
          handleBlur(e);
          updateLeadDataOnBlur(49, e.currentTarget.name, e.currentTarget.value)
          // console.log(49, e.currentTarget.name, e.currentTarget.value);
        }}
        onChange={handleChange}
      />
    </div>
  );
};

export default BalanceTransferFields;
