import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from 'meteor/vulcan:core';

import CategoriesChips from './CategoriesChips';
import { getI18nMessage } from '../../modules/utils';

class FormCategoriesChips extends Component {
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
    const { refFunction, value, label, options, ...props } = this.props;

    return (
      <div className="form-group row">
        <label className="control-label col-sm-3">{label}</label>
        <div className="col-sm-9">  
          <CategoriesChips
            value=''
            placeholder={getI18nMessage(options.placeholder)}
            items={value}
            refFunction={refFunction}
            {...props}
          />
        </div>  
      </div>      
    );
  }
}

FormCategoriesChips.contextTypes = {
  addToAutofilledValues: PropTypes.func,
};

registerComponent('FormCategoriesChips', FormCategoriesChips);

//export default FormCategoriesChips;