import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Chips from '../common/Chips';
import { getI18nMessage } from '../../modules/utils';

class FormChips extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: this.props.value || [],
    }
  }

  handleItemsChange = (items) => {
    this.setState(state => ({items}));
  }

  /*

  Add to autofilled values so SmartForms doesn't think the field is empty
  if the user submits the form without changing it

  */
  componentWillMount() {
    this.context.addToAutofilledValues({[this.props.name]: this.props.value || []});
  }

  render() {
    const { refFunction, label, options, ...restProps } = this.props;
    const { items } = this.state;

    return (
      <div className="form-group row">
        <label className="control-label col-sm-3">{label}</label>
        <div className="col-sm-9">  
          <Chips
            {...restProps}
            value=''
            placeholder={getI18nMessage(options.placeholder)}
            items={items}
            onItemsChange={this.handleItemsChange}
            ref={refFunction}
          />
        </div>  
      </div>      
    );
  }
}

FormChips.contextTypes = {
  addToAutofilledValues: PropTypes.func,
};

export default FormChips;