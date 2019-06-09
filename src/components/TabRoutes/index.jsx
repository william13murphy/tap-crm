import React from 'react';
import './styles.less';

// TabRoutes: Contains the Routes which are activated when a Tab is clicked.
// Can display as a card below the Tab (use card={true})

type TabRoutesProps = {
  card?: boolean, // Display as a .pt-card below the tabs
  className?: string, // Additional classNames
  children: React.DOMElement<any>,
};

const TabRoutes = (props: TabRoutesProps) => (
  <div
    className={`TabRoutes ${props.className || ''} ${
      props.card ? 'pt-card' : ''
    }`}
  >
    {props.children}
  </div>
);

export default TabRoutes;
