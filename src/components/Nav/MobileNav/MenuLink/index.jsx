import React from 'react';
import './styles.less';
import { Link } from 'react-router-dom';

const MobileNavMenuLink = (props: {
  handleLinkClick: Function,
  className: string,
  path: string,
  name: string,
}) => {
  return (
    <Link
      onClick={props.handleLinkClick}
      className={`MobileNavMenuLink ${props.className || ''}`}
      to={props.path}
    >
      {props.name}
    </Link>
  );
};

export default MobileNavMenuLink;
