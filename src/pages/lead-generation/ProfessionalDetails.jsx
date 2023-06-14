import { useState, useContext, useEffect } from 'react';
import TextInput from '../../components/TextInput';
import CardRadio from '../../components/CardRadio';
import DropDown from '../../components/DropDown';
import IconSalaried from '../../assets/icons/salaried';
import IconSelfEmployed from '../../assets/icons/self-employed';
import { AuthContext } from '../../context/AuthContext';
import DatePicker from '../../components/DatePicker';
import { CurrencyInput } from '../../components';

const loanTypeDate = [
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
  salaried: (selectDropDownOption) => (
    <DropDown
      label='Mode of Salary'
      required
      options={loanTypeDate[0].options}
      placeholder='Ex: Bank Transfer'
      onChange={selectDropDownOption}
    />
  ),
  'self-employed': (selectDropDownOption) => (
    <DropDown
      label='Occupation'
      required
      options={loanTypeDate[1].options}
      placeholder='Ex: Purchase'
      onChange={selectDropDownOption}
    />
  ),
};

const ProfessinalDetail = () => {
  const [current, setCurrent] = useState(null);
  const [selectedProfession, setselectedProfession] = useState(null);
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    activeStepIndex,
    setDisableNextStep,
  } = useContext(AuthContext);
  const { pan_number, date_of_birth, monthly_family_income, ongoing_emi } = values;
  const [date, setDate] = useState();

  const onChange = (e) => {
    setCurrent(e.currentTarget.value);
    setselectedProfession(e.target.value);
  };

  useEffect(() => {
    const moveToNextStep = () => {
      if (pan_number && date_of_birth && monthly_family_income && ongoing_emi)
        setDisableNextStep(false);
      else setDisableNextStep(true);
    };
    moveToNextStep();
  }, [
    activeStepIndex,
    pan_number,
    date_of_birth,
    monthly_family_income,
    ongoing_emi,
    setDisableNextStep,
  ]);

  useEffect(() => {
    if (date) setFieldValue('date_of_birth', date);
    if (selectedProfession) setFieldValue('profession', selectedProfession);
  }, [date, setFieldValue, selectedProfession]);

  const handleData = (value) => {
    if (selectedProfession === 'salaried') {
      setFieldValue('mode_of_salary', value);
      setFieldValue('occupation', '');
    } else {
      setFieldValue('occupation', value);
      setFieldValue('mode_of_salary', '');
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      <TextInput
        label='PAN number'
        required
        name='pan_number'
        placeholder='ABCD1234A'
        value={values.pan_number}
        error={errors.pan_number}
        touched={touched.pan_number}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <DatePicker
        startDate={date}
        setStartDate={setDate}
        required
        name='date_of_birth'
        label='Date of Birth'
      />
      <span className='text-sm text-primary-red'>
        {errors.date_of_birth && touched.date_of_birth
          ? errors.date_of_birth
          : String.fromCharCode(160)}
      </span>

      <div>
        <label htmlFor='property-identication' className='flex gap-0.5 font-medium text-black'>
          Profession <span className='text-primary-red text-xs'>*</span>
        </label>
        <div className='flex justify-between gap-4 mt-2'>
          {loanTypeDate.map((data, index) => (
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

      {selectedProfession && professionData[selectedProfession](handleData)}

      <CurrencyInput
        label='Monthly Family Income'
        hint='Total monthly earnings of all family members. This helps to improve your loan eligibility'
        required
        name='monthly_family_income'
        placeholder='Ex: 1,00,000'
        value={values.monthly_family_income}
        error={errors.monthly_family_income}
        touched={touched.monthly_family_income}
        onBlur={handleBlur}
        onChange={handleChange}
        inputClasses='font-semibold'
      />

      <CurrencyInput
        label='Ongoing EMI'
        hint='Mention all of the ongoing monthly payments'
        required
        name='ongoing_emi'
        placeholder='Ex: 10,000'
        value={values.ongoing_emi}
        error={errors.ongoing_emi}
        touched={touched.ongoing_emi}
        onBlur={handleBlur}
        onChange={handleChange}
        inputClasses='font-semibold'
      />
    </div>
  );
};

export default ProfessinalDetail;
