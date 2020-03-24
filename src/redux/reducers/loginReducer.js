import APP_CONSTANTS from '../../utils/contants';

const {reduxConst} = APP_CONSTANTS;
export default (state = {}, action = {}) => {
  switch (action.type) {
    case reduxConst.SET_LOGIN_DATA:
      return action.loginData;
    default:
      return state;
  }
};
