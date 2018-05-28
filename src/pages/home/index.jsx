import React from 'react';

import AuthMain from '../../sharedComponents/auth/main';
import EventsList from '../../sharedComponents/events/eventsList';

const Fragment = React.Fragment;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Fragment>
        <div>HOME</div>
        <AuthMain />
        <EventsList />
      </Fragment>
    );
  }
}
