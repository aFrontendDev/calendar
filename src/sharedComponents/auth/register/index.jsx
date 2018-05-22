import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./styles.scss";

class Register extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <section className="register">
        <header className="register__header">
          <h2 className="register__title">
            Register
          </h2>
        </header>

        <form className="register__form">
          <div className="form-field">
            <label for="username">Username: </label>
            <input type="text" name="username" placeholder="e.g. andy123" />
          </div>
          <div className="form-field">
            <label for="password">Password: </label>
            <input type="password" name="password" />
          </div>

          <div className="form-actions">
            <button className="btn btn--style-a">Register</button>
          </div>
        </form>

      </section>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     fetching: state.fetching,
//     error: state.error
//   };
// };

// const mapDispatchToProps = {
//   onRequestDog: dogActions.fetchDog
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Register);

export default Register;