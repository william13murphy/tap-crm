import React from 'react';
import { Field } from 'redux-form';
import AppointmentTimeInput from 'components/Forms/AppointmentTimeInput';
import ContextHelp from 'components/ContextHelp';
// import './styles.less';

type AppointmentTimeFieldProps = {
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

const AppointmentTimeField = (props: AppointmentTimeFieldProps) => {
  return (
    <label className={`${props.className || ''} AppointmentTimeField pt-label`}>
      {/* <div className="FieldGroup">
        {props.label}
        {props.help && <ContextHelp id={props.id} />}
      </div> */}
      <div className="pt-input-group">
        <Field
          onChange={props.onChange}
          component={props => (
            <AppointmentTimeInput
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

export default AppointmentTimeField;
