import { actionTypes } from '../actions/actionTypes';


export default function calendarReducer(state = {}, action) {
  let newMonth, newYear, newDate;

  switch(action.type) {

    case 'NEXT_MONTH':
      if (action.date.currentMonth === 12) {
        newMonth = 1;
        newYear = action.date.currentYear + 1;
      } else {
        newMonth = action.date.currentMonth + 1;
        newYear = action.date.currentYear;
      }

      newDate = {currentMonth:newMonth, currentYear:newYear};
      return newDate;

    case 'PREV_MONTH':
      if (action.date.currentMonth === 1) {
        newMonth = 12;
        newYear = action.date.currentYear - 1;
      } else {
        newMonth = action.date.currentMonth - 1;
        newYear = action.date.currentYear;
      }

      newDate = {currentMonth:newMonth, currentYear:newYear};
      return newDate;

    case 'SET_DATE':
      return setDate();

    default:
      return setDate();
  }

  return setDate();
}

const setDate = function () {
  let date, monthNum, yearNum, newDate;
  date = new Date();

  monthNum = date.getMonth();
  monthNum+= 1; // JS month is 0 based
  yearNum = date.getFullYear();

  newDate = {currentMonth:monthNum, currentYear:yearNum};

  return newDate;
}