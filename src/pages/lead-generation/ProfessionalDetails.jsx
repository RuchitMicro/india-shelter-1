import { useState, useContext, useEffect } from 'react';
import TextInput from '../../components/TextInput';
import CardRadio from '../../components/CardRadio';
import DropDown from '../../components/DropDown';
import IconSalaried from '../../assets/icons/salaried';
import IconSelfEmployed from '../../assets/icons/self-employed';
import { AuthContext } from '../../context/AuthContext';
import DatePicker from '../../components/DatePicker';
import { CurrencyInput } from '../../components';
import { checkBre99, checkCibil, checkDedupe, editLeadById, verifyPan } from '../../global';
import { useDebounce } from '../../hooks';

const loanTypeData = [
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
      options={loanTypeData[0].options}
      placeholder='Ex: Bank Transfer'
      onChange={selectDropDownOption}
    />
  ),
  'self-employed': (selectDropDownOption) => (
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
  const [selectedProfession, setselectedProfession] = useState(null);
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
  const { pan_number, date_of_birth, monthly_family_income, ongoing_emi } = values;
  const [date, setDate] = useState();
  const deferedPanNumber = useDebounce(pan_number, 3000);

  const onChange = (e) => {
    setCurrent(e.currentTarget.value);
    setselectedProfession(e.target.value);
  };

  useEffect(() => {
    const moveToNextStep = () => {
      if (
        !errors.pan_number &&
        !errors.date_of_birth &&
        monthly_family_income > 0 &&
        ongoing_emi > 0
      )
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
    errors.pan_number,
    errors.date_of_birth,
  ]);

  useEffect(() => {
    if (date) setFieldValue('date_of_birth', date);
  }, [date, setFieldValue]);

  useEffect(() => {
    if (selectedProfession) setFieldValue('profession', selectedProfession);
  }, [selectedProfession, setFieldValue]);

  const handleData = (value) => {
    if (selectedProfession === 'salaried') {
      setFieldValue('mode_of_salary', value);
      setFieldValue('occupation', '');
    } else {
      setFieldValue('occupation', value);
      setFieldValue('mode_of_salary', '');
    }
  };

  useEffect(() => {
    if (!deferedPanNumber) return;

    const editLead = async () => {
      //call editlead
      const editRes = await editLeadById(currentLeadId, { pan_number: values.pan_number });
      console.log(editRes);

      if (editRes) {
        //call dedupe
        await checkDedupe(currentLeadId).then((res) => console.log(res));
        console.log('called dedupe');

        //call bre99
        const callBre99 = async () => {
          const res = await checkBre99(currentLeadId);
          console.log('called bre99');

          if (res.status === 200) {
            const responseArr = res.data.bre_99_response.body;

            responseArr.map((data) => {
              if (data.Rule_Name === 'PAN') {
                if (data.Rule_Value === 'YES') {
                  const callPan = async () => {
                    const res = await verifyPan(currentLeadId);
                    console.log(res.data.body.status);
                    if (res.data.body.status === 'In-Valid')
                      setFieldError('pan_number', 'Please enter your valid PAN number');
                    console.log('called pan');
                  };
                  callPan();
                }
              }
              if (data.Rule_Name === 'Bureau') {
                if (data.Rule_Value === 'YES') {
                  const callCibil = async () => {
                    //call cibil
                    await checkCibil(currentLeadId).then((res) => console.log(res));
                    console.log('called cibil');
                  };
                  callCibil();
                }
              }
            });
          }
        };
        callBre99();
      }
    };
    editLead();
  }, [currentLeadId, deferedPanNumber, setFieldError, values.pan_number]);

  // console.log(validPan);

  return (
    <div className='flex flex-col gap-2'>
      <TextInput
        label='PAN number'
        required
        name='pan_number'
        placeholder='ABCDE1234A'
        value={values.pan_number}
        error={errors.pan_number}
        touched={touched.pan_number}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      {/* <div>
        <span className='text-sm text-primary-red'>{validPan === 'In-Valid' && 'Invalid pan'}</span>
        <span className='text-sm text-green-500'>{validPan === 'Valid' && 'Valid pan'}</span>
      </div> */}

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
