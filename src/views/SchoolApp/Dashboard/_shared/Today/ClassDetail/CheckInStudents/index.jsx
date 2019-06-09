import React from 'react';
import StudentAttendanceFormContainer from 'containers/Student/StudentAttendanceFormContainer';
import StudentAttendanceForm from './StudentAttendanceForm';
import connect from 'src/redux/connect';

type CheckInStudentsProps = {
  redirectOnSuccess: string,
  classScheduleId: string,
};

const CheckInStudents = (props: CheckInStudentsProps) => {
  return (
    <div className="CheckInStudents">
      <StudentAttendanceFormContainer
        dispatchActionOnCloseParams={props.classScheduleId}
        redirectOnSuccess={props.redirectOnSuccess}
      >
        <StudentAttendanceForm classScheduleId={props.classScheduleId} />
      </StudentAttendanceFormContainer>
    </div>
  );
};

const mapStateToProps = function(state) {
  return {
    classDetail: state.school.classDetail,
    classScheduleAuthorized: state.school.classScheduleAuthorized,
    classScheduleStudents: state.school.classScheduleStudents,
    token: state.token,
  };
};

export default connect(
  CheckInStudents,
  mapStateToProps
);
