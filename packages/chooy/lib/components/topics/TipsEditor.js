import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import qs from 'qs';

import TipEditor from './TipEditor';
import Editor from '../common/Editor/Editor';
import Pagination from '../common/Pagination';

const tipsPerPage = 5;

class TipsEditor extends Component {
  constructor(props) {
    super(props);

    // Reset global auto increment key generator to create the same DOM from both client and server side
    // for SSR to work properly
    // Reference: https://github.com/ianstormtaylor/slate/issues/53
    // You must call it before you create any 'Value' for slate editor
    // But you can only call it once per page because if there are editors at the same page with the same data-key,
    // the focus behavior of editors go haywire
    Editor.resetKeyGenerator();
  }

  static propTypes = {
    tips: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  getURLByOffset = (offset) => {
    const { pathname, search } = this.props.router.location;
    let queryStringObj = qs.parse(search, { ignoreQueryPrefix: true });

    queryStringObj.offset = offset;
    
    return `${pathname}?${qs.stringify(queryStringObj)}`;
  }

  render() {
    const { tips } = this.props;
    const { offset = 0 } = this.props.router.location.query;

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

export default withRouter(TipsEditor);
