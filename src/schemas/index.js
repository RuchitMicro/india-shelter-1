import * as Yup from 'yup';
import { parse, isDate } from 'date-fns';

// const phoneRegExp =
//   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
// .matches(phoneRegExp, 'phone number is not valid')

function parseDateString(value, originalValue) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, 'yyyy-MM-dd', new Date());

  return parsedDate;
}

export const signUpSchema = Yup.object({
  loan_amount: Yup.number()
    .required('Total loan amount should not be less than ₹ 50,000 and more than ₹ 50,00,000')
    .min(100000, 'Total loan amount should not be less than ₹ 50,000 and more than ₹ 50,00,000')
    .max(5000000, 'Total loan amount should not be less than ₹ 50,000 and more than ₹ 50,00,000'),
  first_name: Yup.string().min(2).max(10).required('please enter your name'),
  middle_name: Yup.string().min(2).max(10),
  last_name: Yup.string().min(2).max(10),
  pincode: Yup.string()
    .required('Please enter valid Pincode for your region')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(6, 'Must be exactly 6 digits')
    .max(6, 'Must be exactly 6 digits'),
  phone_number: Yup.string()
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits')
    .required('Please enter your valid 10 digit mobile number'),
  pan_number: Yup.string().required('Please enter your valid PAN number'),
  date_of_birth: Yup.date()
    .transform(parseDateString)
    .required('please enter your birth date')
    .max(new Date()),
  monthly_family_income: Yup.string().required('please enter your monthly family income'),
  ongoing_emi: Yup.string().required('please enter your ongoing emi amount'),
  property_estimation: Yup.string().required('please enter your ongoing emi amount'),
  property_pincode: Yup.string()
    .required('please enter your property pincode')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(6, 'Must be exactly 6 digits')
    .max(6, 'Must be exactly 6 digits'),
  banker_name: Yup.string().required(
    'Please enter a right Bank Name. Entered Bank name was not found',
  ),
  loan_tenure: Yup.string().required('Please enter the Loan tenure period within 12 months'),

  // email: Yup.string().email().required('please enter your email'),
  // password: Yup.string().min(6).required('please enter your password'),
  // confirmPassword: Yup.string()
  //   .required('re enter your password')
  //   .oneOf([Yup.ref('password')], 'password must match'),
});
