export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const register = (username, password, email) => ({
  type: REGISTER_REQUEST,
  payload: {
    username,
    password,
    email
  }
});

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const registerSuccess = ({auth}) => ({
  type: REGISTER_SUCCESS,
  auth
});

export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const registerFailure = ({error}) => ({
  type: REGISTER_FAILURE,
  error
});


export const USERNAME_REQUEST = "USERNAME_REQUEST";
export const checkUsername = username => ({
  type: USERNAME_REQUEST,
  payload: {
    username
  }
});

export const USERNAME_SUCCESS = "USERNAME_SUCCESS";
export const checkUsernameSuccess = ({usernameAvailable}) => ({
  type: USERNAME_SUCCESS,
  usernameAvailable
});

export const USERNAME_FAILURE = "USERNAME_FAILURE";
export const checkUsernameFailure = ({checkUsernameError}) => ({
  type: USERNAME_FAILURE,
  checkUsernameError
});