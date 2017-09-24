// functions
const moment = require('moment');
moment().format();

module.exports = {
  getMonth(year, month) {

    if (!year || !month) {
      return;
    }

    const monthNum = month < 10 ? `0${month}` : month;
    const monthName = moment(`${year}-${monthNum}-01`).format('MMMM');
    let daysInMonth = moment(`${year}-${monthNum}`, 'YYYY-MM').daysInMonth();
    let arrDays = [];
    let firstDay = null;
    let lastDay = null;
    
    for (let i = 1; i < daysInMonth + 1; i++) {
      const dayNum = i < 10 ? `0${i}` : i;

      const current = moment(`${year}-${monthNum}-${dayNum}`);
      const dayName = current.format('dddd');
      const dayOfWeek = current.format('d');
      const dayOfMonth = current.format('D');
      const date = current.format('YYYY-MM-DD');

      if (i === 1) {
        firstDay = dayName;

        if (dayOfWeek > 0) {
          for (let countA = 0; countA < dayOfWeek; countA++) {
            arrDays.push({emptyDay: true});
          }
        }
      }

      const dateObj = {
        dayName,
        dayOfWeek,
        dayOfMonth,
        monthNum,
        year,
        date
      };

      arrDays.push(dateObj);

      if (i === daysInMonth) {
        lastDay = dayName;

        if (dayOfWeek < 6) {
          const difference = 6 - dayOfWeek;

          for (let countB = 0; countB < difference; countB++) {
            arrDays.push({emptyDay: true});
          }
        }
      }
    }

    const monthObj = {
      title: `${monthName} ${year}`,
      firstDay,
      lastDay,
      dates: arrDays
    };

    return monthObj;
  }
};