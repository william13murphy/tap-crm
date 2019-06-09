import React from 'react';
import { Menu, MenuItem, MenuDivider } from '@blueprintjs/core';
import onClickOutside from 'react-onclickoutside';
import LogOutButtonWrapper from 'components/Auth/LogOutButtonWrapper';
import PrivateComponent from 'components/Auth/PrivateComponent';
import { NavLink, Link } from 'react-router-dom';
import Tab from 'components/Tab';
import connect from 'src/redux/connect';
import routes from 'src/views/_shared/User/routes.js';
import './styles.less';

type UserMenuProps = {
  open: boolean,
  dispatchNavUsermenuOpen: any,
  handleLogoutClick: any,
  handleUsermenuToggle: any,
  token: {
    payload: {
      UserName: string,
    },
  },
};

class UserMenu extends React.Component {
  props: UserMenuProps;

  // handleClickOutside: Used by 'react-onclickoutside'
  handleClickOutside = () => {
    setTimeout(() => {
      this.props.dispatchNavUsermenuOpen(false);
    }, 0);
  };
  handleClick = () => {
    this.props.dispatchNavUsermenuOpen(false);
  };
  componentWillUnmount() {
    this.props.dispatchNavUsermenuOpen(false);
  }
  render() {
    if (this.props.open === true) {
      return (
        <Menu className="UserMenu">
          <li className="pt-menu-header">
            <h6 className="UserMenu__user">
              <div className="font-weight-normal">Signed in as</div>
              <div>{this.props.token.payload.UserName}</div>
            </h6>
          </li>
          {routes.map((cV, i) => {
            return (
              <PrivateComponent allow={cV.allow} key={i}>
                <li key={i}>
                  <Link
                    to={cV.path}
                    onClick={this.handleClick}
                    className={`pt-menu-item ${cV.icon} pt-popover-dismiss`}
                  >
                    {cV.name}
                  </Link>
                </li>
              </PrivateComponent>
            );
          })}
          <MenuDivider />
          <LogOutButtonWrapper>
            <MenuItem
              icon="log-out"
              onClick={this.handleClick}
              text="Log out"
            />
          </LogOutButtonWrapper>
        </Menu>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
  };
};

export default connect(
  onClickOutside(UserMenu),
  mapStateToProps
);
