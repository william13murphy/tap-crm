import React from 'react';
import { Field } from 'redux-form';
import './styles.less';

type RadioFieldProps = {
  label: string, // Display label for this radio button
  value: string, // Value for this radio button
  name: string, // Group Name that this radio button belongs to
  className: string, // Class name for container label
  onChange: Function,
};

const RadioField = (props: RadioFieldProps) => {
  return (
    <label
      className={`RadioField pt-control pt-radio ${props.className || ''} `}
    >
      <Field
        name={props.name}
        component="input"
        type="radio"
        value={props.value}
        onChange={props.onChange}
      />{' '}
      <span className="pt-control-indicator" />
      <span className="RadioField__label">{props.label}</span>
    </label>
  );
};

export default RadioField;
