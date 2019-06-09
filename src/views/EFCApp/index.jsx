import React from 'react';
import connect from 'src/redux/connect';
import { Route, Redirect } from 'react-router-dom';
import { roles } from 'util/auth/roles';

import SchoolApp from 'views/SchoolApp';
import UserModule from 'views/_shared/User';
import schoolRoutes from 'views/SchoolApp/routes';
import userRoutes from 'views/_shared/User/routes';
import SendSMSTemplate from 'src/views/_shared/Messaging/SMS/SendSMSTemplate';
import SendEmailTemplate from 'src/views/_shared/Messaging/Email/SendEmailTemplate';

import Body from 'components/Body';
import PrivateRoute from 'components/Auth/PrivateRoute';
import MobileNav from 'components/Nav/MobileNav';
import EFCNav from 'components/Nav/EFCNav';
import SubNav from 'components/SubNav';

import ReferencesContainer from 'containers/ReferencesContainer';

import efcRoutes from './routes';
import AdminModule from './Admin';
import EFCDashboardModule from './Dashboard';
import ClientsModule from './Clients';
import AddSchool from './AllSchools/AddSchool';
import DeleteSchool from './AllSchools/DeleteSchool';
import AllSchools from './AllSchools';
import AllStudentsPage from './AllStudents';
import SearchStudentForm from './AllStudents/SearchStudentForm';
import './styles.less';

type EFCAppProps = {};

// TODO: SchoolRoutes should only be shown if a school is selected.
const allRoutes = efcRoutes.concat(schoolRoutes).concat(userRoutes);

class EFCApp extends React.Component {
  props: EFCAppProps;

  renderNav() {
    if (this.props.screen) {
      if (this.props.screen.sizeTabletSmall) {
        return <EFCNav />;
      } else {
        return <MobileNav efcApp routes={allRoutes} />;
      }
    }
  }
  render() {
    return (
      <div className="EFCApp">
        <ReferencesContainer>
          {this.renderNav()}
          <SubNav />
          <div className="EFCApp__Body">
            <Route
              exact={true}
              path="/app"
              render={() => <Redirect to="/app/efc-dashboard" />}
            />
            <PrivateRoute
              path="/app/school-app/:schoolId"
              component={SchoolApp}
              allow={roles.SUBSET_EFC_STAFF}
            />
            <PrivateRoute
              path="/app/admin"
              component={() => (
                <Body>
                  <AdminModule />
                </Body>
              )}
              allow={roles.SUBSET_EFC_STAFF}
            />
            <PrivateRoute
              path="/app/clients"
              component={() => (
                <Body>
                  <ClientsModule />
                </Body>
              )}
              allow={roles.SUBSET_EFC_STAFF}
            />
            <PrivateRoute
              path="/app/efc-dashboard"
              component={() => (
                <Body>
                  <EFCDashboardModule />
                </Body>
              )}
              allow={roles.SUBSET_EFC_STAFF}
            />
            <PrivateRoute
              path="/app/user"
              component={() => (
                <Body>
                  <UserModule />
                </Body>
              )}
              allow={roles.SUBSET_EFC_STAFF}
            />

            <Route
              exact
              path="/app/school-app"
              render={() => (
                <Body>
                  <AllSchools />
                </Body>
              )}
            />
            <Route
              path={`/app/delete/:schoolId`}
              render={() => (
                <Body>
                  <DeleteSchool />
                </Body>
              )}
            />
            <Route
              path={`/app/add-school`}
              render={() => {
                return (
                  <Body>
                    <AddSchool />
                  </Body>
                );
              }}
            />
            <Route path="/app/students" render={() => <AllStudentsPage />} />
            <Route
              path={`/app/students/:studentId/send-email`}
              render={routerProps => (
                <SendEmailTemplate
                  schoolId={this.props.location.state.schoolId}
                />
              )}
            />
            <Route
              path={`/app/students/:studentId/send-sms`}
              render={routerProps => (
                <SendSMSTemplate
                  schoolId={this.props.location.state.schoolId}
                />
              )}
            />
          </div>
        </ReferencesContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    screen: state.screen,
  };
};

export default connect(
  EFCApp,
  mapStateToProps
);
