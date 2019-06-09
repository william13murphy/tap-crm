import React from 'react';
import { NavLink } from 'react-router-dom';
import PrivateComponent from 'components/Auth/PrivateComponent';

const EFCNavLinks = props => {
  return props.routes.map((cV, i) => {
    if (!cV.hideNavLink) {
      return (
        <PrivateComponent key={i} allow={cV.allow}>
          <NavLink className="EFCNavLinks__NavLink" {...cV} to={cV.path}>
            {cV.name}
          </NavLink>
        </PrivateComponent>
      );
    } else {
      return null;
    }
  });
};

export default EFCNavLinks;
