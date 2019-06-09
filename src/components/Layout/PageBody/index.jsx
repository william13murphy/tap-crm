import React from 'react';
import './styles.less';

type PageBodyProps = {
  children: React.Element<any>,
  center?: boolean,
  height: number,
  wide?: Boolean,
};

const PageBody = (props: PageBodyProps) => {
  return (
    <div
      className={`PageBody ${props.center ? 'center' : ''} ${props.height ? 'overflow-y-auto' : ''} ${props.wide ? 'wide' : ''}`}
      style={{ height: props.height ? props.height.toString() + 'px' : null }}
    >
      {props.children}
    </div>
  );
};

export default PageBody;
