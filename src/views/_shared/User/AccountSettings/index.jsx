import React from 'react';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import UserAccountCard from './UserAccountCard';
import UserMeContainer from 'containers/User/UserMeContainer';
import './styles.less';

const AccountSettingsPage = () => {
  return (
    <Page className="AccountSettingsPage" title="Account Settings">
      <PageHeader>
        <PageTitle>Account Settings</PageTitle>
      </PageHeader>
      <PageBody>
        <UserMeContainer>
          <UserAccountCard />
        </UserMeContainer>
      </PageBody>
    </Page>
  );
};

export { AccountSettingsPage as default };
