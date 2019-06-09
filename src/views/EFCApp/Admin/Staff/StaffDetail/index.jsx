import React from 'react';
import connect from 'src/redux/connect';

import UserContainer from 'containers/Administration/UserContainer';
import AdminStaffProfileCard from 'components/ProfileCard/AdminStaffProfileCard';

import EfcUserSchoolsContainer from 'containers/Administration/EfcUserSchoolsContainer';
import StaffSchoolsDataGrid from './StaffSchoolsDataGrid';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import BackButton from 'components/Buttons/BackButton';
import { Link } from 'react-router-dom';

type StaffDetailPageProps = {
  match: {
    params: {
      id: string,
    },
  },
};

const StaffDetailPage = (props: StaffDetailPageProps) => {
  return (
    <Page className="StaffDetailPage" title="Staff Detail">
      <PageHeader>
        <PageTitle inline>Staff Profile</PageTitle>
        <Link to="/app/admin/staff">
          <BackButton>All Staff</BackButton>
        </Link>
      </PageHeader>
      <UserContainer dispatchFetchParams={props.match.params.id}>
        <AdminStaffProfileCard />
      </UserContainer>
      <h2>Managed Schools</h2>
      <EfcUserSchoolsContainer dispatchFetchParams={props.match.params.id}>
        <StaffSchoolsDataGrid data={props.efcUserSchools.payload} />
      </EfcUserSchoolsContainer>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    efcUsers: state.administration.efcUsers,
    efcUserSchools: state.administration.efcUserSchools,
  };
};

export default connect(
  StaffDetailPage,
  mapStateToProps
);
