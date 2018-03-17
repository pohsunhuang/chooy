import Topics from '../modules/topics/collection';

Topics.rawCollection().createIndex({ title: 'text', names: 'text'});
Topics.rawCollection().createIndex({ title: 1 });
Topics.rawCollection().createIndex({ names: 1 });
Topics.rawCollection().createIndex({ categories: 1 });
