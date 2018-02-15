import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from 'meteor/vulcan:core';

import TipsEditor from './TipsEditor';
import { getI18nMessage } from '../../modules/utils';

class FormTipsEditor extends Component {
  constructor(props) {
    super(props);
  }

  /*

  Add to autofilled values so SmartForms doesn't think the field is empty
  if the user submits the form without changing it

  */
  componentWillMount() {
    this.context.addToAutofilledValues({[this.props.name]: this.props.value || []});
  }

  render() {
    const { refFunction, value, label, ...props } = this.props;

    return (
      <div className="form-group row">
        <label className="control-label col-sm-3">{label}</label>
        <div className="col-sm-9">  
          <TipsEditor
            tips={value}
            ref={refFunction}
            {...props}
          />
        </div>  
      </div>      
    );
  }
}

FormTipsEditor.contextTypes = {
  addToAutofilledValues: PropTypes.func,
  router: PropTypes.object,
};

registerComponent('FormTipsEditor', FormTipsEditor);
