export const BASE_URL = 'http://180.149.241.208:3022/';

export const API_URL = {
  UPDATE_RATING_API: 'updateProductRatingByCustomer',
  // ADD_TO_CART_API: 'addDataToCart',
  GET_CUST_CART_API: 'getCartData',
  LOGIN_API: 'login',
  REGISTER_API: 'register',
  PRODUCT_DETAILS_API: 'getProductByProdId/',
  PRODUCT_LIST_API: 'commonProducts?category_id=',
  GET_CUST_PROFILE_API: 'getCustProfile',
  EDIT_USER_PROFILE_API: 'profile',
  CHANGE_PASSWORD_API: 'changePassword',
  GET_CUST_ADDRESS_API: 'getCustAddress',
  SAVE_ADDRESS_API: 'address',
  FORGOT_PASS_API: 'forgotPassword',
  SET_PASSWORD_API: 'recoverPassword',
  GET_ORDER_DETAILS_API: 'getOrderDetails',
  GET_PRODUCT_BY_SEARCH_API: 'getProductBySearchText/',
  ADD_PRODUCT_CHECKOUT_API: 'addProductToCartCheckout',
  UPDATE_ADDRESS_API: 'updateAddress',
  REMOVE_ADDRESS_API: 'deladdress/',
};

export const buildHeader = (headerParams = {}) => {
  let header = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cache-Control': 'no-cache',
  };
  Object.assign(header, headerParams);
  return header;
};

function getRequestData(data) {
  let formBody = [];
  let encodedKey;
  let encodedValue;
  for (let property in data) {
    encodedKey = property;
    encodedValue = data[property];
    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&');
}

export const request = async (
  onResponse,
  data,
  type,
  featureURL,
  secureRequest = buildHeader(),
) => {
  console.log({onResponse});
  console.log({data});
  console.log({type});
  console.log({featureURL});
  console.log({secureRequest});

  let response = '';
  try {
    if (type === 'GET') {
      response = await fetch(BASE_URL + featureURL, {
        method: type,
        headers: secureRequest,
      });
      var responseJSON = await response.json();
    } else {
      response = await fetch(BASE_URL + featureURL, {
        method: type,
        headers: secureRequest,
        body: getRequestData(data),
      });
      var responseJSON = await response.json();
    }
    console.log({responseJSON});

    if (responseJSON.status_code === 200 || responseJSON.success === true) {
      onResponse.success(responseJSON);
    } else onResponse.error(responseJSON);
  } catch (error) {
    error = 'Network Error: please check your internet connection';
    onResponse.error(error);
  }
};

export const apiii = {
  fetchapi: function(url, type, data, token) {
    if (type === 'post' || type === 'put') {
      return fetch(url, {
        method: type,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? 'Bearer ' + token : null,
        },
        body: data,
      });
    } else {
      return fetch(url, {
        method: type,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? 'Bearer ' + token : null,
        },
      });
    }
  },
};
