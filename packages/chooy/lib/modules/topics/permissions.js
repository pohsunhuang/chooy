import Users from 'meteor/vulcan:users';

Users.groups.members.can([
  'topics.new',
  'topics.edit.all',
  'topics.remove.own',
]);
