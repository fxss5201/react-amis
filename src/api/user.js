import axios from './axios';

export const loginFn = (params) => {
  return axios.post('/api/login', params)
}

export const sendVerificationFn = (params) => {
  return axios.post('/api/sendVerification', params)
}
