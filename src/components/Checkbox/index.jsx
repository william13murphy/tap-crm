import { Checkbox as BluePrintCheckBox } from '@blueprintjs/core';

import React from 'react';
import './styles.less';
import styleVariables from 'styles/_variables';

type CheckboxProps = {
  checked: boolean,
  onChange: Function,
};

const Checkbox = (props: CheckboxProps) => {
  return (
    <div className="Checkbox">
      <BluePrintCheckBox
        {...props}
        checked={props.checked}
        onChange={props.onChange}
      />
    </div>
  );
};

export default Checkbox;
