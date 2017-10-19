import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import Calendar from '../components/calendar.jsx';

import calendarData from '../dummy-data/calendar-a.json';
import userData from '../dummy-data/user-a.json';

class CalendarPage extends React.Component {

  constructor(props) {
    super(props);
  }


  componentDidMount() {
    const calId = this.props.match.params.calId;
  }

  render() {
    return (
      <section>
        <h2 className="visually-hidden">Calendar</h2>
        <div className="month">
          <Calendar calendar={calendarData} user={userData} date={this.props.date} calPrevAction={this.props.calPrevAction} calNextAction={this.props.calNextAction} />
        </div>
      </section>
    )
  }
}

CalendarPage.propTypes = {
  calNextAction: PropTypes.func.isRequired,
  calPrevAction: PropTypes.func.isRequired,
  date: PropTypes.object
};

export default CalendarPage;