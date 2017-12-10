import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/lib/Modal';

import { getI18nMessage } from '../../../modules/utils';

class EditorLinkModal extends Component {
  constructor(props) {
    super(props);

    this.state ={
      url: '',
      text: '',
    }
  }

  static propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
  }

  static defaultProps = {
    urlOnly: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show && !this.props.show) {
      this.setState(state => ({url: '', text: '',}));
    }
  }

  onChangeURL = (e) => {
    const url = e.target.value;
    this.setState(state => ({url}));
  }

  onChangeText = (e) => {
    const text = e.target.value;
    this.setState(state => ({text}));
  }

  onClickButton = (e) => {
    e.preventDefault();

    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.url, this.state.text);
    }
  }

  render() {
    return (
      <Modal
        className={this.props.className}
        show={this.props.show}
        onHide={this.props.onHide}
        dialogClassName={this.props.dialogClassName}      
      >
        <Modal.Header className='editor-modal-header' closeButton>
          <Modal.Title>{getI18nMessage('editor.add.link')}</Modal.Title>
        </Modal.Header>  
        <Modal.Body>
          <div className='editor-modal-body'>
            <input placeholder={getI18nMessage('editor.enter.url')} value={this.state.url} onChange={this.onChangeURL}/>
            {!this.props.urlOnly ? <input placeholder={getI18nMessage('editor.enter.link.text')} value={this.state.text} onChange={this.onChangeText}/> : null}
            <button onClick={this.onClickButton}>{getI18nMessage('editor.add.link')}</button>
          </div>
        </Modal.Body>        
      </Modal>
    );
  }
}

export default EditorLinkModal;
