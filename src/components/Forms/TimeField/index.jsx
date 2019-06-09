import React from 'react';
import { Field } from 'redux-form';
import TimeInput from 'components/Forms/TimeInput';
import ContextHelp from 'components/ContextHelp';
import './styles.less';

type TimeFieldProps = {
  label: string,
  name: string,
  onChange: Function,
  required?: boolean,
  placeholder?: string,
  className?: string,
  id?: string,
  help?: boolean,
  disabled: boolean,
};

const TimeField = (props: TimeFieldProps) => {
  return (
    <label className={`${props.className || ''} TimeField pt-label`}>
      <div className="FieldGroup">
        {props.label}
        {props.help && <ContextHelp id={props.id} />}
      </div>
      <div className="pt-input-group">
        <span className="pt-icon pt-icon-time" />
        <Field
          onChange={props.onChange}
          component={props => (
            <TimeInput
              input={props.input}
              meta={props.meta}
              disabled={props.disabled}
            />
          )}
          name={props.name}
          placeholder={props.placeholder || ''}
          required={props.required || false}
          options={props.options}
          disabled={props.disabled}
        />
      </div>
    </label>
  );
};

export default TimeField;
