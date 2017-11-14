import Topics from '../modules/topics/collection';

Topics.rawCollection().createIndex({ names: 'text'});
Topics.rawCollection().createIndex({ names: 1 });
Topics.rawCollection().createIndex({ categories: 1 });
