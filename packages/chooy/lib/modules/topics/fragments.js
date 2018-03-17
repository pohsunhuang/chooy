import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment TopicsAutoCompleteFragment on Topic {
    _id
    foundName
  }
`);

registerFragment(`
  fragment TopicsItemFragment on Topic {
    _id
    title
    names
    photos
  }
`);

registerFragment(`
  fragment TopicsPageFragment on Topic {
    _id
    title
    names
    tips
    photos
    categories
  }  
`);
