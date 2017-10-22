import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log(this.state.email);
    // console.log(this.state.password);

    axios
      .post(`http://127.0.0.1:4000/signup`, {
        "email": this.state.email,
        "password": this.state.password
      })
      .then(res => {
        console.log(res);
        // this.currentUser();
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
      });
  }

  currentUser() {
    // const user = dispatch(this.props.getCurrentUser());
    // console.log(user);
    // axios
    //   .get(`http://127.0.0.1:4000/currentUser`)
    //   .then(res => {
    //     const user = res.data;
    //     console.log(user);
    //     console.log(user.uid);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  render() {

    return (
      <section className="signup" aria-label="sign up">
        <header className="signup__header">
          <h2 className="signup__title">Signup</h2>
        </header>

        <div className="signup__body">

          <form className="signup__form" onSubmit={this.handleSubmit}>
            <label>Email:</label>
            <input type="email" value={this.state.email} onChange={this.handleEmailChange} />

            <label>Password:</label>
            <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />

            <button type="submit">Signup!</button>
          </form>

        </div>

      </section>
    )
  }
}

SignUp.propTypes = {
  getCurrentUser: PropTypes.func.isRequired
};

export default SignUp;