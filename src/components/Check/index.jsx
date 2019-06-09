import React from 'react';
import styleVariables from 'styles/_variables';

type CheckProps = {
  checked: boolean,
  checkedColor: string,
  title: string,
  size?: number,
};

const Check = (props: CheckProps) => {
  let size = props.size ? props.size.toString() + 'px' : '18px';
  let color = props.checked
    ? props.checkedColor || styleVariables.mossy_green
    : styleVariables.light_gray1;
  return (
    <span className="Check" title={props.title}>
      <i
        className={'fa fa-check'}
        aria-hidden="true"
        style={{
          color: color,
          fontSize: size,
        }}
      />
    </span>
  );
};

export default Check;
