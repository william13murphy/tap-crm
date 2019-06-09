import React from 'react';
import connect from 'src/redux/connect';
import AddOwnerForm from './AddOwnerForm';
import StudentOwnerFormContainer from 'containers/Student/StudentOwnerFormContainer';

type AddOwnerProps = {
  studentDetail: {
    payload: {
      Id: string,
      User: {
        Profile: {
          FirstName: string,
          LastName: string,
        },
      },
      Id: string,
      SchoolId: string,
    },
  },
  planId: any,
  schoolId: any,
  initialValues: any,
  update?: boolean,
  initilRender?: boolean,
};

class AddOwner extends React.Component {
  props: AddOwnerProps;
  render() {
    let planId = this.props.planId || this.props.initialValues.planId;
    let schoolId = this.props.schoolId || this.props.initialValues.schoolId;
    let addStudentOwnerData;
    if (!this.props.update && !this.props.formInitialRender) {
      addStudentOwnerData = {
        ...this.props.studentDetail.payload.User.Profile,
        planId: this.props.planId,
        schoolId: this.props.schoolId,
        Address1: this.props.studentDetail.payload.Address1,
        City: this.props.studentDetail.payload.City,
        State: this.props.studentDetail.payload.State,
        Zip: this.props.studentDetail.payload.Zip,
        CountryId: this.props.studentDetail.payload.CountryId,
        Email: this.props.studentDetail.payload.User.Email,
        MobileNumber: this.props.studentDetail.payload.User.PhoneNumber,
        StudentId: this.props.studentDetail.payload.Id,
        dispatchFormPost: this.props.dispatchFormPost,
      };
    }
    return (
      <div>
        <StudentOwnerFormContainer
          dispatchActionOnCloseParams={planId}
          redirectOnSuccess={`/app/school-app/${schoolId}/students/plans/detail/${planId}/payment`}
        >
          <AddOwnerForm
            initialValues={this.props.initialValues || addStudentOwnerData}
            // initialValues={addStudentOwnerData}
          />
        </StudentOwnerFormContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    studentDetail: state.student.detail,
  };
};

export default connect(
  AddOwner,
  mapStateToProps
);
