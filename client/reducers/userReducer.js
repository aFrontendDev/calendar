import { actionTypes } from '../actions/actionTypes';
import { store } from '../index.js';


export function userDetail(state = {}, action) {
  switch(action.type) {

    case 'GET_USER_SUCCESS':
      console.log('success - action.user');
      console.log(action.user);
      return action.user;

      default:
        return state;
  }
}

// export function userEmpty(state = false, action) {
//   switch(action.type) {

//     case 'GET_USER_EMPTY':
//       return action.user;

//       default:
//         return state;
//   }
// }


export function userError(state = false, action) {
  switch(action.type) {

    case 'GET_USER_ERROR':
      return action.getUserError;

      default:
        return state;
  }
}

export function signinError(state = false, action) {
  switch(action.type) {

    case 'SIGNIN_USER_ERROR':
      return action.signinUserError;

      default:
        return state;
  }
}

export function signinSuccess(state = false, action) {
  switch(action.type) {

    case 'SIGNIN_USER_SUCCESS':
      return action.signinUserSuccess;

      default:
        return state;
  }
}

export function signoutError(state = false, action) {
  switch(action.type) {

    case 'SIGNOUT_USER_ERROR':
      return action.signoutUserError;

      default:
        return state;
  }
}

export function signoutSuccess(state = false, action) {
  switch(action.type) {

    case 'SIGNOUT_USER_SUCCESS':
      return action.signoutUserSuccess;

      default:
        return state;
  }
}

