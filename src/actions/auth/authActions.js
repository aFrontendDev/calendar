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
export const registerSuccess = ({auth, username}) => ({
  type: REGISTER_SUCCESS,
  auth,
  username,
  loggedin: true
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



export const ISLOGGEDIN_REQUEST = "ISLOGGEDIN_REQUEST";
export const checkLoggedin = token => ({
  type: ISLOGGEDIN_REQUEST,
  payload: {
    token
  }
});

export const ISLOGGEDIN_SUCCESS = "ISLOGGEDIN_SUCCESS";
export const checkLoggedinSuccess = ({isLoggedin, username}) => ({
  type: ISLOGGEDIN_SUCCESS,
  loggedin: isLoggedin,
  username
});

export const ISLOGGEDIN_FAILURE = "ISLOGGEDIN_FAILURE";
export const checkLoggedinFailure = ({loggedinError}) => ({
  type: ISLOGGEDIN_FAILURE,
  loggedinError
});



export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const login = (username, password) => ({
  type: LOGIN_REQUEST,
  payload: {
    username,
    password
  }
});

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const loginSuccess = ({auth, username}) => ({
  type: LOGIN_SUCCESS,
  auth,
  username,
  loggedin: true
});

export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const loginFailure = ({error}) => ({
  type: LOGIN_FAILURE,
  error
});


export const LOGOUT = "LOGOUT";
export const logout = () => ({
  type: LOGOUT,
  auth: null,
  username: null,
  loggedin: false
});

export const GETUSER_REQUEST = "GETUSER_REQUEST";
export const getUserRequest = (username, token) => ({
  type: GETUSER_REQUEST,
  payload: {
    username,
    token
  }
});

export const GETUSER_SUCCESS = "GETUSER_SUCCESS";
export const getUserSuccess = user => ({
  type: GETUSER_SUCCESS,
  user
});

export const GETUSER_FAILURE = "GETUSER_FAILURE";
export const getUserFailure = error => ({
  type: GETUSER_FAILURE,
  error
});