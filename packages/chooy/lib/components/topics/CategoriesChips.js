import React, { Component } from 'react';
import debounce from 'lodash.debounce';

import Topics from '../../modules/topics/collection';
import Chips from '../common/Chips';
import withSuggestions from '../../containers/withSuggestions';

const options = {
  collection: Topics,
  limit: 5,
}

const ChipsWithSuggestions = withSuggestions(options)(Chips);

class CategoriesChips extends Component {
  constructor(props) {
    super(props);
    this.updateQuery = debounce(query => this.setState(state => ({ query })), 500);
    this.onInputChange = this.onInputChange.bind(this);
    this.getValue = this.getValue.bind(this);

    this.state = {
      query: '',
    }
  }

  onInputChange(e) {
    const query = e.target.value;

    this.updateQuery(query);
  }

  getValue() {
    return this.chips ? this.chips.getValue() : [];
  }

  componentWillUnmount() {
    this.updateQuery.cancel();
  }

  render() {
    return (
      <ChipsWithSuggestions
        onInputChange={this.onInputChange}
        terms={{ query: this.state.query }}
        {...this.props}
      />
    );
  }
}

export default CategoriesChips;