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


export function getUserData() {
  return (dispatch) => {

    axios
      .get(`http://127.0.0.1:4000/currentUser`)
      .then(res => {
        console.log('user action response');
        console.log(res);
        const user = res.data;

        if (user) {
          dispatch(getCurrentUserSuccess(user));
        } else {
          dispatch(getCurrentUserEmpty(true));
        }
      })
      .catch((error) => {
        console.log('userReducer error');
        console.log(error);
        dispatch(getCurrentUserError(true))
      });
  };
}