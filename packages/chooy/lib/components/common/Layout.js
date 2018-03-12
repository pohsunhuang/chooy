import React from 'react';
import Helmet from 'react-helmet';
import { Components, replaceComponent } from 'meteor/vulcan:core';

const Layout = ({children, currentRoute}) =>
  <div>

    <Helmet>
      {/*<link name="bootstrap" rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css"/>*/}
      <link name="bootstrap" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
      <link name="font-awesome" rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
    </Helmet>

    <Components.Header />
  
    <div className='main'>
      {React.cloneElement(children)}
    </div>

    <Components.Footer />

  </div>

replaceComponent('Layout', Layout);

export default Layout;  