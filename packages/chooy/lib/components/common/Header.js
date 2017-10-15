import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import {Nav, Navbar, NavItem} from 'react-bootstrap';

import Icon from './Icons';

const Header = ({ currentUser }) =>
  <Navbar className='chooy-navbar' collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to='/'  className='logo'>
          <Icon name='chooy' size={34}/>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle className='chooy-navbar-toggle'/>
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem eventKey={1} href="#">About</NavItem>
        <NavItem eventKey={2} href="#">Writing Guide</NavItem>
        <NavItem eventKey={3} href="#">Sign Up</NavItem>
        <NavItem eventKey={4} href="#">Log In</NavItem>
        <Components.UsersAccountMenu />
      </Nav>
    </Navbar.Collapse>
  </Navbar>

Header.propTypes = {
  currentUser: PropTypes.object,
};

registerComponent('Header', Header, withCurrentUser);

export default withCurrentUser(Header);
