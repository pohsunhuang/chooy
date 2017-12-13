import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getSetting } from 'meteor/vulcan:lib';
import Dropzone from 'react-dropzone';
import 'cross-fetch/polyfill';
import Modal from 'react-bootstrap/lib/Modal';

import Icon from '../Icons';
import { getI18nMessage } from '../../../modules/utils';

class EditorImageModal extends Component {
  constructor(props) {
    super(props);

    this.state ={
      value: props.value || '',
      preview: '',
      uploading: false,
    }
  }

  static propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show && !this.props.show) {
      this.setState(state => ({value: '', preview: '', uploading: false}));
    }
  }

  onClickButton = (e) => {
    e.preventDefault();

    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.value);
    }
  }

  onDrop = (files) => {
    if (!files.length) {
      return;
    }

    this.setState(state => ({
      preview: files[0].preview,
      uploading: true,
    }));
    
    // request url to cloudinary
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${getSetting('cloudinary.cloudName')}/upload`;

    // request body
    const body = new FormData();
    body.append('file', files[0]);
    body.append('upload_preset', getSetting('cloudinary.editorPreset'));

    // post request to cloudinary
    fetch(cloudinaryUrl, {
      method: 'POST',
      body,
    })
    .then(res => res.json()) // json-ify the readable strem
    .then(body => {
      // use the https:// url given by cloudinary; or eager property if using transformations
      const newValue = body.eager ? body.eager[0].secure_url : body.secure_url;

      // set the uploading status to false
      this.setState(state => ({
        preview: '',
        uploading: false,
        value: newValue,
      }));
    })
    .catch(err => console.log('err', err));
  }

  removeImage = () => {
    this.setState(state => ({value: '', preview: ''}));
  }

  render() {
    const { value, preview, uploading } = this.state;
    const image = value || preview;

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
            <Dropzone
              multiple={false}
              onDrop={this.onDrop}
              accept="image/*"
              className="editor-dropzone"
              activeClassName="editor-dropzone-active"
              rejectClassName="editor-dropzone-reject"
            >
              <div><span>{getI18nMessage('editor.image.dropzone')}</span></div>
              {uploading ? <div className="editor-uploading"><span>{getI18nMessage('editor.uploading')}</span></div> : null}
            </Dropzone>
            {image ?
              <div className="editor-upload-result">
                <div className="editor-upload-image">
                  <img src={image} />
                  {this.state.uploading ? <div className="editor-uploading"><span>{getI18nMessage('editor.uploading')}</span></div> : null}
                </div>
                <a href="javascript:void(0)" onClick={this.removeImage}>
                  <Icon name='close'/>
                  <span>{getI18nMessage('editor.remove.image')}</span>
                </a>
              </div>
            : null}
            <button onClick={this.onClickButton}>{getI18nMessage('editor.add.image')}</button>
          </div>
        </Modal.Body>        
      </Modal>
    );
  }
}

export default EditorImageModal;
