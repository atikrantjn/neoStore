import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import {createLogger} from 'redux-logger';
import loginReducer from '../redux/reducers/loginReducer';
const logger = createLogger({
  predicate: (getState, action) => _DEV_,
});

export default (
  initialState = {
    loginReducer,
  },
) => createStore(combineReducers({}), initialState, applyMiddleware(logger));
