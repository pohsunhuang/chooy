import { Components, addRoute } from 'meteor/vulcan:core';

addRoute([
  { name: 'home', path:'/', componentName: 'Home'},
  { name: 'topics.page', path:'/topic/:topicId', componentName: 'TopicsPage'},
  { name: 'topics.new', path:'/new_topic/:topicName', componentName: 'TopicsNewForm' },
  { name: 'topics.search', path:'/search', componentName: 'TopicsSearch'}, 
]);
