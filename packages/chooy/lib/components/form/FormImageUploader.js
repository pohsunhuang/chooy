import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from 'meteor/vulcan:core';

import ImageUploader from '../common/ImageUploader';
import { getI18nMessage } from '../../modules/utils';

class ImageUploaderWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value || '',
    }
  }

  onChange = (value) => {
    this.setState(state => ({value}));
  }

  getValue = () => this.state.value;

  render() {
    const { value } = this.state;
    const { type } = this.props;

    return <ImageUploader value={value} onChange={this.onChange} type={type}/>
  }
}

class FormImageUploader extends Component {
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
          <ImageUploaderWrapper value={value} ref={refFunction} type={options.type} {...props}/>
        </div>  
      </div>      
    );
  }
}

FormImageUploader.contextTypes = {
  addToAutofilledValues: PropTypes.func,
};

registerComponent('FormImageUploader', FormImageUploader);
