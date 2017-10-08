import { connect } from 'react-redux';
import { menuAction } from '../actions/menuAction';
import { calendarNextAction, calendarPrevAction, calendarSetDate } from '../actions/calendarActions';
import App from '../App';

const mapStateToProps = (state) => {
  return {
    menuIsIn: state.menuIsIn,
    date: state.date
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCalSetDate: (date) => dispatch(calendarSetDate(date)),
    onMenuAction: (menuIsIn) => dispatch(menuAction(menuIsIn)),
    onCalNextAction: (date) => dispatch(calendarNextAction(date)),
    onCalPrevAction: (date) => dispatch(calendarPrevAction(date))
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;