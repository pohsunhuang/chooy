import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

const Home = () =>
  <div>
    <h1 className='brand brand-text'>chooy</h1>
    <h3 className='tagline tagline-text'>Make the right choice. Fast and simple.</h3>
    <Components.TopicsSearchForm />
    <Components.TopicsList />
  </div>

registerComponent('Home', Home);

export default Home;	