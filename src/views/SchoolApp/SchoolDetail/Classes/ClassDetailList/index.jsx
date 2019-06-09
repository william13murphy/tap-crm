import React from 'react';
import connect from 'src/redux/connect';
import { Link, NavLink, Route, Redirect } from 'react-router-dom';

import PageNav from 'components/Layout/PageNav';
import TabList from 'components/TabList';
import Tab from 'components/Tab';
import TabRoutes from 'components/TabRoutes';

import SchoolStylesContainer from 'containers/School/SchoolStylesContainer';
import ClassInfo from './ClassInfo';
import ClassScheduleDataGrid from './ClassScheduleDataGrid';
import AuthorizedStudents from './AuthorizedStudents';

import './styles.less';

type ClassDetailsProps = {
  schoolClassDetail: {
    payload: {
      Name: string,
      Schedules: Array,
      MaximumStudents: number,
      Instructor: string,
    },
  },
};

class ClassDetailList extends React.Component {
  render() {
    return (
      <div className="ClassDetails__container">
        <PageNav>
          <TabList>
            <NavLink
              to={`${this.props.match.url}/class-info`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Class Info</Tab>
            </NavLink>
            <NavLink
              to={`${this.props.match.url}/class-schedule`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Class Schedule</Tab>
            </NavLink>
            <NavLink
              to={`${this.props.match.url}/authorized-students`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Authorized Students</Tab>
            </NavLink>
          </TabList>
        </PageNav>
        <TabRoutes card>
          <Route
            path={`/app/school-app/:schoolId/school-detail/classes/class-detail/:classId/class-info`}
            render={routerProps => {
              return (
                <SchoolStylesContainer
                  dispatchFetchParams={routerProps.match.params.schoolId}
                >
                  <ClassInfo />
                </SchoolStylesContainer>
              );
            }}
          />
          <Route
            path={`/app/school-app/:schoolId/school-detail/classes/class-detail/:classId/class-schedule`}
            render={routerProps => {
              return (
                <ClassScheduleDataGrid
                  schoolId={routerProps.match.params.schoolId}
                  history={this.props.history}
                />
              );
            }}
          />
          <Route
            path={`/app/school-app/:schoolId/school-detail/classes/class-detail/:classId/authorized-students`}
            render={routerProps => {
              return (
                <AuthorizedStudents
                  id={routerProps.match.params.classId}
                  schoolId={routerProps.match.params.schoolId}
                />
              );
            }}
          />
        </TabRoutes>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    schoolClassDetail: state.school.classDetail,
    schoolUtilityStaffs: state.school.utilityStaffs,
  };
};

export default connect(
  ClassDetailList,
  mapStateToProps
);
