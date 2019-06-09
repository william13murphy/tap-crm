import React from 'react';
import './styles.less';

type ColorDisplayProps = {
  color: string,
  small?: boolean,
};

const ColorDisplay = (props: ColorDisplayProps) => {
  return (
    <div
      className={`ColorDisplay ${props.small ? 'small' : ''}`}
      style={{ background: props.color || '#000' }}
    />
  );
};

export default ColorDisplay;
