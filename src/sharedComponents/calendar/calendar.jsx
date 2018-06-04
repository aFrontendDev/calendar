import React, { Component } from "react";

import * as dateFunctions from "../../utility/dates";

class Calendar extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      month: null,
      selectedMonth: null,
      selectedYear: null,
      dayKey: {
        "Sunday": 0,
        "Monday": 1,
        "Tuesday": 2,
        "Wednesday": 3,
        "Thursday": 4,
        "Friday": 5,
        "Saturday": 6
      },
      selectedDate: null
    }

    this.getMonthData = this.getMonthData.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.getCurrentDate = this.getCurrentDate.bind(this);
    this.setMonthData = this.setMonthData.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
  }

  getCurrentDate() {
    const currentDate = dateFunctions.getCurrentDate();
    const month = currentDate.currentMonth;
    const year = currentDate.currentYear;

    return {month, year};
  }

  setMonthData(month, year) {
    if (!month || !year) {
      return;
    }

    const monthObj = this.getMonthData(month, year);

    this.setState({
      selectedMonth: month,
      selectedYear: year,
      month: monthObj
    });
  }

  getMonthData(month, year) {
    if (!month || !year) {
      return;
    }

    const monthObj = dateFunctions.getMonthData(year, month);
    return monthObj;
  }

  nextMonth(month, year) {
    let newMonth, newYear;

    if (!month || !year) {
      return;
    }

    if (month === 12) {
      newMonth = 1;
      newYear = year + 1;
    } else {
      newMonth = month + 1;
      newYear = year;
    }

    const newDate = {month:newMonth, year:newYear};
    return newDate;
  }

  prevMonth(month, year) {
    let newMonth, newYear;

    if (!month || !year) {
      return;
    }

    if (month === 1) {
      newMonth = 12;
      newYear = year - 1;
    } else {
      newMonth = month - 1;
      newYear = year;
    }

    const newDate = {month:newMonth, year:newYear};
    return newDate;
  }

  handleMonthChange(prev) {
    const month = this.state.selectedMonth;
    const year = this.state.selectedYear;

    if (!month || !year) {
      return;
    }

    const newMonth = prev ? this.prevMonth(month, year) : this.nextMonth(month, year);
    this.setMonthData(newMonth.month, newMonth.year);
  }

  componentWillMount() {
    const currentMonth = this.getCurrentDate();
    this.setMonthData(currentMonth.month, currentMonth.year);
  }

  handleDayClick(date) {
    this.props.onDayClick(date);
  }

  render() {
    if (this.state.month !== null) {
      const month = this.state.month;

      return (
        <section className="calendar" aria-label="calendar">
          <header className="calendar__header">
            <h2 className="calendar__title">{month.title}</h2>
          </header>
          <div className="calendar__body">
            <div className="calendar__actions">
              <button className="btn--unstyled month__btn-prev" onClick={() => this.handleMonthChange(true)}>
                PREV
              </button>
              <button className="btn--unstyled month__btn-next" onClick={() => this.handleMonthChange()}>
                NEXT
              </button>
            </div>

            <article className="month" aria-label="month">
              <div className="month__body" role="grid">
                <div className="days-heading" role="row">
                  <abbr className="day-header" title="Sunday" role="columnheader">Sun</abbr>
                  <abbr className="day-header" title="Monday" role="columnheader">Mon</abbr>
                  <abbr className="day-header" title="Tuesday" role="columnheader">Tue</abbr>
                  <abbr className="day-header" title="Wednesday" role="columnheader">Wed</abbr>
                  <abbr className="day-header" title="Thursday" role="columnheader">Thu</abbr>
                  <abbr className="day-header" title="Friday" role="columnheader">Fri</abbr>
                  <abbr className="day-header" title="Saturday" role="columnheader">Sat</abbr>
                </div>
                <div className="dates" role="row">
                {
                  month.dates.map((item, index) => {
                    const isEmpty = item.emptyDay || false;
                    const date = isEmpty ? null : item.date;

                    return(
                      <div data-cal-date={date} key={`month-data_${index}`} className={"day"} role="gridcell">
                      {
                        isEmpty ?
                          null
                        :
                          <div className="day__inner">
                            <span className="day__number">{item.dayOfMonth}</span>
                            <button className="btn--unstyled day__btn" onClick={() => this.handleDayClick(date)}>
                            </button>
                          </div>
                      }
                      </div>

                    )
                  })
                }
                </div>
              </div>
            </article>
          </div>

        </section>
      )
    } else {
      return null;
    }
  }
}


export default Calendar;
