import api from '../api/axiosInterceptor';

export const getContacts = async () => {
  const res = await api.get('/contacts');
  return res.data;
};