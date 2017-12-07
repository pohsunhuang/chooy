import React from 'react';

const svgs = [
  'chooy', 'prev', 'next',
];

const isSvg = name => svgs.indexOf(name) != -1;

const Icon = ({ name, size, text, className }) => {
  if (isSvg(name)) {
    return (
      <svg width={size} height={size}>
        <use xlinkHref={`/packages/chooy/lib/assets/icons/icons.svg#icon-${name}`} />
      </svg>
    );
  } else {
    return (
      <span className='fa-stack'>
        <i className={`${className} fa fa-fw fa-${name} fa-stack-1x ${name == 'square' ? 'fa-lg' : ''}`} aria-hidden="true"/>
        <span className='fa-stack-1x'>{text}</span>
      </span>
    );
  }
}



export default Icon;  