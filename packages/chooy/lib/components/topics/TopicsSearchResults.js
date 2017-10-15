import React from 'react';
import { Components, registerComponent, withList } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Message from '../common/Message';

import Topics from '../../modules/topics/collection';

const itemsPerPage = 2;

const TopicsSearchResults = ({results = [], loading, totalCount, terms}) => {
  return (
    <div>
      <h4 className='title title-text'><FormattedMessage id='topics.search.results' /></h4>
      {loading ? <Components.Loading /> :
        results.map(topic => <Components.TopicsItem key={topic._id} topic={topic} isSearchResult/>)
      }
      {loading ? <Components.Loading /> :
        <Components.TopicsPagination query={terms.query} offset={terms.offset} totalCount={totalCount} itemsPerPage={itemsPerPage}/>
      }
      {loading ? <Components.Loading /> :
        <div className={totalCount ? 'information' : 'information pull-left'}>
          {totalCount ?
            <Message id='topics.create' values={{here: <a href='/'>here</a>}}/> :
            <Message id='topics.no.result' values={{query: terms.query, here: <a href='/'>here</a>}}/>
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
