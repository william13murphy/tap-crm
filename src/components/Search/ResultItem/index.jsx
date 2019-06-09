import React from 'react';

const ResultItem = (item, { handleClick, modifiers }) => {
  return (
    <MenuItem
      className={modifiers.active ? Classes.ACTIVE : ''}
      key={item.label}
      // label={item.label}
      onClick={handleClick}
      text={item.label}
    />
  );
};

export default ResultItem;
