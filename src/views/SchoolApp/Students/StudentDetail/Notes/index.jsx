import React from 'react';

import { Link, Route } from 'react-router-dom';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import ConfirmDialog from 'components/ConfirmDialog';
import Modal from 'components/Modal';

import StudentNotesContainer from 'containers/Student/StudentNotesContainer';
import StudentNoteFormContainer from 'containers/Student/StudentNoteFormContainer';
import StudentNoteDeleteContainer from 'containers/Student/StudentNoteDeleteContainer';

import NotesCard from './NotesCard';
import DeleteStudentNoteForm from './DeleteStudentNoteForm';
import AddStudentNoteForm from './AddStudentNoteForm';

type NotesPageProps = {
  match: { params: { schoolId: string } },
  studentId: string,
  notes: { payload: [{}] },
};

const Notes = (props: NotesPageProps) => {
  const schoolId = props.match.params.schoolId;
  return (
    <Page className="NotesPage" title="Notes">
      <Route
        path={`/app/school-app/:schoolId/students/detail/${
          props.studentId
        }/notes/add`}
        render={() => (
          <Modal
            title="Add Student Note"
            closeUrl={`/app/school-app/${schoolId}/students/detail/${
              props.studentId
            }/notes`}
          >
            <StudentNoteFormContainer
              dispatchActionOnSuccessParams={{ studentId: props.studentId }}
              redirectOnSuccess={`/app/school-app/${schoolId}/students/detail/${
                props.studentId
              }/notes`}
            >
              <AddStudentNoteForm studentId={props.studentId} />
            </StudentNoteFormContainer>
          </Modal>
        )}
      />
      <Route
        path={`/app/school-app/:schoolId/students/detail/${
          props.studentId
        }/notes/:noteId/reply`}
        render={innerProps => (
          <Modal
            title={`Reply to ${innerProps.location.state.initialValues &&
              innerProps.location.state.initialValues.Title}`}
            closeUrl={`/app/school-app/${schoolId}/students/detail/${
              props.studentId
            }/notes`}
          >
            <StudentNoteFormContainer
              dispatchActionOnSuccessParams={{ studentId: props.studentId }}
              redirectOnSuccess={`/app/school-app/${schoolId}/students/detail/${
                props.studentId
              }/notes`}
            >
              <AddStudentNoteForm
                studentId={props.studentId}
                initialValues={innerProps.location.state.initialValues}
              />
            </StudentNoteFormContainer>
          </Modal>
        )}
      />
      <Route
        path={`/app/school-app/:schoolId/students/detail/${
          props.studentId
        }/notes/:noteId/edit`}
        render={innerProps => (
          <Modal
            title="Edit Student Note"
            closeUrl={`/app/school-app/${schoolId}/students/detail/${
              props.studentId
            }/notes`}
          >
            <StudentNoteFormContainer
              update={true}
              initialValues={innerProps.location.state.initialValues}
              dispatchActionOnSuccessParams={{
                studentId: innerProps.match.params.studentId,
              }}
              redirectOnSuccess={`/app/school-app/${schoolId}/students/detail/${
                props.studentId
              }/notes`}
            >
              <AddStudentNoteForm studentId={props.studentId} />
            </StudentNoteFormContainer>
          </Modal>
        )}
      />
      <Route
        path={`/app/school-app/:schoolId/students/detail/${
          props.studentId
        }/notes/:noteId/delete`}
        render={innerProps => (
          <Modal
            title="Delete Student Note"
            closeUrl={`/app/school-app/${schoolId}/students/detail/${
              props.studentId
            }/notes`}
          >
            <StudentNoteDeleteContainer
              dispatchActionOnCloseParams={props.studentId}
              redirectOnSuccess={`/app/school-app/${schoolId}/students/detail/${
                props.studentId
              }/notes`}
            >
              <ConfirmDialog
                title="Are you sure you want to delete?"
                closeUrl={`/app/school-app/${schoolId}/students/detail/${
                  props.studentId
                }/notes`}
                id={innerProps.match.params.noteId}
              />
            </StudentNoteDeleteContainer>
          </Modal>
        )}
      />

      <PageHeader>
        <PageTitle inline>Notes</PageTitle>
        <Link
          to={`/app/school-app/${schoolId}/students/detail/${
            props.studentId
          }/notes/add`}
        >
          <button className="pt-button pt-intent-primary">
            <i className="fa fa-comment" />
           &nbsp;Add New Note
          </button>
        </Link>
      </PageHeader>
      <PageBody>
        <StudentNotesContainer dispatchFetchParams={props.studentId}>
          {props.notes &&
            props.notes.payload &&
            props.notes.payload.length == 0 && <div className="emptyTable">Notes Not Found</div>}
          {props.notes &&
            props.notes.payload &&
            props.notes.payload.length > 0 &&
            props.notes.payload
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
                      studentId: props.studentId,
                    }}
                  >
                    <NotesCard
                      studentId={item.StudentId}
                      data={item}
                      schoolId={schoolId}
                      allNotes={props.notes}
                    />
                  </StudentNoteFormContainer>
                );
              })}
        </StudentNotesContainer>
      </PageBody>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    notes: state.student.notes,
  };
};

export default connect(
  Notes,
  mapStateToProps
);
