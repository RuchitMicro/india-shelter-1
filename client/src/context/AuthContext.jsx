import { createContext } from 'react';
import { useFormik } from 'formik';
import { signUpSchema } from '../schemas/index';
import PropTypes from 'prop-types';

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

  return <AuthContext.Provider value={formik}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

AuthContextProvider.propTypes = {
  children: PropTypes.element,
};
