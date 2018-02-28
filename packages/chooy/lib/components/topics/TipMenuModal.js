import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/lib/Modal';

import Icon from '../common/Icons';
import { getI18nMessage } from '../../modules/utils';

class TipMenuModal extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    tipIndex: PropTypes.number.isRequired,
  }

  createButtonClickHandler = (buttonType) => {
    return (e) => {
      const { onClick, tipIndex } = this.props;  
      e.preventDefault();
      onClick(tipIndex, buttonType);
      this.props.onHide();
    }
  }

  menuItems = [
    {icon: 'edit',       name: 'Edit', handler: this.createButtonClickHandler('edit')},
    {icon: 'arrow-up',   name: 'Move to top', handler: this.createButtonClickHandler('moveTop')},
    {icon: 'arrow-up',   name: 'Move up', handler: this.createButtonClickHandler('moveUp')},
    {icon: 'arrow-down', name: 'Move down', handler: this.createButtonClickHandler('moveDown')},
    {icon: 'arrow-down', name: 'Move to bottom', handler: this.createButtonClickHandler('moveBottom')},
    {icon: 'trash',      name: 'Delete', handler: this.createButtonClickHandler('delete')},      
    {icon: 'close',      name: 'Cancel', handler: this.createButtonClickHandler('cancel')},
  ];

  render() {

    return (
      <Modal
        className={this.props.className}
        show={this.props.show}
        onHide={this.props.onHide}
        dialogClassName={this.props.dialogClassName}      
      >
        <Modal.Body className='tip-menu-body'>        
          {this.menuItems.map((menuItem, idx) => {
            return (
              <button key={idx} className='tip-menu-item' onClick={menuItem.handler}>
                <Icon className='tip-menu-icon' name={menuItem.icon}/>
                <span className='tip-menu-item-name'>{menuItem.name}</span>
              </button>
            );
          })}
        </Modal.Body>        
      </Modal>          
    );
  }
}

export default TipMenuModal;
