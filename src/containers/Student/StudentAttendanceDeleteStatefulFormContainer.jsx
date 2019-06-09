import React from 'react';
import connect from 'src/redux/connect';
import GenericStatefulFormContainer from 'containers/GenericStatefulFormContainer';

import { deleteStudentAttendance } from 'api';

import { schoolClassScheduleStudentsFetch } from 'src/redux/actionCreators/school/classScheduleStudents';

const payloadDisplayName = 'Student Attendance Delete';

const formPostEndpoint = deleteStudentAttendance;

type FormContainerProps = {
  children: React.DOMElement<any>,
  dispatchActionOnSuccess: any,
  dispatchActionOnSuccessParams: any,
  // redirectOnSuccess: string,
  initialValues?: any,
  update?: boolean,
};

class StudentAttendanceDeleteStatefulFormContainer extends React.Component {
  props: FormContainerProps;
  render() {
    return (
      <GenericStatefulFormContainer
        payloadDisplayName={payloadDisplayName}
        formPostEndpoint={formPostEndpoint}
        {...this.props}
      />
    );
  }
}

// Need to mapStateToProps even though it is not used:
const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => {
  return {
    dispatchActionOnSuccess: params => {
      dispatch(schoolClassScheduleStudentsFetch(params));
    },
  };
};

export default connect(
  StudentAttendanceDeleteStatefulFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
