import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const register = async (email, password) => {
  return await axios.post(API_URL + '/users/register', {
    email,
    password,
  });
};

const login = async (email, password) => {
  return await axios
    .post(API_URL + '/users/login', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

export default {
  register,
  login,
  logout,
};
