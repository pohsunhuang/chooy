import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mapProps from 'recompose/mapProps';
import { Components, registerComponent, withDocument, withCurrentUser } from 'meteor/vulcan:core';
import { Link } from 'react-router';

import Topics from '../../modules/topics/collection';
import Navbar from '../common/Navbar';
import Chips from '../common/Chips';
import TipsEditor from './TipsEditor';
import { getI18nMessage } from '../../modules/utils';
// <Components.Card key={topic._id} document={topic} collection={Topics} currentUser={currentUser}/>

const navItems = [
  { name: getI18nMessage('choosing.guide'), to: null },
  { name: getI18nMessage('options'), to: null },
  { name: getI18nMessage('discussion'), to: null },
];

const subMenuItems = [
  { name: getI18nMessage('filters'), to: null },
  { name: getI18nMessage('tips'), to: null },
  { name: getI18nMessage('edit'), to: null },
  { name: getI18nMessage('history'), to: null },        
];

class TopicsPage extends Component {
  constructor(props) {
    super(props);
    this.handleNavItemClick = this.handleNavItemClick.bind(this);

    this.state = {
      activeIndex: 0,
    }
  }

  handleNavItemClick(e, idx) {
    this.setState(state => ({ activeIndex: idx }));
  }

  render() {
    const topic = this.props.document;

    return (
      <div className='topics-page'>
        {this.props.loading ? <Components.Loading/> :
          <div>
            <h1 className='title title-text'><span>{topic.names[0]}</span></h1>
            <Navbar
              navItems={navItems}
              activeIndex={this.state.activeIndex}
              onItemClick={this.handleNavItemClick}
            />
            <div className='sub-menu'>
            {subMenuItems.map((menuItem, idx) => {
              return (
                <Link key={idx} className='sub-menu-item' to={menuItem.to}>
                  <span>{menuItem.name}</span>
                </Link>
              );
            })}
            </div>
            <h3 className='content-text content-title'><span>Filters</span></h3>
            <h3 className='content-text content-title'><span>Tips</span></h3>
            <TipsEditor tips={topic.tips} />
            <h3 className='content-text content-title'><span>Synonyms</span></h3>
            <Chips
              readOnly
              items={topic.names}
            />
            <h3 className='content-text content-title'><span>Categories</span></h3>
            <Chips
              readOnly
              items={topic.categories}
            />      
          </div>  
        }
      </div>
    );
  }
}

const options = {
  collection: Topics,
}

const mapPropsFunction = props => ({...props, documentId: props.routeParams && props.routeParams.topicId});

registerComponent('TopicsPage', TopicsPage, mapProps(mapPropsFunction), [withDocument, options], withCurrentUser);
