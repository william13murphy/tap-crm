import React from 'react';
import connect from 'src/redux/connect';
import { Link, Route } from 'react-router-dom';

import Modal from 'components/Modal';

import SchoolNoteFormContainer from 'containers/School/SchoolNoteFormContainer';
import AddSchoolNoteForm from './AddSchoolNoteForm';

import NoteCards from './NoteCards';
import SchoolNotesContainer from 'containers/School/SchoolNotesContainer';

type SchoolNotesProps = {
  schoolId: string,
  schoolNotes: {
    payload: {},
  },
  dispatchSchoolNotesFetch: any,
  match: {
    path: string,
    url: string,
  },
};

const SchoolNotes = (props: SchoolNotesProps) => {
  return (
    <div className="SchoolNotes">
      <Route
        path={`${props.match.path}/add`}
        render={() => {
          return (
            <Modal title="Add School Note" closeUrl={props.match.url}>
              <SchoolNoteFormContainer
                redirectOnSuccess={props.match.url}
                dispatchActionOnCloseParams={props.schoolId}
              >
                <AddSchoolNoteForm schoolId={props.schoolId} />
              </SchoolNoteFormContainer>
            </Modal>
          );
        }}
      />
      <div>
        <Link to={`${props.match.url}/add`} className="pt-button pt-icon-plus">
         Add New Note
        </Link>
        {props.schoolNotes ? (
          <SchoolNotesContainer dispatchFetchParams={props.schoolId}>
            <NoteCards
              schoolId={props.schoolId}
              cards={props.schoolNotes.payload}
              editable={true}
              match={props.match}
            />
          </SchoolNotesContainer>
        ) : (
          <div>No notes found.</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  schoolNotes: state.school.notes,
});

export default connect(SchoolNotes, mapStateToProps);
