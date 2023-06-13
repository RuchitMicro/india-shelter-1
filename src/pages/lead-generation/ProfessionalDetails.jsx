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
  const { panNumber, dob, monthlyFamilyIncome, onGoingEmi } = values;
  const [date, setDate] = useState();

  const onChange = (e) => {
    setCurrent(e.currentTarget.value);
    setselectedProfession(e.target.value);
  };

  useEffect(() => {
    const moveToNextStep = () => {
      if (panNumber && dob && monthlyFamilyIncome && onGoingEmi) setDisableNextStep(false);
      else setDisableNextStep(true);
    };
    moveToNextStep();
  }, [activeStepIndex, panNumber, dob, onGoingEmi, monthlyFamilyIncome, setDisableNextStep]);

  useEffect(() => {
    if (date && selectedProfession) {
      setFieldValue('dob', date);
      setFieldValue('profession', selectedProfession);
    }
  }, [date, setFieldValue, selectedProfession]);

  console.log(selectedProfession);

  const handleData = (value) => {
    setFieldValue('profession', value);
  };

  return (
    <div className='flex flex-col gap-2'>
      <TextInput
        label='PAN number'
        required
        name='panNumber'
        placeholder='Ex: ABCD1234'
        value={values.panNumber}
        error={errors.panNumber}
        touched={touched.panNumber}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <DatePicker
        startDate={date}
        setStartDate={setDate}
        required
        name='dob'
        label='Date of Birth'
      />
      <span className='text-sm text-primary-red'>
        {errors.dob && touched.dob ? errors.dob : String.fromCharCode(160)}
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
        name='monthlyFamilyIncome'
        placeholder='Ex: 1,00,000'
        value={values.monthlyFamilyIncome}
        error={errors.monthlyFamilyIncome}
        touched={touched.monthlyFamilyIncome}
        onBlur={handleBlur}
        onChange={handleChange}
        inputClasses='font-semibold'
      />

      <CurrencyInput
        label='Ongoing EMI'
        hint='Mention all of the ongoing monthly payments'
        required
        name='onGoingEmi'
        placeholder='Ex: 10,000'
        value={values.onGoingEmi}
        error={errors.onGoingEmi}
        touched={touched.onGoingEmi}
        onBlur={handleBlur}
        onChange={handleChange}
        inputClasses='font-semibold'
      />
    </div>
  );
};

export default ProfessinalDetail;
