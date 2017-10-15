import React from 'react';
import PropTypes from 'prop-types';
import mapProps from 'recompose/mapProps';
import { Components, registerComponent, withDocument, withCurrentUser } from 'meteor/vulcan:core';

import Topics from '../../modules/topics/collection';

const TopicsPage = ({ document: topic, currentUser, loading }) =>
  <div>
    {loading ?
      <Components.Loading/> :
      <Components.Card key={topic._id} document={topic} collection={Topics} currentUser={currentUser}/>
    }
  </div>

const options = {
  collection: Topics,
}

const mapPropsFunction = props => ({...props, documentId: props.routeParams && props.routeParams.topicId});

registerComponent('TopicsPage', TopicsPage, mapProps(mapPropsFunction), [withDocument, options], withCurrentUser);
