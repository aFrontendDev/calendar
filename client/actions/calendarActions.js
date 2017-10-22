import { actionTypes } from './actionTypes';


export function calendarNextAction(date) {
  return {
    type: actionTypes.calendarNext,
    date
  };
}

export function calendarPrevAction(date) {
  return {
    type: actionTypes.calendarPrev,
    date
  };
}

export function calendarSetDate(date) {
  return {
    type: "SET_DATE",
    date
  };
}
