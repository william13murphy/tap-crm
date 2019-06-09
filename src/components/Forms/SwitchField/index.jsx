import React from 'react';
import { Field } from 'redux-form';
import ContextHelp from 'components/ContextHelp';
import './styles.less';

type SwitchFieldProps = {
  label: string, // Display label for this radio button
  value: string, // Value for this radio button
  name: string, // Group Name that this radio button belongs to
  className: string, // Class name for container label
  selectAll: boolean,
};
const SwitchField = (props: SwitchFieldProps) => {
  return (
    <label
      className={`SwitchField pt-control pt-switch ${props.className || ''} `}
    >
      <Field
        name={props.name}
        component="input"
        type="checkbox"
        value={props.value}
        checked={props.checked}
        onClick={props.onClick}
      />{' '}
      <span className="pt-control-indicator" />
      <span className="SwitchField__label">
        {props.label}
        {props.help && <ContextHelp id={props.id} />}
      </span>
    </label>
  );
};

export default SwitchField;
