import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import qs from 'qs';
import _ from 'lodash';
import debounce from 'lodash.debounce';

import TipItem from './TipItem';
import TipMenuModal from './TipMenuModal';
import TipEditModal from './TipEditModal';
import Editor from '../common/Editor/Editor';
import Pagination from '../common/Pagination';

const TIPS_PER_PAGE = 5;

class TipsEditor extends Component {
  constructor(props) {
    super(props);

    // Reset global auto increment key generator to create the same DOM from both client and server side
    // for SSR to work properly
    // Reference: https://github.com/ianstormtaylor/slate/issues/53
    // You must call it before you create any 'Value' for slate editor
    // But you can only call it once per page because if there are editors at the same page with the same data-key,
    // the focus behavior of editors go haywire
    Editor.resetKeyGenerator();
     
    // Storage for tips' DOM reference
    this.tips = [];

    // onHide() of Modal of react-boostrap and push() of react-router manipulate scroll position somehow,
    // so we have to delay scrolling tip into view inorder to make it work
    this.debouncedScrollTipIntoView = debounce(idx => {
      if (!this.tips[idx]) return;
      
      const { top } = this.tips[idx].getBoundingClientRect();
      if (top < 0 || top > window.innerHeight) {
        this.tips[idx].scrollTipIntoView();
      }
    }, 400);

    this.state = {
      showTipMenu: false,
      showTipEditModal: false,
      selectedTipIdx: -1,
      scrollToTipIdx: -1,
      userSuggestions: _.union(...props.tips.map(tip => tip.users)),
      objectiveSuggestions: _.union(...props.tips.map(tip => tip.objectives)),      
    }
  }

  static propTypes = {
    tips: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
  }

  static defaultProps = {
    tips: [],
    readOnly: false,
  }

  componentWillReceiveProps(nextProps) {
    const { tips } = this.props;

    // Generate new suggestions for different Tips (Check reference only, tips must be immutable)
    if (nextProps.tips !== tips) {
      this.setState(state => ({
        userSuggestions: _.union(...nextProps.tips.map(tip => tip.users)),
        objectiveSuggestions: _.union(...nextProps.tips.map(tip => tip.objectives)),
      }));
    }
  }

  componentDidUpdate() {
    const { scrollToTipIdx } = this.state;
    
    if (scrollToTipIdx !== -1) {
      if (this.tips[scrollToTipIdx]) {
        this.debouncedScrollTipIntoView(scrollToTipIdx);
      }
      this.setState(state => ({scrollToTipIdx: -1}));
    }
  }

  handleClickEdit = (e, selectedTipIdx) => {
    e.preventDefault();
    this.setState(state => ({showTipMenu: true, selectedTipIdx}));
  }

  handleClickAdd = (e) => {
    e.preventDefault();
    this.setState(state => ({showTipEditModal: true, selectedTipIdx: -1}));
  }

  handleHideTipMenu = () => {
    this.setState(state => ({showTipMenu: false}));
  }

  handleClickMenuItem = (tipIndex, buttonType) => {
    const { tips, onChange, readOnly } = this.props;
    const { offset = 0 } = this.props.router.location.query;
    
    if (onChange && !readOnly && tipIndex >= 0) {
      let newTips = _.cloneDeep(tips);

      switch(buttonType) {
        case 'edit':
          this.setState(state => ({showTipEditModal: true}));
          break;
        case 'moveTop':
          if (tipIndex > 0 && tipIndex < tips.length) {
            newTips.splice(0, 0, newTips[tipIndex]);
            newTips.splice(tipIndex + 1, 1);
            this.routeToTip(0);
            this.setState(state => ({scrollToTipIdx: 0}));
          }
          break;
        case 'moveUp':
          if (tipIndex > 0 && tipIndex < tips.length) {
            newTips.splice(tipIndex - 1, 0, newTips[tipIndex]);
            newTips.splice(tipIndex + 1, 1);
            this.routeToTip(tipIndex - 1);
            this.setState(state => ({scrollToTipIdx: tipIndex - 1}));
          }
          break;
        case 'moveDown':
          if (tipIndex >= 0 && tipIndex < tips.length - 1) {
            newTips.splice(tipIndex + 2, 0, newTips[tipIndex]);
            newTips.splice(tipIndex, 1);
            this.routeToTip(tipIndex + 1);
            this.setState(state => ({scrollToTipIdx: tipIndex + 1}));
          }
          break;  
        case 'moveBottom':
          if (tipIndex >= 0 && tipIndex < tips.length - 1) {
            newTips.splice(tips.length, 0, newTips[tipIndex]);
            newTips.splice(tipIndex, 1);
            this.routeToTip(newTips.length - 1);
            this.setState(state => ({scrollToTipIdx: newTips.length - 1}));
          }
          break;
        case 'delete':
          if (tipIndex >= 0 && tipIndex < tips.length) {
            newTips.splice(tipIndex, 1);
            if(newTips.length <= offset) {
              this.routeToTip(newTips.length - 1);
            }
          }
          break;
        case 'cancel':
        default:
      }

      if (buttonType !== 'edit' && buttonType !== 'cancel') {
        onChange(newTips);
      }
    }
  }

  handleHideTipEditModal = () => {
    this.setState(state => ({showTipEditModal: false}));
  }

  handleTipChange = (tip) => {
    const { tips, onChange, readOnly } = this.props;
    const { selectedTipIdx } = this.state;

    if (onChange && !readOnly) {
      if (selectedTipIdx >= 0 && selectedTipIdx < tips.length) {// Modify Tip
        let newTips = _.cloneDeep(tips);
        newTips[selectedTipIdx] = tip; 
        onChange(newTips);
      } else if (selectedTipIdx === -1) {// Add new Tip
        let newTips = _.cloneDeep(tips);
        newTips.push(tip);
        onChange(newTips);

        // Scroll new Tip into view
        this.routeToTip(newTips.length - 1);
        this.setState(state => ({scrollToTipIdx: newTips.length - 1}));
      } else {
        return ;
      }
    }
  }

  getURLByOffset = (offset) => {
    const { pathname, search } = this.props.router.location;
    let queryStringObj = qs.parse(search, { ignoreQueryPrefix: true });

    queryStringObj.offset = offset;
    
    return `${pathname}?${qs.stringify(queryStringObj)}`;
  }

  onFlipPage = (offset) => {
    const { tips } = this.props;

    if (offset >= 0 && offset < tips.length) {
      this.setState(state => ({scrollToTipIdx: offset}));
    }
  }

  routeToTip = (tipIndex) => {
    const { router } = this.props;
    const offset = Math.floor(tipIndex / TIPS_PER_PAGE) * TIPS_PER_PAGE;
    
    router.push(this.getURLByOffset(offset));
  }

  renderTipList = () => {
    const { tips, readOnly } = this.props;
    const offset = Number(this.props.router.location.query.offset) || 0;
    
    if (!!tips && tips.length) {
      return tips.map((tip, idx) => {
        if (idx >= offset && idx < (offset+TIPS_PER_PAGE)) {
          return <TipItem 
                   key={idx} 
                   tipIndex={idx} 
                   tip={tip} 
                   readOnly={readOnly} 
                   onClickEdit={this.handleClickEdit} 
                   ref={tip => this.tips[idx] = tip}/>
        } else {
          return ;
        }
      });
    } else {
      return null;
    }
  }

  renderAddTipLink = () => {
    return (
      <a className='add-tip-link' onClick={this.handleClickAdd}>Add choosing tip</a>
    );
  }

  renderTipEditModal = () => {
    const { tips } = this.props;
    const { showTipEditModal, selectedTipIdx, userSuggestions, objectiveSuggestions } = this.state;

    if (selectedTipIdx === -1) {// Add new Tip
      return (
        <TipEditModal
          show={showTipEditModal}
          onHide={this.handleHideTipEditModal}
          onChange={this.handleTipChange}
          userSuggestions={userSuggestions}
          objectiveSuggestions={objectiveSuggestions}
        />
      );
    } else if (selectedTipIdx >= 0 && selectedTipIdx < tips.length) {// Modify Tip
      return (
        <TipEditModal
          show={showTipEditModal}
          onHide={this.handleHideTipEditModal}
          onChange={this.handleTipChange}
          tip={tips[selectedTipIdx]}
          userSuggestions={userSuggestions}
          objectiveSuggestions={objectiveSuggestions}          
        />
      );
    } else {
      return null;
    }
  }

  render() {
    const { tips, readOnly } = this.props;
    const offset = Number(this.props.router.location.query.offset) || 0;
    const { showTipMenu, selectedTipIdx } = this.state;

    return (
      <div className='tips-editor'>
        <div>
          {!readOnly && !!tips && tips.length !== 0 && this.renderAddTipLink()}
          {this.renderTipList()}
          {!readOnly && this.renderAddTipLink()}
          {(!!tips && tips.length) ? 
            <Pagination 
              offset={offset}
              totalCount={tips.length}
              itemsPerPage={TIPS_PER_PAGE}
              getURLByOffset={this.getURLByOffset}
              onFlipPage={this.onFlipPage}
            /> : null }
        </div>  
        <TipMenuModal show={showTipMenu} onHide={this.handleHideTipMenu} onClick={this.handleClickMenuItem} tipIndex={selectedTipIdx} tipsLength={tips.length}/>
        {readOnly ? null : this.renderTipEditModal()}
      </div>
    );
  }
}

export default withRouter(TipsEditor);
