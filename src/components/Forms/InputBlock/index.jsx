import React from 'react';
import './styles.less';

type InputBlockProps = {
  columns?: number,
  children: any,
};

const InputBlock = (props: InputBlockProps) => {
  let columnsClassName = '';
  if (props.children) {
    columnsClassName =
      props.children && props.children.length === undefined
        ? ''
        : 'col' + props.children.length.toString();
  }
  return (
    <div className={`InputBlock ${columnsClassName} ${props.className || ''}`}>
      {props.children}
    </div>
  );
};

export default InputBlock;
