import * as Yup from "Yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(10).required("please enter your name"),
  email: Yup.string().email().required("please enter your email"),
  mobileNo: Yup.string()
    .matches(phoneRegExp, "phone number is not valid")
    .required("please enter your number"),
  date: Yup.date()
    .max(new Date())
    .required("please select date"),
  password: Yup.string().min(6).required("please enter your password"),
  confirmPassword: Yup.string()
    .required("re enter your password")
    .oneOf([Yup.ref("password")], "password must match"),
});