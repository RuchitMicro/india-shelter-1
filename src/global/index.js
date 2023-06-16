import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_LEAD_URL = `${API_URL}/lead`;

const requestOptions = {};

async function pingAPI() {
  const res = await axios.get(`${API_URL}`, {}, requestOptions);
  return res.data;
}

async function createLead(leadData) {
  const res = await axios.post(`${API_LEAD_URL}/add`, leadData, requestOptions);
  return res;
}

async function getAllLeads() {
  const res = await axios.get(`${API_LEAD_URL}`, {}, requestOptions);
  return res.data;
}

async function getLeadByPhoneNumber(phoneNumber) {
  const res = await axios.get(
    `${API_LEAD_URL}/get-phone-number/${phoneNumber}`,
    {},
    requestOptions,
  );
  return res.data;
}

async function getLeadById(id) {
  const res = await axios.get(`${API_LEAD_URL}/${id}`, {}, requestOptions);
  return res;
}

async function editLeadById(id, leadData) {
  const res = await axios.patch(`${API_LEAD_URL}/edit/${id}`, leadData, requestOptions);
  return res;
}

async function deleteLeadById(id) {
  const res = await axios.delete(`${API_LEAD_URL}/delete/${id}`, requestOptions);
  return res.data;
}

async function getPincode(pincode) {
  const res = await axios.get(`${API_URL}/pincode/${pincode}`, {}, requestOptions);
  return res.data;
}

async function sendMobileOTP(phoneNumber) {
  const res = await axios.get(`${API_URL}/lead-mobile-otp/${phoneNumber}`, {}, requestOptions);
  return res.data;
}

async function verifyMobileOtp(phoneNumber, leadOtp) {
  const res = await axios.post(
    `${API_URL}/lead-mobile-otp/${phoneNumber}`,
    leadOtp,
    requestOptions,
  );
  return res;
}

async function getEmailOtp(email) {
  const res = await axios.get(`${API_URL}/lead-email-otp/${email}`, {}, requestOptions);
  return res.data;
}

async function verifyEmailOtp(email, leadOtp) {
  const res = await axios.post(`${API_URL}/lead-email-otp/${email}`, leadOtp, requestOptions);
  return res;
}

async function verifyPan(id, leadPan) {
  const res = await axios.post(`${API_URL}/pan/${id}`, leadPan, requestOptions);
  return res.data;
}

async function getLoanType() {
  const res = await axios.get(`${API_URL}/loan-type`, {}, requestOptions);
  return res.data;
}

async function getPropertyIdentification() {
  const res = await axios.get(`${API_URL}/property-identification`, {}, requestOptions);
  return res.data;
}

async function getProfessionalType() {
  const res = await axios.get(`${API_URL}/professional-type`, {}, requestOptions);
  return res.data;
}

async function getDropDownOptions(dropDownTitle) {
  const res = await axios.get(`${API_URL}/dropdown/${dropDownTitle}`, {}, requestOptions);
  return res.data;
}

async function updateLeadDataOnBlur(leadId, fieldName, value) {
  const inputName = fieldName;
  const updatedFieldValue = {};
  updatedFieldValue[inputName] = value;
  editLeadById(leadId, updatedFieldValue);
}

export {
  API_URL,
  pingAPI,
  createLead,
  getAllLeads,
  getLeadByPhoneNumber,
  getLeadById,
  editLeadById,
  deleteLeadById,
  getPincode,
  sendMobileOTP,
  verifyMobileOtp,
  getEmailOtp,
  verifyEmailOtp,
  verifyPan,
  getLoanType,
  getPropertyIdentification,
  getProfessionalType,
  getDropDownOptions,
  updateLeadDataOnBlur,
};
