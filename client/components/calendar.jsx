import React from 'react';
import PropTypes from 'prop-types';

class Calendar extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const calendar = this.props.calendar;
    const month = this.props.month;
    const dayKey = {
      "Monday": 0,
      "Tuesday": 1,
      "Wednesday": 2,
      "Thursday": 3,
      "Friday": 4,
      "Saturday": 5,
      "Sunday": 6
    };

    let emptyDays = [];
    for (let i = 0; i < dayKey[month.firstDay]; i++) {
      emptyDays.push(i);
    }

    const remainingEmptyDays = 6 - dayKey[month.lastDay];
    let remainingEmptyDaysArray = [];
    for (let i = 0; i < remainingEmptyDays; i++) {
      remainingEmptyDaysArray.push(i);
    }

    const totalMembers = calendar.totalMembers;

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
                        emptyDays.map((item, index) => {
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
                          const allAddedClass = item.noSelected === totalMembers ? ' day--all-added ' : '';
                          const atLeaseOneClass = item.noSelected > 0 ? ' day--added ' : '';
                          return(
                            <div key={index} className={"day " + allAddedClass + atLeaseOneClass} role="gridcell">
                              <span className="day__number">{item.dateDay}</span>
                              <button className="btn--unstyled day__btn">+</button>
                            </div>
                          )
                        })
                      }

                      {
                        item.lastWeek ?
                        remainingEmptyDaysArray.map((item, index) => {
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
  }
}

Calendar.propTypes = {
  calendar: React.PropTypes.object.isRequired,
  month: React.PropTypes.object.isRequired
};

export default Calendar;