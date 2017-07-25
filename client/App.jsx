import React from 'react';
import {
  Switch, Route
} from 'react-router-dom';

// header and footer to be included on every page
import Header from './components/_header/header.jsx';
import Footer from './components/_footer/footer.jsx';

// Pages
import Home from './pages/home';
import User from './pages/user';
import Calendar from './pages/calendar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.menuClick = this.menuClick.bind(this);
  }

  menuClick(v) {
    // switch menu-in state from true to false
    this.props.onMenuAction(v);
  }

  render() {
    let menuIn = this.props.menuIsIn ? 'menu--in' : '';

    return (
      <div className="wrapper">

        <div className={'menu ' + menuIn}>
          <ul className="nav">
            <li>one</li>
            <li>two</li>
            <li>three</li>
          </ul>
        </div>

        <Header menuAction={this.menuClick} />

        <main className="main" id="main">
          <div className="layout layout--a">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/profile" component={User} />
              <Route path="/calendar/:calId" component={Calendar} />
              <Route component={Home} />
            </Switch>
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  menuIsIn: React.PropTypes.bool,
  onMenuAction: React.PropTypes.func
};
