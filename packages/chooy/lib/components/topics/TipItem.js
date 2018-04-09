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

  handleChange = () => {/* dummy handler */}

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

  getBoundingClientRect = () => {
    return this.tip.getBoundingClientRect();
  }

  render() {
    const { readOnly, tip } = this.props;

    return (
      <div className={`tip-item${readOnly ? ' read-only' : ''}`} ref={this.refFunction}>
        <div className='tip-item-content'>
          <Editor
            placeholder='why'
            value={Editor.createValuefromString(tip.how)}
            onChange={this.handleChange}
            readOnly
            moreValue={Editor.createValuefromString(tip.why)}
          />
          {(tip && tip.objectives.length) ? 
            <div className='tip-item-chips'>
              <Icon className='tip-item-icon' name='star'/>
              <Chips items={tip.objectives} readOnly/>
            </div> : null}
          {(tip && tip.users.length) ?
            <div className='tip-item-chips'>
              <Icon className='tip-item-icon' name='users'/>
              <Chips items={tip.users} readOnly/>
            </div> : null}
        </div>
        {!readOnly ? 
          <div className='tip-item-more'>
            <button className='tip-item-button' onClick={this.onClickEdit}>
              <Icon className='tip-item-icon' name='edit'/>
            </button>
          </div>: null}
      </div>  
    );
  }
}

export default TipItem;
