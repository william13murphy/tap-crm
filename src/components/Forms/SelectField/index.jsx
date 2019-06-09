import ContextHelp from 'components/ContextHelp';
import SelectInput from 'components/Forms/SelectInput';
import ReferenceSelectOptions from 'containers/ReferenceItem/ReferenceSelectOptions';
import React from 'react';
import { Field } from 'redux-form';
import './styles.less';

// Must pass in an array of options, or a string name of options from referenceItems.
// ReferenceSelectOptions depends on utility.references being in the state.

type SelectFieldProps = {
  label: string,
  name: string,
  onChange: Function,
  options?: Array<{
    label: string,
    value: string,
  }>,
  required?: boolean,
  placeholder?: string,
  className?: string,
  referenceOptions?: string,
  id?: string,
  help?: boolean,
  disabled: boolean,
  InputOptions?: {
    menuPosition: string,
    menuPlacement: string,
    maxMenuHeight: number,
  },
  value?: string,
};

const SelectField = (props: SelectFieldProps) => {
  if (props.referenceOptions) {
    return (
      <label className={`${props.className || ''} SelectField pt-label`}>
        <div className="FieldGroup">
          {props.label}
          {props.help && <ContextHelp id={props.id} />}
        </div>
        <div className="pt-input-group">
          <ReferenceSelectOptions referenceListName={props.referenceOptions}>
            <Field
              onChange={props.onChange}
              component={SelectInput}
              name={props.name}
              placeholder={props.placeholder || ''}
              required={props.required || false}
              disabled={props.disabled}
              InputOptions={props.InputOptions}
            />
          </ReferenceSelectOptions>
        </div>
      </label>
    );
  } else {
    return (
      <label className={`${props.className || ''} SelectField pt-label`}>
        <div className="FieldGroup">
          {props.label}
          {props.help && <ContextHelp id={props.id} />}
        </div>
        <div className="pt-input-group">
          <Field
            onChange={props.onChange}
            component={SelectInput}
            name={props.name}
            placeholder={props.placeholder || ''}
            required={props.required || false}
            options={props.options}
            disabled={props.disabled}
            InputOptions={props.InputOptions}
            value={props.value}
          />
        </div>
      </label>
    );
  }
};

export default SelectField;
