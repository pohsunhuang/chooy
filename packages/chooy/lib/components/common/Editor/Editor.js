import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor as SlateEditor } from 'slate-react';
import { Value, Block, Inline, resetKeyGenerator } from 'slate';

import EditorModal from './EditorModal';
import EditorLinkModal from './EditorLinkModal';
import EditorImageModal from './EditorImageModal';
import Icon from '../Icons';

const DEFAULT_NODE = 'paragraph'

const EMPTY_JSON_VALUE = {
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
};

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLinkModal: false,
      linkModalUrlOnly: false,
      showImageModal: false,
      showMoreModal: false,
    }
  }

  static propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  static createEmptyValue = () => {
    // Reset global auto increment key generator to create the same DOM from both client and server side
    // for SSR to work properly
    // Reference: https://github.com/ianstormtaylor/slate/issues/53
    resetKeyGenerator();
    return Value.fromJSON(EMPTY_JSON_VALUE);
  }

  static createValuefromString = (str) => {
    // Reset global auto increment key generator to create the same DOM from both client and server side
    // for SSR to work properly
    // Reference: https://github.com/ianstormtaylor/slate/issues/53    
    resetKeyGenerator();
    return str ? Value.fromJSON(JSON.parse(str)) : Editor.createEmptyValue();
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

    if (type != 'bulleted-list' && type != 'ordered-list') {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock('list-item')

      if (isList) {
        change.setBlock(isActive ? DEFAULT_NODE : type)
              .unwrapBlock('bulleted-list')
              .unwrapBlock('ordered-list');
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
              .unwrapBlock('ordered-list');
      } else if (isList) {
        change.unwrapBlock(type == 'bulleted-list' ? 'ordered-list' : 'bulleted-list')
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
        <Icon className={`editor-button-icon${isActive ? ' active' : ''}`} name={icon} text={type == 'heading1' ? '1' : (type == 'heading2' ? '2' : '')}/>
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
   * More
   */

  onShowMoreModal = () => {
    this.setState(state => ({showMoreModal: true}));
  }

  onHideMoreModal = () => {
    this.setState(state => ({showMoreModal: false}));
  } 

  /*
   * Tool Bar
   */

  renderEditorToolBar = () => {
    const markButtons = [
      { type: 'bold', icon: 'bold'},
      { type: 'italic', icon: 'italic'},
      { type: 'underlined', icon: 'underline'},
      { type: 'code', icon: 'code'},
    ];

    const blockButtons = [
      { type: 'heading1', icon: 'square'},
      { type: 'heading2', icon: 'square'},
      { type: 'block-quote', icon: 'quote-right'},
      { type: 'ordered-list', icon: 'list-ol'},
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
      case 'heading1': return <h1 {...attributes}>{children}</h1>
      case 'heading2': return <h2 {...attributes}>{children}</h2>
      case 'list-item': return <li {...attributes}>{children}</li>
      case 'ordered-list': return <ol {...attributes}>{children}</ol>
      case 'link': return <a {...attributes} href={node.data.get('href')}>{children}</a>
      case 'image': return <img src={node.data.get('src')} className={`editor-image${isSelected ? ' active' : ''}`} {...attributes} />
      case 'more': return <a {...attributes} href='javascript:void(0)' onClick={this.onShowMoreModal}> {children}</a>
    }
  }

  renderMark = (props) => {
    const { children, mark } = props
    switch (mark.type) {
      case 'bold': return <strong>{children}</strong>
      case 'code': return <code>{children}</code>
      case 'italic': return <em>{children}</em>
      case 'underlined': return <u>{children}</u>
    }
  }

  validateNode = (node) => {
    const { readOnly, moreValue } = this.props;

    if (node.kind !== 'document') return;

    const lastNode = node.nodes.last();

    if (!lastNode) return;

    if (readOnly && moreValue) {
      if (lastNode.type !== 'paragraph') {
        // Add a paragraph node with 'more' at the end
        return (change) => {
          const paragraph = Block.create('paragraph');
          change.insertNodeByKey(node.key, node.nodes.size, paragraph)
          const newLastNode = change.value.document.getNode(paragraph.key);
  
          const more = Inline.create({type: 'more', nodes: [{ kind: 'text', leaves: [{ kind: 'leaf', text: 'more', marks: []}]}]});
          change.insertNodeByKey(newLastNode.key, newLastNode.nodes.size, more);
        }
      } else {
        // Add 'more' if last paragraph node doesn't have it
        if (!lastNode.nodes.some(node => node.type === 'more')) {
          return (change) => {
            const more = Inline.create({type: 'more', nodes: [{ kind: 'text', leaves: [{ kind: 'leaf', text: 'more', marks: []}]}]});
            change.insertNodeByKey(lastNode.key, lastNode.nodes.size, more);
          }
        }        
      }
    } else {
      if (lastNode.type === 'image') {
        return (change) => {
          const paragraph = Block.create('paragraph');
          change.insertNodeByKey(node.key, node.nodes.size, paragraph);
        }
      }
    }
  }

  render() {
    const { value, moreValue, onChange, readOnly, placeholder } = this.props;

    return (
      <div className='editor-wrapper'>
        {readOnly ? null : this.renderEditorToolBar()}
        <div className="editor">
          <SlateEditor
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            renderNode={this.renderNode}
            renderMark={this.renderMark}
            validateNode={this.validateNode}
            readOnly={readOnly}
          />
        </div>
        {(readOnly && moreValue) ? 
          <EditorModal
            show={this.state.showMoreModal}
            onHide={this.onHideMoreModal}
            value={moreValue}
            renderNode={this.renderNode}
            renderMark={this.renderMark}
        /> : null}
      </div>
    );
  }
}

export default Editor;
