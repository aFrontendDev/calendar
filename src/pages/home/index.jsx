import React from 'react';

import Register from '../../sharedComponents/auth/register/index';

const Fragment = React.Fragment;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Fragment>
        <div>HOME</div>
        <Register />
      </Fragment>
    );
  }
}
