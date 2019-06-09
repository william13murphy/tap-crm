import React from 'react';
import { Field } from 'redux-form';
import ValidatedCKEditor from 'components/Forms/ValidatedCKEditor';
// import './styles.less';

type HTMLFieldProps = {
  label: string,
  required?: boolean,
  name: string,
  placeholder?: string,
  placeholders?: [],
  className?: string,
  icon?: string,
  textarea?: boolean,
  updateFormData: any,
};

const HTMLField = (props: HTMLFieldProps) => (
  <label
    className={`HTMLField pt-label ${
      props.icon ? 'with-icon' : ''
    } ${props.className || ''}`}
  >
    {props.label}
    <div className="pt-input-group">
      <Field
        component={ValidatedCKEditor}
        name={props.name}
        placeholder={props.placeholder || ''}
        placeholders={props.placeholders || []}
        required={props.required}
        updateFormData={props.updateFormData}
      />
    </div>
  </label>
);

export default HTMLField;
