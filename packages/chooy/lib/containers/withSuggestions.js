import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const withSuggestions = options => {
  const { collection, pollInterval = 0, limit = 5 } = options;
  const queryName = options.queryName || `${collection.options.collectionName}SuggestionsQuery`;
  const suggestionsResolverName = collection.options.resolvers.suggestions && collection.options.resolvers.suggestions.name;

  return graphql(gql`
    query ${queryName}($terms: JSON) {
      ${suggestionsResolverName}(terms: $terms)
    }
  `, {
    alias: 'withSuggestions',
    options({ terms }) {
      return {
        variables: { terms: {...terms, limit} },
        pollInterval,
      }
    },
    props({ ownProps: {refFunction}, data }) {
      return {
        loading: data.loading,
        suggestions: data[suggestionsResolverName],
        // ref method doesn't passed down to child component by HOC
        // React has no official solution now (2017/11/14)
        // so we have to pass it down to wrapped child component manually
        ref: refFunction,
      }
    }
  });
}

export default withSuggestions;