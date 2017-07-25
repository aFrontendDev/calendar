import React from 'react';
import PropTypes from 'prop-types';

class Calendar extends React.Component {
  componentDidMount() {
    const calId = this.props.match.params.calId;
    console.log('calId: ' + calId);
  }

  render() {
    return (
      <section>
        <h2>Calendar</h2>
      </section>
    )
  }
}

export default Calendar;