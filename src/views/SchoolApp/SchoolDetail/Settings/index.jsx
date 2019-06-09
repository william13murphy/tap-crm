import React from 'react';
import connect from 'src/redux/connect';
import { roles } from 'util/auth/roles';
import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import ClientSummary from 'views/EFCApp/Clients/ClientDetail/ClientSummary';
import { NavLink, Route, Redirect } from 'react-router-dom';
import TabList from 'components/TabList';
import Tab from 'components/Tab';
import TabRoutes from 'components/TabRoutes';
import PrivateComponent from 'components/Auth/PrivateComponent';

import SchoolProfile from './Profile';
import SchoolContacts from './Contacts';
import SchoolAddresses from './Addresses';
import SchoolBank from './Bank';
import SchoolNotes from './Notes';
import SchoolRates from './Rates';
import SocialMedia from './Social';
import SystemTemplates from './SystemTemplates';

type SchoolSettingsPageProps = {
  schoolId: string,
  history: {},
  match: {
    path: string,
  },
  token: {
    payload: {
      Role: string,
    },
  },
};

const SchoolSettingsPage = (props: SchoolSettingsPageProps) => {
  return (
    <Page className="SchoolSettingsPage" title="School Settings">
      <PageHeader>
        <PageTitle>School Settings</PageTitle>
      </PageHeader>
      <PageBody>
        <div className="SchoolSettingsTabs inner-tabs">
          <TabList>
            <NavLink
              to={`/app/school-app/${
                props.schoolId
              }/school-detail/settings/profile`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Profile</Tab>
            </NavLink>
            <PrivateComponent allow={roles.SUBSET_EFC_STAFF}>
              <NavLink
                to={`/app/school-app/${
                  props.schoolId
                }/school-detail/settings/notes`}
                className="NavLink"
                activeClassName="selected"
              >
                <Tab>Notes</Tab>
              </NavLink>
            </PrivateComponent>
            <NavLink
              to={`/app/school-app/${
                props.schoolId
              }/school-detail/settings/contacts`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Contacts</Tab>
            </NavLink>
            <NavLink
              to={`/app/school-app/${
                props.schoolId
              }/school-detail/settings/address`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Addresses</Tab>
            </NavLink>
            <NavLink
              to={`/app/school-app/${
                props.schoolId
              }/school-detail/settings/bank`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Bank</Tab>
            </NavLink>
            <NavLink
              to={`/app/school-app/${
                props.schoolId
              }/school-detail/settings/rates`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Rates</Tab>
            </NavLink>
            <NavLink
              to={`/app/school-app/${
                props.schoolId
              }/school-detail/settings/social`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>Third Party Accounts</Tab>
            </NavLink>
            <NavLink
              to={`/app/school-app/${
                props.schoolId
              }/school-detail/settings/system-templates`}
              className="NavLink"
              activeClassName="selected"
            >
              <Tab>System Templates</Tab>
            </NavLink>
          </TabList>
          <TabRoutes card>
            <Route
              path="/app/school-app/:schoolId/school-detail/settings"
              exact
              render={() => (
                <Redirect
                  to={`/app/school-app/${
                    props.schoolId
                  }/school-detail/settings/profile`}
                />
              )}
            />
            <Route
              path="/app/school-app/:schoolId/school-detail/settings/profile"
              render={() => (
                <SchoolProfile
                  role={props.token.payload.Role}
                  schoolId={props.schoolId}
                  schoolClient={props.schoolClient}
                  schoolProfile={props.schoolProfile}
                />
              )}
            />
            <Route
              path="/app/school-app/:schoolId/school-detail/settings/notes"
              render={() => <SchoolNotes schoolId={props.schoolId} />}
            />
            <Route
              path="/app/school-app/:schoolId/school-detail/settings/contacts"
              render={() => (
                <SchoolContacts
                  schoolId={props.schoolId}
                  schoolContacts={props.schoolContacts}
                />
              )}
            />
            <Route
              path="/app/school-app/:schoolId/school-detail/settings/address"
              render={() => <SchoolAddresses schoolId={props.schoolId} />}
            />
            <Route
              path="/app/school-app/:schoolId/school-detail/settings/bank"
              render={() => <SchoolBank schoolId={props.schoolId} />}
            />
            <Route
              path="/app/school-app/:schoolId/school-detail/settings/rates"
              render={() => <SchoolRates schoolId={props.schoolId} />}
            />
            <Route
              path="/app/school-app/:schoolId/school-detail/settings/social"
              render={() => (
                <SocialMedia
                  schoolId={props.schoolId}
                  schoolProfile={props.schoolProfile}
                />
              )}
            />
            <Route
              path="/app/school-app/:schoolId/school-detail/settings/system-templates"
              render={() => <SystemTemplates schoolId={props.schoolId} />}
            />
          </TabRoutes>
        </div>
      </PageBody>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    token: state.token,
    schoolClient: state.school.client,
    schoolContacts: state.school.contacts,
    schoolProfile: state.school.profile,
  };
};

export default connect(
  SchoolSettingsPage,
  mapStateToProps
);
