import { LOG_IN, LOG_IN_FAILURE } from '../actionTypes';

const initState = {
  token: '',
  userType: '',
};
const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case LOG_IN: {
      const { token, type } = action.payload?.data;

      return {
        ...state,
        token,
        userType: type,
      };
    }

    case LOG_IN_FAILURE:
      return action.payload;

    default:
      return state;
  }
};
export default loginReducer;
