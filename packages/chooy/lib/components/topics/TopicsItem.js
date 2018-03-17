import React from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from 'meteor/vulcan:core';
import { Link } from 'react-router';

const TopicsItem = ({ topic, isSearchResult }) => {
  const style = isSearchResult ? 'search-result' : 'item';
  const name = (isSearchResult && topic.names.length) ? `${topic.title} (${topic.names[0]})` : topic.title;

  return (<div className={`topics-${style}-wrapper`}>
    <Link className={`topics-${style}-image`} to={`/topic/${topic._id}`}>
      {topic.photos && topic.photos.length ? <img src={topic.photos[0][1].secure_url}/> : null}
    </Link>
    <Link className={`topics-${style}-content`} to={`/topic/${topic._id}`}>
      <div className={`topics-${style}-name`}>  
        {name}
      </div>
    </Link>
  </div>)
}

TopicsItem.propTypes = {
  topic: PropTypes.object,
}

registerComponent('TopicsItem', TopicsItem);

export default TopicsItem;