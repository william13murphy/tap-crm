import React from 'react';
import { Route } from 'react-router-dom';
import { roles, authorizeRole } from 'util/auth/roles';

import Page from 'components/Layout/Page';
import PageBody from 'components/Layout/PageBody';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import connect from 'src/redux/connect';
import NotesCard from 'views/SchoolApp/Students/StudentDetail/Notes/NotesCard';
import NotesForSchoolContainer from 'containers/Student/NotesForSchoolContainer';
import Modal from 'components/Modal';
import AddStudentNoteForm from 'views/SchoolApp/Students/StudentDetail/Notes/AddStudentNoteForm';
import StudentNoteFormContainer from 'containers/Student/StudentNoteFormContainer';
import NoDataMessage from 'components/DataLoading/NoDataMessage';

import './styles.less';

type FlaggedNotesPageProps = {
  allClients: {
    payload: Array<{}> | {},
  },
  history: {},
  notes: [{}],
  efcFlaggedNotes: [{}],
  notesForSchool: {
    payload: [{}],
  },
  schoolId: string,
  studentId: string,
  appContext: {
    schoolId: string,
  },
  match: { path: string, url: string },
};

const FlaggedNotesPage = (props: FlaggedNotesPageProps) => {
  return (
    <Page className="AllClientsPage" title="All Clients">
      <PageHeader>
        <PageTitle>Flagged Notes</PageTitle>
      </PageHeader>
      <PageBody>
        <Route
          path={`${props.match.path}/:noteId/reply`}
          render={innerProps => {
            return (
              <Modal
                title={`Reply to ${innerProps.location.state.initialValues &&
                  innerProps.location.state.initialValues.Title}`}
                closeUrl={`${props.match.url}`}
              >
                <StudentNoteFormContainer
                  dispatchActionOnSuccessParams={{
                    studentId:
                      innerProps.location.state.initialValues.StudentId,
                    schoolId: props.schoolId,
                  }}
                  redirectOnSuccess={props.match.url}
                >
                  <AddStudentNoteForm
                    studentId={
                      innerProps.location.state.initialValues.StudentId
                    }
                    initialValues={innerProps.location.state.initialValues}
                  />
                </StudentNoteFormContainer>
              </Modal>
            );
          }}
        />

        <NotesForSchoolContainer dispatchFetchParams={props.schoolId}>
          {props.notesForSchool &&
            props.notesForSchool.payload &&
            props.notesForSchool.payload.length == 0 && (
              <NoDataMessage errorMessage="No flagged notes found." />
            )}
          {props.notesForSchool &&
            props.notesForSchool.payload &&
            props.notesForSchool.payload
              .filter((item, index, array) => {
                // Filter all orphan notes and notes without ParentId
                let matchedParentIndex = array.findIndex(innerItem => {
                  return item.ParentId === innerItem.Id;
                });
                if (!item.ParentId || matchedParentIndex === -1) return true;
                return false;
              })
              .map((item, index) => {
                return (
                  <StudentNoteFormContainer
                    key={index}
                    dispatchActionOnSuccessParams={{
                      studentId: `${item.StudentId}`,
                      schoolId: `${props.schoolId}`,
                    }}
                  >
                    <NotesCard
                      studentId={item.StudentId}
                      data={item}
                      key={index}
                      allNotes={props.notesForSchool}
                    />
                  </StudentNoteFormContainer>
                );
              })}
        </NotesForSchoolContainer>
      </PageBody>
    </Page>
  );
};

function mapStateToProps(state) {
  return {
    token: state.token,
    notesForSchool: state.student.notesForSchool,
    appContext: state.appContext,
    notes: state.student.notes,
  };
}

export default connect(
  FlaggedNotesPage,
  mapStateToProps
);
