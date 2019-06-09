import React from 'react';
import './styles.less';
import InputFlags from 'components/Forms/InputFlags';
import CKEditorInput from 'components/Forms/CKEditorInput';

type ValidatedInputProps = {
  input: any,
  label: any,
  type: any,
  meta: {
    touched: any,
    error: any,
    warning: any,
  },
  placeholders?: [], // For placeholder-select plugin
  updateFormData: any,
};

export default function ValidatedCKEditor(props: ValidatedInputProps) {
  return (
    <div className="ValidatedCKEditor">
      <CKEditorInput
        {...props.input}
        placeholders={props.placeholders || []}
        className={`pt-input ${props.meta.touched && 'touched'} ${props.meta
          .error && 'error'}`}
        updateFormData={props.updateFormData}
      />
      <InputFlags meta={props.meta} />
    </div>
  );
}
