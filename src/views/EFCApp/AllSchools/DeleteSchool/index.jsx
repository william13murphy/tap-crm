import React from 'react';
import connect from 'src/redux/connect';
import Modal from 'components/Modal';
import ConfirmDialog from 'components/ConfirmDialog';
import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import SchoolDeleteContainer from 'containers/School/SchoolDeleteContainer';

const DeleteSchoolPage = props => {
  return (
    <Page className="DeleteSchoolPage">
      <PageBody>
        <Modal title="Delete School" closeUrl="/app/school-app">
          <SchoolDeleteContainer redirectOnSuccess="/app/school-app">
            <ConfirmDialog
              title="Are you sure you want to delete?"
              closeUrl="/app/school-app"
              id={props.match.params.schoolId}
            />
          </SchoolDeleteContainer>
        </Modal>
      </PageBody>
    </Page>
  );
};

export default connect(DeleteSchoolPage);
