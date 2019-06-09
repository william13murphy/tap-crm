import React from 'react';
import './styles.less';
import { Link } from 'react-router-dom';
import connect from 'src/redux/connect';
import { navMobileOpen } from 'src/redux/actionCreators/nav';
import PrivateComponent from 'components/Auth/PrivateComponent';

import MobileNavMenuLink from '../MenuLink';

class MobileNavMenu extends React.Component {
  props: {
    handleLinkClick: any,
    dispatchNavMobileOpen: any,
    routes: any,
  };
  state: {
    appRoutes: any,
  };
  handleLinkClick = e => {
    e.stopPropagation();
    this.props.dispatchNavMobileOpen(false);
  };

  render() {
    return (
      <div className="MobileNavMenu">
        {this.props.routes.map((currentValue, i) => {
          if (!currentValue.hideNavLink) {
            return (
              <PrivateComponent key={i} allow={currentValue.allow}>
                <MobileNavMenuLink
                  handleLinkClick={this.handleLinkClick}
                  {...currentValue}
                />
              </PrivateComponent>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.nav,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchNavMobileOpen: mobileOpen => {
      dispatch(navMobileOpen({ mobileOpen }));
    },
  };
};

export default connect(
  MobileNavMenu,
  mapStateToProps,
  mapDispatchToProps
);
