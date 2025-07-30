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

export const logoutUser = async () => {
    const response = await axios.post('http://localhost:5000/api/users/logout', {}, {
        withCredentials: true
    });
    console.log('Logout response:', response.data);
    console.log('Clearing local storage and redirecting...');
    // Clear local storage
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    

    
    // Redirect to login
    window.location.href = '/login';
    
};

