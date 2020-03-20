export const BASE_URL = 'http://180.149.241.208:3022/';

export const API_URL = {
  UPDATE_RATING_API: 'updateProductRatingByCustomer',
  ADD_TO_CART_API: 'addDataToCart',
  GET_CUST_CART_API: 'getCustCartData',
};

export const buildHeader = (headerParams = {}) => {
  let header = {
    'Content-Type': 'application/x-www-form-urlencoded',
    //'Content-Type': 'application/json',
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

    if (responseJSON.status_code === 200) onResponse.success(responseJSON);
    else onResponse.error(responseJSON.description);
  } catch (error) {
    error = 'Network Error: please check your internet connection';
    onResponse.error(error);
  }
};
