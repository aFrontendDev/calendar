import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import * as authActions from "../../actions/auth/authActions";

class EventList extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  static getDerivedStateFromProps(props, state) {
    return props;
  }

  componentDidUpdate() {

    if (this.props.loggedin && this.props.username && !this.props.user) {
      const loggedinToken = window.localStorage.getItem('site_loggedin');

      if (loggedinToken) {
        this.props.getUser(this.props.username, loggedinToken);
      }
    }
  }

  render() {

    if (!this.props.loggedin) {
      return null;
    }

    return (
      <section>
        <header>
          <h2>
            Your Events
          </h2>
        </header>

        <div>
          {
            this.props.user && this.props.user.eventsAdmin ?
            <ul>
              {
                this.props.user.eventsAdmin.map((event, index) => {

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
            this.props.user && this.props.user.events ?
            <ul>
              {
                this.props.user.events.map((event, index) => {

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
    user: state.auth.user,
    username: state.auth.username,
    loggedin: state.auth.loggedin
  };
};

const mapDispatchToProps = {
  getUser: authActions.getUserRequest
};


export default connect(mapStateToProps, mapDispatchToProps)(EventList);
