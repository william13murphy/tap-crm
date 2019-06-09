import React from 'react';
import './styles.less';

type PageHeaderProps = {
  className?: string,
  children: React.DOMElement<any>,
};

const PageHeader = (props: PageHeaderProps) => (
  <div className={`PageHeader ${props.className || ''}`}>{props.children}</div>
);

export default PageHeader;
