import React from 'react';
import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import AllSchoolsContainer from 'containers/School/AllSchoolsContainer';
import SchoolsDataGrid from './SchoolsDataGrid';
import connect from 'src/redux/connect';
import CreateSchoolFormContainer from 'containers/School/CreateSchoolFormContainer';
import Modal from 'components/Modal';
import PrivateRoute from 'components/Auth/PrivateRoute';
import { roles } from 'util/auth/roles';

type AllSchoolsPageProps = {
  history: {},
  allSchools: {
    payload: {},
  },
  token: {
    payload: {
      SchoolId: string,
    },
  },
};

const AllSchoolsPage = (props: AllSchoolsPageProps) => {
  return (
    <Page className="AdminMessagingAllSchoolsPage" title="All Schools">
      <PageHeader>
        <PageTitle>All Schools</PageTitle>
      </PageHeader>
      <PageBody>
        <AllSchoolsContainer>
          <SchoolsDataGrid data={props.allSchools} history={props.history} />
        </AllSchoolsContainer>
      </PageBody>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    allSchools: state.school.allSchools,
    token: state.token,
  };
};

const ConnectedAllSchoolsPage = connect(
  AllSchoolsPage,
  mapStateToProps
);

export default ConnectedAllSchoolsPage;
