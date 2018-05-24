import React from 'react';

import AuthMain from '../../sharedComponents/auth/main';

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
      </Fragment>
    );
  }
}
