import React from 'react';
import connect from 'src/redux/connect';

import Module from 'components/Layout/Module';
import SubNav from 'components/SubNav';
import { NavLink, Link, Route } from 'react-router-dom';
import TabList from 'components/TabList';
import Tab from 'components/Tab';

import CompanyInformationContainer from 'containers/Utility/CompanyInformationContainer';
import CompanyPage from './Company';
import StaffPage from './Staff';
import ExternalUsersPage from './ExternalUsers';
import LogPage from './Log';
import MessagingPage from './Messaging';
import ExternalUserDetailModule from './ExternalUsers/ExternalUserDetail';
import StaffDetailModule from './Staff/StaffDetail';
import './styles.less';

import Modal from 'components/Modal';
import FormChoice from 'components/FormChoice';
import AddClientAdminForm from './ExternalUsers/AddClientAdminForm';
import AddSchoolUserForm from './ExternalUsers/AddSchoolUserForm';
import ClientContactSaveFormContainer from 'containers/Client/ClientContactSaveFormContainer';
import SchoolContactFormContainer from 'containers/School/SchoolContactFormContainer';
import AllSchoolsContainer from 'containers/School/AllSchoolsContainer';
import AllClientsContainer from 'containers/Client/AllClientsContainer';

const AdminModule = props => {
  return (
    <Module className="AdminModule">
      <SubNav>
        <div className="breadcrumbs-placeholder" />
        <TabList>
          <NavLink
            exact
            to="/app/admin"
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>Company</Tab>
          </NavLink>
          <NavLink
            to="/app/admin/staff"
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>Staff</Tab>
          </NavLink>
          <NavLink
            to="/app/admin/external-users"
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>External Users</Tab>
          </NavLink>
          <NavLink
            to="/app/admin/messaging"
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>Messaging</Tab>
          </NavLink>
          <NavLink
            to="/app/admin/logs"
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>Logs</Tab>
          </NavLink>
        </TabList>
      </SubNav>

      <Route
        exact
        path="/app/admin"
        render={() => (
          <CompanyInformationContainer>
            <CompanyPage />
          </CompanyInformationContainer>
        )}
      />
      <Route exact path="/app/admin/staff" render={() => <StaffPage />} />
      <Route exact path="/app/admin/staff/add" render={() => <StaffPage />} />
      <Route
        path="/app/admin/staff/detail/:id"
        render={() => <StaffDetailModule />}
      />
      <Route
        exact
        path="/app/admin/external-users"
        render={() => <ExternalUsersPage />}
      />
      <Route
        path="/app/admin/external-users/add"
        render={innerProps => {
          return (
            <Modal
              title="Choose an External User Type"
              closeUrl="/app/admin/external-users"
            >
              <div>
                <FormChoice className="CreateMessageChoice">
                  <Link
                    to={`${innerProps.match.url}/client-user`}
                    className="pt-button pt-intent-primary"
                  >
                    Client Admin
                  </Link>
                  &nbsp;&nbsp;
                  <Link
                    to={`${innerProps.match.url}/school-user`}
                    className="pt-button pt-intent-primary"
                  >
                    School User
                  </Link>
                </FormChoice>
              </div>
            </Modal>
          );
        }}
      />
      <Route
        path="/app/admin/external-users/add/client-user"
        render={innerProps => {
          return (
            <Modal
              title="Add a Client User"
              closeUrl="/app/admin/external-users"
            >
              <AllClientsContainer>
                <ClientContactSaveFormContainer redirectOnSuccess="/app/admin/external-users/">
                  <AddClientAdminForm />
                </ClientContactSaveFormContainer>
              </AllClientsContainer>
            </Modal>
          );
        }}
      />
      <Route
        path="/app/admin/external-users/add/school-user"
        render={innerProps => {
          return (
            <Modal
              title="Add a School User"
              closeUrl="/app/admin/external-users"
            >
              <AllSchoolsContainer>
                <SchoolContactFormContainer redirectOnSuccess="/app/admin/external-users/">
                  <AddSchoolUserForm />
                </SchoolContactFormContainer>
              </AllSchoolsContainer>
            </Modal>
          );
        }}
      />
      <Route
        path="/app/admin/external-users/detail/:id"
        render={() => <ExternalUserDetailModule />}
      />
      <Route path="/app/admin/messaging" render={() => <MessagingPage />} />
      <Route path="/app/admin/logs" render={() => <LogPage />} />
    </Module>
  );
};

export default connect(AdminModule);
