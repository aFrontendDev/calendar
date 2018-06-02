import React from 'react';
import {
  Switch, Route
} from 'react-router-dom';

// Pages
import Event from './pages/event/index.jsx';
import EventNew from './pages/event/new.jsx';
import Home from './pages/home/index.jsx';

class Routes extends React.Component {
  render() {

    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/event/:eventId" component={Event} />
        <Route exact path="/new-event" component={EventNew} />
        <Route component={Home} />
      </Switch>
    )
  }
}

export default Routes;