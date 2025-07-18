import api from '../api/axiosInterceptor';

export const getContacts = async () => {
  const res = await api.get('/contacts');
  return res.data;
};

export const addContact = async (contact) => {
  const res = await api.post('/contacts', contact);
  return res.data;
}