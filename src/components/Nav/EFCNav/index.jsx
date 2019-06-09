import React from 'react';
import connect from 'src/redux/connect';

import TAPLogoLink from 'components/Nav/_shared/TAPLogoLink';
import UserNavLink from 'components/Nav/_shared/UserNavLink';
import EFCNavLinks from 'components/Nav/EFCNav/EFCNavLinks';

import { navEfcNavHeight } from 'src/redux/actionCreators/nav';

import routes from 'views/EFCApp/routes';

import './styles.less';

const efcNavHeight = 40; // TODO: Use real height instead of magic number.

type EFCNavProps = {
  nav: {
    efcNavHeight: number,
    schoolNavHeight: number,
    subNavHeight: number,
  },
  dispatchNavEfcNavHeight: Function,
};

class EFCNav extends React.Component {
  props: EFCNavProps;
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    setTimeout(() => {
      this.handleResize();
    }, 0);
  }
  componentWillUnmount() {
    setTimeout(() => {
      this.props.dispatchNavEfcNavHeight(0);
    }, 0);
    window.removeEventListener('resize', this.handleResize);
  }
  handleResize = () => {
    this.props.dispatchNavEfcNavHeight(efcNavHeight);
  };
  render() {
    return (
      <div className="EFCNav">
        <nav className="pt-navbar">
          <div className="pt-navbar-group">
            <TAPLogoLink size={30} />
          </div>
          <div className="pt-navbar-group">
            <EFCNavLinks routes={routes} />
            <UserNavLink />
          </div>
        </nav>
      </div>
    );
  }
}
// export default EFCNav;

function mapStateToProps(state) {
  return {
    ...state.nav,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchNavEfcNavHeight: height => {
      dispatch(navEfcNavHeight(height));
    },
  };
};

export default connect(
  EFCNav,
  mapStateToProps,
  mapDispatchToProps
);
