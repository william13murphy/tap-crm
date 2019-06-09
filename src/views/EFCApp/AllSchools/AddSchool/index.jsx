import React from 'react';
import Modal from 'components/Modal';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import CreateSchoolFormContainer from 'containers/School/CreateSchoolFormContainer';
import AddSchoolForm from './AddSchoolForm';

const AddSchoolPage = props => {
  return (
    <Page className="AddSchoolPage" title="Add New School">
      <PageBody>
        <Modal title="Add New School" closeUrl="/app/school-app">
          <CreateSchoolFormContainer redirectOnSuccess="/app/school-app">
            <AddSchoolForm />
          </CreateSchoolFormContainer>
        </Modal>
      </PageBody>
    </Page>
  );
};

export default AddSchoolPage;
