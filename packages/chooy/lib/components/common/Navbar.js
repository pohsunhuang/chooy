import React from 'react';
import { Link } from 'react-router';

const Navbar = ({ navItems, activeIndex, onItemClick }) => {
  const handleClick = (e) => {
    if(onItemClick) {
      const idx = _.indexOf(_.pluck(navItems, 'name').map(navItem => {
        return navItem.toUpperCase();
      }), e.currentTarget.text.toUpperCase());  
      onItemClick(e, idx);
    }
  }

  return (
    <div className='chooy-nav'>
      <div className='chooy-nav-separator'>
        {navItems.map((navItem, idx) => {
          return <Link
                   key={idx}
                   className={`chooy-nav-item${activeIndex === idx ? ' chooy-nav-item-active' : ''}`}
                   to={navItem.to}
                   onClick={handleClick}
                 >
                   <span>{navItem.name}</span>
                 </Link>
        })}
      </div>
  </div>
  );
}

export default Navbar;