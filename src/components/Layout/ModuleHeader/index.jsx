import React from 'react';
import './styles.less';

const ModuleHeader = props => (
  <div {...props} className={`ModuleHeader ${props.className || ''}`} />
);

export default ModuleHeader;
