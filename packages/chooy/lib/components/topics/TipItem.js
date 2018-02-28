import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from '../common/Icons';
import Editor from '../common/Editor/Editor';
import Chips from '../common/Chips';

class TipItem extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    tipIndex: PropTypes.number,
    tip: PropTypes.object,
    readOnly: PropTypes.bool,
    onClickEdit: PropTypes.func,
  }

  static defaultProps = {
    readOnly: false,
  }

  onHowChange = ({ value }) => {
  }

  onWhyChange = ({ value }) => {
  }

  onClickEdit = (e) => {
    if(this.props.onClickEdit) {
      this.props.onClickEdit(e, this.props.tipIndex);
    }
  }

  refFunction = (tip) => {
    this.tip = tip;
  }

  scrollTipIntoView = () => {
    this.tip.scrollIntoView(true);
  }

  render() {
    const { readOnly, tip } = this.props;

    return (
      <div className={`tip-editor${readOnly ? ' read-only' : ''}`} ref={this.refFunction}>
        <div className='tip-editor-content'>
          <Editor
            placeholder='why'
            value={Editor.createValuefromString(tip.how)}
            onChange={this.onHowChange}
            readOnly
            moreValue={Editor.createValuefromString(tip.why)}
          />
          {(tip && tip.objectives.length) ? 
            <div className='tip-editor-chips'>
              <Icon className='tip-editor-icon' name='star'/>
              <Chips items={tip.objectives} readOnly/>
            </div> : null}
          {(tip && tip.users.length) ?
            <div className='tip-editor-chips'>
              <Icon className='tip-editor-icon' name='users'/>
              <Chips items={tip.users} readOnly/>
            </div> : null}
        </div>
        {!readOnly ? 
          <div className='tip-editor-more'>
            <button className='tip-editor-button' onClick={this.onClickEdit}>
              <Icon className='tip-editor-icon' name='edit'/>
            </button>
          </div>: null}
      </div>  
    );
  }
}

export default TipItem;
