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
      registered: false
    }

    this.handleRegister = this.handleRegister.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleRegister(e) {
    e.preventDefault();
    if (!this.state.password || this.state.password.length < 1) {
      return
    }

    if (!this.state.username || this.state.username.length < 1) {
      return
    }

    this.props.register(this.state.username, this.state.password)
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {registering, auth} = this.props.authObject;
    if (!registering && auth && auth.token && !this.state.registered) {

      this.setState({
        registered: true
      })
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
  console.log('register state', state);
  return {
    registering: state.registering,
    authObject: state.auth
  };
};

const mapDispatchToProps = {
  register: authActions.register
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

// export default Register;