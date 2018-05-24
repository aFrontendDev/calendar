import React, { Component } from "react";
import { connect } from "react-redux";

import * as authActions from "../../actions/auth/authActions";

import Register from "./register/index";

class AuthMain extends Component {

  constructor(props) {
    super(props);
    const loggedin = this.props.loggedin ? true : null;

    this.state = {
      isLoggedin: loggedin
    }

    this.checkLoggedin = this.checkLoggedin.bind(this);

    this.checkLoggedin();
  }

  checkLoggedin() {
    const loggedinToken = window.localStorage.getItem('site_loggedin');
    if (!loggedinToken) {
      this.setState({
        isLoggedin: false
      })
    } else {
      this.props.checkLoggedin(loggedinToken);
    }
  }

  componentWillReceiveProps(nextProps) {
    const loggedin = nextProps.loggedin;

    if (loggedin !== null) {
      if (loggedin !== this.state.isLoggedin) {
        this.setState({
          isLoggedin: loggedin
        })
      }
    }
  }

  render() {

    return (
      <div>
      {
        this.state.isLoggedin !== null ? 
          this.state.isLoggedin
          ? <p>logged in</p>
          : <Register />
        : <Register />
      }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedin: state.auth.loggedin
  };
};

const mapDispatchToProps = {
  checkLoggedin: authActions.checkLoggedin
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthMain);
