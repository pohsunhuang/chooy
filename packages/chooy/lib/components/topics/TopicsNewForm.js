import React from 'react';
import PropTypes from 'prop-types';
import mapProps from 'recompose/mapProps';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';

import Topics from '../../modules/topics/collection';

const TopicsNewForm = ({ topicName, router }) => {
  const successCallback = (newTopic) => {
    router.push(`/topic/${newTopic._id}`);
  };
 
  const cancelCallback = () => {
    router.push(`/search?query=${topicName}`);
  };

  return (
    <div className='topics-edit-form'>
      <h1 className='title title-text'><span>{`Creating ${topicName}`}</span></h1>
      <Components.SmartForm 
        collection={Topics}
        showRemove={false}
        successCallback={successCallback}
        cancelCallback={cancelCallback}
      />
    </div>    
  );
}

const mapPropsFunction = props => ({...props, topicName: props.routeParams && props.routeParams.topicName});

registerComponent('TopicsNewForm', TopicsNewForm, mapProps(mapPropsFunction), withCurrentUser);
