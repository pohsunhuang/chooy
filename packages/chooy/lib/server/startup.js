import { createSeedData } from './seed';

Meteor.startup(function () {
  createSeedData();
});