import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      user: this.props.user,
      createdNewUser: false
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addUser = this.addUser.bind(this);
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

  handleFirstNameChange(event) {
    this.setState({
      firstName: event.target.value
    });
  }

  handleLastNameChange(event) {
    this.setState({
      lastName: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios
      .post(`http://127.0.0.1:4000/signup`, {
        "email": this.state.email,
        "password": this.state.password
      })
      .then(res => {
        console.log(res);

        this.setState({
          createdNewUser: true
        });

        this.props.getUser();
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
      });
  }

  componentWillReceiveProps(newProps) {
    console.log('signup.js newProps');
    console.log(newProps);

    this.setState({
      user: newProps.user
    });

    if (this.state.createdNewUser && newProps.user && newProps.user.uid) {
      this.addUser(newProps.user.uid);
    }
  }

  addUser(uid) {
    axios
      .post(`http://127.0.0.1:4000/adduser`, {
        "email": this.state.email,
        "uid": uid,
        "firstName": this.state.firstName,
        "lastName": this.state.lastName
      })
      .then(res => {
        console.log(res);

        this.setState({
          createdNewUser: false
        });
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
      });
  }

  render() {

    return (
      <section className="signup" aria-label="sign up">
      {
        this.state.user && this.state.user.uid
        ? null
        :
          <div>
            <header className="signup__header">
              <h2 className="signup__title">Signup</h2>
            </header>

            <div className="signup__body">

              <form className="signup__form" onSubmit={this.handleSubmit}>
                <label>Email:</label>
                <input type="email" value={this.state.email} onChange={this.handleEmailChange} />

                <label>Password:</label>
                <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />

                <br />
                <label>First name:</label>
                <input type="text" value={this.state.firstName} onChange={this.handleFirstNameChange} />

                <br />
                <label>Last name:</label>
                <input type="text" value={this.state.lastName} onChange={this.handleLastNameChange} />

                <br /><br />
                <button type="submit">Signup!</button>
              </form>

            </div>
          </div>
      }

      </section>
    )
  }
}

SignUp.propTypes = {
  getUser: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default SignUp;