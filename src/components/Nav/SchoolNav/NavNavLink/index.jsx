import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.less';

type NavNavLinkProps = {
  icon: string,
  name: string,
  path: string,
};
const NavNavLinkImg = (props: NavNavLinkProps) => {
  return (
    <NavLink
      to={props.path}
      className={`Nav__navlink ${props.className ? props.className : ''}`}
    >
      <button className="Nav__navlink__item pt-button pt-minimal">
        <img
          className="Nav__navlink__item__image"
          src={props.icon}
          height="40"
        />
        <span className="Nav__navlink__item__title">{props.name}</span>
      </button>
    </NavLink>
  );
};

const NavNavLinkFontAwesome = (props: NavNavLinkProps) => {
  return (
    <NavLink
      to={props.path}
      className={`Nav__navlink ${props.className ? props.className : ''}`}
    >
      <button className="Nav__navlink__item pt-button pt-minimal">
        <i className={`fa ${props.icon}`} aria-hidden="true" />
        {props.name}
      </button>
    </NavLink>
  );
};

const NavNavLinkBlueprint = (props: NavNavLinkProps) => {
  return (
    <NavLink
      to={props.path}
      className={`Nav__navlink ${props.className ? props.className : ''}`}
    >
      <button
        className={`Nav__navlink__item pt-button pt-minimal ${props.icon}`}
      >
        {props.name}
      </button>
    </NavLink>
  );
};

const NavNavLink = (props: NavNavLinkProps) => {
  if (props.icon && props.icon.substr(0, 2) === 'fa') {
    return <NavNavLinkFontAwesome {...props} />;
  } else if (props.icon && props.icon.substr(0, 2) === 'pt') {
    return <NavNavLinkBlueprint {...props} />;
  } else {
    return <NavNavLinkImg {...props} />;
  }
};

export default NavNavLink;
