import APP_CONSTANTS from '../../utils/contants';

const {reduxConst} = APP_CONSTANTS;

const setAddressListData = data => {
  return {
    type: reduxConst.SET_ADDRESSLIST_DATA,
    data,
  };
};
export default setAddressListData;
