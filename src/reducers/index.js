/** @format */

import counterReducer from './counter';
import hostReducer from './hostReducer';
import createTestReducer from './createTestReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  counter: counterReducer,
  host: hostReducer,
  createTest: createTestReducer
});

export default rootReducer;
