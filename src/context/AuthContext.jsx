import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { signUpSchema } from '../schemas/index';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import { getLeadById } from '../global';

export const defaultValues = {
  phone_number: '',
  loan_type: 'Home Loan',
  loan_request_amount: '100000',
  first_name: '',
  middle_name: '',
  last_name: '',
  pan_number: '',
  date_of_birth: '',
  profession: '',
  mode_of_salary: '',
  occupation: '',
  monthly_family_income: '',
  ongoing_emi: '',
  property_identification: '',
  property_estimation: '',
  purpose_of_loan: '',
  purpose_type: '',
  property_type: '',
  banker_name: '',
  loan_tenure: '',
  loan_amount: '',
  pincode: '',
  property_pincode: '',
  promo_code: '',
  email: '',
  Out_Of_Geographic_Limit: false,
  Total_Property_Value: '',
  extra_params: {},
};

export const AuthContext = createContext(defaultValues);

const AuthContextProvider = ({ children }) => {
  const [searchParams] = useSearchParams();
  const [isLeadGenerated, setIsLeadGenearted] = useState(false);
  const [currentLeadId, setCurrentLeadId] = useState(null);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [phoneNumberVerified, setPhoneNumberVerified] = useState(null);

  const formik = useFormik({
    initialValues: { ...defaultValues, promo_code: searchParams.get('promo_code') || '' },
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      action.resetForm(defaultValues);
    },
  });

  useEffect(() => {
    const _leadID = searchParams.get('li');
    if (!_leadID) return;
    setCurrentLeadId(_leadID);
    setInputDisabled(true);
    getLeadById(_leadID).then((res) => {
      if (res.status !== 200) return;
      setIsLeadGenearted(true);
      const data = {};
      Object.entries(res.data).forEach(([fieldName, fieldValue]) => {
        if (typeof fieldValue === 'number') {
          data[fieldName] = fieldValue.toString();
          return;
        }
        data[fieldName] = fieldValue || '';
      });
      formik.setValues({ ...formik.values, ...data });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const previousStepIndex = useRef(activeStepIndex);
  const [hidePromoCode, setHidePromoCode] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState(formik.values.loan_type);
  const [disableNextStep, setDisableNextStep] = useState(true);

  useEffect(() => {
    setSelectedLoanType(formik.values.loan_type);
  }, [formik.values.loan_type]);

  useEffect(() => {
    const promoCode = searchParams.get('promo_code');
    if (promoCode) {
      setHidePromoCode(true);
    }
  }, [searchParams]);

  const goToPreviousStep = useCallback(() => {
    setActiveStepIndex((prev) => {
      previousStepIndex.current = prev;
      return prev - 1;
    });
  }, []);

  const goToNextStep = useCallback(() => {
    setActiveStepIndex((prev) => {
      previousStepIndex.current = prev;
      return prev + 1;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...formik,
        activeStepIndex,
        setActiveStepIndex,
        selectedLoanType,
        setSelectedLoanType,
        disableNextStep,
        setDisableNextStep,
        previousStepIndex,
        goToNextStep,
        goToPreviousStep,
        hidePromoCode,
        isLeadGenerated,
        setIsLeadGenearted,
        currentLeadId,
        setCurrentLeadId,
        inputDisabled,
        setInputDisabled,
        phoneNumberVerified,
        setPhoneNumberVerified,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

AuthContextProvider.propTypes = {
  children: PropTypes.element,
};
