import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Components } from 'meteor/vulcan:core';

import AutoSuggestInput from './AutoSuggestInput';

class Chips extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    this.onClearButtonClick = this.onClearButtonClick.bind(this);
    this.onSuggestionClick = this.onSuggestionClick.bind(this);
    this.createAddNewChipFunc = this.createAddNewChipFunc.bind(this);
    this.addNewChip = this.addNewChip.bind(this);
    this.createDeleteChipFunc = this.createDeleteChipFunc.bind(this);
    this.deleteChip = this.deleteChip.bind(this);
    this.onChipKeyDown = this.onChipKeyDown.bind(this);
    this.onChipClick = this.onChipClick.bind(this);
    this.onChipButtonClick = this.onChipButtonClick.bind(this);

    // Storage for chips' DOM reference
    this.chips = [];

    this.state = {
      items: props.items || [],
      value: props.value || '',
    }
  }

  onChange(e) {
    const value = e.target.value;  
    this.setState(state => ({value: value}));
    
    if (this.props.onInputChange){
      this.props.onInputChange(e);
    }
  }

  onInputKeyDown(e) {
    switch(e.key) {
      case 'Enter':
        this.addNewChip(e.target.value);
        break;
      case 'ArrowLeft':
      case 'Backspace':
        if ((e.target.value == '') && this.state.items.length) {
          this.chips[this.state.items.length-1].focus();
        }
        break;
      case 'ArrowRight':
        if ((e.target.value == '') && this.state.items.length) {
          this.chips[0].focus();
        }
        break;
      default:  
    }
  }

  onClearButtonClick() {
    this.setState(state => ({ value: '' }));
    this.input.focus();
  }

  onSuggestionClick(value) {
    this.addNewChip(value);
  }

  createAddNewChipFunc(value) {
    return state => {
      return {
        items: [...state.items, value],
        value: '',
      }
    }
  }

  addNewChip(value) {
    // Check empty  
    if (value !== '') {
      // Check duplication & max chip number  
      if ((_.indexOf(this.state.items, value) == -1) && 
          (this.state.items.length < this.props.max)) {
        this.setState(this.createAddNewChipFunc(value));
      } else {
        this.setState(state => ({ value: '' }));
      }
    }
  }

  createDeleteChipFunc(index) {
    return state => {
      return {
        items: state.items.filter((item, idx) => idx !== index),
      }
    }
  }

  deleteChip(index) {
    if (index >= 0 && index < this.state.items.length) {
      // focus other items on delete
      // We must calculate next focused chip index before setState because it is asynchronous  
      if (this.state.items.length == 1) {
        this.input.focus();
      } else if (index == this.state.items.length-1) {
        this.chips[index-1].focus();
      } else {
        this.chips[index].focus();
      }
      this.setState(this.createDeleteChipFunc(index));
    }
  }

  onChipKeyDown(e) {
    if (!this.props.readOnly) {
      const chipIndex = e.target.value;  
      switch(e.key) {
        case 'ArrowLeft':
          if (chipIndex == 0) {
            this.input.focus();
          } else {
            this.chips[chipIndex-1].focus();
          }
          break;
        case 'ArrowRight':
          if (chipIndex == this.state.items.length-1) {
            this.input.focus();
          } else {
            this.chips[chipIndex+1].focus();
          }
          break;
        case 'Delete':
        case 'Backspace':
          this.deleteChip(chipIndex);
          break;  
        case 'Escape':
          this.input.focus();
          break;  
        default:
      }
    }
  }

  onChipClick(e) {
    // Set tabIndex = '-1' on li/div to make it focusable works perfectly fine
    // on desktop programically and manually, but only works programically on mobile.
    // So we have to register a click handler to manipulate focus state manually.

    // Click on close button also trigger this handler,
    // but we want to focus on input after chip deletion,
    // So we escape it by type check of e.target.value
    // typeof li.value = 'number', typeof button.value = 'string'
    if (e.target.value && typeof e.target.value === 'number') {
      this.chips[e.target.value].focus();
    }
  }

  onChipButtonClick(e) {
    if (!this.props.readOnly && e.currentTarget.value) {  
      // typeof index is string for button
      this.deleteChip(parseInt(e.currentTarget.value));
      this.input.focus();
    }
  }

  render() {
    return (
      <ul className={`chips${this.props.readOnly ? ' read-only' : ''}`}>
        {this.state.items.map((item, idx) => <li 
                                               className='chip' 
                                               tabIndex='-1' 
                                               key={idx}
                                               value={idx}
                                               onKeyDown={this.onChipKeyDown}
                                               onClick={this.onChipClick}
                                               ref={chip => this.chips[idx] = chip}
                                             >
                                               <div className='chip-content'>
                                                 <span>{item}</span>
                                                 {this.props.readOnly ||
                                                   <button className='chip-button' value={idx} onClick={this.onChipButtonClick}>
                                                     <Components.Icon name='close'/>
                                                   </button>
                                                 }
                                               </div>
                                            </li>)}
        {this.props.readOnly ||
          <li className='chip chip-input'>
            <AutoSuggestInput
              placeholder={this.props.placeholder}
              value={this.state.value}
              suggestions={this.props.suggestions}
              onChange={this.onChange}
              onInputKeyDown={this.onInputKeyDown}
              onSuggestionClick={this.onSuggestionClick}
              button={<Components.Icon name='close'/>}
              onButtonClick={this.onClearButtonClick}
              ref={input => this.input = input}
            />
          </li>
        }
      </ul>
    );
  }
}

Chips.propTypes = {
  items: PropTypes.array,
  readOnly: PropTypes.bool,
  suggestions: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
  onInputChange: PropTypes.func,
  max: PropTypes.number,
}

Chips.defaultProps = {
  items: [],
  readOnly: false,
  suggestions: [],
  placeholder: '',
  onInputChange: () => {},
  max: 5,
}

export default Chips;
