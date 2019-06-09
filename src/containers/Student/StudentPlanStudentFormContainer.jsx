import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  studentPlanStudentPost,
  studentPlanStudentPostFormReset,
} from 'src/redux/actionCreators/student/planStudentPost';

import { studentPlanStudentsFetch } from 'src/redux/actionCreators/student/planStudents';

const payloadDisplayName = 'Plan Student';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
  update?: boolean,
  studentId: string,
};

class StudentPlanStudentFormContainer extends React.Component {
  props: FormContainerProps;
  render() {
    return (
      <GenericFormContainer
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.student.planStudentPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(studentPlanStudentPost(data));
    },
    dispatchFormReset: () => {
      dispatch(studentPlanStudentPostFormReset());
    },
    dispatchActionOnClose: id => {
      setTimeout(() => {
        // Give the server a second to think otherwise it sometimes returns 0 students.
        dispatch(studentPlanStudentsFetch(id));
      }, 1000);
    },
  };
};

export default connect(
  StudentPlanStudentFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
