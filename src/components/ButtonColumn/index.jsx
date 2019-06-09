import React from 'react';
import './styles.less';

type ButtonColumnProps = {
  children: React.Element<any>,
  className?: string,
};

const ButtonColumn = (props: ButtonColumnProps) => (
  <div className={`ButtonColumn ${props.className || ''}`}>
    {props.children}
  </div>
);

export default ButtonColumn;
