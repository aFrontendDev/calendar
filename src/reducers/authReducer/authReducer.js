import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USERNAME_REQUEST,
  USERNAME_SUCCESS,
  USERNAME_FAILURE
  
} from "../../actions/auth/authActions";

// reducer with initial state
const initialState = {
  fetching: false,
  auth: null,
  error: null,
  usernameAvailable: null,
  checkUsernameError: null
};

const authReducer = (state = initialState, action) => {
  const {type, auth, error, usernameAvailable, checkUsernameError} = action;

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
    case USERNAME_REQUEST:
      return {
        ...state,
        checkingUsername: true,
        checkUsernameError: null
      };
      break;
    case USERNAME_SUCCESS:
      return {
        ...state,
        checkingUsername: false,
        usernameAvailable
      };
      break;
    case USERNAME_FAILURE:
      return {
        ...state,
        checkingUsername: false,
        checkUsernameError
      };
      break;
    default:
      return state;
  }
};

export default authReducer;