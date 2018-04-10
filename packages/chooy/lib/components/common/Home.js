import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

import { getI18nMessage } from '../../modules/utils';

const Home = () =>
  <div>
    <h1 className='brand'>chooy</h1>
    <h3 className='tagline'>{getI18nMessage('tagline')}</h3>
    <Components.TopicsSearchForm />
    <Components.TopicsList />
  </div>

registerComponent('Home', Home);

export default Home;	