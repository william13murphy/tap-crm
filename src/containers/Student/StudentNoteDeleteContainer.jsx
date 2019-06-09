import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  studentNoteDelete,
  studentNoteDeleteFormReset,
} from 'src/redux/actionCreators/student/noteDelete';

import { studentNotesFetch } from 'src/redux/actionCreators/student/notes';

const formPostAction = studentNoteDelete;
const formResetAction = studentNoteDeleteFormReset;

const payloadDisplayName = 'Student Note Delete';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
  update?: boolean,
};

class StudentNoteDeleteContainer extends React.Component {
  props: FormContainerProps;
  render() {
    return (
      <GenericFormContainer
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      >
        {this.props.children}
      </GenericFormContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.student.noteDelete,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(formPostAction(data));
    },
    dispatchFormReset: () => {
      dispatch(formResetAction());
    },
    dispatchActionOnClose: id => {
      dispatch(studentNotesFetch(id));
    },
  };
};

export default connect(
  StudentNoteDeleteContainer,
  mapStateToProps,
  mapDispatchToProps
);
