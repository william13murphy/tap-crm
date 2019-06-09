import React from 'react';
import { Field } from 'redux-form';
import FileInput from 'components/Forms/FileInput';
import './styles.less';

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
        className="ImageField__input"
        component={FileInput}
        name={props.name}
        placeholder={props.placeholder || ''}
        required={props.required || false}
        validate={imageValidation}
      />
      <span className="ImageField__input-mask pt-file-upload-input">
        Choose file...
      </span>
    </div>
  </label>
);

export default ImageField;
