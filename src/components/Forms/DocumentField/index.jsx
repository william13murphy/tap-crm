import React from 'react';
import { Field } from 'redux-form';
import ValidatedFileInput from 'components/Forms/ValidatedFileInput';

const imageValidation = value => {
  return undefined; // valid
};

type ImageFieldProps = {
  label: string,
  required?: boolean,
  name: string,
  placeholder?: string,
  className?: string,
};

const ImageField = (props: ImageFieldProps) => (
  <label className={`ImageField pt-label ${props.className || ''} `}>
    {props.label}
    <div className="pt-input-group">
      <Field
        component={ValidatedFileInput}
        name={props.name}
        placeholder={props.placeholder || ''}
        required={props.required || false}
        validate={imageValidation}
      />
    </div>
  </label>
);

export default ImageField;
