import React from 'react';

const Icon = ({ name, size }) =>
  <svg width={size} height={size}>
    <use xlinkHref={`/packages/chooy/lib/assets/icons/icons.svg#icon-${name}`} />
  </svg>

export default Icon;  