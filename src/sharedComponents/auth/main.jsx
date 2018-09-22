import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import * as authActions from "../../actions/auth/authActions";

import Register from "./register/register";
import Login from "./login/login";
import Logout from "./logout/logout";

class AuthMain extends Component {

  constructor(props) {
    super(props);
    const loggedin = this.props.loggedin ? this.props.loggedin : null;

    this.state = {
      isLoggedin: loggedin
    }

    this.checkLoggedin = this.checkLoggedin.bind(this);
  }

  componentDidMount() {
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
    // console.log({nextProps})
    const loggedin = nextProps.loggedin;

    if (loggedin !== null) {
      if (loggedin !== this.state.isLoggedin) {
        this.setState({
          isLoggedin: loggedin
        })
      }

      if (nextProps.auth) {
        const loggedinToken = nextProps.auth.token;
        const storageToken = window.localStorage.getItem('site_loggedin');

        if (!storageToken) {
          window.localStorage.setItem('site_loggedin', loggedinToken);
        } else if (storageToken && storageToken !== loggedinToken) {
          window.localStorage.setItem('site_loggedin', loggedinToken);
        }
      }
    }
  }

  render() {

    return (
      <div>
      {
        this.state.isLoggedin !== null ?
          this.state.isLoggedin
          ?
            <Fragment>
              <p>logged in: {this.props.username}</p>
              <Logout />
            </Fragment>
          :
            <Fragment>
              <Register />
              <Login />
            </Fragment>
        : null
      }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.auth,
    loggedin: state.auth.loggedin,
    username: state.auth.username
  };
};

const mapDispatchToProps = {
  checkLoggedin: authActions.checkLoggedin
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthMain);
