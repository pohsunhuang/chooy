import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getSetting } from 'meteor/vulcan:lib';
import Dropzone from 'react-dropzone';
import 'cross-fetch/polyfill';

import Icon from './Icons';
import { getI18nMessage } from '../../modules/utils';

const MODE_NORMAL = 0;
const MODE_URL_ONLY = 1;

const typeInfos = [
  { type: 'editor', preset: getSetting('cloudinary.editorPreset'), mode: MODE_URL_ONLY },
  { type: 'cover',  preset: getSetting('cloudinary.coverPreset'), mode: MODE_NORMAL },
]

class ImageUploader extends Component {
  constructor(props) {
    super(props);

    this.state ={
      preview: '',
      uploading: false,
    }
  }

  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)), PropTypes.string]),
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.value) {
      this.setState(state => ({preview: '', uploading: false}));
    }
  }

  onDrop = (files) => {
    const { type } = this.props;

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
    const typeInfo = typeInfos.find(typeInfo => typeInfo.type === type) || typeInfos[0].preset;
    body.append('upload_preset', typeInfo.preset);

    // post request to cloudinary
    fetch(cloudinaryUrl, {
      method: 'POST',
      body,
    })
    .then(res => res.json()) // json-ify the readable strem
    .then(body => {
      let newValue;
      if (typeInfo.mode === MODE_URL_ONLY) {
        newValue = body.eager ? body.eager[0].secure_url : body.secure_url;
      } else {
        newValue = body.eager ? [body.eager] : body.secure_url;
      } 

      // set the uploading status to false
      this.setState(state => ({uploading: false}));

      // set the value
      if (newValue) {
        this.props.onChange(newValue);
      } else {
        this.setState(state => ({preview: ''}));
      }
    })
    .catch(err => console.log('err', err));
  }

  removeImage = () => {
    this.props.onChange('');
  }

  getImage = () => {
    const { value } = this.props;
    const { preview } = this.state;
    const image = (typeof value === 'string') ? value : (value.length ? value[0][0].secure_url : '');

    return preview || image;
  }

  render() {
    const { uploading } = this.state;
    const image = this.getImage();

    return (
      <div className='image-uploader'>
        <Dropzone
          multiple={false}
          onDrop={this.onDrop}
          accept="image/*"
          className="image-dropzone"
          activeClassName="image-dropzone-active"
          rejectClassName="image-dropzone-reject"
        >
          <div><span>{getI18nMessage('image.dropzone')}</span></div>
          {uploading ? <div className="image-uploading"><span>{getI18nMessage('uploading')}</span></div> : null}
        </Dropzone>
        {image ?
          <div className="image-upload-result">
            <div className="uploaded-image">
              <img src={image} />
              {uploading ? <div className="image-uploading"><span>{getI18nMessage('uploading')}</span></div> : null}
            </div>
            <a href="javascript:void(0)" onClick={this.removeImage}>
              <Icon name='close'/>
              <span>{getI18nMessage('remove.image')}</span>
            </a>
          </div>
        : null}
      </div>
    );
  }
}

export default ImageUploader;
