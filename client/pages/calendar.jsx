import React from 'react';
import PropTypes from 'prop-types';

import Calendar from '../components/calendar.jsx';

import calendarData from '../dummy-data/calendar-a.json';
import monthData from '../dummy-data/month-a.json';
import userData from '../dummy-data/user-a.json';

class CalendarPage extends React.Component {
  
  componentDidMount() {
    const calId = this.props.match.params.calId;
    console.log('calId: ' + calId);
  }

  render() {
    return (
      <section>
        <h2>Calendar</h2>
        <Calendar calendar={calendarData} month={monthData} user={userData} />
      </section>
    )
  }
}

export default CalendarPage;