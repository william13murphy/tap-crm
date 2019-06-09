import React from 'react';
import StudentsEnrolledContainer from 'src/containers/School/StudentsEnrolledContainer';
import AuthorizedStudentsDataGrid from '../AuthorizedStudentsDataGrid';

type AuthorizedStudentDataProps = {
  id: string,
};

class AuthorizedStudents extends React.Component {
  props: AuthorizedStudentDataProps;

  render() {
    return (
      <div>
        <StudentsEnrolledContainer dispatchFetchParams={this.props.id}>
          <AuthorizedStudentsDataGrid
            history={this.props.history}
            schoolId={this.props.schoolId}
          />
        </StudentsEnrolledContainer>
      </div>
    );
  }
}

export default AuthorizedStudents;
