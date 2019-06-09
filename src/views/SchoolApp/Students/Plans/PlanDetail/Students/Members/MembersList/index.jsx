import React from 'react';
import connect from 'src/redux/connect';
import Member from './Member';
import StudentDetailManyContainer from 'containers/Student/StudentDetailManyContainer';

type MembersListProps = {
  match: { params: { schoolId: string } },
  studentPlanStudents: {
    payload: {
      StudentId: string,
    },
  },
  schoolId: string,
};

const MembersList = (props: MembersListProps) => {
  const schoolId = props.match.params.schoolId;
  return (
    <div className="MembersList">
      {props.studentPlanStudents.payload &&
        props.studentPlanStudents.payload.length &&
        props.studentPlanStudents.payload.map((planStudent, i) => {
          return (
            <StudentDetailManyContainer
              key={i}
              dispatchFetchParams={planStudent.StudentId}
            >
              <Member
                planStudentId={planStudent.Id}
                studentId={planStudent.StudentId}
                iterator={i}
              />
            </StudentDetailManyContainer>
          );
        })}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    studentPlanStudents: state.student.planStudents,
  };
};

export default connect(
  MembersList,
  mapStateToProps
);
