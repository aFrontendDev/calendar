import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import * as eventActions from "../../actions/events/eventActions";

class EventList extends Component {

  constructor(props) {
    super(props);

    this.getEventsData = this.getEventsData.bind(this)
  }

  componentDidMount() {
    this.getEventsData();
  }

  getEventsData() {
    const loggedinToken = window.localStorage.getItem('site_loggedin');
    this.props.getEvents(loggedinToken);
  }

  render() {

    return (
      <section>
        <header>
          <h2>
            Your Events
          </h2>
        </header>

        <div>
          {
            this.props.eventsData && this.props.eventsData.eventsAdmin ?
            <ul>
              {
                this.props.eventsData.eventsAdmin.map((event, index) => {

                  return(
                    <li key={`eventsAdmin_${index}`}>
                      <Link to={`/event/${event.id}`}>{event.name}</Link>
                    </li>
                  )
                })
              }
            </ul>
            : null
          }

          {
            this.props.eventsData && this.props.eventsData.events ?
            <ul>
              {
                this.props.eventsData.events.map((event, index) => {

                  return(
                    <li key={`events_${index}`}>
                      <a href={`/event/${event.id}`}>event.name</a>
                    </li>
                  )
                })
              }
            </ul>
            : null
          }
        </div>

      </section>
    );
  }
}

const mapStateToProps = state => {

  return {
    eventsData: state.events && state.events.eventsData ? state.events.eventsData : null
  };
};

const mapDispatchToProps = {
  getEvents: eventActions.getUserEventsRequest
};


export default connect(mapStateToProps, mapDispatchToProps)(EventList);
