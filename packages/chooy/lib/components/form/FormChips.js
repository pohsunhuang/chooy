import React from 'react';

import Chips from '../common/Chips';
import { getI18nMessage } from '../../modules/utils';

const FormChips = ({refFunction, value, label, options, ...props}) => {
  return (
    <div className="form-group row">
      <label className="control-label col-sm-3">{label}</label>
      <div className="col-sm-9">  
        <Chips 
          value=''
          placeholder={getI18nMessage(options.placeholder)}
          items={value} 
          ref={refFunction} 
          {...props} 
        />
      </div>  
    </div>    
  );
}

export default FormChips;