import React from 'react';
import connect from 'src/redux/connect';
import { roles } from 'util/auth/roles';
import PrivateComponent from 'components/Auth/PrivateComponent';

import TAPLogoLink from 'components/Nav/_shared/TAPLogoLink';
import ClientSchoolsContainer from 'containers/Client/ClientSchoolsContainer';
import SchoolContextSelect from 'components/Nav/_shared/SchoolContextSelect';

import MobileNavMenu from './Menu';
import {
  navMobileOpen,
  navMobileNavHeight,
} from 'src/redux/actionCreators/nav';

import SchoolAnemicDetailContainer from 'src/containers/School/SchoolAnemicDetailContainer';

import UserMeContainer from 'src/containers/User/UserMeContainer';
import UserMeFullName from 'components/Nav/_shared/UserMeFullName';

import efcRoutes from 'views/EFCApp/routes';
import schoolRoutes from 'views/SchoolApp/routes';
import studentRoutes from 'views/StudentApp/routes';
import userRoutes from 'views/_shared/User/routes';

import { mapSchoolIdToRoutes } from 'util/router';

import LogOutButtonWrapper from 'components/Auth/LogOutButtonWrapper';

import './styles.less';

const mobileNavHeight = 60;

type MobileNavProps = {
  dispatchNavMobileOpen: any,
  handleUsermenuToggle: any,
  usermenuOpen: boolean,
  mobileOpen: boolean,
  routes: any,
};

class MobileNav extends React.Component {
  state: {
    efcNavRoutes: Array<{}>,
    schoolNavRoutes: Array<{}>,
    studentNavRoutes: Array<{}>,
    userNavRoutes: Array<{}>,
  };
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    setTimeout(() => {
      this.handleResize();
    }, 0);
    this.setRoutesState();
  }
  setRoutesState() {
    // TODO: Add UserName for user menu and SchoolName for school menu
    // let allRoutes = [];
    let efcNavRoutes = [];
    let schoolNavRoutes = [];
    let studentNavRoutes = [];
    let userNavRoutes = [];

    if (this.props.efcApp) {
      efcNavRoutes = efcRoutes;

      if (this.props.appContext && this.props.appContext.schoolId != '') {
        schoolNavRoutes = schoolNavRoutes = mapSchoolIdToRoutes(
          this.props.appContext.schoolId,
          schoolRoutes
        );
      }
    } else if (this.props.studentApp) {
      studentNavRoutes = studentRoutes;
    } else {
      schoolNavRoutes = mapSchoolIdToRoutes(
        this.props.appContext.schoolId,
        schoolRoutes
      );
    }

    userNavRoutes = userRoutes;

    this.setState({
      efcNavRoutes,
      schoolNavRoutes,
      studentNavRoutes,
      userNavRoutes,
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setRoutesState();
  }
  componentWillUnmount() {
    setTimeout(() => {
      this.props.dispatchNavMobileNavHeight(0);
    }, 0);
    window.removeEventListener('resize', this.handleResize);
  }
  handleResize = () => {
    this.props.dispatchNavMobileNavHeight(mobileNavHeight); // <- TODO: Use variable instead of magic number
  };
  handleHamburgerClick = () => {
    this.props.dispatchNavMobileOpen(!this.props.mobileOpen);
  };
  renderHamburger() {
    if (!this.props.mobileOpen) {
      return (
        <a className="MobileNav__hamburger" onClick={this.handleHamburgerClick}>
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
        </a>
      );
    } else {
      return (
        <i
          onClick={this.handleHamburgerClick}
          className="MobileNav__hamburger-close fa fa-times"
          aria-hidden="true"
          style={{ color: '#ffffff', fontSize: '20px' }}
        />
      );
    }
  }
  renderSchoolContextSelect() {
    return (
      <PrivateComponent allow={roles.CLADMIN}>
        <ClientSchoolsContainer
          dispatchFetchParams={this.props.token.payload.ClientId}
        >
          <SchoolContextSelect schools={this.props.clientSchools.payload} />
        </ClientSchoolsContainer>
      </PrivateComponent>
    );
  }
  renderAppMenus() {
    if (this.state) {
      return (
        <div className="MobileNavMenusList">
          {this.state.efcNavRoutes.length > 0 && (
            <div className="MobileNavMenu__wrapper">
              <MobileNavMenu
                key={'efcRoutes'}
                routes={this.state.efcNavRoutes}
              />
            </div>
          )}

          {this.state.schoolNavRoutes.length > 0 &&
            this.props.appContext.schoolId !== '' && (
              <div className="MobileNavMenu__wrapper">
                <SchoolAnemicDetailContainer
                  dispatchFetchParams={this.props.appContext.schoolId}
                >
                  {this.props.schoolAnemicDetail.payload && (
                    <div className="MobileNavMenuLink header">
                      {this.props.schoolAnemicDetail.payload.Name}
                    </div>
                  )}

                  <MobileNavMenu
                    key={'schoolRoutes'}
                    routes={this.state.schoolNavRoutes}
                  />
                </SchoolAnemicDetailContainer>
              </div>
            )}
          {this.state.studentNavRoutes.length > 0 && (
            <div className="MobileNavMenu__wrapper">
              <MobileNavMenu
                key={'studentRoutes'}
                routes={this.state.studentNavRoutes}
              />
            </div>
          )}
          {this.state.userNavRoutes.length > 0 && (
            <div className="MobileNavMenu__wrapper">
              <UserMeContainer>
                <UserMeFullName className="MobileNavMenuLink header" />
                <MobileNavMenu
                  key={'userRoutes'}
                  routes={this.state.userNavRoutes}
                />
              </UserMeContainer>
            </div>
          )}
        </div>
      );
    } else {
      return null;
    }
  }
  renderMobileNavMenu() {
    if (this.props.mobileOpen) {
      return (
        <div className="MobileNavMenusList__wrapper">
          {this.renderAppMenus()}

          <LogOutButtonWrapper>
            <div className="MobileNavMenuLink">Log Out</div>
          </LogOutButtonWrapper>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="MobileNav">
        <div className="MobileNav__bar">
          <TAPLogoLink />
          {this.renderSchoolContextSelect()}
          {this.renderHamburger()}
        </div>
        {this.renderMobileNavMenu()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.nav,
    appContext: state.appContext,
    schoolAnemicDetail: state.school.anemicDetail,
    token: state.token,
    clientSchools: state.client.schools,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchNavMobileOpen: mobileOpen => {
      dispatch(navMobileOpen({ mobileOpen }));
    },
    dispatchNavMobileNavHeight: height => {
      dispatch(navMobileNavHeight(height));
    },
  };
};

export default connect(
  MobileNav,
  mapStateToProps,
  mapDispatchToProps
);
