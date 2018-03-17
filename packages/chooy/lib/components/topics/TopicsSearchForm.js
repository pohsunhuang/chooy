import React, { Component } from 'react';
import { Components, registerComponent, withList } from 'meteor/vulcan:core';
import debounce from 'lodash.debounce';
import { withRouter } from 'react-router';
import Button from 'react-bootstrap/lib/Button';

import Topics from '../../modules/topics/collection';
import { getI18nMessage } from '../../modules/utils';

class TopicsSearchForm extends Component {
  constructor(props){
    super(props);

    this.updateInputValue = this.updateInputValue.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    this.hideAutoComplete = this.hideAutoComplete.bind(this);
    this.onAutoCompleteMouseDown = this.onAutoCompleteMouseDown.bind(this);
    this.onAutoCompleteClick = this.onAutoCompleteClick.bind(this);
    this.onAutoCompleteTouchMove = this.onAutoCompleteTouchMove.bind(this);
    this.updateAutoComplete = debounce((value) => {
      props.updateQuery(value);
      this.setState({showAutoComplete: true, selectedTopicIndex: 0});
    }, 500);
    this.onSearchClick = this.onSearchClick.bind(this);

    this.state = {
      inputValue: props.router.location.query.query || '',
      showAutoComplete: false,
      selectedTopicIndex: 0,
    }
  }

  componentWillUnmount() {
    this.updateAutoComplete.cancel();
  }

  updateInputValue(value) {
    this.setState({inputValue: value});
  }

  onInputChange(e) {
    if( e.target.value !== this.state.inputValue) {
      this.updateInputValue(e.target.value);
      this.updateAutoComplete(e.target.value);
    }
  }

  onInputKeyDown(e){
    let newSelectedIndex = this.state.selectedTopicIndex;
    if(this.state.showAutoComplete && this.props.results.length){
      switch(e.key){
        case 'ArrowUp':
          e.preventDefault();
          newSelectedIndex = !newSelectedIndex ? this.props.results.length : newSelectedIndex-1;
          this.updateInputValue(newSelectedIndex ? this.props.results[newSelectedIndex-1].foundName : this.props.query);
          break;
        case 'ArrowDown':
          e.preventDefault();
          newSelectedIndex = (newSelectedIndex+1) % (this.props.results.length+1);
          this.updateInputValue(newSelectedIndex ? this.props.results[newSelectedIndex-1].foundName : this.props.query);
          break;
        case 'Escape':
          this.hideAutoComplete();
          newSelectedIndex = 0;
          break;
        default:
      }

      this.setState({selectedTopicIndex: newSelectedIndex});
    }
    else {
      this.setState({selectedTopicIndex: 0});
    }
  }    

  hideAutoComplete() {
    this.setState({showAutoComplete: false});
  }

  onAutoCompleteMouseDown(e) {
    //Prevent auto complete item from gaining focus.
    //If auto complete item gains focus and input field loses it, 
    //AutoComplete will be hidden by the blur handler of input field before we can finish the click.
    e.preventDefault();
  }

  onAutoCompleteClick(e) {
    e.preventDefault();
    if(this.state.selectedTopicIndex > 0) {
      this.updateAutoComplete.cancel();
      this.hideAutoComplete();
      this.props.router.push(`/search?query=${this.props.results[this.state.selectedTopicIndex-1].foundName}&offset=0`);
    }
  }

  onAutoCompleteTouchMove() {
    this.setState({selectedTopicIndex: 0});
  }

  onSearchClick(e) {
    e.preventDefault();
    this.updateAutoComplete.cancel();
    this.hideAutoComplete();
    this.props.router.push(`/search?query=${this.state.inputValue}&offset=0`);
  }

  render() {
    return (
      <div className='topics-search-form'>
        <form>
          <input
            className='topics-search-input'
            placeholder={getI18nMessage('topics.search')}
            value={this.state.inputValue} 
            onChange={this.onInputChange}
            onBlur={this.hideAutoComplete}
            onKeyDown={this.onInputKeyDown}
          />    
          <div onMouseDown={this.onAutoCompleteMouseDown}>
            {(this.state.showAutoComplete && this.props.results.length > 0) && (
              <div className='auto-complete'>
                {this.props.loading ? <Components.Loading/> :
                  this.props.results.map((topic, index) => {
                    return (
                      <div 
                        className={`auto-complete-item` + ((index+1 == this.state.selectedTopicIndex) ? ` active` : ``)}
                        key={topic._id}
                        onMouseOver={() => { this.setState({selectedTopicIndex: index+1}) }}
                        onClick={this.onAutoCompleteClick}
                        onTouchStart={() => { this.setState({selectedTopicIndex: index+1}) }}
                        onTouchMove={this.onAutoCompleteTouchMove}
                        onTouchEnd={this.onAutoCompleteClick}
                      ><span>{topic.foundName}</span></div>
                    )
                  })
                }
              </div>)
            }
          </div>
          <Button
            className='topics-search-button' 
            type='submit' 
            bsStyle='primary' 
            onClick={this.onSearchClick}
          >
            <Components.Icon name='search'/>
          </Button>
        </form>
      </div>
    )
  }
}  

const options = {
  collection: Topics,
  fragmentName: 'TopicsAutoCompleteFragment',
  limit: 5,
  pollInterval: 0,
}

registerComponent('TopicsSearchFormWithRouter', TopicsSearchForm, [withList, options], withRouter);

class TopicsSearchFormWithTerms extends Component {
  constructor(props){
    super(props);

    this.updateQuery = this.updateQuery.bind(this);

    this.state = {
      query: '',
    }
  }

  updateQuery(value) {
    this.setState({query: value});
  }

  render() {
    return (
      <Components.TopicsSearchFormWithRouter 
        terms={{query: this.state.query, nothingForEmptyQuery: true, unique: true}}
        query={this.state.query}
        updateQuery={this.updateQuery}
      />
    )
  }
}

registerComponent('TopicsSearchForm', TopicsSearchFormWithTerms);
