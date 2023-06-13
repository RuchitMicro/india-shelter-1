import { createContext, useCallback, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { signUpSchema } from '../schemas/index';
import PropTypes from 'prop-types';
import { loanTypeOptions } from '../pages/lead-generation/utils';

const defaultValues = {
  loanAmount: '100000',
  firstName: '',
  middle_name: '',
  last_name: '',
  pinCode: '',
  mobileNo: '',
  otp: [],
  panNumber: '',
  dob: '',
  modeOfSalary: '',
  monthlyFamilyIncome: '',
  onGoingEmi: '',
  estimatePropertyValue: '',
  propertyPincode: '',
  loanPurpose: '',
  propertyType: 'residential',
  promoCode: '',
  email: '',
  bankerName: '',
  loanTenure: '',
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
