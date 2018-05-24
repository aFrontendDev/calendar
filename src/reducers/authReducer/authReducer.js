import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USERNAME_REQUEST,
  USERNAME_SUCCESS,
  USERNAME_FAILURE,
  ISLOGGEDIN_REQUEST,
  ISLOGGEDIN_SUCCESS,
  ISLOGGEDIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../../actions/auth/authActions";

// reducer with initial state
const initialState = {
  fetching: false,
  auth: null,
  error: null,
  usernameAvailable: null,
  checkUsernameError: null,
  loggedin: null,
  loggedinError: null,
  username: null
};

const authReducer = (state = initialState, action) => {
  const {type, auth, error, usernameAvailable, checkUsernameError, loggedin, loggedinError, username} = action;

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
        auth,
        loggedin,
        username
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
    case ISLOGGEDIN_REQUEST:
      return {
        ...state,
        checkingLoggedin: true,
        loggedinError: null
      };
      break;
    case ISLOGGEDIN_SUCCESS:
      return {
        ...state,
        checkingLoggedin: false,
        loggedin,
        username
      };
      break;
    case ISLOGGEDIN_FAILURE:
      return {
        ...state,
        checkingLoggedin: false,
        loggedinError
      };
      break;
    case LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        error: null
      };
      break;
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        auth,
        username,
        loggedin: true
      };
      break;
    case LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        auth: null,
        error
      };
      break;

    default:
      return state;
  }
};

export default authReducer;