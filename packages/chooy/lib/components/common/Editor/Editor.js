import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Components } from 'meteor/vulcan:core';
import { Editor as SlateEditor } from 'slate-react';
import { Value } from 'slate';

import EditorSchema from './EditorSchema';
import EditorLinkModal from './EditorLinkModal';
import EditorImageModal from './EditorImageModal';
import Icon from '../Icons';

const DEFAULT_NODE = 'paragraph'

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLinkModal: false,
      linkModalUrlOnly: false,
      showImageModal: false,
    }
  }

  static propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  static createEmptyValue = () => {
    return Value.fromJSON({
      document: {
          nodes: [
            {
              kind: 'block',
              type: 'paragraph',
              nodes: [
                {
                  kind: 'text',
                  leaves: [
                    {
                      text: '',
                    }
                  ]
                }
              ]
            }
          ]
        }
    });
  }

  /*
   * Mark Button
   */

  hasMark = (type) => {
    return this.props.value.activeMarks.some(mark => mark.type == type);
  }

  onMarkClick = (e, type) => {
    e.preventDefault();
    const change = this.props.value.change().toggleMark(type);
    this.props.onChange(change);
  }

  renderMarkButton = ({type, icon}, idx) => {
    const isActive = this.hasMark(type);
    const onClick = e => this.onMarkClick(e, type);
    const onMouseDown = e => e.preventDefault();

    return (
      <span key={idx} className="editor-button" onMouseDown={onMouseDown} onClick={onClick}>
        <Icon className={`editor-button-icon${isActive ? ' active' : ''}`} name={icon}/>
      </span>
    );
  }  

  /*
   * Block Button 
   */

  hasBlock = (type) => {
    return this.props.value.blocks.some(node => node.type == type);
  }

  onBlockClick = (e, type) => {
    e.preventDefault();
    const change = this.props.value.change();

    if (type != 'bulleted-list' && type != 'numbered-list') {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock('list-item')

      if (isList) {
        change.setBlock(isActive ? DEFAULT_NODE : type)
              .unwrapBlock('bulleted-list')
              .unwrapBlock('numbered-list');
      } else {
        change.setBlock(isActive ? DEFAULT_NODE : type);
      }
    } else {
      const isList = this.hasBlock('list-item')
      const isType = this.props.value.blocks.some((block) => {
        return !!this.props.value.document.getClosest(block.key, parent => parent.type == type)
      })

      if (isList && isType) {
        change.setBlock(DEFAULT_NODE)
              .unwrapBlock('bulleted-list')
              .unwrapBlock('numbered-list');
      } else if (isList) {
        change.unwrapBlock(type == 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
              .wrapBlock(type);
      } else {
        change.setBlock('list-item').wrapBlock(type);
      }
    }

    this.props.onChange(change);
  }

  renderBlockButton = ({type, icon}, idx) => {
    const isActive = this.hasBlock(type);
    const onClick = e => this.onBlockClick(e, type);
    const onMouseDown = e => e.preventDefault();

    return (
      <span key={idx} className="editor-button" onMouseDown={onMouseDown} onClick={onClick}>
        <Icon className={`editor-button-icon${isActive ? ' active' : ''}`} name={icon} text={type == 'heading-one' ? '1' : (type == 'heading-two' ? '2' : '')}/>
      </span>
    );
  }

  /*
   * Link Button 
   */

  wrapLink = (change, href) => {
    change.wrapInline({
      type: 'link',
      data: { href },
    });
  
    change.collapseToEnd();
  }
  
  unwrapLink = (change) => {
    change.unwrapInline('link');
  }

  hasLinks = () => {
    return this.props.value.inlines.some(inline => inline.type == 'link');
  }

  onShowLinkModal = (linkModalUrlOnly) => {
    this.setState(state => ({showLinkModal: true, linkModalUrlOnly}));
  }

  onHideLinkModal = () => {
    this.setState(state => ({showLinkModal: false}))
  }

  onSubmitLink = (url, text) => {
    const change = this.props.value.change();

    if (this.props.value.isExpanded) {
      change.call(this.wrapLink, url);
    } else {
      change.insertText(text)
            .extend(0 - text.length)
            .call(this.wrapLink, url);      
    }

    this.props.onChange(change);
    this.onHideLinkModal();
  }

  onClickLink = (e) => {
    e.preventDefault();
    const change = this.props.value.change();

    if (this.hasLinks()) {
      change.call(this.unwrapLink);
    } else if (this.props.value.isExpanded) {
      this.onShowLinkModal(true);
    } else {
      this.onShowLinkModal(false);
    }

    this.props.onChange(change);
  }

  renderLinkButton = () => {
    const isActive = this.hasLinks();
    const onMouseDown = e => e.preventDefault();

    return (
      <span className='editor-button' onMouseDown={onMouseDown} onClick={this.onClickLink}>
        <Icon className={`editor-button-icon${isActive ? ' active' : ''}`} name='link'/>
        <EditorLinkModal
          show={this.state.showLinkModal}
          onHide={this.onHideLinkModal}
          onSubmit={this.onSubmitLink}
          urlOnly={this.state.linkModalUrlOnly}
        />
      </span>
    );
  }

  /*
   * Image Button 
   */

  insertImage = (change, src) => {
    change.insertBlock({
      type: 'image',
      isVoid: true,
      data: { src }
    });
  }

  onShowImageModal = () => {
    this.setState(state => ({showImageModal: true}));
  }

  onHideImageModal = () => {
    this.setState(state => ({showImageModal: false}));
  }

  onSubmitImage = (url) => {
    if (url) {
      const change = this.props.value.change();
      change.call(this.insertImage, url);
      this.props.onChange(change);
    }

    this.onHideImageModal();
  }

  onClickImage = (e) => {
    e.preventDefault();
    this.onShowImageModal(true);
  }

  renderImageButton = () => {
    const onMouseDown = e => e.preventDefault();

    return (
      <span className='editor-button' onMouseDown={onMouseDown} onClick={this.onClickImage}>
        <Icon className={`editor-button-icon`} name='image'/>
        <EditorImageModal
          show={this.state.showImageModal}
          onHide={this.onHideImageModal}
          onSubmit={this.onSubmitImage}
        />
      </span>
    );
  }  

  /*
   * Tool Bar
   */

  renderEditorToolBar = () => {
    const markButtons = [
      { type: 'bold', icon: 'bold'},
      { type: 'italic', icon: 'italic'},
      { type: 'underline', icon: 'underline'},
      { type: 'code', icon: 'code'},
    ];

    const blockButtons = [
      { type: 'heading-one', icon: 'square'},
      { type: 'heading-two', icon: 'square'},
      { type: 'block-quote', icon: 'quote-right'},
      { type: 'numbered-list', icon: 'list-ol'},
      { type: 'bulleted-list', icon: 'list-ul'},
    ];

    return (
      <div className="editor-toolbar">
        {markButtons.map((markButton, idx) => this.renderMarkButton(markButton, idx))}
        {blockButtons.map((blockButton, idx) => this.renderBlockButton(blockButton, idx))}
        {this.renderLinkButton()}
        {this.renderImageButton()}
      </div>
    )
  }

  renderNode = (props) => {
    const { attributes, children, node, isSelected } = props
    switch (node.type) {
      case 'block-quote': return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list': return <ul {...attributes}>{children}</ul>
      case 'heading-one': return <h1 {...attributes}>{children}</h1>
      case 'heading-two': return <h2 {...attributes}>{children}</h2>
      case 'list-item': return <li {...attributes}>{children}</li>
      case 'numbered-list': return <ol {...attributes}>{children}</ol>
      case 'link': return <a {...attributes} href={node.data.get('href')}>{children}</a>
      case 'image': return <img src={node.data.get('src')} className={`editor-image${isSelected ? ' active' : ''}`} {...attributes} />
    }
  }

  renderMark = (props) => {
    const { children, mark } = props
    switch (mark.type) {
      case 'bold': return <strong>{children}</strong>
      case 'code': return <code>{children}</code>
      case 'italic': return <em>{children}</em>
      case 'underline': return <u>{children}</u>
    }
  }

  render() {
    return (
      <div className='editor-wrapper'>
        {this.props.readOnly ? null : this.renderEditorToolBar()}
        <div className="editor">
          <SlateEditor
            value={this.props.value}
            onChange={this.props.onChange}
            schema={EditorSchema}
            renderNode={this.renderNode}
            renderMark={this.renderMark}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

export default Editor;
