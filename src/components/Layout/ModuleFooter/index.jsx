import React from 'react';
import './styles.less';

const ModuleFooter = props => (
  <div {...props} className={`ModuleFooter ${props.className || ''}`} />
);

export default ModuleFooter;
