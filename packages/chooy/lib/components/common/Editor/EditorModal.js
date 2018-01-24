import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/lib/Modal';
import { Editor } from 'slate-react';

import { getI18nMessage } from '../../../modules/utils';

class EditorModal extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired,
    renderNode: PropTypes.func.isRequired,
    renderMark: PropTypes.func.isRequired,
  }

  onChange = () => {}

  render() {
    return (
      <Modal
        className={this.props.className}
        show={this.props.show}
        onHide={this.props.onHide}
        dialogClassName={this.props.dialogClassName}      
      >
        <Modal.Header className='editor-modal-header' closeButton>
          <Modal.Title>{getI18nMessage('editor.more')}</Modal.Title>
        </Modal.Header>  
        <Modal.Body>
          <div className='editor-modal-body'>
            <div className="editor">
              <Editor
                value={this.props.value}
                onChange={this.onChange}
                renderNode={this.props.renderNode}
                renderMark={this.props.renderMark}
                readOnly
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default EditorModal;
