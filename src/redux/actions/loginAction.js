import APP_CONSTANTS from '../../utils/contants';

const {reduxConst} = APP_CONSTANTS;

const setLoginData = (dispatch, loginData) => {
  return dispatch({
    type: reduxConst.SET_LOGIN_DATA,
    loginData,
  });
};
export {setLoginData};
