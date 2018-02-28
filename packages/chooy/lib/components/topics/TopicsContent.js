import React from 'react';
import PropTypes from 'prop-types';

import TipsEditor from './TipsEditor';
import Chips from '../common/Chips';

const TopicsContent = ({ topic }) => {
  return (
    <div className='topics-content'>
      <h3 className='content-text content-title'><span>Tips</span></h3>
      <TipsEditor tips={topic.tips} readOnly/>
      
      <h3 className='content-text content-title'><span>Synonyms</span></h3>
      <Chips readOnly items={topic.names}/>
      
      <h3 className='content-text content-title'><span>Categories</span></h3>
      <Chips readOnly items={topic.categories}/>
    </div>
  );
}

TopicsContent.propTypes = {
  topic: PropTypes.object.isRequired,  
}

export default TopicsContent;
