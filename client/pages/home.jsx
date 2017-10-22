import React from 'react';
import PropTypes from 'prop-types';

import Signup from '../components/authenticate/signup.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    }

    this.getUserHandler = this.getUserHandler.bind(this);
  }

  componentWillReceiveProps(newProps) {
    console.log('newProps');
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

        <Signup getCurrentUser={this.props.getCurrentUser} />

        <button onClick={this.getUserHandler}>
          Get Current User!
        </button>

        <ul>
          <li>{this.state.user.uid}</li>
          <li>{this.state.user.email}</li>
        </ul>

      </section>
    )
  }
}

Home.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default Home;