import { createContext, useState } from 'react';
import { useFormik } from 'formik';
import { signUpSchema } from '../schemas/index';
import PropTypes from 'prop-types';
import { loanTypeOptions } from '../pages/lead-generation/utils';

const defaultValues = {
  loanAmount: '100000',
  firstName: '',
  middleName: '',
  lastName: '',
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
  propertyType: '',
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
  const [selectedLoanType, setSelectedLoanType] = useState(loanTypeOptions[0].value);
  const [nextStep, setNextStep] = useState(true);

  return (
    <AuthContext.Provider value={{ ...formik, activeStepIndex, setActiveStepIndex, selectedLoanType, setSelectedLoanType, nextStep, setNextStep }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

AuthContextProvider.propTypes = {
  children: PropTypes.element,
};
