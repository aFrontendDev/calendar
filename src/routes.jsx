import React from 'react';
import {
  Switch, Route
} from 'react-router-dom';

// Pages
import DynamicPage from './pages/dynamic/index.jsx';
import Home from './pages/home/index.jsx';

class Routes extends React.Component {
  render() {

    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dynamic/:anId" component={DynamicPage} />
        <Route component={Home} />
      </Switch>
    )
  }
}

export default Routes;