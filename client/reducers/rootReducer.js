import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import calendarReducer from './calendarReducer';
import { userDetail, userError, signinSuccess, signinError, signoutSuccess, signoutError} from './userReducer';


const appReducer = combineReducers({
  menuIsIn: menuReducer,
  date: calendarReducer,
  user: userDetail,
  userError,
  signinSuccess,
  signinError,
  signoutSuccess,
  signoutError
});

const rootReducer = (state, action) => {
  if (action.type === 'GET_USER_EMPTY') {
    state = undefined;
  }

  return appReducer(state, action)
}

export default rootReducer;