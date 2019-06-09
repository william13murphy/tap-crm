import React from 'react';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import UserMeContainer from 'containers/User/UserMeContainer';
import UserProfileCard from './UserProfileCard';
import './styles.less';

const UserProfilePage = () => {
  return (
    <Page className="UserProfilePage" title="My Profile">
      <PageHeader>
        <PageTitle>My Profile</PageTitle>
      </PageHeader>
      <PageBody>
        <UserMeContainer>
          <UserProfileCard />
        </UserMeContainer>
      </PageBody>
    </Page>
  );
};

export default UserProfilePage;
