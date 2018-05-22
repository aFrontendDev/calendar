export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const register = (username, password) => ({
  type: REGISTER_REQUEST,
  payload: {
    username,
    password
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
