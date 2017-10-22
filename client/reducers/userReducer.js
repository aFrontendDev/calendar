import { actionTypes } from '../actions/actionTypes';
import { store } from '../index.js';


export function userEmpty(state = false, action) {
  switch(action.type) {

    case 'GET_USER_EMPTY':
      return action.getUserEmpty;

      default:
        return state;
  }
}


export function userError(state = false, action) {
  switch(action.type) {

    case 'GET_USER_ERROR':
      return action.getUserError;

      default:
        return state;
  }
}


export function userDetail(state = {}, action) {
  switch(action.type) {

    case 'GET_USER_SUCCESS':
      return action.user;

      default:
        return state;
  }
}
