import React, { Component } from 'react';

import { getSetting, Strings } from 'meteor/vulcan:lib';

const Message = ({ id, values }) => {
  const messages = Strings[getSetting('locale', 'en')] || {};
  let parts, obj;
  let message = messages[id] || '';
  if (values) {
    _.forEach(values, (value, key) => {
      if (typeof value === 'string') {
        message = message.replace(`{${key}}`, value);
      }
    });

    _.forEach(values, (value, key) => {
      if (typeof value !== 'string') {
        parts = message.split(`{${key}}`);
        obj = value;
      }
    });    
  }

  if(obj && (parts.length >= 2)) {
    return <span>{parts[0]}{obj}{parts[1]}</span>	
  } else {
    return <span>message</span>;
  }
}

export default Message;