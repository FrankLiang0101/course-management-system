import { LOG_IN, LOG_IN_FAILURE } from '../actionTypes';
import loginApiCall from '../../pages/api/login';

const Login = (email, password, rememberMe, userType) => async (dispatch) => {
  const res = await loginApiCall(email, password, rememberMe, userType)
    .then((response) => dispatch({ type: LOG_IN, payload: response }))
    .catch((error) => dispatch({ type: LOG_IN_FAILURE, payload: error }));

  return res.payload;
};

export default Login;
