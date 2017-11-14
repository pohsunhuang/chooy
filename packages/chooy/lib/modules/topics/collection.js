import { createCollection, getDefaultMutations, addGraphQLQuery, addGraphQLResolvers } from 'meteor/vulcan:core';

import schema from './schema.js';
import resolvers from './resolvers';
import './fragments.js';
import './permissions.js';
import './parameters.js';



const Topics = createCollection({
  schema,
  collectionName: 'Topics',
  typeName: 'Topic',
  resolvers,
  mutations: getDefaultMutations('Topics'),
});

// createCollection support only list/single/total resolver
// so we have to add our custom resolver and query manually
addGraphQLQuery(`${resolvers.suggestions.name}(terms: JSON): [String]`);
addGraphQLResolvers({ Query: { [resolvers.suggestions.name]: resolvers.suggestions.resolver } });

export default Topics;
