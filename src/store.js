import { createStore, combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import randyReducer from '../src/reducers/reducer';
import randyFormReducer from '../src/reducers/randyFormReducer';
  
const reducer = combineReducers({ randyReducer, form: form });
 
const store = createStore(reducer);

export default store;