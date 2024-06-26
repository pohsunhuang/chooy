import React from 'react';
import PropTypes from 'prop-types';

import TipsEditor from './TipsEditor';
import Chips from '../common/Chips';

const TopicsContent = ({ topic }) => {
  return (
    <div className='topics-content'>
      <h3 className='sub-title'><span>Choosing Tips</span></h3>
      <TipsEditor tips={topic.tips || undefined} readOnly/>
      
      <h3 className='sub-title'><span>Aliases</span></h3>
      <Chips readOnly items={topic.names || undefined}/>
      
      <h3 className='sub-title'><span>Categories</span></h3>
      <Chips readOnly items={topic.categories || undefined}/>
    </div>
  );
}

TopicsContent.propTypes = {
  topic: PropTypes.object.isRequired,  
}

export default TopicsContent;
