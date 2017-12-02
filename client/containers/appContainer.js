import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { menuAction } from '../actions/menuAction';
import { calendarNextAction, calendarPrevAction, calendarSetDate } from '../actions/calendarActions';
import { getUserData, signInUser, signOutUser } from '../actions/userAction';
import App from '../App';

const mapStateToProps = (state) => {
  return {
    menuIsIn: state.menuIsIn,
    date: state.date,
    user: state.user,
    email: state.email,
    password: state.password
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCalSetDate: (date) => dispatch(calendarSetDate(date)),
    onMenuAction: (menuIsIn) => dispatch(menuAction(menuIsIn)),
    onCalNextAction: (date) => dispatch(calendarNextAction(date)),
    onCalPrevAction: (date) => dispatch(calendarPrevAction(date)),
    onGetCurrentUser: (user) => dispatch(getUserData(user)),
    onSigninUser: (email, password) => dispatch(signInUser(email, password)),
    onSignoutUser: (user) => dispatch(signOutUser(user))
  };
};

const AppContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));

export default AppContainer;