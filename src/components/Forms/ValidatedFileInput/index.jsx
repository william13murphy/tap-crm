import React from 'react';
import './styles.less';
import InputFlags from 'components/Forms/InputFlags';
import FileInput from 'components/Forms/FileInput';

type ValidatedFileInputProps = {
  input: any,
  label: any,
  type: any,
  meta: {
    touched: any,
    error: any,
    warning: any,
  },
};

export default function ValidatedFileInput(props: ValidatedFileInputProps) {
  return (
    <div className="ValidatedFileInput">
      <FileInput
        input={props.input}
        className={`pt-input ${props.meta.touched && 'touched'} ${props.meta
          .error && 'error'}`}
        placeholder={props.label}
        type="file"
      />
      <InputFlags meta={props.meta} />
    </div>
  );
}
