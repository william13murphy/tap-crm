import React from 'react';
import { NavLink } from 'react-router-dom';

type NavNavLinkProps = {
  icon: string,
  name: string,
};

// Just like a regular NavNavLink except accepts a handleClick prop
// And borrows styles from NavLink.

const NavNavLinkImg = (props: NavNavLinkProps) => {
  return (
    <span className="Nav__navlink">
      <button
        onClick={props.handleClick}
        className="Nav__navlink__item pt-button pt-minimal"
      >
        <img
          className="Nav__navlink__item__image"
          src={props.icon}
          height="40"
        />
        <span className="Nav__navlink__item__title">{props.name}</span>
      </button>
    </span>
  );
};

const NavNavLinkFontAwesome = (props: NavNavLinkProps) => {
  return (
    <span className="Nav__navlink">
      <button
        onClick={props.handleClick}
        className="Nav__navlink__item pt-button pt-minimal"
      >
        <i className={`fa ${props.icon}`} aria-hidden="true" />
        {props.name}
      </button>
    </span>
  );
};

const NavNavLinkBlueprint = (props: NavNavLinkProps) => {
  return (
    <span className="Nav__navlink">
      <button
        onClick={props.handleClick}
        className={`Nav__navlink__item pt-button pt-minimal ${props.icon}`}
      >
        {props.name}
      </button>
    </span>
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
