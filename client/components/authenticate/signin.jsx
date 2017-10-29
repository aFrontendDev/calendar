import React from 'react';
import PropTypes from 'prop-types';

class SignIn extends React.Component {

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

    this.props.signinUser(this.state.email, this.state.password);
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
          </form>

        </div>

      </section>
    )
  }
}

SignIn.propTypes = {
  signinUser: PropTypes.func.isRequired
};

export default SignIn;