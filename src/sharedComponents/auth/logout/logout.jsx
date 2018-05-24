import React, { Component } from "react";
import { connect } from "react-redux";

import * as authActions from "../../../actions/auth/authActions";


class Logout extends Component {

  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();

    window.localStorage.removeItem('site_loggedin');
    this.props.logout();
  }

  render() {

    return (
      <button onClick={this.handleLogout} className="btn btn--style-a">Logout</button>
    );
  }
}


const mapDispatchToProps = {
  logout: authActions.logout
};

export default connect(null, mapDispatchToProps)(Logout);
