import React from 'react';
import Page from 'components/Layout/Page';
import PageBody from 'components/Layout/PageBody';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import { Link, Route } from 'react-router-dom';
import Modal from 'components/Modal';
import connect from 'src/redux/connect';
import NotesCard from 'views/SchoolApp/Students/StudentDetail/Notes/NotesCard';
import EFCFlaggedNotesContainer from 'containers/Student/EFCFlaggedNotesContainer';
import AddStudentNoteForm from 'views/SchoolApp/Students/StudentDetail/Notes/AddStudentNoteForm';
import StudentNoteFormContainer from 'containers/Student/StudentNoteFormContainer';
import StudentNotesContainer from 'containers/Student/StudentNotesContainer';

type FlaggedNotesPageProps = {
  allClients: {
    payload: Array<{}> | {},
  },
  history: {},
  notes: [{}],
  efcFlaggedNotes: {
    payload: [],
  },
  studentId: string,
  appContext: {
    schoolId: string,
  },
  match: {
    path: string,
    url: string,
  },
};

const FlaggedNotesPage = (props: FlaggedNotesPageProps) => {
  return (
    <Page className="AllClientsPage" title="All Clients">
      <PageHeader>
        <PageTitle>Flagged Notes</PageTitle>
        {/* <Link to="/app/clients/add">
          <button className="pt-button pt-intent-primary pt-icon-new-person">
            Add New Client
          </button>
        </Link> */}
      </PageHeader>
      <PageBody>
        <Route
          path={`${props.match.path}/:noteId/reply`}
          render={innerProps => (
            <Modal
              title={`Reply to ${innerProps.location.state.initialValues &&
                innerProps.location.state.initialValues.Title}`}
              closeUrl={`${props.match.url}`}
            >
              <StudentNoteFormContainer
                dispatchActionOnSuccessParams={{
                  studentId: innerProps.location.state.initialValues.StudentId,
                }}
                redirectOnSuccess={`${props.match.url}`}
              >
                <AddStudentNoteForm
                  studentId={innerProps.location.state.initialValues.StudentId}
                  initialValues={innerProps.location.state.initialValues}
                />
              </StudentNoteFormContainer>
            </Modal>
          )}
        />
        <EFCFlaggedNotesContainer>
          {props.efcFlaggedNotes &&
            props.efcFlaggedNotes.payload &&
            props.efcFlaggedNotes.payload
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
                      studentId: item.StudentId,
                      efcNotes: true,
                    }}
                  >
                    <NotesCard
                      studentId={item.StudentId}
                      data={item}
                      key={index}
                      allNotes={props.efcFlaggedNotes}
                    />
                  </StudentNoteFormContainer>
                );
              })}
        </EFCFlaggedNotesContainer>
      </PageBody>
    </Page>
  );
};

function mapStateToProps(state) {
  return {
    token: state.token,
    efcFlaggedNotes: state.student.efcFlaggedNotes,
    appContext: state.appContext,
  };
}

export default connect(
  FlaggedNotesPage,
  mapStateToProps
);
