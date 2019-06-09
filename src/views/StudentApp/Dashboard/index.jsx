import React from 'react';
import connect from 'src/redux/connect';

import Module from 'components/Layout/Module';
import { Route } from 'react-router-dom';
import TabList from 'components/TabList';
import Tab from 'components/Tab';

import TodayPage from './Today';
import UserMyAppointmentsContainer from 'containers/User/UserMyAppointmentsContainer';
import UserMeContainer from 'containers/User/UserMeContainer';
import './styles.less';

type StudentDashboardModuleProps = {
  token: {
    payload: {
      UserName: string,
      Role: string,
    },
  },
};

const StudentDashboardModule = (props: StudentDashboardModuleProps) => {
  return (
    <Module className="StudentDashboardModule">
      <Route
        path="/app/dashboard"
        render={routerProps => (
          <UserMeContainer>
            <UserMyAppointmentsContainer>
              <TodayPage history={routerProps.history} />
            </UserMyAppointmentsContainer>
          </UserMeContainer>
        )}
      />
    </Module>
  );
};

function mapStateToProps(state) {
  return {
    token: state.token,
  };
}

export default connect(
  StudentDashboardModule,
  mapStateToProps
);
