import { combineReducers } from "redux";
import dogReducer from "./reducers/dogReducer/getDogReducer";

const rootReducer = combineReducers({
  dog: dogReducer
});

export default rootReducer;