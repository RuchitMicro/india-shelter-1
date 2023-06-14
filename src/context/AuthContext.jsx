import { createContext, useCallback, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { signUpSchema } from '../schemas/index';
import PropTypes from 'prop-types';
import { loanTypeOptions } from '../pages/lead-generation/utils';

const defaultValues = {
  phone_number: '',
  loan_type: 'home-loan',
  loan_request_amount: '1000000',
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
  property_estimation: '10',
  purpose_of_loan: '',
  purpose_type: '',
  property_type: '',
  banker_name: '',
  loan_tenure: '',
  loan_amount: '',
  pincode: '',
  property_pincode: '',
  promo_code: '',
  email: 'ruchitbharwa@gmail.com',
  email_otp: [],
  otp: [],
};

export const AuthContext = createContext(defaultValues);

const AuthContextProvider = ({ children }) => {
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      console.log(values);
      action.resetForm(defaultValues);
    },
  });

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const previousStepIndex = useRef(activeStepIndex);
  const [selectedLoanType, setSelectedLoanType] = useState(loanTypeOptions[0].value);
  const [disableNextStep, setDisableNextStep] = useState(true);

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
