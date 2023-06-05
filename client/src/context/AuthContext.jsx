import { createContext } from 'react';
import { useFormik } from 'formik';
import { signUpSchema } from '../schemas/index';

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
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: defaultValues,
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      console.log(values);
      action.resetForm(defaultValues);
    },
  });

  return (
    <AuthContext.Provider
      value={{ errors, values, touched, handleBlur, handleChange, handleSubmit }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
