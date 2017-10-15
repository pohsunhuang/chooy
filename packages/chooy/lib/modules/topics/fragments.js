import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment TopicsAutoCompleteFragment on Topic {
    _id
    names
  }
`);

registerFragment(`
  fragment TopicsItemFragment on Topic {
    _id
    names
    photos
  }
`);
