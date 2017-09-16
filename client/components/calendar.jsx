import React from 'react';
import PropTypes from 'prop-types';

class Calendar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      month: null,
      calendar: null,
      user: null,
      userCalendar: null,
      emptyDays: null,
      remainingEmptyDaysArray: null,
      dayKey: {
        "Monday": 0,
        "Tuesday": 1,
        "Wednesday": 2,
        "Thursday": 3,
        "Friday": 4,
        "Saturday": 5,
        "Sunday": 6
      }
    }

    this.setData = this.setData.bind(this);
    this.setEmptyDays = this.setEmptyDays.bind(this);
    this.setRemainingEmptyDays = this.setRemainingEmptyDays.bind(this);
    this.hasBeenAdded = this.hasBeenAdded.bind(this);
    this.setUserCalendar = this.setUserCalendar.bind(this);
  }


  setData() {
    this.setState({
      calendar: this.props.calendar,
      month: this.props.month,
      user: this.props.user
    }, () => {
      this.setUserCalendar();
      this.setEmptyDays();
      this.setRemainingEmptyDays();
    });
  }

  setEmptyDays() {
    const dayKey = this.state.dayKey;
    let emptyDays = [];
    for (let i = 0; i < dayKey[this.state.month.firstDay]; i++) {
      emptyDays.push(i);
    }

    this.setState({
      emptyDays: emptyDays
    });
  }

  setRemainingEmptyDays() {
    const remainingEmptyDays = 6 - this.state.dayKey[this.state.month.lastDay];
    let remainingEmptyDaysArray = [];
    for (let i = 0; i < remainingEmptyDays; i++) {
      remainingEmptyDaysArray.push(i);
    }

    this.setState({
      remainingEmptyDaysArray: remainingEmptyDaysArray
    });
  }

  setUserCalendar() {
    const calId = this.state.calendar.id;

    for (const calendar of this.state.user.calendars) {
      if (calendar.id === calId) {
        this.setState({
          userCalendar: calendar
        });
      }
    }
  }

  hasBeenAdded(day) {
    if (!day) {
      return;
    }

    for (const date of this.state.calendar.dates) {
      if (day.date === date.date) {
        return date;
      }
    }
  }

  componentWillMount() {
    this.setData();
  }

  render() {

    if (this.state.month !== null && this.state.calendar !== null) {

      if (this.state.emptyDays !== null && this.state.remainingEmptyDays !== null) {

        const calendar = this.state.calendar;
        const month = this.state.month;
        const emptyDays = this.state.emptyDays;
        const remainingEmptyDays = this.state.remainingEmptyDays;
        const totalMembers = this.state.calendar.totalMembers;

        return (
          <section className="calendar" aria-label="calendar">
            <header className="calendar__header">
              <h2 className="calendar__title">{calendar.title}</h2>
              <button className="btn--unstyled calendar__btn-prev">
                PREV
              </button>
              <button className="btn--unstyled calendar__btn-next">
                NEXT
              </button>
            </header>
            <div className="calendar__body">
              <article className="month" aria-label="month">
                <header className="month__header">
                  <h3 className="month__title">{month.title}</h3>
                </header>
                <div className="month__body" role="grid">
                  <div className="days-heading" role="row">
                    <abbr className="day-header" title="Monday" role="columnheader">Mon</abbr>
                    <abbr className="day-header" title="Tuesday" role="columnheader">Tue</abbr>
                    <abbr className="day-header" title="Wednesday" role="columnheader">Wed</abbr>
                    <abbr className="day-header" title="Thursday" role="columnheader">Thu</abbr>
                    <abbr className="day-header" title="Friday" role="columnheader">Fri</abbr>
                    <abbr className="day-header" title="Saturday" role="columnheader">Sat</abbr>
                    <abbr className="day-header" title="Sunday" role="columnheader">Sun</abbr>
                  </div>
                  {
                    month.weeks.map((item, index) => {
                      return(
                        <div key={index} className="week" role="row">

                          {
                            item.firstWeek ?
                            this.state.emptyDays.map((item, index) => {
                              return(
                                <div key={index} className="day" role="gridcell">
                                  <span className="visually-hidden">Empty Cell</span>
                                </div>
                              )
                            })
                            : null
                          }

                          {
                            item.days.map((item, index) => {
                              const matchedDate = this.hasBeenAdded(item) || false;
                              let allAddedClass = '';
                              let atLeaseOneClass = '';
                              let numberAdded = null;
                              const userHasAdded = this.state.userCalendar.datesSelected.includes(item.date);

                              if (matchedDate) {
                                allAddedClass = matchedDate.numberSelected === totalMembers ? ' day--all-added ' : '';
                                atLeaseOneClass = ' day--added ';
                                numberAdded = matchedDate.numberSelected;
                              }

                              return(
                                <div data-cal-date={item.date} key={index} className={"day " + allAddedClass + atLeaseOneClass} role="gridcell">
                                  <span className="day__number">{item.dateDay}</span>
                                  {numberAdded ? <span className="day__amount-selected">{numberAdded}</span> : null}
                                  <button className="btn--unstyled day__btn">
                                  {userHasAdded ? '-' : '+'}
                                  </button>
                                </div>
                              )
                            })
                          }

                          {
                            item.lastWeek ?
                            this.state.remainingEmptyDaysArray.map((item, index) => {
                              return(
                                <div key={index} className="day" role="gridcell">
                                  <span className="visually-hidden">Empty Cell</span>
                                </div>
                              )
                            })
                            : null
                          }
                        </div>
                      )
                    })
                  }
                </div>
              </article>
            </div>
          </section>
        )
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}

Calendar.propTypes = {
  calendar: React.PropTypes.object.isRequired,
  month: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired
};

export default Calendar;