import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import qs from 'qs';
import _ from 'lodash';
import debounce from 'lodash.debounce';

import TipEditor from './TipEditor';
import TipMenuModal from './TipMenuModal';
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
    this.debouncedScrollTipIntoView = debounce(idx => this.tips[idx].scrollTipIntoView(), 400);

    this.state = {
      showTipMenu: false,
      selectedTipIdx: 0,
      scrollToTipIdx: -1,
    }
  }

  static propTypes = {
    tips: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
  }

  static defaultProps = {
    readOnly: false,
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

  handleHideTipMenu = () => {
    this.setState(state => ({showTipMenu: false}));
  }

  handleClickMenuItem = (tipIndex, buttonType) => {
    const { tips, onChange, readOnly } = this.props;
    const { offset = 0 } = this.props.router.location.query;
    
    if (onChange && !readOnly) {
      let newTips = _.cloneDeep(tips);

      switch(buttonType) {
        case 'edit':
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

  getURLByOffset = (offset) => {
    const { pathname, search } = this.props.router.location;
    let queryStringObj = qs.parse(search, { ignoreQueryPrefix: true });

    queryStringObj.offset = offset;
    
    return `${pathname}?${qs.stringify(queryStringObj)}`;
  }

  routeToTip = (tipIndex) => {
    const { router } = this.props;
    const offset = Math.floor(tipIndex / TIPS_PER_PAGE) * TIPS_PER_PAGE;
    router.push(this.getURLByOffset(offset));
  }

  render() {
    const { tips, readOnly } = this.props;
    const { offset = 0 } = this.props.router.location.query;
    const { showTipMenu, selectedTipIdx } = this.state;

    return (
      <div className='tips-editor'>
        {(!!tips && tips.length) ?
          <div>
            {tips.map((tip, idx) => {
              if (idx >= offset && idx < (offset+TIPS_PER_PAGE)) {
                return <TipEditor 
                         key={idx} 
                         tipIndex={idx} 
                         tip={tip} 
                         readOnly={readOnly} 
                         onClickEdit={this.handleClickEdit} 
                         ref={tip => this.tips[idx] = tip}/>
              } else {
                return ;
              }
            })}
            <Pagination offset={offset} totalCount={tips.length} itemsPerPage={TIPS_PER_PAGE} getURLByOffset={this.getURLByOffset}/>
          </div>
          : null }
        <TipMenuModal show={showTipMenu} onHide={this.handleHideTipMenu} onClick={this.handleClickMenuItem} tipIndex={selectedTipIdx} tipsLength={tips.length}/>
      </div>
    );
  }
}

export default withRouter(TipsEditor);
