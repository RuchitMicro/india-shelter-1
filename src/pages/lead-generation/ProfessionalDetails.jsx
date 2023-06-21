import { useState, useContext, useEffect, useCallback } from 'react';
import TextInput from '../../components/TextInput';
import CardRadio from '../../components/CardRadio';
import DropDown from '../../components/DropDown';
import IconSalaried from '../../assets/icons/salaried';
import IconSelfEmployed from '../../assets/icons/self-employed';
import { AuthContext } from '../../context/AuthContext';
import DatePicker from '../../components/DatePicker';
import { CurrencyInput } from '../../components';
import {
  checkBre99,
  checkCibil,
  checkDedupe,
  editLeadById,
  updateLeadDataOnBlur,
  verifyPan,
} from '../../global';
import { currencyToFloat } from '../../components/CurrencyInput';

const loanTypeData = [
  {
    label: 'Salaried',
    value: 'Cash Salaried',
    icon: <IconSalaried />,
    options: [
      {
        label: 'Bank Transfer',
        value: 'Bank Transfer Salaried',
      },
      {
        label: 'Cash',
        value: 'Cash Salaried',
      },
    ],
  },
  {
    label: 'Self employed',
    value: 'Self Employed',
    icon: <IconSelfEmployed />,
    options: [
      {
        label: 'Trading',
        value: 'Trading',
      },
      {
        label: 'Manufacturing',
        value: 'Manufacturing',
      },
      {
        label: 'Services',
        value: 'Services',
      },
      {
        label: 'Occupation 4',
        value: 'Occupation-4',
      },
    ],
  },
];

const professionData = {
  'Cash Salaried': (selectDropDownOption) => (
    <DropDown
      label='Mode of Salary'
      required
      options={loanTypeData[0].options}
      placeholder='Ex: Bank Transfer'
      onChange={selectDropDownOption}
    />
  ),
  'Self Employed': (selectDropDownOption) => (
    <DropDown
      label='Occupation'
      required
      options={loanTypeData[1].options}
      placeholder='Ex: Purchase'
      onChange={selectDropDownOption}
    />
  ),
};

const ProfessinalDetail = () => {
  const [current, setCurrent] = useState(null);
  const [selectedProfession, setSelectedProfession] = useState(null);
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    setFieldError,
    activeStepIndex,
    setDisableNextStep,
    currentLeadId,
  } = useContext(AuthContext);
  const { date_of_birth, monthly_family_income, ongoing_emi } = values;
  const [date, setDate] = useState();

  const onProfessionChange = (e) => {
    const value = e.currentTarget.value;
    setCurrent(value);
    setSelectedProfession(value);
    setFieldValue('profession', value);
    updateLeadDataOnBlur(currentLeadId, 'profession', value).then((data) => console.log(data));
  };

  useEffect(() => {
    const moveToNextStep = () => {
      if (
        !errors.pan_number &&
        !errors.date_of_birth &&
        date_of_birth &&
        monthly_family_income > 0 &&
        ongoing_emi > 0
      )
        setDisableNextStep(false);
      else setDisableNextStep(true);
    };
    moveToNextStep();
  }, [
    date_of_birth,
    monthly_family_income,
    ongoing_emi,
    setDisableNextStep,
    errors.pan_number,
    errors.date_of_birth,
  ]);

  useEffect(() => {
    if (date) setFieldValue('date_of_birth', date);
    updateLeadDataOnBlur(currentLeadId, 'date_of_birth', date);
  }, [currentLeadId, date, setFieldValue]);

  const handleData = (value) => {
    if (selectedProfession === 'Cash Salaried') {
      setFieldValue('mode_of_salary', value);
      setFieldValue('occupation', '');
      updateLeadDataOnBlur(currentLeadId, 'mode_of_salary', value);
      updateLeadDataOnBlur(currentLeadId, 'occupation', null);
    } else if (selectedProfession === 'Self Employed') {
      setFieldValue('Occupation', value);
      setFieldValue('mode_of_salary', '');
      updateLeadDataOnBlur(currentLeadId, 'occupation', value);
      updateLeadDataOnBlur(currentLeadId, 'mode_of_salary', null);
    }
  };

  const handleOnPanBlur = useCallback(
    async (e) => {
      if (errors.pan_number) return;

      const updatedPanCard = await editLeadById(currentLeadId, {
        pan_number: e.currentTarget.value.toUpperCase(),
      });

      if (updatedPanCard.status !== 200) return;

      //call dedupe
      await checkDedupe(currentLeadId);
      console.log('called dedupe');
      //call bre99
      const bre99Res = await checkBre99(currentLeadId);
      console.log('called bre99');

      if (bre99Res.status !== 200) return;

      const bre99Data = bre99Res.data.bre_99_response.body;
      const allowCallPanRule = bre99Data.find((rule) => rule.Rule_Name === 'PAN');
      const allowCallCibilRule = bre99Data.find((rule) => rule.Rule_Name === 'Bureau');

      if (allowCallPanRule.Rule_Value === 'YES') {
        const res = await verifyPan(currentLeadId);
        if (!res.body) return;
        if (res.body.status === 'In-Valid') {
          setFieldError('pan_number', 'Please enter your valid PAN number');
        }
        console.log('called pan');
      }
      if (allowCallCibilRule.Rule_Value === 'YES') {
        await checkCibil(currentLeadId);
        console.log('called cibil');
      }
    },
    [currentLeadId, errors.pan_number, setFieldError],
  );

  return (
    <div className='flex flex-col gap-2'>
      <TextInput
        label='PAN number'
        required
        name='pan_number'
        placeholder='ABCDE1234A'
        value={values.pan_number.toUpperCase()}
        error={errors.pan_number}
        touched={touched.pan_number}
        onBlur={(e) => {
          handleBlur(e);
          handleOnPanBlur(e);
        }}
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
          {loanTypeData.map((data, index) => (
            <CardRadio
              key={index}
              name='profession'
              label={data.label}
              onChange={onProfessionChange}
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
        hint='Total monthly earnings of all family members. <br /> This helps to improve your loan eligibility'
        required
        name='monthly_family_income'
        placeholder='Ex: 1,00,000'
        value={values.monthly_family_income}
        error={errors.monthly_family_income}
        touched={touched.monthly_family_income}
        onBlur={(e) => {
          const target = e.currentTarget;
          handleBlur(e);
          updateLeadDataOnBlur(
            currentLeadId,
            target.getAttribute('name'),
            currencyToFloat(target.value).toString(),
          );
        }}
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
        onBlur={(e) => {
          const target = e.currentTarget;
          handleBlur(e);
          updateLeadDataOnBlur(
            currentLeadId,
            target.getAttribute('name'),
            currencyToFloat(target.value),
          );
        }}
        onChange={handleChange}
        inputClasses='font-semibold'
      />
    </div>
  );
};

export default ProfessinalDetail;
