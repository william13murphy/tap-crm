import React from 'react';
import connect from 'src/redux/connect';
import moment from 'moment';
import { Link, Route } from 'react-router-dom';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import DataCard from 'components/DataCard';

import TodayCalendar from '../../_shared/Today/TodayCalendar';

import InputBlock from 'components/Forms/InputBlock';

// import ClockInOutForm from '../../_shared/Today/ClockInOutForm';
// import ClockInOut from '../../_shared/Today/ClockInOut';
import SchoolUtilityStaffsContainer from 'containers/School/SchoolUtilityStaffsContainer';
import TaskList from '../../_shared/Today/TaskList';
import TasksModal from 'views/_shared/User/Tasks';
// import SchoolClockInOutFormContainer from 'containers/School/SchoolClockInOutFormContainer';
// import SchoolClockInOutContainer from 'containers/School/SchoolClockInOutContainer';
import InstructorCalendarContainer from 'containers/School/InstructorCalendarContainer';
import PrivateComponent from 'components/Auth/PrivateComponent';

import SchoolHealthContainer from 'containers/Report/SchoolHealthContainer';
import SchoolHealth from '../../_shared/Today/SchoolHealth';
import Modal from 'components/Modal';
import StudentsBirthdayBySchoolByDaysContainer from 'containers/Report/StudentsBirthdayBySchoolByDaysContainer';
import StudentsBirthdayBySchoolByDaysGrid from 'views/SchoolApp/Dashboard/_shared/Today/SchoolHealth/StudentsBirthdayBySchoolByDaysGrid';

import { roles } from 'util/auth/roles';
import 'views/SchoolApp/Dashboard/_shared/Today/styles.less'; // Shared stylesheet with SchoolAdminDashboard.
import { getTimeZoneLabel } from 'src/util/localization/timezone';

type TodayPageProps = {
  match: { params: { schoolId: string } },
  token: {
    payload: {
      UserName: string,
      UserId: string,
      TimeZone: string,
    },
  },
  calendar: {
    payload: [],
  },
  dispatchFormPost: Function,
  myTasks: {},
  myAppointments: {},
  history: {},
  references: {},
  clockInOut: {},
};

class TodayPage extends React.Component {
  props: TodayPageProps;

  componentWillMount() {
    this.setSchoolTimeZone();
  }

  setSchoolTimeZone() {
    let schoolTimeZone = getTimeZoneLabel(
      this.props.references,
      this.props.schoolProfile.payload.TimeZoneId
    );

    this.setState({
      schoolTimeZone,
    });
  }

  render() {
    const schoolId = this.props.match.params.schoolId;
    return (
      <Page className="InstructorDashboard TodayPage" title="Today">
        <Route
          exact
          path={'/app/school-app/:schoolId/dashboard/today/tasks/add'}
          render={() => <TasksModal />}
        />
        <Route
          path={'/app/school-app/:schoolId/dashboard/today/tasks/:id/edit'}
          render={() => <TasksModal />}
        />
        {/*<Route
          path={'/app/school-app/:schoolId/dashboard/today/clock'}
          render={() => (
            <SchoolClockInOutContainer
              dispatchFetchParams={this.props.token.payload.UserId}
            >
              <ClockInOut
                clockInOut={this.props.clockInOut}
                references={this.props.references}
                dispatchFormPost={this.props.dispatchFormPost}
              />
            </SchoolClockInOutContainer>
          )}
        />*/}
        <Route
          path={`${this.props.match.path}/birthdays`}
          render={() => (
            <Modal title="Upcoming Birthdays" closeUrl={this.props.match.url}>
              <StudentsBirthdayBySchoolByDaysContainer
                dispatchFetchParams={{
                  schoolId: schoolId,
                  days: 30,
                }}
              >
                <StudentsBirthdayBySchoolByDaysGrid />
              </StudentsBirthdayBySchoolByDaysContainer>
            </Modal>
          )}
        />
        <PageBody>
          <InputBlock>
            <div className="DashboardLeft__wrapper">
              <div className="DashboardLeft__header Dashboard__header">
                <h2 className="Dashboard__subtitle">Today's Schedule</h2>
                {/*<PrivateComponent allow={roles.SUBSET_SCHOOL_STAFF}>
                  <div className="Clock__wrapper">
                    <SchoolClockInOutContainer
                      dispatchFetchParams={this.props.token.payload.UserId}
                    >
                      <SchoolClockInOutFormContainer
                        dispatchActionOnCloseParams={
                          this.props.token.payload.UserId
                        }
                        redirectOnSuccess={`/app/school-app/${schoolId}/dashboard/today/clock`}
                      >
                        <ClockInOutForm
                          history={this.props.history}
                          token={this.props.token}
                          references={this.props.references}
                          clockInOut={this.props.clockInOut}
                          schoolId={schoolId}
                        />
                      </SchoolClockInOutFormContainer>
                    </SchoolClockInOutContainer>
                  </div>
                </PrivateComponent>*/}
              </div>

              <InstructorCalendarContainer
                loading={{ height: 170 }}
                dispatchFetchParams={{
                  StartDate: moment().format(),
                  EndDate: moment().format(),
                  IsoCountryCode: 'US',
                  SchoolId: schoolId,
                  InstructorId: this.props.token.payload.UserId,
                }}
              >
                <TodayCalendar
                  schoolId={schoolId}
                  timeZone={this.state.schoolTimeZone}
                  calendar={this.props.calendar}
                  myAppointments={this.props.myAppointments}
                />
              </InstructorCalendarContainer>
            </div>
            <PrivateComponent allow={roles.SUBSET_SCHOOL_STAFF}>
              <div className="DashboardRight__wrapper">
                <div className="DashboardRight__header Dashboard__header">
                  <h2 className="Dashboard__subtitle">Today's Tasks</h2>
                  <div className="TaskList__actions">
                    <Link
                      className="pt-button pt-intent-primary pt-icon-add-to-artifact DashboardRight__link"
                      to={`/app/school-app/${schoolId}/dashboard/today/tasks/add`}
                    >
                      &nbsp;&nbsp;New Task
                    </Link>
                    <div>
                      <Link className="pt-button" to={'/app/user/all-tasks'}>
                        View all tasks &nbsp;&nbsp;&nbsp;
                        <span className="pt-icon pt-icon-chevron-right" />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="TaskList__grid__wrapper">
                  <SchoolUtilityStaffsContainer
                    loading={{ height: 170 }}
                    dispatchFetchParams={schoolId}
                  >
                    <TaskList
                      references={this.props.references}
                      data={this.props.myTasks}
                      history={this.props.history}
                    />
                  </SchoolUtilityStaffsContainer>
                </div>
              </div>
            </PrivateComponent>
          </InputBlock>
        </PageBody>
        <PageHeader>
          {/*
          <PageTitle paddingNone inline>
            Today
          </PageTitle>
*/}
          <Route
            exact
            path={this.props.match.path}
            render={() => (
              <DataCard title="School Health" className="SchoolHealthDataCard">
                <SchoolHealthContainer
                  loading={{ height: 117 }}
                  dispatchFetchParams={{
                    SchoolId: schoolId,
                    StartDate: moment().format(),
                    EndDate: moment()
                      .add(30, 'days')
                      .format(),
                  }}
                >
                  <SchoolHealth />
                </SchoolHealthContainer>
              </DataCard>
            )}
          />
        </PageHeader>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.token,
    schoolProfile: state.school.profile,
    calendar: state.school.instructorCalendar,
    myTasks: state.user.myTasks,
    myAppointments: state.user.myAppointments,
    references: state.utility.references,
    clockInOut: state.school.clockInOut,
  };
}

export default connect(
  TodayPage,
  mapStateToProps
);
