import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch, Route
} from 'react-router-dom';

// menu, header and footer to be included on every page
import Header from './components/_header/header.jsx';
import Footer from './components/_footer/footer.jsx';
import Menu from './components/menu.jsx';

// Pages
import Home from './pages/home';
import User from './pages/user';
import CalendarPage from './pages/calendar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.menuClick = this.menuClick.bind(this);
  }

  componentDidMount() {
    this.props.onGetCurrentUser();
    // console.log(this.props.date);
  }

  menuClick(v) {
    // switch menu-in state from true to false
    this.props.onMenuAction(v);
  }

  componentWillReceiveProps(newProps) {
    console.log('app.jsx newProps');
    console.log(newProps);
  }

  render() {

    return (
      <div className="wrapper">

        <Menu menuIsIn={this.props.menuIsIn} onMenuAction={this.props.onMenuAction} />

        <Header menuAction={this.menuClick} />

        <main className="main" id="main">
          <div className="layout layout--a">
            <Switch>
              <Route exact path="/" render={(props) => (
                <Home {...props} user={this.props.user} signoutUser={this.props.onSignoutUser} getCurrentUser={this.props.onGetCurrentUser} signinUser={this.props.onSigninUser} />
              )} />

              <Route path="/profile" component={User} />

              <Route path="/calendar/:calId" render={(props) => (
                <CalendarPage {...props} date={this.props.date} calNextAction={this.props.onCalNextAction} calPrevAction={this.props.onCalPrevAction} />
              )} />

              <Route render={(props) => (
                <Home {...props} user={this.props.user} signoutUser={this.props.onSignoutUser} getCurrentUser={this.props.onGetCurrentUser} signinUser={this.props.onSigninUser} />
              )} />
            </Switch>
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  menuIsIn: PropTypes.bool,
  onMenuAction: PropTypes.func,
  onCalNextAction: PropTypes.func,
  onCalPrevAction: PropTypes.func,
  onCalSetDate: PropTypes.func,
  onGetCurrentUser: PropTypes.func,
  onSigninUser: PropTypes.func,
  onSignoutUser: PropTypes.func
};
