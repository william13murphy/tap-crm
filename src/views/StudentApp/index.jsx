import React from 'react';
import connect from 'src/redux/connect';
import { Route, Redirect } from 'react-router-dom';
import PrivateRoute from 'components/Auth/PrivateRoute';
import { roles } from 'util/auth/roles';

import ReferencesContainer from 'containers/ReferencesContainer';

import MobileNav from 'components/Nav/MobileNav';
import SchoolNav from 'components/Nav/SchoolNav';
import SubNav from 'components/SubNav';
import Body from 'components/Body';

import DashboardModule from './Dashboard';
import UserModule from 'views/_shared/User';
import ProgramsModule from './Programs';
import SchoolInfoModule from './SchoolInfo';
import StudentAccountModule from './StudentAccount';

import routes from './routes';

type StudentAppProps = {};

class StudentApp extends React.Component {
  props: StudentAppProps;
  renderNav() {
    if (this.props.screen) {
      if (this.props.screen.sizeTabletSmall) {
        return <SchoolNav routes={routes} studentApp />;
      } else {
        return <MobileNav studentApp routes={routes} />;
      }
    }
  }
  render() {
    return (
      <div className="StudentApp">
        <ReferencesContainer>
          {this.renderNav()}
          <SubNav />
          <Body>
            <Route
              exact={true}
              path="/app"
              render={() => <Redirect to="/app/dashboard" />}
            />
            <PrivateRoute
              path="/app/dashboard"
              component={DashboardModule}
              allow={roles.STUDENT}
            />
            <PrivateRoute
              path="/app/programs"
              component={ProgramsModule}
              allow={[roles.STUDENT]}
            />
            <PrivateRoute
              path="/app/school"
              component={SchoolInfoModule}
              allow={roles.STUDENT}
            />
            <PrivateRoute
              path="/app/account"
              component={StudentAccountModule}
              allow={roles.STUDENT}
            />
            <PrivateRoute
              path="/app/user"
              component={UserModule}
              allow={roles.STUDENT}
            />
          </Body>
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
  StudentApp,
  mapStateToProps
);
