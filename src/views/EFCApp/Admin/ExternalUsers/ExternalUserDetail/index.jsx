import React from 'react';
import { Link } from 'react-router-dom';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import BackButton from 'components/Buttons/BackButton';

import UserContainer from 'containers/Administration/UserContainer';
import ExternalUserProfileCard from 'components/ProfileCard/ExternalUserProfileCard';

const ExternalUserDetailModule = props => {
  return (
    <Page className="ExternalUserDetailPage" title="External User Detail">
      <PageHeader>
        <PageTitle inline>User Profile</PageTitle>
        <Link to="/app/admin/external-users">
          <BackButton>All External Users</BackButton>
        </Link>
      </PageHeader>
      <PageBody>
        <UserContainer dispatchFetchParams={props.match.params.id}>
          <ExternalUserProfileCard />
        </UserContainer>
      </PageBody>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    nonEfcUsers: state.administration.nonEfcUsers,
  };
};

export default connect(ExternalUserDetailModule, mapStateToProps);
