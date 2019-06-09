import React from 'react';
import { Link } from 'react-router-dom';
import TAPColor from 'assets/images/TAP_Color.svg';

const TAPLogoLink = ({ size }) => (
  <Link to="/" className="Nav__logo-container" style={{}}>
    <div className='logoContainer'>
      <img src={TAPColor} width={size || 40} height={size || 40} />
      <p className='beta'>*β</p>
    </div>
  </Link>
);

export default TAPLogoLink;
