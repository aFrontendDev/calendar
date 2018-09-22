import React from 'react';
import { connect } from "react-redux";

import AuthMain from '../../sharedComponents/auth/main';
import EventsList from '../../sharedComponents/events/eventsList';

const Fragment = React.Fragment;

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Fragment>
        <div>HOME</div>
        <AuthMain />

        {
          this.props.loggedin
          ? <EventsList />
          : null
        }

      </Fragment>
    );
  }
}


const mapStateToProps = state => {

  return {
    loggedin: state.auth.loggedin,
  };
};

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);
