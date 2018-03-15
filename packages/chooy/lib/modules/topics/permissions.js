import Users from 'meteor/vulcan:users';

Users.groups.members.can([
  'topics.new',
  'topics.edit.own', // the permission check within default_mutation is buggy, specify edit.all doesn't grant you the right to edit.own
  'topics.edit.all',
  'topics.remove.own',
]);
