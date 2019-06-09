import React from 'react';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import { roles } from 'util/auth/roles';
import PrivateComponent from 'components/Auth/PrivateComponent';

import EfcUsersContainer from 'containers/Administration/EfcUsersContainer';
import AdminUnpaids from './AdminUnpaids';

import EFCStudentUnpaidByUserIdContainer from 'containers/Report/EFCStudentUnpaidByUserIdContainer';
import StudentsUnpaidGrid from './StudentsUnpaidGrid';

type UnpaidStudentsPageProps = {
  efcStudentUnpaid: {
    payload: [],
  },
  match: {
    path: string,
    url: string,
  },
};

const UnpaidStudentsPage = (props: UnpaidStudentsPageProps) => {
  return (
    <Page className="EFCUnpaidStudentsPage" title="EFC Unpaid Students">
      <PageHeader>
        <PageTitle>Unpaids</PageTitle>
      </PageHeader>
      <PageBody>
        <PrivateComponent allow={[roles.EFCBILL, roles.EFCNOBILL]}>
          <EFCStudentUnpaidByUserIdContainer
            dispatchFetchParams={props.token.payload.UserId}
          >
            {props.efcStudentUnpaidByUserId.payload &&
            props.efcStudentUnpaidByUserId.payload.length > 0 ? (
              <StudentsUnpaidGrid
                data={props.efcStudentUnpaidByUserId.payload}
              />
            ) : (
              <div>No Students Found</div>
            )}
          </EFCStudentUnpaidByUserIdContainer>
        </PrivateComponent>
        <PrivateComponent allow={roles.LEVEL_EFCADMIN}>
          <EfcUsersContainer>
            <AdminUnpaids />
          </EfcUsersContainer>
        </PrivateComponent>
      </PageBody>
    </Page>
  );
};

function mapStateToProps(state) {
  return {
    efcStudentUnpaidByUserId: state.report.efcStudentUnpaidByUserId,
    appContext: state.appContext,
    token: state.token,
  };
}

export default connect(
  UnpaidStudentsPage,
  mapStateToProps
);
