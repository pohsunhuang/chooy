import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mapProps from 'recompose/mapProps';
import { Components, registerComponent, withDocument, withCurrentUser } from 'meteor/vulcan:core';
import { Link } from 'react-router';
import qs from 'qs';

import Topics from '../../modules/topics/collection';
import Navbar from '../common/Navbar';
import TopicsContent from './TopicsContent';
import TopicsEditForm from './TopicsEditForm';
import { getI18nMessage } from '../../modules/utils';

const navItems = [
  { name: getI18nMessage('choosing.guide'), to: null },
  { name: getI18nMessage('options'), to: null },
  { name: getI18nMessage('discussion'), to: null },
];

const subMenuItems = [
  { name: getI18nMessage('tips'), to: 'tips' },
  { name: getI18nMessage('edit'), to: 'edit' },
  { name: getI18nMessage('history'), to: 'history' },
];

class TopicsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    }
  }

  handleNavItemClick = (e, idx) => {
    this.setState(state => ({ activeIndex: idx }));
  }

  handleEditSuccess = () => {
    const { router, location } = this.props;
    router.push(`${location.pathname}?page=tips`);
  }

  renderMenu = () => {
    return (
      <Navbar
        navItems={navItems}
        activeIndex={this.state.activeIndex}
        onItemClick={this.handleNavItemClick}
      />
    );    
  }

  renderSubMenu = () => {
    const { pathname } = this.props.location;
  
    return (
      <div className='sub-menu'>
        {subMenuItems.map((menuItem, idx) => {
          return (
            <Link key={idx} className='sub-menu-item' to={`${pathname}?page=${menuItem.to}&offset=0`}>
              <span>{menuItem.name}</span>
            </Link>
          );
        })}
      </div>
    );
  }

  renderContent = (topic, location) => {
    const queryStrQbj = qs.parse(location.search, { ignoreQueryPrefix: true });
    const page = queryStrQbj.page;

    if(page) {
      switch(page) {
        case 'edit':
          return <TopicsEditForm documentId={this.props.documentId} successCallback={this.handleEditSuccess}/>
        case 'history':
        case 'tips':
        default:
          return <TopicsContent topic={topic}/>
      }
    }
  
    return <TopicsContent topic={topic} location={location}/>
  }

  render() {
    const topic = this.props.document;
    const { location } = this.props;

    return (
      <div className='topics-page'>
        {this.props.loading ? <Components.Loading/> :
          <div>
            <h1 className='title'><span>{topic.title}</span></h1>
            {this.renderMenu()}
            {this.renderSubMenu()}
            {this.renderContent(topic, location)}
          </div>  
        }
      </div>
    );
  }
}

const options = {
  collection: Topics,
  fragmentName: 'TopicsPageFragment',
}

const mapPropsFunction = props => ({...props, documentId: props.routeParams && props.routeParams.topicId});

registerComponent('TopicsPage', TopicsPage, mapProps(mapPropsFunction), [withDocument, options], withCurrentUser);
