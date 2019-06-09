import Breadcrumbs from 'components/Breadcrumbs';
import Module from 'components/Layout/Module';
import SubNav from 'components/SubNav';
import Tab from 'components/Tab';
import TabList from 'components/TabList';
import StudentCalendarContainer from 'containers/Student/StudentCalendarContainer';
import StudentStyleRankContainer from 'containers/Student/StudentStyleRankContainer';
import moment from 'moment';
import React from 'react';
import { NavLink, Redirect, Route } from 'react-router-dom';
import connect from 'src/redux/connect';
import AttendanceHistory from './AttendanceHistory';
import Calendar from './Calendar';
import Contacts from './Contacts';
import Grading from './Grading';
import Messages from './Messages';
import Notes from './Notes';
import PaymentsModule from './Payments';
import Plans from './Plans';
import './styles.less';
import Summary from './Summary';
import SummaryCard from './Summary/SummaryCard';





type StudentDetailModuleProps = {
  match: { params: { schoolId: string } },
  studentDetail: {
    payload: {
      User: {
        Profile: {
          FirstName: string,
          LastName: string,
        },
      },
      Id: string,
      SchoolId: string,
    },
  },
  studentCalendar: { payload: [] },
};

const StudentDetailModule = (props: StudentDetailModuleProps) => {
  let endDate = moment().format();
  let startDate = moment()
    .subtract(6, 'months')
    .format();

  return (
    <Module className="StudentDetailModule">
      { window.location.href.includes('summary') ? null : <SummaryCard /> }
      {props.match.params.studentId === props.studentDetail.payload.Id && (
        <SubNav>
          {/* Redirect if school context has changed: */}
          {props.match.params.schoolId !==
            props.studentDetail.payload.SchoolId && (
            <Redirect
              to={`/app/school-app/${props.match.params.schoolId}/students/all`}
            />
          )}
          <Breadcrumbs
            list={[
              {
                to: `/app/school-app/${
                  props.match.params.schoolId
                }/students/all`,
                label: 'All Students',
                current: false,
              },
              {
                label:
                  props.studentDetail.payload.User.Profile.FirstName +
                  ' ' +
                  props.studentDetail.payload.User.Profile.LastName,
                current: true,
              },
            ]}
          />
          <TabList>
            <NavLink
              to={`${props.match.url}/summary`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Summary</Tab>
            </NavLink>
            <NavLink
              exact
              to={`${props.match.url}/plans`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Payment Plans</Tab>
            </NavLink>
            <NavLink
              exact
              to={`${props.match.url}/notes`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Notes</Tab>
            </NavLink>
            <NavLink
              to={`${props.match.url}/contacts`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Contacts</Tab>
            </NavLink>
            <NavLink
              to={`${props.match.url}/messages`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Communication Center</Tab>
            </NavLink>
            <NavLink
              to={`${props.match.url}/grading`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Grading</Tab>
            </NavLink>
            <NavLink
              exact
              to={`${props.match.url}/calendar`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Calendar</Tab>
            </NavLink>
            <NavLink
              exact
              to={`${props.match.url}/attendance-history`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Attendance History</Tab>
            </NavLink>
            <NavLink
              to={`${props.match.url}/payments`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Payments History</Tab>
            </NavLink>
          </TabList>
        </SubNav>
      )}

      <Route
        exact
        path={`${props.match.path}`}
        render={() => <Redirect to={`${props.match.url}/summary`} />}
      />
      <Route path={`${props.match.path}/summary`} render={() => <Summary />} />
      <Route
        path={`${props.match.path}/notes`}
        render={innerProps => (
          <Notes studentId={innerProps.match.params.studentId} />
        )}
      />
      <Route
        path={`${props.match.path}/contacts`}
        render={innerProps => (
          <Contacts studentId={innerProps.match.params.studentId} />
        )}
      />
      <Route
        path={`${props.match.path}/messages`}
        render={innerProps => (
          <Messages studentId={innerProps.match.params.studentId} />
        )}
      />
      <Route
        path={`${props.match.path}/grading`}
        render={innerProps => (
          <StudentStyleRankContainer
            dispatchFetchParams={innerProps.match.params.studentId}
          >
            <Grading studentId={innerProps.match.params.studentId} />
          </StudentStyleRankContainer>
        )}
      />
      <Route
        exact
        path={`${props.match.path}/calendar`}
        render={innerProps => (
          <StudentCalendarContainer
            dispatchFetchParams={{
              StartDate: moment(startDate).format(),
              EndDate: moment(endDate).format(),
              IsoCountryCode: 'US',
              SchoolId: innerProps.match.params.schoolId,
              StudentId: innerProps.match.params.studentId,
            }}
          >
            <Calendar
              schoolId={innerProps.match.params.schoolId}
              studentId={innerProps.match.params.studentId}
              data={props.studentCalendar.payload || []}
            />
          </StudentCalendarContainer>
        )}
      />
      <Route
        path={`${props.match.path}/payments`}
        render={() => <PaymentsModule />}
      />
      <Route
        path={`${props.match.path}/attendance-history`}
        render={innerProps => <AttendanceHistory {...innerProps} />}
      />
      <Route
        path={`${props.match.path}/plans`}
        render={innerProps => (
          <Plans
            schoolId={innerProps.match.params.schoolId}
            studentId={innerProps.match.params.studentId}
            {...innerProps}
          />
        )}
      />
    </Module>
  );
};

const mapStateToProps = state => {
  return {
    studentDetail: state.student.detail,
    studentCalendar: state.student.studentCalendar,
  };
};

export default connect(
  StudentDetailModule,
  mapStateToProps
);
