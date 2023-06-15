import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const requestOptions = {};

async function getLeadByPhoneNumber(phoneNumber) {
  const res = await axios.get(
    `${API_URL}/lead/get-phone-number/${phoneNumber}`,
    {},
    requestOptions,
  );
  return res.data;
}

async function createLead(leadData) {
  const res = await axios.post(`${API_URL}/lead/add`, leadData, requestOptions);
  return res.data;
}

export { API_URL, createLead, getLeadByPhoneNumber };
