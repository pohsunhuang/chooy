import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

const terms = {
  searchText: true,
  nothingForEmptyQuery: true,
  unique: false,
}

const TopicsSearch = ({location}) => {
  const offset = Number(location.query.offset) || 0;

  return (
    <div>
      <Components.TopicsSearchForm/>
      <Components.TopicsSearchResults terms={{ query: location.query.query, offset, ...terms}}/>      
    </div>
  )
}

registerComponent('TopicsSearch', TopicsSearch);

export default TopicsSearch;