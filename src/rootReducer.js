
import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer/authReducer";
import eventsReducer from "./reducers/eventsReducer/eventsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventsReducer
});

export default rootReducer;