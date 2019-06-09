import React from 'react';
import connect from 'src/redux/connect';
import { saveStudentNote } from 'api';
import {
  studentNotePost,
  studentNoteFormReset,
} from 'src/redux/actionCreators/student/notePost';
import GenericStatefulFormContainer from 'containers/GenericStatefulFormContainer';
import { studentNotesFetch } from 'src/redux/actionCreators/student/notes';
import { notesForSchoolFetch } from 'src/redux/actionCreators/student/notesForSchool';
import { efcFlaggedNotesFetch } from 'src/redux/actionCreators/student/efcFlaggedNotes';

const payloadDisplayName = 'Student Note';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnSuccess: any, // Scroll to dispatchActionOnSuccess to see params
  dispatchActionOnSuccessParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
  update?: boolean,
};

class StudentNoteFormContainer extends React.Component {
  props: FormContainerProps;
  render() {
    return (
      <GenericStatefulFormContainer
        payloadDisplayName={payloadDisplayName}
        formPostEndpoint={saveStudentNote}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.student.notePost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(studentNotePost(data));
    },
    dispatchFormReset: () => {
      dispatch(studentNoteFormReset());
    },
    dispatchActionOnSuccess: params => {
      // School Flagged Notes: params.studentId & params.schoolId
      if (params.studentId && params.schoolId) {
        dispatch(studentNotesFetch(params.studentId));
        dispatch(notesForSchoolFetch(params.schoolId));
      } else {
        // EFC Flagged Notes:  params.efcNotes (boolean)
        if (params.efcNotes) {
          dispatch(efcFlaggedNotesFetch());
          // Student Notes: params.studentId
        } else {
          dispatch(studentNotesFetch(params.studentId));
        }
      }
    },
  };
};

export default connect(
  StudentNoteFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
