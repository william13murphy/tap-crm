import React from 'react';
import './styles.less';
import InputFlags from 'components/Forms/InputFlags';

type ValidatedInputProps = {
  input: any,
  label: string,
  placeholder?: string,
  type: any,
  autoFocus: boolean,
  meta: {
    touched: boolean,
    error: boolean,
    warning: boolean,
  },
  inputProps: {}, // Any pass-through props for the <input />
  currency: boolean, // Appends a "$" at the beginning of the field.
  percent: boolean, // Appends a "%" at the end of the field.
  currentValue: string,
  disabled?: boolean,
};

export default function ValidatedInput(props: ValidatedInputProps) {
  return (
    <div
      className={`ValidatedInput ${props.meta.touched ? 'touched' : ''} ${
        props.meta.error ? 'error' : ''
      } ${props.currency ? 'currency' : ''} ${props.percent ? 'percent' : ''}`}
    >
      <input
        {...props.input}
        {...props.inputProps}
        autoFocus={props.autoFocus}
        className={`pt-input ${props.meta.touched ? 'touched' : ''} ${
          props.meta.error ? 'error' : ''
        }`}
        placeholder={props.placeholder}
        type={props.type}
        value={props.currentValue ? props.currentValue : props.input.value}
        disabled={props.disabled}
      />
      <InputFlags meta={props.meta} />
    </div>
  );
}
