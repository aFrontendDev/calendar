import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

class Home extends React.Component {
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
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
      });
  }

  render() {
    return (
      <section>
        <h2>Signup</h2>

        <form onSubmit={this.handleSubmit}>
          <label>Email:</label>
          <input type="email" value={this.state.email} onChange={this.handleEmailChange} />

          <label>Password:</label>
          <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />

          <button type="submit">
            Signup
          </button>
        </form>
      </section>
    )
  }
}

export default Home;