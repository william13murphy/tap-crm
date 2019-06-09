import React from 'react';
import './styles.less';

type ProgramDetailFormWrapperProps = {
  children: [],
};

const ProgramDetailFormWrapper = (props: ProgramDetailFormWrapperProps) => {
  return <div className="FormWrapperStyle">{props.children}</div>;
};

export default ProgramDetailFormWrapper;
