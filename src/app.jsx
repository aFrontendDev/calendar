import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch, Route, Link
} from 'react-router-dom';

// Routing
import Routes from './routes.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="wrapper">
        <main className="main" id="main">
          <nav>
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/event/123"}>Event page test</Link>
              </li>
              <li>
                <Link to={"/new-event"}>Create New Event</Link>
              </li>
            </ul>
          </nav>
          <Routes />
        </main>
      </div>
    );
  }
}
