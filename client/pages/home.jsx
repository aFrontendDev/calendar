import React from 'react';
import PropTypes from 'prop-types';


import Signup from '../components/authenticate/signup.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <section>

        <Signup />
        
      </section>
    )
  }
}

export default Home;