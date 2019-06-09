import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import connect from 'src/redux/connect';

import Module from 'components/Layout/Module';
import SubNav from 'components/SubNav';
import TabList from 'components/TabList';
import Tab from 'components/Tab';

import PrivateRoute from 'components/Auth/PrivateRoute';
import { roles } from 'util/auth/roles';

import TodayPage from './Today';
import FlaggedNotesPage from './FlaggedNotes';
import InternalEFCUserFlaggedNotesPage from './InternalEFCUserFlaggedNotes';
import UnpaidStudentsPage from './UnpaidStudents';

import './styles.less';

type EFCDashboardModuleProps = {
  token: {
    payload: {
      UserName: string,
      Role: string,
      userId: string,
    },
  },
  match: {
    path: string,
  },
};

const EFCDashboardModule = (props: EFCDashboardModuleProps) => {
  return (
    <Module className="EFCDashboardModule">
      <SubNav>
        <div className="breadcrumbs-placeholder" />
        <TabList>
          <NavLink
            exact
            to={`${props.match.url}`}
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>Today</Tab>
          </NavLink>
          <NavLink
            exact
            to={`${props.match.url}/flagged-notes`}
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>Flagged Notes</Tab>
          </NavLink>
          <NavLink
            exact
            to={`${props.match.url}/unpaid-students`}
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>Unpaid Students</Tab>
          </NavLink>
        </TabList>
      </SubNav>
      <Route
        exact
        path={`${props.match.path}`}
        render={() => (
          <div>
            {props.token.payload && (
              <div className="LoggedInAsWrapper">
                <h1>Logged in as: {props.token.payload.UserName}</h1>
                <div className="LoggedInRole">Role: {props.token.payload.Role}</div>
              </div>
            )}
          </div>
        )}
      />
      <PrivateRoute
        path={`${props.match.path}/flagged-notes`}
        allow={[roles.SUPERUSER, roles.EFCADMIN]}
        component={() => <FlaggedNotesPage />}
      />
      <PrivateRoute
        allow={[roles.EFCBILL, roles.EFCNOBILL]}
        path={`${props.match.path}/flagged-notes`}
        component={() => (
          <InternalEFCUserFlaggedNotesPage
            userId={props.token.payload.userId}
          />
        )}
      />
      <Route exact path={`${props.match.path}`} render={() => <TodayPage />} />
      <Route
        exact
        path={`${props.match.path}/unpaid-students`}
        render={() => <UnpaidStudentsPage />}
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
  EFCDashboardModule,
  mapStateToProps
);
