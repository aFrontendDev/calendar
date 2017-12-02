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

        <Signup user={this.state.user} getUser={this.props.getCurrentUser} />
        {
          this.state.user && this.state.user.uid
          ?
            <Signout user={this.state.user} getUser={this.props.getCurrentUser} />
          :
          <div>
            <br />
            <Signin user={this.state.user} getUser={this.props.getCurrentUser} />
          </div>
        }

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