import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import Icon from './Icons';

const onClick = (e) => {
  const { onFlipPage } = onClick;

  if (onFlipPage) {
    onFlipPage(e.currentTarget.value);
  }
}

const Pagination = ({ offset, totalCount, itemsPerPage, getURLByOffset, onFlipPage }) => {
  const pageNumbers = [];
  const activePageNumber = Math.floor(offset / (itemsPerPage || 10)) + 1;
  const totalPageNumber = Math.ceil(totalCount / (itemsPerPage || 10));

  let startPageNumber = 1, endPageNumber = totalPageNumber;
  if ( (offset >= 0) && (totalCount > 0) && (offset < totalCount)) {
    if (totalPageNumber > 10) {
      if (activePageNumber - startPageNumber < 5) {
        endPageNumber = startPageNumber + 9;
      } else if (endPageNumber - activePageNumber < 4) {
        startPageNumber = endPageNumber - 9;
      } else {
        startPageNumber = activePageNumber - 5;
        endPageNumber = activePageNumber + 4;
      }
    }
    
    for(let pageCount = startPageNumber; pageCount <= endPageNumber; pageCount++){
      if ((pageCount == startPageNumber) || (pageCount == endPageNumber) || (pageCount == activePageNumber) || (pageCount == activePageNumber-1) || (pageCount == activePageNumber+1)) {
        pageNumbers.push(pageCount);
      } else if ((activePageNumber - startPageNumber >= 4) && (pageCount < activePageNumber)) {
        if (pageCount == activePageNumber-2) {
          pageNumbers.push(-1);
        }
      } else if ((endPageNumber - activePageNumber >= 4) && (pageCount > activePageNumber)) {
        if (pageCount == activePageNumber+2) {
          pageNumbers.push(-1);
        }
      } else {
        pageNumbers.push(pageCount);
      }
    }
  }

  const hidden = pageNumbers.length == 0;
  const previousOffset = (activePageNumber - 2) * (itemsPerPage || 10);
  let pageOffset = 0;
  const nextOffset = activePageNumber * (itemsPerPage || 10);

  onClick.onFlipPage = onFlipPage;

  return (
    <div className={hidden ? 'hidden' : 'chooy-pagination'}>
      <ul className='pagination-list'>
        {activePageNumber == 1 ? null:
          <li value={previousOffset} className='pagination-list-control' onClick={onClick}>
            <Link to={getURLByOffset(previousOffset)}>
              <Icon name='prev' size={16}/>
            </Link>
          </li>
        }
        {pageNumbers.map((pageNumber, idx) => {
          if (pageNumber == activePageNumber) {
            return <li className='pagination-active-item' key={idx}><span>{pageNumber}</span></li>
          } else if (pageNumber == -1) {
            return <li className='pagination-list-ellipsis' key={idx}><span>...</span></li>
          } else {
            pageOffset = (pageNumber-1)*(itemsPerPage || 10);
            return <li value={pageOffset} className='pagination-list-item' onClick={onClick} key={idx}><Link to={getURLByOffset(pageOffset)}>{pageNumber}</Link></li>
          }
        })}
        {activePageNumber == totalPageNumber ? null: 
          <li value={nextOffset} className='pagination-list-control' onClick={onClick}>
            <Link to={getURLByOffset(nextOffset)}>
              <Icon name='next' size={16}/>
            </Link>
          </li>
        }
      </ul>
    </div>
  )
}

Pagination.propTypes = {
  offset: PropTypes.number,
  totalCount: PropTypes.number,
  itemsPerPage: PropTypes.number,
  getURLByOffset: PropTypes.func.isRequired,
  onFlipPage: PropTypes.func,
}

Pagination.defaultProps = {
  offset: 0,
  totalCount: 0,
  itemsPerPage: 10,
  onFlipPage: (offset) => {console.log(offset)},
}

export default Pagination;
