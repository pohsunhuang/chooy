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
    onExited: PropTypes.func,    
    tipIndex: PropTypes.number.isRequired,
    tipsLength: PropTypes.number.isRequired,
  }

  static defaultProps = {
    onExited: () => {},
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
    {icon: 'edit',       name: 'edit',           handler: this.createButtonClickHandler('edit')},
    {icon: 'arrow-up',   name: 'move.to.top',    handler: this.createButtonClickHandler('moveTop')},
    {icon: 'arrow-up',   name: 'move.up',        handler: this.createButtonClickHandler('moveUp')},
    {icon: 'arrow-down', name: 'move.down',      handler: this.createButtonClickHandler('moveDown')},
    {icon: 'arrow-down', name: 'move.to.bottom', handler: this.createButtonClickHandler('moveBottom')},
    {icon: 'trash',      name: 'remove',         handler: this.createButtonClickHandler('delete')},      
    {icon: 'close',      name: 'cancel',         handler: this.createButtonClickHandler('cancel')},
  ];

  renderMenuItems = () => {
    const { tipIndex, tipsLength } = this.props;

    return this.menuItems.map((menuItem, idx) => {
      if ((menuItem.name === 'move.to.top' && tipIndex === 0) ||
          (menuItem.name === 'move.up' && tipIndex <= 1) ||
          (menuItem.name === 'move.down' && tipIndex >= tipsLength - 2) ||
          (menuItem.name === 'move.to.bottom' && tipIndex === tipsLength - 1)) {
        return null;
      } else {
        return (
          <button key={idx} className='tip-menu-item' onClick={menuItem.handler}>
            <Icon className='tip-menu-icon' name={menuItem.icon}/>
            <span className='tip-menu-item-name'>{getI18nMessage(menuItem.name)}</span>
          </button>
        );
      }
    });
  }

  render() {
    const { className, show, onHide, dialogClassName, onExited } = this.props;

    return (
      <Modal
        className={className}
        show={show}
        onHide={onHide}
        onExited={onExited}        
        dialogClassName={dialogClassName}
      >
        <Modal.Body className='tip-menu-body'>        
          {this.renderMenuItems()}
        </Modal.Body>        
      </Modal>          
    );
  }
}

export default TipMenuModal;
