import React from 'react';
import { Link } from 'react-router-dom';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageBody from 'components/Layout/PageBody';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import NoDataMessage from 'components/DataLoading/NoDataMessage';

import StudentOwnersContainer from 'containers/Student/StudentOwnersContainer';
import StudentPlansContainer from 'containers/Student/StudentPlansContainer';
import SchoolBankContainer from 'containers/School/SchoolBankContainer';
import SchoolContactsContainer from 'containers/School/SchoolContactsContainer';

import PlansGrid from './PlansGrid';
import './styles.less';

type PlansProps = {
  match: { params: { schoolId: string } },
  studentId: string,
  plans: {
    payload: {},
  },
};

const Plans = (props: PlansProps) => {
  const schoolId = props.match.params.schoolId;
  const studentId = props.match.params.studentId;
  let disablePlan = false;
  const schoolHasStaff =
    props.contacts.payload &&
    props.contacts.payload.some(
      item => item.ContactTypeId === '6e088e9f-c7b3-437e-bf91-4b780ef8f49b'
    );

  if (!props.bank.payload || !schoolHasStaff) {
    disablePlan = true;
  }

  return (
    <Page title="Plans" className="StudentDetailPlansPage">
      <PageHeader>
        {disablePlan && (
          <NoDataMessage
            errorMessage="Please Add School Staff and Bank Info Before Adding A Plan."
            icon="pt-icon-info-sign"
          />
        )}
        <PageTitle inline>Student Payment Plans</PageTitle>
        <Link
          to={`/app/school-app/${schoolId}/students/plans/add/${studentId}`}
          className={`pt-button pt-intent-primary pt-icon-new-person${
            disablePlan ? 'disabled' : ''
          }`}
        >
          Add New Plan
        </Link>
        <Link
          style={{marginLeft: '4px'}}
          to={`/app/school-app/${schoolId}/students/attach/${studentId}`}
          className="pt-button pt-intent-primary pt-icon-document-open"
        >
          Attach Document
        </Link>
      </PageHeader>
      <PageBody>
        <SchoolContactsContainer dispatchFetchParams={schoolId}>
          <SchoolBankContainer dispatchFetchParams={schoolId}>
            <StudentOwnersContainer dispatchFetchParams={schoolId}>
              <StudentPlansContainer dispatchFetchParams={props.studentId}>
                <PlansGrid
                  data={props.plans.payload}
                  schoolId={schoolId}
                  studentId={props.studentId}
                />
              </StudentPlansContainer>
            </StudentOwnersContainer>
          </SchoolBankContainer>
        </SchoolContactsContainer>
      </PageBody>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    plans: state.student.plans,
    bank: state.school.bank,
    contacts: state.school.contacts,
  };
};

export default connect(
  Plans,
  mapStateToProps
);
