import axios from './axios';

export const loginFn = (params) => {
  return axios.post('/api/login', params)
}
