import React from 'react';
import PropTypes from 'prop-types';

class SignOut extends React.Component {

  constructor(props) {
    super(props);

    this.signout = this.signout.bind(this);
  }

  signout(event) {
    event.preventDefault();

    this.props.signoutUser();
  }

  render() {

    return (
      <button onClick={this.signout}>Sign out</button>
    )
  }
}

SignOut.propTypes = {
  signoutUser: PropTypes.func.isRequired
};

export default SignOut;