import Button from '../../components/Button';
import OtpInput from '../../components/OtpInput';
import RangeSlider from '../../components/RangeSlider';
import TextInput from '../../components/TextInput';

const PersonalDetail = () => {
  return (
    <div className='flex flex-col gap-2'>
      <h1>Personal Details</h1>
      <TextInput label={"I want a loan of"} required/>
      <RangeSlider />
      <TextInput label={"First Name"} placeholder={"Ex: Suresh, Priya"} required />
      <TextInput label={"Middle Name"} placeholder={"Ex: Ramji, Sreenath"} required />
      <TextInput label={"Last Name"} placeholder={"Ex: Swami, Singh"} required />
      <TextInput label={"Current Pincode"} placeholder={"Ex: 123456"} required />
      <TextInput label={"Mobile number"} placeholder={"Please enter 10 digit mobile no"} required />
      <OtpInput label={"Enter OTP"} required/>
    </div>
  );
};

export default PersonalDetail;
