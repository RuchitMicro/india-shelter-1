import { createContext, useState } from 'react';
import { useFormik } from 'formik';
import { signUpSchema } from '../schemas/index';
import PropTypes from 'prop-types';
import { loanTypeOptions } from '../pages/lead-generation/utils';

const defaultValues = {
  loanAmount: '',
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

  const [selectedLoanType, setSelectedLoanType] = useState(loanTypeOptions[0].value);

  return (
    <AuthContext.Provider value={{ ...formik, selectedLoanType, setSelectedLoanType }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

AuthContextProvider.propTypes = {
  children: PropTypes.element,
};
