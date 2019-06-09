import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  studentAttendancePost,
  studentAttendancePostFormReset,
} from 'src/redux/actionCreators/student/attendancePost';

import { schoolClassScheduleStudentsFetch } from 'src/redux/actionCreators/school/classScheduleStudents';

const formPostAction = studentAttendancePost;
const formResetAction = studentAttendancePostFormReset;

const payloadDisplayName = 'Student Attendance';

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
};

class StudentAttendanceFormContainer extends React.Component {
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
    formState: state.student.attendancePost,
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
      dispatch(schoolClassScheduleStudentsFetch(id));
    },
  };
};

export default connect(
  StudentAttendanceFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
