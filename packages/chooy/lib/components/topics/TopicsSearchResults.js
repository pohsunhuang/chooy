import React from 'react';
import { Components, registerComponent, withList } from 'meteor/vulcan:core';
import { Link } from 'react-router';

import Message from '../common/Message';
import Pagination from '../common/Pagination';
import Topics from '../../modules/topics/collection';

const itemsPerPage = 2;

const createGetURLByOffset = (query) => {
  return (offset) => `/search?query=${query}&offset=${offset}`
}

const TopicsSearchResults = ({results = [], loading, totalCount, terms}) => {
  return (
    <div>
      <h4 className='title title-text'><Message id='topics.search.results' /></h4>
      {loading ? <Components.Loading /> :
        results.map(topic => <Components.TopicsItem key={topic._id} topic={topic} isSearchResult/>)
      }
      {loading ? <Components.Loading /> :
        <Pagination offset={terms.offset} totalCount={totalCount} itemsPerPage={itemsPerPage} getURLByOffset={createGetURLByOffset(terms.query)}/>
      }
      {loading ? <Components.Loading /> :
        <div className={totalCount ? 'information' : 'information pull-left'}>
          {totalCount ?
            <Message id='topics.create' values={{here: <Link to='/'><Message id='topics.here'/></Link>}}/> :
            <Message id='topics.no.result' values={{query: terms.query, here: <Link to='/'><Message id='topics.here'/></Link>}}/>
          }
        </div>
      }
    </div>
  )
}

const options = {
  collection: Topics,
  fragmentName: 'TopicsItemFragment',
  pollInterval: 0,
  limit: itemsPerPage,
}

registerComponent('TopicsSearchResults', TopicsSearchResults, [withList, options]);
