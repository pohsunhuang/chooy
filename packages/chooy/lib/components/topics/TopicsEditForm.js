import React from 'react';
import PropTypes from 'prop-types';
import { Components } from 'meteor/vulcan:core';

import Topics from '../../modules/topics/collection';

const TopicsEditForm = ({ documentId }) => {
  return (
    <div className='topics-edit-form'>
      <Components.SmartForm 
        collection={Topics}
        documentId={documentId}
        showRemove={true}
        successCallback={() => {}}
      />
    </div>
  );
}

TopicsEditForm.propTypes = {
  
}

export default TopicsEditForm;
