import React from 'react';
import PropTypes from 'prop-types';

import Signup from '../components/authenticate/signup.jsx';
import Signin from '../components/authenticate/signin.jsx';
import Signout from '../components/authenticate/signout.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    }

    this.getUserHandler = this.getUserHandler.bind(this);
  }

  componentWillReceiveProps(newProps) {
    console.log('home.js newProps');
    console.log(newProps);

    this.setState({
      user: newProps.user
    });
  }

  getUserHandler(e) {
    e.preventDefault();
    this.props.getCurrentUser();
  }


  render() {
    return (
      <section>

        {
          this.state.user && this.state.user.uid
          ?
            null
          :
          <div>
            <Signup />
            <br />
            <Signin signinUser={this.props.signinUser} />
          </div>
        }

        <br />

        <button onClick={this.getUserHandler}>
          Get Current User!
        </button>

        <Signout signoutUser={this.props.signoutUser} />

        {
          this.state.user && this.state.user.uid ?
          <ul>
            <li>{this.state.user.uid}</li>
            <li>{this.state.user.email}</li>
          </ul>
          : null
        }

      </section>
    )
  }
}

Home.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  user: PropTypes.object,
  email: PropTypes.string,
  password: PropTypes.string,
  signinUser: PropTypes.func.isRequired,
  signoutUser: PropTypes.func.isRequired
};

export default Home;