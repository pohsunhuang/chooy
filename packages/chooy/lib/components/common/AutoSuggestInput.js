import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent} from 'meteor/vulcan:core';
import escapeStringRegexp from 'escape-string-regexp';

class AutoSuggestInput extends React.Component {
  constructor(props) {
    super(props);
    this.createfilteredSuggestions = this.createfilteredSuggestions.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSuggestionMouseDown = this.onSuggestionMouseDown.bind(this);
    this.onSuggestionClick = this.onSuggestionClick.bind(this);
    this.onSuggestionTouchMove = this.onSuggestionTouchMove.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.focus = this.focus.bind(this);
    this.onBlur = this.onBlur.bind(this);
      
    this.state = {
      showDefault: true,
      showSuggestions: false,
      selectedIndex: -1,
      filteredSuggestions: this.createfilteredSuggestions(props),
    }
  }
    
  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.suggestions, nextProps.suggestions) || (this.props.value != nextProps.value))
    this.setState(state => ({
      selectedIndex: -1,
      filteredSuggestions: this.createfilteredSuggestions(nextProps),
    }));
  }

  createfilteredSuggestions({ value, suggestions }) {
    if (!value || !suggestions) {
      return [];
    } else {
      const re = new RegExp(`^${escapeStringRegexp(value)}`, 'i');
      return suggestions.filter(suggestion => re.test(suggestion))
    }
  }

  onChange(e){
    this.setState(state => ({
      showDefault: false,
      showSuggestions: true,
      selectedIndex: -1
    }));
      
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }
    
  onKeyDown(e){
    const { onSelectedIndexChange, value } = this.props;
    const { selectedIndex, showSuggestions, filteredSuggestions } = this.state;
    let newSelectedIndex = selectedIndex;
      
    if (showSuggestions){
      switch(e.key) {
        case 'Escape':
          this.setState(state => ({showSuggestions: false}));
          break;
        case 'ArrowUp':
          e.preventDefault();
          newSelectedIndex = selectedIndex === -1 ? filteredSuggestions.length-1 : selectedIndex-1;
          break;
        case 'ArrowDown':
          e.preventDefault();
          newSelectedIndex = selectedIndex === filteredSuggestions.length-1 ? -1 : selectedIndex+1;
          break;
        default:  
      }
    }
      
    if (newSelectedIndex !== selectedIndex) {
      this.setState(state => ({selectedIndex: newSelectedIndex}));
  
      if (onSelectedIndexChange) {
        const selectedValue = newSelectedIndex === -1 ? value : filteredSuggestions[newSelectedIndex];
        onSelectedIndexChange(selectedValue);
      }
    }
      
    if (this.props.onInputKeyDown) {
      this.props.onInputKeyDown(e);
    }
  }

  onButtonClick(e) {
    e.preventDefault();
    this.setState(state => ({showSuggestions: false}));

    if (this.props.onButtonClick) {
      this.props.onButtonClick(this.props.value);
    }
  }

  onSuggestionMouseDown(e) {
    //Prevent auto complete item from gaining focus.
    //If auto complete item gains focus and input field loses it, 
    //AutoComplete will be hidden by the blur handler of input field before we can finish the click.
    e.preventDefault();
  }

  onSuggestionClick(e) {
    e.preventDefault();
    if(this.state.selectedIndex >= 0) {
      this.setState(state => ({showSuggestions: false}));

      if (this.props.onSuggestionClick) {
        const value = this.state.filteredSuggestions[this.state.selectedIndex];
        this.props.onSuggestionClick(value);  
      }
    }
  }

  onSuggestionTouchMove() {
    this.setState(state => ({selectedIndex: -1}));
  }

  focus() {
    this.input.focus();
  }
    
  onBlur() {
    this.setState(state => ({showSuggestions: false}));

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }
  
  render() {
    const { showDefault, showSuggestions, selectedIndex, filteredSuggestions } = this.state;
    const { defaultValue, value, placeholder } = this.props;
  
    return (
      <div className='auto-suggest-wrapper'>
        <input
          className='auto-suggest-input'
          value={(showDefault && defaultValue) ? defaultValue : (selectedIndex == -1 ? value : filteredSuggestions[selectedIndex])}
          placeholder={placeholder}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          onBlur={this.onBlur}
          ref={input => this.input = input}
        />
        {this.props.button ? 
          <button className='auto-suggest-button' onClick={this.onButtonClick}>
            {this.props.button}
          </button> : null}
        {(showSuggestions && filteredSuggestions && filteredSuggestions.length) ? 
          <div className='auto-suggest' onMouseDown={this.onSuggestionMouseDown}>
            {filteredSuggestions.map((suggestion, idx) =>
              <div 
                className={`auto-suggest-item${idx == selectedIndex ? ' active': ''}`}
                key={idx}
                onMouseOver={() => this.setState(state => ({selectedIndex: idx}))}
                onClick={this.onSuggestionClick}
                onTouchStart={() => this.setState(state => ({selectedIndex: idx}))}
                onTouchMove={this.onSuggestionTouchMove}
                onTouchEnd={this.onSuggestionClick}
              >
                <span>{suggestion}</span>
              </div>)}
          </div> : null}
      </div>
    )
  }
}

AutoSuggestInput.propTypes = {
  defaultValue: PropTypes.string,  
  value: PropTypes.string,
  placeholder: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  onInputKeyDown: PropTypes.func,
  onSelectedIndexChange: PropTypes.func,
  onSuggestionClick: PropTypes.func,
  button: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onButtonClick: PropTypes.func,
  onBlur: PropTypes.func,
}

AutoSuggestInput.defaultProps = {
  value: '',
  placeholder: '',
  suggestions: [],
  onChange: () => {},
  onInputKeyDown: () => {},
  onSelectedIndexChange: () => {},
  onSuggestionClick: () => {},
  button: '',
  onButtonClick: () => {},
  onBlur: () => {},
}

export default AutoSuggestInput;