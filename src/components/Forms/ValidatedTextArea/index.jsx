import React from 'react';
import './styles.less';
import InputFlags from 'components/Forms/InputFlags';

type ValidatedTextAreaProps = {
  input: any,
  label: any,
  type: any,
  meta: {
    touched: any,
    error: any,
    warning: any,
  },
};

export default function ValidatedTextArea(props: ValidatedTextAreaProps) {
  return (
    <div className="ValidatedTextArea">
      <textarea
        {...props.input}
        className={` pt-input ${props.meta.touched && 'touched'} ${props.meta
          .error && 'error'}`}
        placeholder={props.label}
      />
      <InputFlags meta={props.meta} />
    </div>
  );
}
