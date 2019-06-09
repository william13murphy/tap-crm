import React from 'react';
import Page from 'components/Layout/Page';
import { Link } from 'react-router-dom';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import AllSchoolsContainer from 'containers/School/AllSchoolsContainer';
import SchoolsDataGrid from './SchoolsDataGrid';
import connect from 'src/redux/connect';
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
    <Page className="AllSchoolsPage" title="All Schools">
      <PageHeader>
        <PageTitle inline>All Schools</PageTitle>
        <Link to={`/app/add-school`}>
          <button className="pt-button pt-intent-primary">
            <i className="Icon fa fa-building" aria-hidden="true" />
           &nbsp; Add New School
          </button>
        </Link>
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

// export { AllSchoolsPage as default };
