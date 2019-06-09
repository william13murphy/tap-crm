import React from 'react';
import connect from 'src/redux/connect';

import { anemicStudentsFetch } from 'src/redux/actionCreators/school/anemicStudents';

import StudentFormContainer from 'containers/Student/StudentFormContainer';
import StateProvinceMasterContainer from 'containers/Utility/StateProvinceMasterContainer';
import AddSchoolStudentForm from 'views/SchoolApp/Students/AddStudent/AddSchoolStudentForm';

type AddNewStudentPageProps = {
  match: { params: { schoolId: string } },
  enrollmentId: string,
  token: {
    payload: {
      UserId: string,
    },
  },
  dispatchAnemicStudentsFetch: any,
  schoolProfile: {
    payload: {
      CountryId: string,
    },
  },
};

class AddNewStudentPage extends React.Component {
  props: AddNewStudentPageProps;
  render() {
    const schoolId = this.props.match.params.schoolId;
    const planId = this.props.match.params.planId;

    return (
      <StateProvinceMasterContainer>
        <StudentFormContainer
          redirectOnSuccessWithReturnedId={`/app/school-app/${schoolId}/students/plans/detail/${planId}/students/enroll-student/${
            this.props.studentPost.payload
          }`}
          dispatchActionOnClose={this.props.dispatchAnemicStudentsFetch}
          dispatchActionOnCloseParams={schoolId}
        >
          <AddSchoolStudentForm
            schoolId={schoolId}
            userId={this.props.token.payload.UserId}
            schoolProfile={this.props.schoolProfile}
          />
        </StudentFormContainer>
      </StateProvinceMasterContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    studentPost: state.student.studentPost,
    schoolProfile: state.school.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchAnemicStudentsFetch: id => {
      dispatch(anemicStudentsFetch(id));
    },
  };
};

export default connect(
  AddNewStudentPage,
  mapStateToProps,
  mapDispatchToProps
);
