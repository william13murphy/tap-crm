import React from 'react';
import './styles.less';
import NavLink from './NavLink';

import connect from 'src/redux/connect';
import { navSidenavOpen } from 'src/redux/actionCreators/nav';

declare var ASSETS_PATH: string;

type SideNavProps = {
  nav: {
    efcNavHeight: number,
    mobileNavHeight: number,
    schoolNavHeight: number,
    subNavHeight: number,
    dispatchSidenavOpen: Function,
    sidenavOpen: boolean,
  },
};

class SideNav extends React.Component {
  props: SideNavProps;
  constructor() {
    super();
  }
  handleClick() {
    this.props.nav.dispatchSidenavOpen(!this.props.nav.sidenavOpen);
  }

  renderToggle() {
    if (!this.props.nav.sidenavOpen) {
      return (
        <svg x="0px" y="0px" viewBox="0 0 32 32">
          <rect
            x="0"
            y="3"
            fill="#ffffff"
            width="32"
            height="5"
            rx="3"
            ry="3"
          />
          <rect
            x="0"
            y="14"
            fill="#ffffff"
            width="32"
            height="5"
            rx="3"
            ry="3"
          />
          <rect
            x="0"
            y="25"
            fill="#ffffff"
            width="32"
            height="5"
            rx="3"
            ry="3"
          />
        </svg>
      );
    } else {
      return (
        <i
          className="fa fa-times"
          aria-hidden="true"
          style={{ color: '#ffffff', fontSize: '20px' }}
        />
      );
    }
  }
  render() {
    return (
      <div
        className={`SideNav ${this.props.nav.sidenavOpen ? '' : 'hidden'} ${
          this.props.hideNav ? 'hidden-filters' : ''
        }`}
        style={{
          top:
            this.props.nav.efcNavHeight +
            this.props.nav.schoolNavHeight +
            this.props.nav.mobileNavHeight +
            this.props.nav.subNavHeight +
            1,
        }}
      >
        <div className="SideNav__toggle" onClick={() => this.handleClick()}>
          {this.renderToggle()}
        </div>
        <div className="SideNav__content">{this.props.children}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    nav: state.nav,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchSidenavOpen: sidenavOpen => {
      dispatch(navSidenavOpen({ sidenavOpen }));
    },
  };
};

export default connect(
  SideNav,
  mapStateToProps,
  mapDispatchToProps
);
