import React from 'react';
import './styles.less';

type PageTitleProps = {
  children: React.DOMElement<any>,
  paddingNone: boolean,
  paddingTop: boolean,
  className?: string,
  inline?: boolean,
};

const PageTitle = (props: PageTitleProps) => {
  const padding =
    (props.paddingTop ? 'padding-top' : '') +
    (props.paddingNone ? 'padding-none' : '');
  return (
    <h1
      className={`${props.className || ''} PageTitle ${padding} ${
        props.inline ? 'inline' : ''
      }`}
    >
      {props.children}
    </h1>
  );
};

export default PageTitle;
