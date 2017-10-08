import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import calendarReducer from './calendarReducer';
// import calendarSetDate from './calendarSetDate';

const rootReducer = combineReducers({
  menuIsIn: menuReducer,
  date: calendarReducer,
});

export default rootReducer;