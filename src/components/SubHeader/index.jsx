// @flow

import React from 'react';
import './styles.less';
import Search from './Search';

type Props = {
  children: React.Element<any>,
};

const SubHeader = (props: Props) => {
  return (
    <div className="SubHeader">
      <div className="pt-navbar-group pt-align-right">
        <ul className="pt-tab-list">{props.children}</ul>
        <Search />
      </div>
    </div>
  );
};

export { SubHeader as default };
