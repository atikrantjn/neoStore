import {createStore, applyMiddleware, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';

import AddressListReducer from '../redux/reducers/addressListReducer';
const logger = createLogger({
  predicate: (getState, action) => true,
});

export default (initialState = {}) =>
  createStore(
    combineReducers({
      addressList: AddressListReducer,
    }),
    initialState,
    applyMiddleware(logger),
  );
