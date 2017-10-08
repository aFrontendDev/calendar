import { actionTypes } from '../actions/actionTypes';

export default function calendarSetDate(state = {}, action) {
  // console.log('set date');
  let monthNum, yearNum;
  const date = new Date();

  monthNum = date.getMonth();
  monthNum+= 1; // JS month is 0 based
  yearNum = date.getFullYear();

  const newDate = {currentMonth:monthNum, currentYear:yearNum};
  // console.log(newDate);

  return newDate;
}