import { combineReducers } from 'redux';
import menuReducer from './menuReducer';

const rootReducer = combineReducers({
  menuIsIn: menuReducer,
});

export default rootReducer;