import { CurrencyInput, DropDown, TextInput } from '../../../components';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { IconRupee } from '../../../assets/icons';
import { loanTenureOptions } from '../utils';

const BalanceTransferFields = () => {
  const { values, errors, touched, handleBlur, handleChange } = useContext(AuthContext);

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
        onBlur={handleBlur}
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
            onBlur={handleBlur}
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
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </div>
  );
};

export default BalanceTransferFields;
