import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    return (
      <header className="header" id="header" role="banner" itemScope itemType="http://schema.org/WPHeader">
        <h1 className="" itemScope itemType="http://schema.org/WPHeader"><span>Which</span>Day?</h1>
      </header>
    )
  }
}

export default Header;