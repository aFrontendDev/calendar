import React, { Component } from "react";
import { connect } from "react-redux";

import * as authActions from "../../../actions/auth/authActions";


class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();
    if (!this.state.password || this.state.password.length < 1) {
      return
    }

    if (!this.state.username || this.state.username.length < 1) {
      return
    }

    this.props.login(this.state.username, this.state.password);
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  render() {

    return (
      <section className="login">
        <header className="login__header">
          <h2 className="login__title">
            Login
          </h2>
        </header>

        {
          <form className="login__form" onSubmit={this.handleLogin}>
            <div className="form-field">
              <label htmlFor="username">Username: </label>
              <input type="text" name="username" value={this.state.username} placeholder="e.g. andy123" onChange={this.handleUsernameChange} />
            </div>
            <div className="form-field">
              <label htmlFor="password">Password: </label>
              <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
            </div>

            <div className="form-messages">
              {
                this.props.loginFail
                ? <p>Sorry the combination of your username and password was incorrect</p>
                : null
              }
            </div>

            <div className="form-actions">
              <button className="btn btn--style-a">Login</button>
            </div>
          </form>
        }

      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggingIn: state.auth.loggingIn,
    loggedin: state.auth.loggedin,
    loginFail: state.auth.loginFail
  };
};

const mapDispatchToProps = {
  login: authActions.login
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
