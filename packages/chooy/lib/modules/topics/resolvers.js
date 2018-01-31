import { getDefaultResolvers } from 'meteor/vulcan:core';
import _ from 'lodash';
import { findMostRelevantString } from '../utils';

const defaultResolvers = getDefaultResolvers('Topics');

const resolvers = {
  ...defaultResolvers,
  list: {
    ...defaultResolvers.list,
    async resolver(root, {terms}, context, info) {
      if (terms.query) {
        // get currentUser and Users collection from context
        const { currentUser, Users } = context;

        // get collection based on collectionName argument
        const collection = context['Topics'];

        // get options from terms
        let {options} = await collection.getParameters(terms);
        options.skip = terms.offset;

        // get selector from terms
        const textSelector = { $text: { $search: terms.query } };
        const prefixSelector = { names: { $regex: '^' + terms.query, $options: '-i' } };
        let selectors = [];
        if ( terms.searchText ) {
          selectors.push(textSelector);
        }

        selectors.push(prefixSelector);

        // preform Mongo query
        const tmpDocs = collection.find({$or: selectors}, options).fetch();

        // remove aliases for auto-complete
        // leave 1 alias for search results
        if (!terms.searchText) {
          tmpDocs.forEach((doc) => {
            const name = findMostRelevantString(doc.names, terms.query);
            doc.names = [name];
          });
        } else {
          tmpDocs.forEach((doc) => {
            doc.names = _.take(doc.names, 2);
          });
        }

        // remove duplication if needed
        const docs = terms.unique ? _.uniqBy(tmpDocs, 'names[0]') : tmpDocs;

        // if collection has a checkAccess function defined, remove any documents that doesn't pass the check
        const viewableDocs = collection.checkAccess ? _.filter(docs, doc => collection.checkAccess(currentUser, doc)) : docs;
        
        // take the remaining documents and remove any fields that shouldn't be accessible
        const restrictedDocs = Users.restrictViewableFields(currentUser, collection, viewableDocs);

        // prime the cache
        restrictedDocs.forEach(doc => collection.loader.prime(doc._id, doc));

        // return results
        return restrictedDocs;
      } else {
        return terms.nothingForEmptyQuery ? [] : defaultResolvers.list.resolver(root, {terms}, context, info);
      }
    }
  },

  total: {
    ...defaultResolvers.total,
    async resolver(root, {terms}, context, info) {
      if (terms.query) {
        const collection = context['Topics'];

        const textSelector = { $text: { $search: terms.query } };
        const prefixSelector = { names: { $regex: '^' + terms.query, $options: '-i' } };
        let selectors = [];
        if ( terms.searchText ) {
          selectors.push(textSelector);
        }

        selectors.push(prefixSelector);

        return collection.find({$or: selectors}).count();
      } else {
        return terms.nothingForEmptyQuery ? 0 : defaultResolvers.total.resolver(root, {terms}, context, info);
      }     
    }
  },

  suggestions: {
    name: `TopicsSuggestions`,
    async resolver(root, {terms}, context, info) {
      if (terms.query) {
        // get collection based on collectionName argument
        const collection = context['Topics'];

        // get options from terms
        let {options} = await collection.getParameters(terms);

        // get selector from terms
        const selector = { categories: { $regex: '^' + terms.query, $options: '-i' } };

        const suggestions = [];
        const {limit} = options;
        const re = new RegExp(`^${terms.query}`, 'i');

        // initialize search options
        options.skip = 0;
        options.limit = 20;

        while(suggestions.length < limit) {
          // preform Mongo query
          const docs = collection.find(selector, options).fetch();

          docs.forEach(doc => doc.categories.forEach(category => {
            if (re.test(category) && _.indexOf(suggestions, category) === -1) {
              suggestions.push(category);
            }
          }))

          // no more candidates
          if (docs.length < options.limit) {
            break;
          }

          options.skip += options.limit;
        }

        // reduce suggestions if needed
        return _.take(suggestions, limit);
      } else {
        return [];
      }
    }
  },
}

export default resolvers;