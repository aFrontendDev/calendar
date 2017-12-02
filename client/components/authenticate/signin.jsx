import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      user: this.props.user,
      loading: false
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {

    this.setState({
      user: newProps.user
    });

    if (this.state.loading && this.state.user && this.state.user.uid) {
      this.setState({
        loading: false
      });
    }
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

    this.setState({
      loading: true
    });

    // this.props.signinUser(this.state.email, this.state.password);
    axios
    .post(`http://127.0.0.1:4000/signin`, {
      "email": this.state.email,
      "password": this.state.password
    })
    .then(res => {
      this.props.getUser();
    })
    .catch((error) => {
      console.log('signin error');
      console.log(error);
      this.props.getUser();
    });
  }

  render() {

    return (
      <section className="form-section" aria-label="sign in">
        <header className="form-section__header">
          <h2 className="form-section__title">Sign In</h2>
        </header>

        <div className="form-section__body">

          <form className="form-section__form" onSubmit={this.handleSubmit}>
            <label>Email:</label>
            <input type="email" value={this.state.email} onChange={this.handleEmailChange} />

            <label>Password:</label>
            <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />

            <button className="form-section__btn" type="submit">Signin!</button>

            {
              this.state.loading
              ? <span>Loading</span>
              : null
            }
          </form>

        </div>

      </section>
    )
  }
}

SignIn.propTypes = {
  getUser: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default SignIn;