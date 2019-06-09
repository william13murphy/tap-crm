import React from 'react';
import { Classes, MenuItem } from '@blueprintjs/core';

type ResultItemPersonProps = {
  item: {
    name: string,
    type: string,
    id: string,
  },
  handleClick: Function,
  modifiers: {
    active: boolean,
  },
};

const ResultItemPerson = (item, { handleClick, modifiers }) => {
  const itemType =
    item.type.charAt(0).toUpperCase() + item.type.toLowerCase().slice(1);
  return (
    <MenuItem
      className={modifiers.active ? Classes.ACTIVE : ''}
      key={item.label}
      label={itemType}
      onClick={handleClick}
      text={item.name}
    />
  );
};

export default ResultItemPerson;
