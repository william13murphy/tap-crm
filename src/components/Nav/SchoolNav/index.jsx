import React from 'react';
import connect from 'src/redux/connect';
import { roles } from 'util/auth/roles';
import { mapSchoolIdToRoutes } from 'util/router';
import { navSchoolNavHeight } from 'src/redux/actionCreators/nav';

import SchoolSearchFuzzyContainer from 'containers/School/SchoolSearchFuzzyContainer';
import ClientSchoolsContainer from 'containers/Client/ClientSchoolsContainer';

import PrivateComponent from 'components/Auth/PrivateComponent';
import SchoolContextSelect from 'components/Nav/_shared/SchoolContextSelect';
import TAPLogoLink from 'components/Nav/_shared/TAPLogoLink';
import UserNavLink from 'components/Nav/_shared/UserNavLink';

import NavNavLink from './NavNavLink';
import SearchSchoolPeople from './SearchSchoolPeople';
import './styles.less';

type SchoolNavProps = {
  mobile: boolean,
  routes: Array<{}>,
  screen: {
    sizeDesktopLarge: any,
    sizeTabletSmall: any,
  },
  token: {
    payload: {
      Role: string,
    },
  },
  appContext: { schoolId: string },
  dispatchNavSchoolNavHeight: Function,
};

type SchoolNavState = {
  appRoutes: any,
};

const schoolNavHeight = 60;

class SchoolNav extends React.Component {
  props: SchoolNavProps;
  state: SchoolNavState;
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    setTimeout(() => {
      this.handleResize();
    }, 0);
  }
  componentWillUnmount() {
    setTimeout(() => {
      this.props.dispatchNavSchoolNavHeight(0);
    }, 0);
    window.removeEventListener('resize', this.handleResize);
  }
  handleResize = () => {
    this.props.dispatchNavSchoolNavHeight(schoolNavHeight); // <- TODO: Use variable instead of magic number
  };
  componentWillMount() {
    this.updateSchoolAppRoutes();
  }
  componentWillReceiveProps() {
    this.updateSchoolAppRoutes();
  }
  updateSchoolAppRoutes() {
    // Student app doesn't need school-app/:schoolId/ prepended.
    let appRoutes = [];
    if (this.props.studentApp) {
      appRoutes = this.props.routes;
    } else {
      appRoutes = mapSchoolIdToRoutes(
        this.props.appContext.schoolId,
        this.props.routes
      );
    }

    this.setState({
      appRoutes,
    });
  }
  renderSchoolContextSelect() {
    return [
      <PrivateComponent key='schoolContext' allow={roles.LEVEL_EFCNOBILL}>
        <SchoolContextSelect readOnly schools={this.props.allSchools.payload} />
      </PrivateComponent>,
      <PrivateComponent key='schoolContext2' allow={roles.CLADMIN}>
        <ClientSchoolsContainer
          dispatchFetchParams={this.props.token.payload.ClientId}
        >
          <SchoolContextSelect schools={this.props.clientSchools.payload} />
        </ClientSchoolsContainer>
      </PrivateComponent>,
    ];
  }
  renderSearch() {
    return (
      <PrivateComponent key='people' allow={roles.LEVEL_INSTRUCT}>
        <div className="SearchSchoolPeople__wrap">
          <SchoolSearchFuzzyContainer
            dispatchFetchParams={{
              SchoolId: this.props.appContext.schoolId,
              Term: '',
            }}
          >
            <SearchSchoolPeople schoolId={this.props.appContext.schoolId} />
          </SchoolSearchFuzzyContainer>
        </div>
      </PrivateComponent>
    );
  }
  renderNavLinks() {
    return this.state.appRoutes.map((cV, i) => {
      //Hides the POS link if the POS is disabled for the school
      if (
        cV.name === 'Store' &&
        this.props.schoolProfile.payload &&
        !this.props.schoolProfile.payload.IsPosEnabled
      ) {
        return null;
      } else {
        return (
          <PrivateComponent key={i} allow={cV.allow}>
            <NavNavLink {...cV} />
          </PrivateComponent>
        );
      }
    });
  }
  renderMobileNav() {
    // if (this.props.screen.sizeTabletSmall) {
    //   return null;
    // } else {
    //   return <MobileNav routes={this.props.routes} />;
    // }
    return null;
  }
  render() {
    return (
      <div className="SchoolNav">
        <nav className="pt-navbar">
          <div className="pt-navbar-group">
            <PrivateComponent allow={roles.SUBSET_NON_EFC}>
              <TAPLogoLink />
            </PrivateComponent>
            {this.renderSchoolContextSelect()}
          </div>
          <div className="pt-navbar-group">
            {this.renderNavLinks()}
            {this.renderSearch()}
            {this.renderMobileNav()}
            <PrivateComponent key='user' allow={roles.SUBSET_NON_EFC}>
              <span className="Nav__divider pt-navbar-divider" />
              <PrivateComponent allow={roles.SUBSET_NON_EFC}>
                <UserNavLink efcNav={true} />
              </PrivateComponent>
            </PrivateComponent>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.nav,
    screen: state.screen,
    token: state.token,
    appContext: state.appContext,
    allSchools: state.school.allSchools,
    clientSchools: state.client.schools,
    schoolProfile: state.school.profile,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchNavSchoolNavHeight: height => {
      dispatch(navSchoolNavHeight(height));
    },
  };
};

export default connect(
  SchoolNav,
  mapStateToProps,
  mapDispatchToProps
);
