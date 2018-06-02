import React from 'react';

import NewEvent from '../../sharedComponents/events/newEvent';

const Fragment = React.Fragment;

export default class EventNew extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Fragment>
        <div>Create new event</div>
        <NewEvent />
      </Fragment>
    );
  }
}
