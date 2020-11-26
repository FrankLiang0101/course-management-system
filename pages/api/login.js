import axios from 'axios';

const BASE_URL = '/api/login';

const login = async (email, password, rememberMe, userType) => {
  const loginUrl = `${BASE_URL}/${userType}`;

  const loginResponse = await axios
    .post(loginUrl, {
      email,
      password,
      rememberMe,
    })
    .then((response) => response)
    .catch((error) => error.response);

  return loginResponse;
};

export default login;
