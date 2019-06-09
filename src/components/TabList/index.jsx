import React from 'react';
import './styles.less';

type Props = {
  children: React.Element<any>,
};

const TabList = (props: Props) => {
  return (
    <div className="TabListContainer">
      <ul className="TabList pt-tab-list">{props.children}</ul>
    </div>
  );
};

export { TabList as default };
