import React from 'react';
import { registerComponent, Components } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Dropdown from 'react-bootstrap/lib/Dropdown';

const UsersAccountMenu = () =>
  <Dropdown className='users-account-menu' id='accounts-dropdown' pullRight>
    <Dropdown.Toggle>
      <Components.Icon name='user' />
      <FormattedMessage id='users.sign_up_log_in' />
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Components.AccountsLoginForm />
    </Dropdown.Menu>
  </Dropdown>

registerComponent('UsersAccountMenu', UsersAccountMenu);

export default UsersAccountMenu;  