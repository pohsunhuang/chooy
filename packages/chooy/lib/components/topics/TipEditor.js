import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from '../common/Icons';
import Editor from '../common/Editor/Editor';
import Chips from '../common/Chips';

class TipEditor extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      howValue: props.tip ? Editor.createValuefromString(props.tip.how) : Editor.createEmptyValue(),
      whyValue: props.tip ? Editor.createValuefromString(props.tip.why) : Editor.createEmptyValue(),
    }
  }

  static propTypes = {
    tip: PropTypes.object,
    readOnly: PropTypes.bool,
  }

  onHowChange = ({ value }) => {
    this.setState(state => ({ howValue: value }));
  }

  onWhyChange = ({ value }) => {
    this.setState(state => ({ whyValue: value }));
  }

  render() {
    const { readOnly, tip } = this.props;

    return (
    <div className={`tip-editor${readOnly ? ' read-only' : ''}`}>
        <Editor
          placeholder='why'
          value={this.state.howValue}
          onChange={this.onHowChange}
          readOnly={readOnly}
          moreValue={readOnly ? this.state.whyValue: null}
        />
        {readOnly ? null :
          <Editor
            placeholder='how'
            value={this.state.whyValue}
            onChange={this.onWhyChange}
          />
        }
        {(tip && tip.objectives.length) ? 
          <div className='tip-editor-chips'>
            <Icon className='tip-editor-icon' name='star'/>
            <Chips items={tip.objectives} readOnly={readOnly} />
          </div> : null}
        {(tip && tip.users.length) ?
          <div className='tip-editor-chips'>
            <Icon className='tip-editor-icon' name='users'/>
            <Chips items={tip.users} readOnly={readOnly} />
          </div> : null}
      </div>  
    );
  }
}

export default TipEditor;
