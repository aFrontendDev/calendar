import React, { Component } from "react";
import { connect } from "react-redux";

import * as authActions from "../../../actions/auth/authActions";

import styles from "./styles.scss";

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: '',
      registered: false,
      usernameAvailable: null
    }

    this.handleRegister = this.handleRegister.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCheckUsername = this.handleCheckUsername.bind(this);
  }

  handleRegister(e) {
    e.preventDefault();
    if (!this.state.password || this.state.password.length < 1) {
      return
    }

    if (!this.state.username || this.state.username.length < 1) {
      return
    }

    if (!this.state.email || this.state.email.length < 1) {
      return
    }

    this.props.register(this.state.username, this.state.password, this.state.email)
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handleCheckUsername() {
    if (this.state.username && this.state.username.length) {
      this.props.checkUsername(this.state.username);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {registering, auth, usernameAvailable} = nextProps;

    if (usernameAvailable !== null) {
      this.setState({
        usernameAvailable
      })
    }

    if (!registering && auth && auth.token && !this.state.registered) {

      this.setState({
        registered: true
      });

      window.localStorage.setItem('site_loggedin', auth.token);
    }
  }

  render() {

    return (
      <section className="register">
        <header className="register__header">
          <h2 className="register__title">
            Register
          </h2>
        </header>

        {
          !this.state.registered
          ?
            <form className="register__form" onSubmit={this.handleRegister}>
              <div className="form-field">
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" value={this.state.username} placeholder="e.g. andy123" onChange={this.handleUsernameChange} />
                <button type="button" onClick={this.handleCheckUsername}>Check username</button>
                {
                  this.state.usernameAvailable !== null ?
                    this.state.usernameAvailable
                    ? <p>username is free</p>
                    : <p>username is in use</p>
                  : null
                }
              </div>
              <div className="form-field">
                <label htmlFor="email">Email: </label>
                <input type="text" name="email" value={this.state.email} placeholder="e.g. andy@gmail.com" onChange={this.handleEmailChange} />
              </div>
              <div className="form-field">
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
              </div>

              <div className="form-actions">
                <button className="btn btn--style-a">Register</button>
              </div>
            </form>
          :
            <p>REGISTERED!</p>
        }

      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    registering: state.auth.registering,
    auth: state.auth.auth,
    usernameAvailable: state.auth.usernameAvailable
  };
};

const mapDispatchToProps = {
  register: authActions.register,
  checkUsername: authActions.checkUsername
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
