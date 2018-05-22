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
                <Link to={"/dogs"}>Dogs</Link>
              </li>
              <li>
                <Link to={"/dynamic/123"}>Dynamic page test</Link>
              </li>
            </ul>
          </nav>
          <Routes />
        </main>
      </div>
    );
  }
}
