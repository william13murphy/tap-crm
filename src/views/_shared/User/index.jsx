import React from 'react';
import { roles } from 'util/auth/roles';
import { NavLink, Route } from 'react-router-dom';

import Tab from 'components/Tab';
import SubNav from 'components/SubNav';
import TabList from 'components/TabList';
import Module from 'components/Layout/Module';
import PrivateRoute from 'components/Auth/PrivateRoute';
import PrivateComponent from 'components/Auth/PrivateComponent';

import routes from './routes';
import UserProfilePage from './Profile';
import UserTasksPage from './Tasks/TasksPage';
import AccountSettingsPage from './AccountSettings';
import ApplicationSettingsPage from './ApplicationSettings';
import HelpDeskPage from './HelpDesk';
//import ClockHistoryPage from './ClockHistory';
import './styles.less';

const UserModule = () => {
  return (
    <Module className="UserModule">
      <SubNav>
        <div className="breadcrumbs-placeholder" />
        <TabList>
          {routes.map((cV, i) => {
            return (
              <PrivateComponent allow={cV.allow} key={i}>
                <NavLink
                  to={cV.path}
                  className="NavLink"
                  activeClassName="selected"
                  key={i}
                >
                  <Tab>{cV.name}</Tab>
                </NavLink>
              </PrivateComponent>
            );
          })}
        </TabList>
      </SubNav>
      <PrivateRoute
        path="/app/user/profile"
        component={UserProfilePage}
        allow={roles.all}
      />
      <PrivateRoute
        path="/app/user/account"
        component={AccountSettingsPage}
        allow={roles.all}
      />
      <PrivateRoute
        path="/app/user/application-settings"
        component={ApplicationSettingsPage}
        allow={roles.all}
      />
      <PrivateRoute
        path="/app/user/help-desk"
        component={HelpDeskPage}
        allow={roles.all}
      />
      <PrivateRoute
        path="/app/user/all-tasks"
        component={UserTasksPage}
        allow={roles.SUBSET_SCHOOL_STAFF}
      />
      {/*<PrivateRoute
        path="/app/user/clock-history"
        component={ClockHistoryPage}
        allow={roles.SUBSET_SCHOOL_STAFF}
      />*/}
    </Module>
  );
};

export { UserModule as default };
