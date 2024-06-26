import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/lib/Modal';

import Editor from '../common/Editor/Editor';
import Chips from '../common/Chips';
import { getI18nMessage } from '../../modules/utils';

class TipMenuModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      howValue: props.tip ? Editor.createValuefromString(props.tip.how) : Editor.createEmptyValue(),
      whyValue: props.tip ? Editor.createValuefromString(props.tip.why) : Editor.createEmptyValue(),
      objectives: props.tip ? props.tip.objectives : [],
      users: props.tip ? props.tip.users : [],
    }
  }

  static propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    tip: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onExited: PropTypes.func,
    userSuggestions: PropTypes.arrayOf(PropTypes.string),
    objectiveSuggestions: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    onExited: () => {},
  }

  componentWillReceiveProps(nextProps) {
    const { tip } = nextProps;

    if (nextProps.show && !this.props.show) {
      this.setState(state => ({
        howValue: tip ? Editor.createValuefromString(tip.how) : Editor.createEmptyValue(),
        whyValue: tip ? Editor.createValuefromString(tip.why) : Editor.createEmptyValue(),
        objectives: tip ? tip.objectives : [],
        users: tip ? tip.users : [],
      }));
    }
  }

  handleHowChange = ({value}) => {
    this.setState(state => ({howValue: value}));
  }

  handleWhyChange = ({value}) => {
    this.setState(state => ({whyValue: value}));
  }

  handleObjectivesChange = (items) => {
    this.setState(state => ({objectives: items}));
  }

  handleUsersChange = (items) => {
    this.setState(state => ({users: items}));
  }

  handleClickOK = (e) => {
    const { onHide, onChange } = this.props;
    const { howValue, whyValue, objectives, users } = this.state;

    e.preventDefault();

    onChange({
      how: JSON.stringify(howValue.toJSON()),
      why: JSON.stringify(whyValue.toJSON()),
      objectives,
      users,
    });
    
    onHide();
  }

  render() {
    const { show, onHide, onExited, userSuggestions, objectiveSuggestions } = this.props;
    const { howValue, whyValue, objectives, users } = this.state;

    return (
      <Modal
        className={'tip-edit-modal'}
        show={show}
        onHide={onHide}
        onExited={onExited}
        dialogClassName={'tip-edit-dialog'}   
      >
        <Modal.Body className='tip-edit-body'>
          <div className='tip-edit-form'>  
            <h3 className='sub-title'><span>How to Choose</span></h3>  
            <h5 className='tip-edit-guide'><span>Tip: One opinion at a time. Be short and specific. Write only "how", leave "why" to the next section.</span></h5>
            <Editor placeholder='how' value={howValue} onChange={this.handleHowChange}/>
            <h3 className='sub-title'><span>The Reason Why We Choose Like Above</span></h3>
            <Editor placeholder='why' value={whyValue} onChange={this.handleWhyChange}/>
            <h3 className='sub-title'><span>Objectives</span></h3>
            <Chips placeholder={'Enter an user type'} items={objectives} onItemsChange={this.handleObjectivesChange} suggestions={objectiveSuggestions}/>
            <h3 className='sub-title'><span>Users</span></h3>
            <Chips placeholder={'Enter an objective'} items={users} onItemsChange={this.handleUsersChange} suggestions={userSuggestions}/>
          </div>
          <div className='tip-edit-buttons sticky-footer'>
            <button className='main-button' onClick={this.handleClickOK}>OK</button>
            <button className='inverse-button' onClick={onHide}>Cancel</button>
          </div>  
        </Modal.Body>        
      </Modal>          
    );
  }
}

export default TipMenuModal;
