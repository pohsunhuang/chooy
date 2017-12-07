import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor as SlateEditor } from 'slate-react';
import { Value } from 'slate';

import Icon from './Icons';

const DEFAULT_NODE = 'paragraph'

class Editor extends Component {
  constructor(props) {
    super(props);
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

  hasMark = (type) => {
    return this.props.value.activeMarks.some(mark => mark.type == type);
  }

  hasBlock = (type) => {
    return this.props.value.blocks.some(node => node.type == type);
  }

  onMarkClick = (e, type) => {
    e.preventDefault();
    const change = this.props.value.change().toggleMark(type);
    this.props.onChange(change);
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

  renderMarkButton = ({type, icon}, idx) => {
    const isActive = this.hasMark(type);
    const onClick = e => this.onMarkClick(e, type);
    const onMouseDown = e => e.preventDefault();

    return (
      <span key={idx} className="editor-button" onMouseDown={onMouseDown} onClick={onClick}>
        <Icon className={`editor-button-icon${isActive ? ' active' : ''}`} name={icon}/>
      </span>
    )
  }

  renderBlockButton = ({type, icon}, idx) => {
    const isActive = this.hasBlock(type);
    const onClick = e => this.onBlockClick(e, type);
    const onMouseDown = e => e.preventDefault();

    return (
      <span key={idx} className="editor-button" onMouseDown={onMouseDown} onClick={onClick}>
        <Icon className={`editor-button-icon${isActive ? ' active' : ''}`} name={icon} text={type == 'heading-one' ? '1' : (type == 'heading-two' ? '2' : '')}/>
      </span>
    )
  }

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
      </div>
    )
  }

  renderNode = (props) => {
    const { attributes, children, node } = props
    switch (node.type) {
      case 'block-quote': return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list': return <ul {...attributes}>{children}</ul>
      case 'heading-one': return <h1 {...attributes}>{children}</h1>
      case 'heading-two': return <h2 {...attributes}>{children}</h2>
      case 'list-item': return <li {...attributes}>{children}</li>
      case 'numbered-list': return <ol {...attributes}>{children}</ol>
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
