import React from 'react';
import './styles.less';

type FormWrapperProps = {
  children: [],
};

const FormWrapper = (props: FormWrapperProps) => {
  return <div className="FormWrapper">{props.children}</div>;
};

export default FormWrapper;
