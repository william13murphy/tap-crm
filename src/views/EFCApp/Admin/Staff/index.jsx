import React from 'react';
import { Link, Route } from 'react-router-dom';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import EfcUsersContainer from 'containers/Administration/EfcUsersContainer';
import StaffDataGrid from './StaffDataGrid';

import Modal from 'components/Modal';

import CreateUserFormContainer from 'containers/Administration/CreateUserFormContainer';
import AddEFCStaffForm from './AddEFCStaffForm';

type StaffPageProps = {
  efcUsers: {
    payload: {},
  },
  history: {},
  userId: string,
};

const STAFF_PAGE_PATH = '/app/admin/staff';
const ADD_STAFF_FORM_PATH = '/app/admin/staff/add';

class StaffPage extends React.Component {
  props: StaffPageProps;
  render() {
    return (
      <Page className="StaffPage" title="Staff">
        <Route
          path={ADD_STAFF_FORM_PATH}
          render={() => (
            <Modal title="Add EFC Staff" closeUrl={STAFF_PAGE_PATH}>
              <CreateUserFormContainer
                dispatchActionOnCloseParams={this.props.userId}
                redirectOnSuccess={STAFF_PAGE_PATH}
              >
                <AddEFCStaffForm />
              </CreateUserFormContainer>
            </Modal>
          )}
        />
        <PageHeader>
          <PageTitle inline>Staff</PageTitle>
          <div>
            <Link
              to={ADD_STAFF_FORM_PATH}
              className="pt-button pt-intent-primary pt-icon-new-person"
            >
              Create EFC Staff Member
            </Link>
          </div>
        </PageHeader>
        <PageBody>
          <EfcUsersContainer>
            <StaffDataGrid
              data={this.props.efcUsers}
              history={this.props.history}
            />
          </EfcUsersContainer>
        </PageBody>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.token.payload.UserId,
    efcUsers: state.administration.efcUsers,
  };
};

export default connect(
  StaffPage,
  mapStateToProps
);
