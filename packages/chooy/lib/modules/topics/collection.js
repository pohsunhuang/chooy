import { createCollection, getDefaultMutations } from 'meteor/vulcan:core';

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

export default Topics;
