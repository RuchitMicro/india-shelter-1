import { DropDown, TextInput } from '../../../components';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { IconRupee } from '../../../assets/icons';
import { loanTenureOptions } from '../utils';

const BalanceTransferFields = () => {
  const { values, errors, touched, handleBlur, handleChange } = useContext(AuthContext);

  return (
    <div className='flex flex-col gap-2'>
      <TextInput
        name='banker-name'
        label='Banker Name'
        required
        placeholder='Ex: Axis'
        value={values.estimatePropertyValue}
        error={errors.estimatePropertyValue}
        touched={touched.estimatePropertyValue}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <div className='flex gap-2 items-center'>
        <div className='flex-1'>
          <TextInput name='loan-tenure' placeholder='Ex: 10' label='Loan Tenure' required />
        </div>
        <div className='mt-1'>
          <DropDown options={loanTenureOptions} placeholder='Months' showError={false} />
        </div>
      </div>

      <TextInput
        name='loan-amount'
        label='Loan Amount'
        required
        Icon={IconRupee}
        placeholder='1,00,000'
        value={values.estimatePropertyValue}
        error={errors.estimatePropertyValue}
        touched={touched.estimatePropertyValue}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </div>
  );
};

export default BalanceTransferFields;
