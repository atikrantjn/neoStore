import APP_CONSTANTS from '../../utils/contants';

const INITIAL_STATE = {
  loaded: false,
  data: [],
};

const {reduxConst} = APP_CONSTANTS;
const AddressListReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case reduxConst.SET_ADDRESSLIST_DATA:
      console.log(action.data, 'data');
      return {
        loaded: true,
        data: action.data,
      };

    default:
      return state;
  }
};

export default AddressListReducer;
