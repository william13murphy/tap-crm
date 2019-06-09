import React from 'react';
import './styles.less';

const PageFooter = props => (
  <div {...props} className={`PageFooter ${props.className || ''}`} />
);

export default PageFooter;
