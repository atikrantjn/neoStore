import APP_CONSTANTS from '../../utils/contants';

const {reduxConst} = APP_CONSTANTS;

const setOrderListData = data => {
  return {
    type: reduxConst.SET_ORDERLIST_DATA,
    data,
  };
};
export default setOrderListData;
