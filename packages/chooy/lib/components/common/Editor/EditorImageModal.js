import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/lib/Modal';

import ImageUploader from '../ImageUploader';
import { getI18nMessage } from '../../../modules/utils';

class EditorImageModal extends Component {
  constructor(props) {
    super(props);

    this.state ={
      value: props.value || '',
    }
  }

  static propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show && !this.props.show) {
      this.setState(state => ({value: ''}));
    }
  }

  onChange = (value) => {
    this.setState(state => ({value}));
  }

  onClickButton = (e) => {
    e.preventDefault();

    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.value);
    }
  }

  render() {
    const { value } = this.state;

    return (
      <Modal
        className={this.props.className}
        show={this.props.show}
        onHide={this.props.onHide}
        dialogClassName={this.props.dialogClassName}      
      >
        <Modal.Header className='editor-modal-header' closeButton>
          <Modal.Title>{getI18nMessage('editor.add.image')}</Modal.Title>
        </Modal.Header>  
        <Modal.Body>
          <div className='editor-modal-body'>
            <ImageUploader value={value} onChange={this.onChange} type='editor'/>
            <button onClick={this.onClickButton}>{getI18nMessage('editor.add.image')}</button>
          </div>
        </Modal.Body>        
      </Modal>
    );
  }
}

export default EditorImageModal;
