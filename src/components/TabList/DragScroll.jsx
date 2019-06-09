import React from 'react';
import './styles.less';
import DragScroll from 'react-dragscroll';

type Props = {
  children: React.Element<any>,
};

const DragScrollTabList = (props: Props) => {
  return (
    <DragScroll
      className="TabList__wrapper DragScroll"
      width="100%"
      height="50"
    >
      <ul className="TabList pt-tab-list">{props.children}</ul>
    </DragScroll>
  );
};

export { DragScrollTabList as default };
