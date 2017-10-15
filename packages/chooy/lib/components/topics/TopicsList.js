import React from 'react';
import { Components, registerComponent, withCurrentUser, withList } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Carousel from 'react-bootstrap/lib/Carousel';

import Topics from '../../modules/topics/collection';
import Icon from '../common/Icons';

const TopicsList = ({results = [], currentUser, loading}) =>
  <div className='topics-list'>
    <div className='topics-trend-list'>
      <h4 className='title title-text'><FormattedMessage id='topics.popular' /></h4>
      <div className='full-width-wrapper'>
        <div className='topics-slider'>
          {loading ?
            <Components.Loading /> :
            results.map(topic => <Components.TopicsItem key={topic._id} topic={topic}/>)
          }
        </div>
        <Carousel className='topics-carousel' 
          interval={null} 
          indicators={false}
          nextIcon={<Icon name='next' size={24}/>}
          prevIcon={<Icon name='prev' size={24}/>}
        >
          {loading ?
            <Components.Loading /> :
            results.map((topic, idx, results) => {
              return (
                <Carousel.Item key={idx}>
                  <div className='topics-carousel-item'>
                    <Components.TopicsItem topic={topic}/>
                    <Components.TopicsItem topic={results[(idx+1)%results.length]}/>
                    <Components.TopicsItem topic={results[(idx+2)%results.length]}/>
                  </div>
                </Carousel.Item>
            )})
          }
        </Carousel>
      </div>
    </div>
  </div>

const options = {
  collection: Topics,
  fragmentName: 'TopicsItemFragment',
  pollInterval: 0,
}

registerComponent('TopicsList', TopicsList, [withList, options], withCurrentUser);

export default withList(options)(withCurrentUser(TopicsList));