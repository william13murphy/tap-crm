import React from 'react';
import connect from 'src/redux/connect';
import { Route, Redirect } from 'react-router-dom';
import PrivateRoute from 'components/Auth/PrivateRoute';
import PrivateComponent from 'components/Auth/PrivateComponent';
import { roles } from 'util/auth/roles';

import ReferencesContainer from 'containers/ReferencesContainer';
import AllSchoolsContainer from 'containers/School/AllSchoolsContainer';
import AppContextContainer from 'containers/AppContextContainer';
import SchoolProfileContainer from 'containers/School/SchoolProfileContainer';

import MobileNav from 'components/Nav/MobileNav';
import SchoolNav from 'components/Nav/SchoolNav';
import SubNav from 'components/SubNav';
import Body from 'components/Body';

import SchoolDetailModule from './SchoolDetail';
import StudentsModule from './Students';
import BillingModule from './Billing';
import PointOfSaleModule from './PointOfSale';
import DashboardModule from './Dashboard';
import ProgramsModule from './Programs';
import ReportsModule from './Reports';
import UserModule from 'views/_shared/User';
import routes from './routes';
import './styles.less';

type SchoolAppProps = {
  appContext: { schoolId: string },
  match: {
    params: {
      schoolId: string,
    },
  },
};

class SchoolApp extends React.Component {
  props: SchoolAppProps;
  // TODO: Resize event
  renderNav() {
    if (this.props.screen.sizeTabletSmall) {
      return <SchoolNav routes={routes} />;
    } else {
      // Only render the MobileNav for non-efc users,
      // because it is rendered in the EFCApp as well.
      return (
        <PrivateComponent allow={roles.SUBSET_NON_EFC}>
          <MobileNav routes={routes} />
        </PrivateComponent>
      );
    }
  }
  renderSchoolApp() {
    return (
      <div className="SchoolApp">
        {this.renderNav()}
        <PrivateComponent allow={roles.SUBSET_SCHOOL_STAFF}>
          <SubNav />
        </PrivateComponent>
        <Body>
          <Route
            exact={true}
            path="/app/school-app/:schoolId"
            render={routeProps => (
              <Redirect
                to={`/app/school-app/${
                  routeProps.match.params.schoolId
                }/dashboard`}
              />
            )}
          />
          <PrivateRoute
            path="/app/user"
            component={UserModule}
            allow={roles.SUBSET_SCHOOL_STAFF}
          />
          <Route
            path="/app/school-app/:schoolId"
            render={routeProps => (
              <SchoolProfileContainer
                dispatchFetchParams={routeProps.match.params.schoolId}
              >
                <PrivateRoute
                  path="/app/school-app/:schoolId/dashboard"
                  component={DashboardModule}
                  allow={roles.LEVEL_INSTRUCT}
                />
                <PrivateRoute
                  path="/app/school-app/:schoolId/reports"
                  component={ReportsModule}
                  allow={roles.LEVEL_SCHUSER}
                />
                <PrivateRoute
                  path="/app/school-app/:schoolId/school-detail"
                  component={SchoolDetailModule}
                  allow={roles.LEVEL_SCHUSER}
                />
                <PrivateRoute
                  path="/app/school-app/:schoolId/students"
                  component={StudentsModule}
                  allow={roles.LEVEL_INSTRUCT}
                />
                <PrivateRoute
                  path="/app/school-app/:schoolId/billing"
                  component={BillingModule}
                  allow={roles.LEVEL_SCHUSER}
                />
                <PrivateRoute
                  path="/app/school-app/:schoolId/pos"
                  component={PointOfSaleModule}
                  allow={roles.LEVEL_INSTRUCT}
                />
                <PrivateRoute
                  path="/app/school-app/:schoolId/programs"
                  component={ProgramsModule}
                  allow={roles.INSTRUCT}
                />
              </SchoolProfileContainer>
            )}
          />
          {this.renderMonitorIndicator()}
        </Body>
      </div>
    );
  }

  renderMonitorIndicator() {
    const isMonitoringOn = localStorage.getItem('monitoringOn') || false;
    if (isMonitoringOn) {
      return (
        <div className="recording">
          <h1 className="blinking" style={{ color: 'red' }}>
            REC.
          </h1>
        </div>
      );
    }
    return null;
  }

  renderEFCStaffSchoolApp() {
    // Multi-school users require AllSchoolsContainer.
    // EFCApp renders ReferencesContainer earlier so it is not required here.
    return (
      <PrivateComponent allow={roles.SUBSET_EFC_STAFF}>
        <AllSchoolsContainer>
          <AppContextContainer manySchools>
            {this.renderSchoolApp()}
          </AppContextContainer>
        </AllSchoolsContainer>
      </PrivateComponent>
    );
  }
  renderClientAdminSchoolApp() {
    // Multi-school users require AllSchoolsContainer.
    return (
      <PrivateComponent allow={roles.CLADMIN}>
        <AllSchoolsContainer>
          <AppContextContainer manySchools>
            <ReferencesContainer>{this.renderSchoolApp()}</ReferencesContainer>
          </AppContextContainer>
        </AllSchoolsContainer>
      </PrivateComponent>
    );
  }
  renderSingleSchoolUserSchoolApp() {
    // Single school users don't need AllSchoolsContainer.
    return (
      <PrivateComponent
        allow={[...roles.SUBSET_SINGLE_SCHOOL_STAFF, roles.STUDENT]}
      >
        <AppContextContainer>
          <ReferencesContainer>{this.renderSchoolApp()}</ReferencesContainer>
        </AppContextContainer>
      </PrivateComponent>
    );
  }
  render() {
    return (
      <div className="SchoolApp__wrap">
        {this.renderEFCStaffSchoolApp()}
        {this.renderClientAdminSchoolApp()}
        {this.renderSingleSchoolUserSchoolApp()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    screen: state.screen,
  };
};

export default connect(
  SchoolApp,
  mapStateToProps
);
