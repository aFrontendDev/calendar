import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer/authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  usernameAvailable: authReducer
});

export default rootReducer;