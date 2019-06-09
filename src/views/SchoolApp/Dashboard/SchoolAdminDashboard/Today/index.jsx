import React from 'react';
import moment from 'moment';
import connect from 'src/redux/connect';
import { Link, Route } from 'react-router-dom';
import { roles } from 'util/auth/roles';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import DataCard from 'components/DataCard';
import Modal from 'components/Modal';
import PrivateComponent from 'components/Auth/PrivateComponent';
import InputBlock from 'components/Forms/InputBlock';

// import ClockInOutForm from '../../_shared/Today/ClockInOutForm';
// import ClockInOut from '../../_shared/Today/ClockInOut';
import TaskList from '../../_shared/Today/TaskList';
import TodayCalendar from '../../_shared/Today/TodayCalendar';
import SchoolHealth from '../../_shared/Today/SchoolHealth';
import TasksModal from 'views/_shared/User/Tasks';
import FlaggedNotesPreview from '../../_shared/Today/FlaggedNotesPreview';

import SchoolHealthContainer from 'containers/Report/SchoolHealthContainer';
import SchoolUtilityStaffsContainer from 'containers/School/SchoolUtilityStaffsContainer';
import StudentsBirthdayBySchoolByDaysContainer from 'containers/Report/StudentsBirthdayBySchoolByDaysContainer';
import StudentsBirthdayBySchoolByDaysGrid from 'views/SchoolApp/Dashboard/_shared/Today/SchoolHealth/StudentsBirthdayBySchoolByDaysGrid';
// import SchoolClockInOutFormContainer from 'containers/School/SchoolClockInOutFormContainer';
// import SchoolClockInOutContainer from 'containers/School/SchoolClockInOutContainer';
import SchoolCalendarContainer from 'containers/School/SchoolCalendarContainer';
import SchoolContactCalendarContainer from 'containers/School/SchoolContactCalendarContainer';
import NotesForSchoolContainer from 'containers/Student/NotesForSchoolContainer';
import StudentNoteFormContainer from 'containers/Student/StudentNoteFormContainer';
import AddStudentNoteForm from '../../../Students/StudentDetail/Notes/AddStudentNoteForm';
import { getTimeZoneLabel } from 'src/util/localization/timezone';

import 'views/SchoolApp/Dashboard/_shared/Today/styles.less'; // Shared stylesheet with InstructorDashboard.

type TodayPageProps = {
  match: { params: { schoolId: string } },
  token: {
    payload: {
      UserName: string,
      UserId: string,
      TimeZone: string,
    },
  },
  contactCalendar: {
    payload: [],
  },
  myTasks: {
    payload: [],
  },
  myAppointments: {
    payload: [],
  },
  references: {},
  dispatchFormPost: Function,
  history: {},
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
      <Page className="SchoolAdminDashboard TodayPage" title="Today">
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
        <Route
          path={`${this.props.match.path}/:noteId/reply`}
          render={innerProps => {
            return (
              <Modal
                title={`Reply to ${innerProps.location.state.initialValues &&
                  innerProps.location.state.initialValues.Title}`}
                closeUrl={`/app/school-app/${schoolId}/dashboard/today`}
              >
                <StudentNoteFormContainer
                  dispatchActionOnSuccessParams={{
                    studentId:
                      innerProps.location.state.initialValues.StudentId,
                    schoolId: schoolId,
                  }}
                  redirectOnSuccess={`/app/school-app/${schoolId}/dashboard/today`}
                >
                  <AddStudentNoteForm
                    studentId={
                      innerProps.location.state.initialValues.StudentId
                    }
                    initialValues={innerProps.location.state.initialValues}
                  />
                </StudentNoteFormContainer>
              </Modal>
            );
          }}
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
              <PrivateComponent allow={roles.SUBSET_EFC_STAFF}>
                <SchoolCalendarContainer
                  loading={{
                    height: 170,
                  }}
                  dispatchFetchParams={{
                    StartDate: moment()
                      .subtract(2, 'months')
                      .format(),
                    EndDate: moment()
                      .add(6, 'months')
                      .format(),
                    IsoCountryCode: 'US',
                    SchoolId: schoolId,
                  }}
                >
                  <TodayCalendar
                    schoolId={schoolId}
                    calendar={this.props.schoolCalendar}
                    timeZone={this.state.schoolTimeZone}
                  />
                </SchoolCalendarContainer>
              </PrivateComponent>
              <PrivateComponent allow={roles.SUBSET_SCHOOL_STAFF}>
                <SchoolContactCalendarContainer
                  loading={{
                    height: 170,
                  }}
                  dispatchFetchParams={{
                    StartDate: moment()
                      .subtract(2, 'months')
                      .format(),
                    EndDate: moment()
                      .add(6, 'months')
                      .format(),
                    IsoCountryCode: 'US',
                    SchoolId: schoolId,
                    ContactId: this.props.token.payload.UserId,
                  }}
                >
                  <TodayCalendar
                    schoolId={schoolId}
                    calendar={this.props.contactCalendar}
                    myAppointments={this.props.myAppointments}
                    timeZone={this.state.schoolTimeZone}
                  />
                </SchoolContactCalendarContainer>
              </PrivateComponent>
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

            <PrivateComponent allow={roles.SUBSET_EFC_STAFF}>
              <div className="DashboardRight__wrapper">
                <div className="DashboardRight__header Dashboard__header">
                  <h2 className="Dashboard__subtitle">Flagged Notes</h2>
                </div>
                <NotesForSchoolContainer
                  dispatchFetchParams={schoolId}
                  loading={{ height: 170 }}
                >
                  <FlaggedNotesPreview
                    schoolId={schoolId}
                    notesForSchool={this.props.notesForSchool}
                  />
                </NotesForSchoolContainer>
              </div>
            </PrivateComponent>
          </InputBlock>
        </PageBody>
        <PageHeader>
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
    contactCalendar: state.school.contactCalendar,
    schoolCalendar: state.school.calendar,
    myAppointments: state.user.myAppointments,
    myTasks: state.user.myTasks,
    references: state.utility.references,
    clockInOut: state.school.clockInOut,
    notesForSchool: state.student.notesForSchool,
  };
}

export default connect(
  TodayPage,
  mapStateToProps
);
