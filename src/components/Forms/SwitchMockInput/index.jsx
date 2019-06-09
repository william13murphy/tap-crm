import React from 'react';
import { Field } from 'redux-form';
import 'components/Forms/SwitchField/styles.less';

type SwitchMockInputProps = {
  label: string, // Display label for this radio button
  // value: string, // Value for this radio button
  // name: string, // Group Name that this radio button belongs to
  className: string, // Class name for container label
};

const SwitchMockInput = (props: SwitchMockInputProps) => {
  return (
    <label
      className={`SwitchMockInput pt-control pt-switch ${props.className ||
        ''} `}
    >
      <span className="pt-control-indicator" />
      <span className="SwitchMockInput__label">{props.label}</span>
    </label>
  );
};

export default SwitchMockInput;
