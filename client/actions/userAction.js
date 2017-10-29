import axios from 'axios';

export function getCurrentUserSuccess(user) {
  return {
    type: "GET_USER_SUCCESS",
    user
  };
}

export function getCurrentUserEmpty(bool) {
  return {
    type: "GET_USER_EMPTY",
    getUserEmpty: bool
  };
}

export function getCurrentUserError(bool) {
  return {
    type: "GET_USER_ERROR",
    getUserError: bool
  };
}

export function signInUserError(bool) {
  return {
    type: "SIGNIN_USER_ERROR",
    signinUserError: bool
  }
}

export function signInUserSuccess(bool) {
  return {
    type: "SIGNIN_USER_SUCCESS",
    signinUserSuccess: bool
  }
}

export function signOutUserSuccess(bool) {
  return {
    type: "SIGNOUT_USER_SUCCESS",
    signoutUserSuccess: bool
  }
}

export function signOutUserError(bool) {
  return {
    type: "SIGNOUT_USER_ERROR",
    signoutUserError: bool
  }
}


export function getUserData() {
  return (dispatch) => {

    axios
      .get(`http://127.0.0.1:4000/currentUser`)
      .then(res => {
        console.log('get user data response');
        console.log(res);
        const user = res.data;

        if (user) {
          console.log('get user - has user');
          console.log(user);
          dispatch(getCurrentUserSuccess(user));
        } else {
          console.log('get user - no user');
          dispatch(getCurrentUserEmpty(true));
        }
      })
      .catch((error) => {
        console.log('userReducer error');
        console.log(error);
        dispatch(getCurrentUserError(true));
      });
  };
}

export function signOutUser() {
  return (dispatch) => {

    axios
      .get(`http://127.0.0.1:4000/signout`)
      .then(res => {
        console.log('user action response');
        console.log(res);
        dispatch(signOutUserSuccess(true));
      })
      .catch((error) => {
        console.log('userReducer error');
        console.log(error);
        dispatch(signOutUserError(true));
      });
  };
}

export function signInUser(email, password) {
  return (dispatch) => {

    axios
      .post(`http://127.0.0.1:4000/signin`, {
        "email": email,
        "password": password
      })
      .then(res => {
        console.log('user action response');
        console.log(res);
        dispatch(signInUserSuccess(true));
      })
      .catch((error) => {
        console.log('userReducer error');
        console.log(error);
        dispatch(signInUserError(true));
      });
  };
}