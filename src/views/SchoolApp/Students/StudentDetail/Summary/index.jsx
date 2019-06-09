import React from 'react';
import connect from 'src/redux/connect';
import { Route } from 'react-router-dom';
import Modal from 'components/Modal';
import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import StudentProfileCard from 'components/ProfileCard/StudentProfileCard';
import GradingSummary from './GradingSummary';

import InputBlock from 'components/Forms/InputBlock';

import './styles.less';

import StudentFormContainer from 'containers/Student/StudentFormContainer';
import StateProvinceMasterContainer from 'containers/Utility/StateProvinceMasterContainer';
import AddSchoolStudentForm from '../../AddStudent/AddSchoolStudentForm';
import StudentRankRequirementsByStyleContainer from 'containers/Student/StudentRankRequirementsByStyleContainer';
import RankRequirementsDataGrid from 'views/SchoolApp/Students/StudentDetail/Grading/RankRequirementsDataGrid';
import EmailSendForm from './EmailSendForm';
import SMSSendForm from './SMSSendForm';
import SchoolOutboxEmailFormContainer from 'containers/School/SchoolOutboxEmailFormContainer';
import SchoolOutboxSMSFormContainer from 'containers/School/SchoolOutboxSMSFormContainer';

import SendSMSTemplate from 'src/views/_shared/Messaging/SMS/SendSMSTemplate';
import SendEmailTemplate from 'src/views/_shared/Messaging/Email/SendEmailTemplate';

import LeadToStudent from './LeadToStudent';
import { userFullName } from 'util/user';

import ProfileTabs from './ProfileTabs';

type SummaryProps = {
  studentDetail: {
    payload: {
      User: {
        Profile: {
          FirstName: string,
          LastName: string,
        },
      },
      Id: string,
    },
  },
  contacts: {
    payload: {},
  },
  token: {
    payload: {
      UserId: string,
    },
  },
};

const Summary = (props: SummaryProps) => {
  const schoolId = props.match.params.schoolId;
  let initialValues = {
    ...props.studentDetail.payload,
    FirstName: props.studentDetail.payload.User.Profile.FirstName,
    LastName: props.studentDetail.payload.User.Profile.LastName,
  };

  return (
    <Page className="StudentSummaryPage" title="Summary">
      <Route
        path={`/app/school-app/:schoolId/students/detail/${
          props.studentDetail.payload.Id
        }/summary/profile/edit`}
        render={() => (
          <Modal
            title="Edit Profile"
            closeUrl={`/app/school-app/${schoolId}/students/detail/${
              props.studentDetail.payload.Id
            }/summary`}
          >
            <StateProvinceMasterContainer>
              <StudentFormContainer
                update
                initialValues={initialValues}
                redirectOnSuccess={`/app/school-app/${schoolId}/students/detail/${
                  props.studentDetail.payload.Id
                }/summary`}
                dispatchActionOnCloseParams={props.studentDetail.payload.Id}
              >
                <AddSchoolStudentForm
                  schoolId={schoolId}
                  userId={props.token.payload.UserId}
                  schoolProfile={props.schoolProfile}
                />
              </StudentFormContainer>
            </StateProvinceMasterContainer>
          </Modal>
        )}
      />
      <LeadToStudent schoolId={props.schoolId} initialValues={initialValues} />
      <Route
        path={`${props.match.path}/rank-requirements/:schoolStyleId`}
        render={routerProps => {
          let initialValues = routerProps.location.state.initialValues;
          let studentDetail = props.studentDetail.payload;
          return (
            <Modal
              title={`Rank Requirements for  ${
                studentDetail.User.Profile.FirstName
              }
              ${studentDetail.User.Profile.LastName}`}
              closeUrl={`/app/school-app/${schoolId}/students/detail/${
                props.studentDetail.payload.Id
              }/summary`}
            >
              <StudentRankRequirementsByStyleContainer
                dispatchFetchParams={{
                  StudentId: props.studentDetail.payload.Id,
                  SchoolStyleId: routerProps.location.state.schoolStyleId,
                  StyleRankId: initialValues.RankId,
                }}
              >
                <RankRequirementsDataGrid
                  classId={routerProps.location.state.classId}
                  data={
                    props.rankRequirementsByStyle &&
                    props.rankRequirementsByStyle.payload
                  }
                  schoolId={routerProps.location.state.schoolId}
                />
              </StudentRankRequirementsByStyleContainer>
            </Modal>
          );
        }}
      />
      <Route
        path={`${props.match.path}/send-sms`}
        render={routerProps => <SendSMSTemplate />}
      />
      <Route
        path={`${props.match.path}/send-sms-contact/:contactId`}
        render={routerProps => (
          <Modal
            title="Send SMS Template"
            closeUrl={`/app/school-app/${schoolId}/students/detail/${
              props.studentDetail.payload.Id
            }/summary`}
          >
            <SchoolOutboxSMSFormContainer
              dispatchActionOnCloseParams={schoolId}
              redirectOnSuccess={`/app/school-app/${schoolId}/students/detail/${
                props.studentDetail.payload.Id
              }/summary`}
            >
              <SMSSendForm
                schoolId={schoolId}
                templatePlaceholders={props.templatePlaceholders}
                studentId={routerProps.match.params.studentId}
                studentName={
                  props.studentDetail.payload.User.Profile.FirstName +
                  ' ' +
                  props.studentDetail.payload.User.Profile.LastName
                }
              />
            </SchoolOutboxSMSFormContainer>
          </Modal>
        )}
      />
      <Route
        path={`${props.match.path}/send-email`}
        render={routerProps => <SendEmailTemplate />}
      />
      <Route
        path={`${props.match.path}/send-email-contact/:contactId`}
        render={routerProps => (
          <Modal
            title="Send Email Template"
            closeUrl={`/app/school-app/${schoolId}/students/detail/${
              props.studentDetail.payload.Id
            }/summary`}
          >
            <SchoolOutboxEmailFormContainer
              dispatchActionOnCloseParams={schoolId}
              redirectOnSuccess={`/app/school-app/${schoolId}/students/detail/${
                props.studentDetail.payload.Id
              }/summary`}
            >
              <EmailSendForm
                schoolId={schoolId}
                templatePlaceholders={props.templatePlaceholders}
                studentId={routerProps.match.params.studentId}
                studentName={
                  props.studentDetail.payload.User.Profile.FirstName +
                  ' ' +
                  props.studentDetail.payload.User.Profile.LastName
                }
              />
            </SchoolOutboxEmailFormContainer>
          </Modal>
        )}
      />
      <PageBody>
        <InputBlock>
          <StudentProfileCard schoolId={schoolId} />
          <ProfileTabs studentDetailId={props.studentDetail.payload.Id} />
        </InputBlock>
        <InputBlock>
          <GradingSummary
            backUrl={`/app/school-app/${schoolId}/students/detail/${
              props.studentDetail.payload.Id
            }/summary`}
          />
        </InputBlock>
      </PageBody>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    contacts: state.student.contacts,
    studentDetail: state.student.detail,
    token: state.token,
    rankRequirementsByStyle: state.student.rankRequirementsByStyle,
    schoolProfile: state.school.profile,
  };
};

export default connect(
  Summary,
  mapStateToProps
);
