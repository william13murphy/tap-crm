import React from 'react';
import './styles.less';

type TabProps = {
  children: React.Element<any>,
};

const Tab = (props: TabProps) => {
  return <li className="Tab pt-tab">{props.children}</li>;
};

export default Tab;
