import React from 'react';
import { Field } from 'redux-form';
import ValidatedInput from 'components/Forms/ValidatedInput';
import ValidatedTextArea from 'components/Forms/ValidatedTextArea';
import ContextHelp from 'components/ContextHelp';
import './styles.less';

type TextFieldProps = {
  label: string,
  required?: boolean,
  name: string,
  onChange: Function,
  placeholder?: string,
  className?: string,
  icon?: string,
  password?: boolean,
  textarea?: boolean,
  type?: string,
  id?: string,
  help?: boolean,
  input?: Object,
  autoFocus?: boolean,
  value?: string,
  disabled?: boolean,
};

const TextField = (props: TextFieldProps) => {
  const normalizeInput = (value, previousValue = 0) => {
    return value >= props.input.min ? value : previousValue;
  };
  return (
    <label
      className={`TextField pt-label ${
        props.icon ? 'with-icon' : ''
      } ${props.className || ''}`}
    >
      <div className="FieldGroup">
        {props.label}
        {props.help && <ContextHelp id={props.id} />}
      </div>
      <div className="pt-input-group">
        {props.icon && <span className={`pt-icon ${props.icon}`} />}
        <Field
          autoFocus={props.autoFocus}
          onChange={props.onChange}
          normalize={props.input && normalizeInput}
          component={props.textarea ? ValidatedTextArea : ValidatedInput}
          type={props.type || 'text'}
          name={props.name}
          placeholder={props.placeholder || ''}
          icon={props.icon}
          required={props.required}
          inputProps={props.input}
          currency={props.currency}
          percent={props.percent}
          currentValue={props.value}
          disabled={props.disabled}
        />
      </div>
    </label>
  );
};

export default TextField;
