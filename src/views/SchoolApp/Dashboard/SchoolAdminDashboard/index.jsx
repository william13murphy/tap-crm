import React from 'react';
import connect from 'src/redux/connect';

import Module from 'components/Layout/Module';
import SubNav from 'components/SubNav';
import { NavLink, Route, Redirect } from 'react-router-dom';
import TabList from 'components/TabList';
import Tab from 'components/Tab';

import TodayPage from './Today';
import SchoolOverviewPage from './SchoolOverview';
import MarketingOverviewPage from './MarketingOverview';
import ClassDetailPage from '../_shared/Today/ClassDetail';
import CalendarPage from 'views/SchoolApp/Dashboard/_shared/Calendar';
import FlaggedNotesPage from './FlaggedNotes';

import ProgressionExceptionContainer from 'containers/Report/ProgressionExceptionContainer';
import MarketingLeadContainer from 'containers/Report/MarketingLeadContainer';
import UserTasksContainer from 'containers/User/UserTasksContainer';
import UserMyAppointmentsContainer from 'containers/User/UserMyAppointmentsContainer';
import UserAppointmentDetailContainer from 'containers/User/UserAppointmentDetailContainer';
import AddAppointmentPage from 'views/_shared/User/Appointments/AddAppointment';
import EditAppointment from 'views/_shared/User/Appointments/EditAppointment';
import AppointmentDetail from 'views/_shared/User/Appointments/AppointmentDetail';
import SchoolUtilityStaffsContainer from 'containers/School/SchoolUtilityStaffsContainer';
import SchoolUtilityStudentsContainer from 'containers/School/SchoolUtilityStudentsContainer';
import SchoolClassDetailContainer from 'containers/School/SchoolClassDetailContainer';
import SchoolContactsContainer from 'containers/School/SchoolContactsContainer';
import SchoolLeadsContainer from 'containers/School/SchoolLeadsContainer';

import { calculateUTCDateTimeFromLocalDateAndTime } from 'src/util/localization/timezone';

import './styles.less';

type SchoolAdminDashboardModuleProps = {
  match: { params: { schoolId: string } },
  appointmentDetail: {
    payload: any,
  },
  token: {
    TimeZone: string,
  },
  utilityStaffs: {
    payload: [],
  },
  utilityStudents: {
    payload: [],
  },
};

const SchoolAdminDashboardModule = (props: SchoolAdminDashboardModuleProps) => {
  const schoolId = props.match.params.schoolId;
  let appointmentDetail = props.appointmentDetail.payload;
  let StartTimeUtc, EndTimeUtc, staffs, students;

  if (appointmentDetail) {
    staffs =
      props.utilityStaffs.payload &&
      props.utilityStaffs.payload.filter(item => {
        let matchedItem =
          appointmentDetail.AppointmentMembers &&
          appointmentDetail.AppointmentMembers.find(
            member => member.UserId === item.UserId
          );
        if (matchedItem) return true;
      });

    students =
      props.utilityStudents.payload &&
      props.utilityStudents.payload.filter(item => {
        let matchedItem =
          appointmentDetail.AppointmentMembers &&
          appointmentDetail.AppointmentMembers.find(
            member => member.UserId === item.UserId
          );
        if (matchedItem) return true;
      });

    StartTimeUtc = calculateUTCDateTimeFromLocalDateAndTime(
      props.token.TimeZone,
      props.appointmentDetail.payload.StartDate,
      props.appointmentDetail.payload.StartTimeUtc
    ).format();

    EndTimeUtc = calculateUTCDateTimeFromLocalDateAndTime(
      props.token.TimeZone,
      props.appointmentDetail.payload.EndDate,
      props.appointmentDetail.payload.EndTimeUtc
    ).format();
  }

  return (
    <Module className="SchoolAdminDashboardModule">
      <SubNav>
        <div className="breadcrumbs-placeholder" />
        <TabList>
          <NavLink
            to={`/app/school-app/${schoolId}/dashboard/today`}
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>Today</Tab>
          </NavLink>
          <NavLink
            to={`/app/school-app/${schoolId}/dashboard/school-overview`}
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>School Overview</Tab>
          </NavLink>
          <NavLink
            to={`/app/school-app/${schoolId}/dashboard/marketing-overview`}
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>Marketing Overview</Tab>
          </NavLink>
          <NavLink
            to={`/app/school-app/${schoolId}/dashboard/calendar`}
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>Calendar</Tab>
          </NavLink>
          <NavLink
            to={`/app/school-app/${schoolId}/dashboard/flagged-notes`}
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>Flagged Notes</Tab>
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
        path={'/app/school-app/:schoolId/dashboard/school-overview'}
        render={() => (
          <ProgressionExceptionContainer dispatchFetchParams={schoolId}>
            <SchoolOverviewPage />
          </ProgressionExceptionContainer>
        )}
      />
      <Route
        path={'/app/school-app/:schoolId/dashboard/marketing-overview'}
        render={() => (
          <SchoolLeadsContainer dispatchFetchParams={schoolId}>
            <MarketingLeadContainer dispatchFetchParams={schoolId}>
              <MarketingOverviewPage />
            </MarketingLeadContainer>
          </SchoolLeadsContainer>
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
        render={routerProps => (
          <SchoolContactsContainer dispatchFetchParams={schoolId}>
            <SchoolUtilityStaffsContainer dispatchFetchParams={schoolId}>
              <SchoolUtilityStudentsContainer dispatchFetchParams={schoolId}>
                <UserAppointmentDetailContainer
                  dispatchFetchParams={routerProps.match.params.appointmentId}
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
        exact
        path={
          '/app/school-app/:schoolId/dashboard/calendar/appointments/:appointmentId/detail/edit'
        }
        render={() => <EditAppointment />}
      />
      <Route
        path={
          '/app/school-app/:schoolId/dashboard/class-detail/:classId/:classScheduleId'
        }
        render={routerProps => (
          <SchoolClassDetailContainer
            dispatchFetchParams={
              routerProps.match.params && routerProps.match.params.classId
            }
          >
            <ClassDetailPage
              classId={
                routerProps.match.params && routerProps.match.params.classId
              }
            />
          </SchoolClassDetailContainer>
        )}
      />
      <Route
        exact
        path={'/app/school-app/:schoolId/dashboard/calendar'}
        render={() => (
          <UserMyAppointmentsContainer>
            <CalendarPage />
          </UserMyAppointmentsContainer>
        )}
      />
      <Route
        path={'/app/school-app/:schoolId/dashboard/flagged-notes'}
        render={() => <FlaggedNotesPage schoolId={schoolId} />}
      />
    </Module>
  );
};

function mapStateToProps(state) {
  return {
    utilityStudents: state.school.utilityStudents,
    utilityStaffs: state.school.utilityStaffs,
    token: state.token.payload,
    appointmentDetail: state.user.appointmentDetail,
  };
}

export default connect(
  SchoolAdminDashboardModule,
  mapStateToProps
);
