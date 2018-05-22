import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from "../../actions/auth/authActions";

// reducer with initial state
const initialState = {
  fetching: false,
  auth: null,
  error: null
};

const authReducer = (state = initialState, action) => {
  const {type, auth, error} = action;

  switch (type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        registering: true,
        error: null
      };
      break;
    case REGISTER_SUCCESS:
      return {
        ...state,
        registering: false,
        auth
      };
      break;
    case REGISTER_FAILURE:
      return {
        ...state,
        registering: false,
        auth: null,
        error
      };
      break;
    default:
      return state;
  }
};

export default authReducer;