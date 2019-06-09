import React from 'react';
import Helmet from 'react-helmet';
import './styles.less';

type PageProps = {
  className: string,
  title: string,
  children: React.DOMElement<any>,
};

const Page = (props: PageProps) => (
  <div className={`Page ${props.className || ''}`}>
    <Helmet title={`TAP - ${props.title || ''}`} />
    {props.children}
  </div>
);

export default Page;
