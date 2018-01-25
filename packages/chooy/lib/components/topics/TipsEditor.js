import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';

import TipEditor from './TipEditor';
import Pagination from '../common/Pagination';

const tipsPerPage = 5;

class TipsEditor extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    tips: PropTypes.arrayOf(PropTypes.object).isRequired,
    location: PropTypes.object.isRequired,
  }

  getURLByOffset = (offset) => {
    const { pathname, search } = this.props.location;
    let queryStringObj = qs.parse(search, { ignoreQueryPrefix: true });

    queryStringObj.offset = offset;
    
    return `${pathname}?${qs.stringify(queryStringObj)}`;
  }

  render() {
    const { tips } = this.props;
    const { offset = 0 } = this.props.location.query;

    return (
      <div className='tips-editor'>
        {(!!tips && tips.length) ?
          <div>
            {tips.map((tip, idx) => {
              if (idx >= offset && idx < (offset+tipsPerPage)) {
                return <TipEditor key={idx} tip={tip} readOnly />
              } else {
                return ;
              }
            })}
            <Pagination offset={offset} totalCount={tips.length} itemsPerPage={tipsPerPage} getURLByOffset={this.getURLByOffset}/>
          </div>
          : null }
      </div>
    );
  }
}

export default TipsEditor;
