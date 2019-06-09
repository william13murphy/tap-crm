import React from 'react';
import './styles.less';

type InputFlagsProps = {
  meta: {
    touched: any,
    error: any,
    warning: any,
  },
};

const InputFlags = (props: InputFlagsProps) => {
  return (
    <div className="InputFlags">
      {props.meta.touched &&
        ((props.meta.error && (
          <div className="error-message">{props.meta.error}</div>
        )) ||
          (props.meta.warning && (
            <div className="warning-message">{props.meta.warning}</div>
          )))}
    </div>
  );
};

export default InputFlags;
