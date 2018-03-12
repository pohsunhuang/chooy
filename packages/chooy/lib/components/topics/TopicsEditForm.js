import React from 'react';
import PropTypes from 'prop-types';
import { Components } from 'meteor/vulcan:core';

import Topics from '../../modules/topics/collection';

const TopicsEditForm = ({ documentId, successCallback }) => {
  return (
    <div className='topics-edit-form'>
      <Components.SmartForm 
        collection={Topics}
        documentId={documentId}
        showRemove={false}
        successCallback={successCallback}
        cancelCallback={successCallback}
      />
    </div>
  );
}

TopicsEditForm.propTypes = {
  documentId: PropTypes.string.isRequired,
  successCallback: PropTypes.func.isRequired,
}

export default TopicsEditForm;
