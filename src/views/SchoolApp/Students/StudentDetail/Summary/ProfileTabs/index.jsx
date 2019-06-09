import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import connect from 'src/redux/connect';

import TabList from 'components/TabList';
import Tab from 'components/Tab';
import TabRoutes from 'components/TabRoutes';

import ContactsSummary from './Contacts';
import NotesSummary from './Notes';
import MessagesSummary from './Messages';
import Address from './Address';
import './styles.less';

import Modal from 'components/Modal';
import EditStudentAddressForm from './Address/EditStudentAddressForm';
import StudentFormContainer from 'containers/Student/StudentFormContainer';

import SchoolContactsContainer from 'containers/School/SchoolContactsContainer';
import StudentNotesContainer from 'containers/Student/StudentNotesContainer';
import StudentMessagesContainer from 'containers/Student/StudentMessagesContainer';
import StudentContactsContainer from 'containers/Student/StudentContactsContainer';

import { studentDetailFetch } from 'src/redux/actionCreators/student/detail';

import './styles.less';

type ProfileTabsProps = {
  match: { params: { schoolId: string } },
  studentDetailId: string,
  studentDetail: {
    payload: {},
  },
  schoolContacts: {
    payload: {},
  },
  contacts: {
    payload: {},
  },
  messages: {
    payload: {},
  },
  dispatchStudentDetailFetch: any,
  token: {
    payload: {},
  },
};

const ProfileTabs = (props: ProfileTabsProps) => {
  const schoolId = props.match.params.schoolId;
  return (
    <div className="ProfileTabs">
      <TabList>
        <NavLink
          exact
          to={`/app/school-app/${schoolId}/students/detail/${
            props.studentDetailId
          }/summary`}
          className="NavLink"
          activeClassName="selected"
        >
          <Tab>Contacts</Tab>
        </NavLink>
        <NavLink
          exact
          to={`/app/school-app/${schoolId}/students/detail/${
            props.studentDetailId
          }/summary/notes`}
          className="NavLink"
          activeClassName="selected"
        >
          <Tab>Recent Notes</Tab>
        </NavLink>
        <NavLink
          exact
          to={`/app/school-app/${schoolId}/students/detail/${
            props.studentDetailId
          }/summary/messages`}
          className="NavLink"
          activeClassName="selected"
        >
          <Tab>Check In Messages</Tab>
        </NavLink>
        <NavLink
          exact
          to={`/app/school-app/${schoolId}/students/detail/${
            props.studentDetailId
          }/summary/address`}
          className="NavLink"
          activeClassName="selected"
        >
          <Tab>Address</Tab>
        </NavLink>
      </TabList>
      <TabRoutes card>
        <Route
          exact
          path={`/app/school-app/:schoolId/students/detail/${
            props.studentDetailId
          }/summary`}
          render={() => (
            <StudentContactsContainer
              dispatchFetchParams={props.studentDetailId}
            >
              <ContactsSummary
                studentContacts={props.contacts.payload}
                studentId={props.studentDetailId}
                schoolId={schoolId}
                studentDetail={props.studentDetail.payload}
              />
            </StudentContactsContainer>
          )}
        />
        <Route
          exact
          path={`/app/school-app/:schoolId/students/detail/${
            props.studentDetailId
          }/summary/notes`}
          render={() => (
            <StudentNotesContainer dispatchFetchParams={props.studentDetailId}>
              <NotesSummary
                studentNotes={props.notes.payload}
                schoolId={schoolId}
                studentId={props.studentDetailId}
              />
            </StudentNotesContainer>
          )}
        />
        <Route
          exact
          path={`/app/school-app/:schoolId/students/detail/${
            props.studentDetailId
          }/summary/messages`}
          render={() => (
            <SchoolContactsContainer dispatchFetchParams={schoolId}>
              <StudentMessagesContainer
                dispatchFetchParams={props.studentDetailId}
              >
                <MessagesSummary
                  studentMessages={props.messages.payload}
                  schoolId={schoolId}
                  studentId={props.studentDetailId}
                  schoolContacts={props.schoolContacts.payload}
                />
              </StudentMessagesContainer>
            </SchoolContactsContainer>
          )}
        />
        <Route
          exact
          path={`/app/school-app/:schoolId/students/detail/${
            props.studentDetailId
          }/summary/address`}
          render={() => <Address />}
        />
        <Route
          exact
          path={`/app/school-app/:schoolId/students/detail/${
            props.studentDetailId
          }/summary/address/edit`}
          render={() => {
            return (
              <Modal
                title="Edit Student Address"
                closeUrl={`/app/school-app/${schoolId}/students/detail/${
                  props.studentDetailId
                }/summary/address`}
              >
                <StudentFormContainer
                  update
                  initialValues={props.studentDetail.payload}
                  redirectOnSuccess={`/app/school-app/${schoolId}/students/detail/${
                    props.studentDetailId
                  }/summary/address`}
                  dispatchActionOnCloseParams={props.studentDetail.payload.Id}
                >
                  <EditStudentAddressForm />
                </StudentFormContainer>
              </Modal>
            );
          }}
        />
      </TabRoutes>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    token: state.token,
    schoolContacts: state.school.contacts,
    notes: state.student.notes,
    messages: state.student.messages,
    contacts: state.student.contacts,
    studentDetail: state.student.detail,
  };
};

export default connect(
  ProfileTabs,
  mapStateToProps
);
