import React from 'react';

import { Link, Route } from 'react-router-dom';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import ConfirmDialog from 'components/ConfirmDialog';
import Modal from 'components/Modal';

import StudentContactDetailContainer from 'containers/Student/StudentContactDetailContainer';
import StudentContactsContainer from 'containers/Student/StudentContactsContainer';
import StudentContactFormContainer from 'containers/Student/StudentContactFormContainer';
import StudentContactDeleteContainer from 'containers/Student/StudentContactDeleteContainer';
import SchoolSearchFuzzyContainer from 'containers/School/SchoolSearchFuzzyContainer';
import StateProvinceMasterContainer from 'containers/Utility/StateProvinceMasterContainer';
import ContactsGrid from './ContactsGrid';
import DeleteStudentContactForm from './DeleteStudentContactForm';
import AddStudentContactForm from '../../../_shared/AddStudentContactForm';
import AddExistingUserContactForm from './AddExistingUserContact/AddExistingUserContactForm';
import AddExistingUserContact from './AddExistingUserContact';
import StudentContactProfileCard from 'components/ProfileCard/StudentContactProfileCard';
import './styles.less';
type ContactsPageProps = {
  match: { params: { schoolId: string } },
  studentId: string,
  contacts: {
    payload: {},
  },
  studentDetail: {
    payload: {
      UserId: string,
      Id: string,
      Contacts: [],
    },
  },
  schoolProfile: {
    payload: {
      CountryId: string,
    },
  },
  contactDetail: any,
};

const Contacts = (props: ContactsPageProps) => {
  const schoolId = props.match.params.schoolId;
  return (
    <Page className="ContactsPage" title="Contacts">
      <Route
        exact
        path={`/app/school-app/:schoolId/students/detail/${
          props.studentId
        }/contacts/add`}
        render={() => (
          <Modal
            title="Add New Contact"
            closeUrl={`/app/school-app/${schoolId}/students/detail/${
              props.studentId
            }/contacts`}
          >
            <StateProvinceMasterContainer>
              <StudentContactFormContainer
                dispatchActionOnCloseParams={props.studentId}
                redirectOnSuccess={`/app/school-app/${schoolId}/students/detail/${
                  props.studentId
                }/contacts`}
              >
                <AddStudentContactForm
                  studentId={props.studentId}
                  schoolProfile={props.schoolProfile}
                />
              </StudentContactFormContainer>
            </StateProvinceMasterContainer>
          </Modal>
        )}
      />
      <Route
        path={`/app/school-app/:schoolId/students/detail/${
          props.studentId
        }/contacts/existing-contact/add`}
        render={() => (
          <Modal
            title="Add Existing User as Contact"
            closeUrl={`/app/school-app/${schoolId}/students/detail/${
              props.studentId
            }/contacts`}
            className="AddExistingContact"
          >
            <SchoolSearchFuzzyContainer
              dispatchFetchParams={{
                SchoolId: schoolId,
              }}
            >
              <AddExistingUserContact
                studentId={props.studentId}
                schoolId={schoolId}
              />
            </SchoolSearchFuzzyContainer>
          </Modal>
        )}
      />
      <Route
        path={`/app/school-app/:schoolId/students/detail/${
          props.studentId
        }/contacts/existing-contact/add/user`}
        render={innerProps => {
          let initialValues = innerProps.location.state.initialValues;
          let studentId =
            props.studentDetail &&
            props.studentDetail.payload &&
            props.studentDetail.payload.Id;
          return (
            <Modal
              title="Add Existing User as Contact"
              closeUrl={`/app/school-app/${schoolId}/students/detail/${
                props.studentId
              }/contacts`}
              className="AddExistingUserContact"
            >
              <StateProvinceMasterContainer>
                <StudentContactFormContainer
                  initialValues={{ ...initialValues, StudentId: studentId }}
                  dispatchActionOnCloseParams={props.studentId}
                  redirectOnSuccess={`/app/school-app/${schoolId}/students/detail/${
                    props.studentId
                  }/contacts`}
                >
                  <AddExistingUserContactForm
                    studentId={props.studentId}
                    schoolProfile={props.schoolProfile}
                  />
                </StudentContactFormContainer>
              </StateProvinceMasterContainer>
            </Modal>
          );
        }}
      />
      <Route
        path={`/app/school-app/:schoolId/students/detail/${
          props.studentId
        }/contacts/:contactId/edit`}
        render={innerProps => {
          let initialValues = innerProps.location.state.initialValues;
          let studentContact =
            props.studentDetail &&
            props.studentDetail.payload &&
            props.studentDetail.payload.Contacts.filter(element => {
              if (element.Id === initialValues.Id) {
                return element;
              }
            });
          return (
            <Modal
              title="Edit Student Contact"
              closeUrl={`/app/school-app/${schoolId}/students/detail/${
                props.studentId
              }/contacts`}
            >
              <StateProvinceMasterContainer>
                <StudentContactFormContainer
                  update={true}
                  initialValues={{
                    ...initialValues,
                    GenderId: studentContact[0].Contact.User.Profile.GenderId,
                    Dob: studentContact[0].Contact.User.Profile.Dob,
                  }}
                  dispatchActionOnCloseParams={props.studentId}
                  redirectOnSuccess={`/app/school-app/${schoolId}/students/detail/${
                    props.studentId
                  }/contacts`}
                >
                  <AddStudentContactForm
                    studentId={props.studentId}
                    schoolProfile={props.schoolProfile}
                  />
                </StudentContactFormContainer>
              </StateProvinceMasterContainer>
            </Modal>
          );
        }}
      />
      <Route
        path={`/app/school-app/:schoolId/students/detail/${
          props.studentId
        }/contacts/:contactId/delete`}
        render={innerProps => (
          <Modal
            title="Delete Student Contact"
            closeUrl={`/app/school-app/${schoolId}/students/detail/${
              props.studentId
            }/contacts`}
          >
            <StudentContactDeleteContainer
              dispatchActionOnCloseParams={props.studentId}
              redirectOnSuccess={`/app/school-app/${schoolId}/students/detail/${
                props.studentId
              }/contacts`}
            >
              <ConfirmDialog
                title="Are you sure you want to delete?"
                closeUrl={`/app/school-app/${schoolId}/students/detail/${
                  props.studentId
                }/contacts`}
                id={innerProps.match.params.contactId}
              />
            </StudentContactDeleteContainer>
          </Modal>
        )}
      />
      <Route
        exact
        path={`/app/school-app/${schoolId}/students/detail/${
          props.studentId
        }/contacts/:contactId/view`}
        render={innerProps => {
          return (
            <Modal
              title="View Student Contact"
              closeUrl={`/app/school-app/${schoolId}/students/detail/${
                props.studentId
              }/contacts`}
            >
              <StudentContactDetailContainer
                dispatchFetchParams={innerProps.match.params.contactId}
              >
                <StudentContactProfileCard
                  contactDetail={props.contactDetail}
                />
              </StudentContactDetailContainer>
            </Modal>
          );
        }}
      />

      <PageHeader>
        <PageTitle inline>Student Contacts</PageTitle>
        <Link
          to={`/app/school-app/${schoolId}/students/detail/${
            props.studentId
          }/contacts/add`}
        >
          <button className="pt-button pt-intent-primary pt-icon-new-person">
            Add New Contact
          </button>
        </Link>
        &nbsp;&nbsp;&nbsp;
        <Link
          to={`/app/school-app/${schoolId}/students/detail/${
            props.studentId
          }/contacts/existing-contact/add`}
        >
          <button className="pt-button pt-intent-primary pt-icon-following">
            Add Existing User as Contact
          </button>
        </Link>
      </PageHeader>
      <PageBody>
        <StudentContactsContainer dispatchFetchParams={props.studentId}>
          <ContactsGrid
            data={props.contacts.payload}
            schoolId={schoolId}
            studentId={props.studentId}
          />
        </StudentContactsContainer>
      </PageBody>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    contacts: state.student.contacts,
    studentDetail: state.student.detail,
    contactDetail: state.student.contactDetail,
    schoolProfile: state.school.profile,
  };
};

export default connect(
  Contacts,
  mapStateToProps
);
