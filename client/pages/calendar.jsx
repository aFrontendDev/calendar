import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import Calendar from '../components/calendar.jsx';

import calendarData from '../dummy-data/calendar-a.json';
// import monthData from '../dummy-data/month-b.json';
import userData from '../dummy-data/user-a.json';

class CalendarPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      month: null,
      selectedMonth: null,
      selectedYear: null
    }

    this.getMonth = this.getMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
  }

  getMonth(month, year) {
    let monthNum, yearNum;

    if (!month || !year) {
      const date = new Date();
      monthNum = date.getMonth();
      monthNum+= 1; // JS month is 0 based
      yearNum = date.getFullYear();
    } else {
      monthNum = month;
      yearNum = year;
    }

    this.setState({
      selectedMonth: monthNum,
      selectedYear: yearNum
    });

    axios
    .get(`http://127.0.0.1:4000/getMonth?month=${monthNum}&year=${yearNum}`)
    .then(res => {
      const data = res.data;
      // console.log(data);

      this.setState({
        month: data
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  prevMonth() {
    let newMonth, newYear;
    const currentMonth = this.state.selectedMonth;
    const currentYear = this.state.selectedYear;

    if (currentMonth === 1) {
      newMonth = 12;
      newYear = currentYear - 1;
    } else {
      newMonth = currentMonth - 1;
      newYear = currentYear;
    }

    this.getMonth(newMonth, newYear);
  }

  nextMonth() {
    let newMonth, newYear;
    const currentMonth = this.state.selectedMonth;
    const currentYear = this.state.selectedYear;

    if (currentMonth === 12) {
      newMonth = 1;
      newYear = currentYear + 1;
    } else {
      newMonth = currentMonth + 1;
      newYear = currentYear;
    }

    this.getMonth(newMonth, newYear);
  }

  componentDidMount() {
    const calId = this.props.match.params.calId;
    this.getMonth();
  }

  render() {
    return (
      <section>
        <h2 className="visually-hidden">Calendar</h2>
        
        {
          this.state.month ?
          <div className="month">
            <div className="month__actions">
              <button className="btn--unstyled month__btn-prev" onClick={this.prevMonth}>
                PREV
              </button>
              <button className="btn--unstyled month__btn-next" onClick={this.nextMonth}>
                NEXT
              </button>
            </div>
            <Calendar calendar={calendarData} month={this.state.month} user={userData} />
          </div>
          : null
        }
      </section>
    )
  }
}

export default CalendarPage;