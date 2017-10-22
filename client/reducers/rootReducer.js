import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import calendarReducer from './calendarReducer';
// import calendarSetDate from './calendarSetDate';
import { userDetail, userError, userEmpty} from './userReducer';

const rootReducer = combineReducers({
  menuIsIn: menuReducer,
  date: calendarReducer,
  user: userDetail,
  userEmpty,
  userError
});

export default rootReducer;