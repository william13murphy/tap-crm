import React from 'react';
import { Link } from 'react-router-dom';
import './styles.less';

type IconLinkProps = {
  to: string,
  iconName: string,
};

const IconLink = (props: IconLinkProps) => {
  return (
    <Link className="IconLink" to={props.to}>
      <i className={`fa ${props.iconName}`} aria-hidden="true" />
    </Link>
  );
};

export default IconLink;
