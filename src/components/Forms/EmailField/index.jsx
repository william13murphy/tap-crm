import React from 'react';
import { Field } from 'redux-form';
import ValidatedInput from 'components/Forms/ValidatedInput';
import ContextHelp from 'components/ContextHelp';

const emailValidation = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

type EmailFieldProps = {
  label: string,
  required?: boolean,
  name: string,
  placeholder?: string,
  className?: string,
  id?: string,
  help?: boolean,
};
const EmailField = (props: EmailFieldProps) => (
  <label className={`EmailField pt-label ${props.className || ''} `}>
    <div className="FieldGroup">
      {props.label}
      {props.help && <ContextHelp id={props.id} />}
    </div>

    <div className="pt-input-group">
      <Field
        component={ValidatedInput}
        type="email"
        name={props.name}
        placeholder={props.placeholder || ''}
        required={props.required}
        validate={emailValidation}
      />
    </div>
  </label>
);

export default EmailField;
