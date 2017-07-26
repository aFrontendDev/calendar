import React from 'react';
import PropTypes from 'prop-types';

class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.menuClick = this.menuClick.bind(this);
  }

  menuClick(v) {
    // switch menu-in state from true to false
    this.props.onMenuAction(v);
  }

  render() {
    let menuIn = this.props.menuIsIn ? 'menu--in' : '';

    return (
      <div className={'menu ' + menuIn}>
        <button className="btn btn--unstyled menu__close-btn" onClick={this.menuClick}>Close</button>
        <ul className="nav">
          <li>one</li>
          <li>two</li>
          <li>three</li>
          <li>one</li>
          <li>two</li>
          <li>three</li>
          <li>one</li>
          <li>two</li>
          <li>three</li>
          <li>one</li>
          <li>two</li>
          <li>three</li>
          <li>one</li>
          <li>two</li>
          <li>three</li>
          <li>one</li>
          <li>two</li>
          <li>three</li>
          <li>one</li>
          <li>two</li>
          <li>three</li>
          <li>one</li>
          <li>two</li>
          <li>three</li>
          <li>one</li>
          <li>two</li>
          <li>three</li>
          <li>one</li>
          <li>two</li>
          <li>three</li>
          <li>one</li>
          <li>two</li>
          <li>three</li>
          <li>one</li>
          <li>two</li>
          <li>three</li>
          <li>one</li>
          <li>two</li>
          <li>three</li>
          <li>one</li>
          <li>two</li>
          <li>three</li>
          <li>one</li>
          <li>two</li>
          <li>three</li>
          <li>one</li>
          <li>two</li>
          <li>three</li>
          <li>one</li>
          <li>two</li>
          <li>three</li>
        </ul>
      </div>
    )
  }
}

Menu.propTypes = {
  menuIsIn: React.PropTypes.bool,
  onMenuAction: React.PropTypes.func.isRequired
};

export default Menu;