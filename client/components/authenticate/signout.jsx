import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

class SignOut extends React.Component {

  constructor(props) {
    super(props);

    this.signout = this.signout.bind(this);
  }

  signout(event) {
    event.preventDefault();

    axios
    .get(`http://127.0.0.1:4000/signout`)
    .then(res => {
      console.log('user action response');
      console.log(res);
      this.props.getUser();
    })
    .catch((error) => {
      console.log('userReducer error');
      console.log(error);
      this.props.getUser();
    });

    // this.props.signoutUser();
  }

  render() {

    return (
      <button onClick={this.signout}>Sign out</button>
    )
  }
}

SignOut.propTypes = {
  signoutUser: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default SignOut;