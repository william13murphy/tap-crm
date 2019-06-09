import React from 'react';
import Page from 'components/Layout/Page';
import { Link } from 'react-router-dom';
import SchoolContactsContainer from 'containers/School/SchoolContactsContainer';
import StaffDataGrid from './StaffDataGrid';
import connect from 'src/redux/connect';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

type SchoolContactsPageProps = {
  schoolId: string,
  history: {},
  match: {
    path: string,
    url: string,
  },
  schoolContacts: {
    payload: {},
  },
  dispatchSchoolDetailFetch: any,
};

const SchoolContactsPage = (props: SchoolContactsPageProps) => {
  return (
    <Page className="SchoolContactsPage" title="Contacts">
      <PageHeader>
        <PageTitle inline>Staff</PageTitle>
        <Link to={`/app/school-app/${props.schoolId}/school-detail/staff/add`}>
          <button className="pt-button pt-intent-primary pt-icon-new-person">
            Add New Staff
          </button>
        </Link>
      </PageHeader>
      <PageBody>
        <SchoolContactsContainer dispatchFetchParams={props.schoolId}>
          {props.schoolContacts &&
          props.schoolContacts.payload &&
          props.schoolContacts.payload.length > 0 ? (
            <StaffDataGrid
              data={props.schoolContacts}
              history={props.history}
            />
          ) : (
            'No Staff Found'
          )}
        </SchoolContactsContainer>
      </PageBody>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    schoolContacts: state.school.contacts,
  };
};

export default connect(
  SchoolContactsPage,
  mapStateToProps
);
