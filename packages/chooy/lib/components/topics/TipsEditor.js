import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TipEditor from './TipEditor';

class TipsEditor extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    tips: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    const { tips } = this.props;

    return (
      <div className='tips-editor'>
        {(!!tips && tips.length) ?
          tips.map((tip, idx) => <TipEditor key={idx} tip={tip} readOnly />)
          : null }
      </div>
    );
  }
}

export default TipsEditor;
