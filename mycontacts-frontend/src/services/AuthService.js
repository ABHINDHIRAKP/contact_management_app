import axios from 'axios';

export const registerUser = async (formData) => {
    return axios.post('http://localhost:5000/api/users/register', formData, {
        withCredentials: true
    });
};

export const loginUser = async (formData) => {
    return axios.post('http://localhost:5000/api/users/login', formData, {
        withCredentials: true
    });
    
};

