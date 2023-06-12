import * as Yup from 'yup';
import { parse, isDate } from 'date-fns';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

function parseDateString(value, originalValue) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, 'yyyy-MM-dd', new Date());

  return parsedDate;
}

export const signUpSchema = Yup.object({
  // loanAmount: Yup.string().required('fill the loan amount'),
  firstName: Yup.string().min(2).max(10).required('please enter your name'),
  pinCode: Yup.string()
    .required('please enter your pincode')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(6, 'Must be exactly 6 digits')
    .max(6, 'Must be exactly 6 digits'),
  mobileNo: Yup.string()
    .matches(phoneRegExp, 'phone number is not valid')
    .required('please enter your number'),
  panNumber: Yup.string().required('please enter your pan number'),
  dob: Yup.date()
    .transform(parseDateString)
    .required('please enter your birth date')
    .max(new Date()),
  monthlyFamilyIncome: Yup.string().required('please enter your monthly family income'),
  onGoingEmi: Yup.string().required('please enter your ongoing emi amount'),
  estimatePropertyValue: Yup.string().required('please enter your ongoing emi amount'),
  propertyPincode: Yup.string().required('please enter your property pincode'),
  // email: Yup.string().email().required('please enter your email'),
  // password: Yup.string().min(6).required('please enter your password'),
  // confirmPassword: Yup.string()
  //   .required('re enter your password')
  //   .oneOf([Yup.ref('password')], 'password must match'),
});
