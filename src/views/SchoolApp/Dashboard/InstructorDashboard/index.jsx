import React from 'react';
import { NavLink, Route, Redirect } from 'react-router-dom';
import connect from 'src/redux/connect';

import Module from 'components/Layout/Module';
import SubNav from 'components/SubNav';
import TabList from 'components/TabList';
import Tab from 'components/Tab';

import TodayPage from './Today';
import UserTasksContainer from 'containers/User/UserTasksContainer';
import UserMyAppointmentsContainer from 'containers/User/UserMyAppointmentsContainer';
import UserAppointmentDetailContainer from 'containers/User/UserAppointmentDetailContainer';
import TaskModal from 'views/_shared/User/Tasks';
import AddAppointmentPage from 'views/_shared/User/Appointments/AddAppointment';
import EditAppointment from 'views/_shared/User/Appointments/EditAppointment';
import AppointmentDetail from 'views/_shared/User/Appointments/AppointmentDetail';
import SchoolUtilityStaffsContainer from 'containers/School/SchoolUtilityStaffsContainer';
import SchoolUtilityStudentsContainer from 'containers/School/SchoolUtilityStudentsContainer';
import CalendarPage from 'views/SchoolApp/Dashboard/_shared/Calendar';
import ClassDetail from '../_shared/Today/ClassDetail';
import SchoolClassDetailContainer from 'containers/School/SchoolClassDetailContainer';
import SchoolContactsContainer from 'containers/School/SchoolContactsContainer';

import './styles.less';

type InstructorDashboardModuleProps = {
  match: { params: { schoolId: string } },
  token: {
    payload: {
      UserName: string,
      Role: string,
      SchoolId: string,
    },
  },
};

const InstructorDashboardModule = (props: InstructorDashboardModuleProps) => {
  const schoolId = props.match.params.schoolId;
  return (
    <Module className="InstructorDashboardModule">
      <SubNav>
        <div className="breadcrumbs-placeholder" />
        <TabList>
          <NavLink
            exact
            to={`/app/school-app/${schoolId}/dashboard/today`}
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>Today</Tab>
          </NavLink>
          <NavLink
            to={`/app/school-app/${schoolId}/dashboard/calendar`}
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>Calendar</Tab>
          </NavLink>
        </TabList>
      </SubNav>
      <Route
        path={'/app/school-app/:schoolId/dashboard/today'}
        render={routerProps => (
          <UserTasksContainer>
            <UserMyAppointmentsContainer>
              <TodayPage history={routerProps.history} />
            </UserMyAppointmentsContainer>
          </UserTasksContainer>
        )}
      />
      <Route
        exact
        path={'/app/dashboard'}
        render={() => (
          <Redirect to={`/app/school-app/${schoolId}/dashboard/today`} />
        )}
      />
      <Route
        exact
        path={'/app/school-app/:schoolId/dashboard'}
        render={() => (
          <Redirect to={`/app/school-app/${schoolId}/dashboard/today`} />
        )}
      />
      <Route
        exact
        path={'/app/school-app/:schoolId/dashboard/calendar/appointments/add'}
        render={() => <AddAppointmentPage />}
      />
      <Route
        exact
        path={
          '/app/school-app/:schoolId/dashboard/calendar/appointments/:appointmentId/detail'
        }
        render={routeProps => (
          <SchoolContactsContainer dispatchFetchParams={schoolId}>
            <SchoolUtilityStaffsContainer dispatchFetchParams={schoolId}>
              <SchoolUtilityStudentsContainer dispatchFetchParams={schoolId}>
                <UserAppointmentDetailContainer
                  dispatchFetchParams={routeProps.match.params.appointmentId}
                >
                  <AppointmentDetail
                    backUrl={`/app/school-app/${schoolId}/dashboard/calendar`}
                  />
                </UserAppointmentDetailContainer>
              </SchoolUtilityStudentsContainer>
            </SchoolUtilityStaffsContainer>
          </SchoolContactsContainer>
        )}
      />
      <Route
        path={
          '/app/school-app/:schoolId/dashboard/calendar/appointments/:appointmentId/detail/edit'
        }
        render={() => <EditAppointment />}
      />
      <Route
        path={
          '/app/school-app/:schoolId/dashboard/class-detail/:classId/:classScheduleId'
        }
        render={props => (
          <SchoolClassDetailContainer
            dispatchFetchParams={
              props.match.params && props.match.params.classId
            }
          >
            <ClassDetail
              classId={props.match.params && props.match.params.classId}
            />
          </SchoolClassDetailContainer>
        )}
      />
      <Route
        // exact
        path={'/app/school-app/:schoolId/dashboard/calendar'}
        render={props => (
          <UserMyAppointmentsContainer>
            <CalendarPage />
          </UserMyAppointmentsContainer>
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
  InstructorDashboardModule,
  mapStateToProps
);
