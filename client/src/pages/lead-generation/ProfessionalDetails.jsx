import { useState } from 'react';
import TextInput from '../../components/TextInput';
import CardRadio from '../../components/CardRadio';
import DropDown from '../../components/DropDown';
import IconSalaried from '../../assets/icons/salaried';
import IconSelfEmployed from '../../assets/icons/self-employed';
import IconRupee from '../../assets/icons/rupee';

const LoanTypeData = [
  {
    label: 'Salaried',
    value: 'salaried',
    icon: <IconSalaried />,
    options: [
      {
        label: 'Bank Transfer',
        value: 'bank-transfer',
      },
      {
        label: 'Cash',
        value: 'cash',
      },
    ],
  },
  {
    label: 'Self employed',
    value: 'self-employed',
    icon: <IconSelfEmployed />,
    options: [
      {
        label: 'Trading',
        value: 'trading',
      },
      {
        label: 'Manufacturing',
        value: 'manufacturing',
      },
      {
        label: 'Services',
        value: 'services',
      },
      {
        label: 'Occupation 4',
        value: 'occupation-4',
      },
    ],
  },
];

const professionData = {
  salaried: (
    <DropDown
      label='Mode of Salary'
      required
      options={LoanTypeData[0].options}
      placeholder='Ex: Bank Transfer'
    />
  ),
  'self-employed': (
    <DropDown
      label='Occupation'
      required
      options={LoanTypeData[1].options}
      placeholder='Ex: Purchase'
    />
  ),
};

const ProfessinalDetail = () => {
  const [current, setCurrent] = useState(null);
  const [selectedProfession, setselectedProfession] = useState(null);

  const onChange = (e) => {
    setCurrent(e.currentTarget.value);
    setselectedProfession(e.target.value);
  };

  console.log(current);
  return (
    <div className='flex flex-col gap-2'>
      <TextInput label='PAN number' required name='pan' placeholder='ABCD12345' />

      <TextInput label='Date of Birth' required name='dob' placeholder='15/05/1999' />

      <div>
        <label htmlFor='property-identication' className='flex gap-0.5 font-medium text-black'>
          Profession <span className='text-primary-red text-xs'>*</span>
        </label>
        <div className='flex justify-between gap-4 mt-2'>
          {LoanTypeData.map((data, index) => (
            <CardRadio
              key={index}
              name='profDetails'
              label={data.label}
              onChange={onChange}
              current={current}
              value={data.value}
            >
              {data.icon}
            </CardRadio>
          ))}
        </div>
        <span className='text-sm text-primary-red mt-1'>{false || String.fromCharCode(160)}</span>
      </div>

      {selectedProfession && professionData[selectedProfession]}

      <TextInput
        label='Monthly Family Income'
        hint='Total monthly earnings of all family members. This helps to improve your loan eligibility'
        required
        name='income'
        placeholder='Ex: 1,00,000'
        Icon={IconRupee}
      />

      <TextInput
        label='Ongoing EMI'
        hint='TMention all of the ongoing monthly payments'
        required
        name='emi'
        placeholder='Ex: 10,000'
        Icon={IconRupee}
      />
    </div>
  );
};

export default ProfessinalDetail;
