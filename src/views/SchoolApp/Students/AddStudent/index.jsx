import BackButton from 'components/Buttons/BackButton';
import FormWrapper from 'components/Layout/FormWrapper';
import Page from 'components/Layout/Page';
import PageBody from 'components/Layout/PageBody';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import StudentFormContainer from 'containers/Student/StudentFormContainer';
import StateProvinceMasterContainer from 'containers/Utility/StateProvinceMasterContainer';
import React from 'react';
import { Link } from 'react-router-dom';
import connect from 'src/redux/connect';
import { authorizeRole, roles } from 'util/auth/roles';
import AddSchoolStudentForm from './AddSchoolStudentForm';
import AddSchoolStudentRapidForm from './AddSchoolStudentRapidForm';
import './styles.less';






type AllStudentsPageProps = {
  token: {
    payload: {
      UserId: string,
    },
  },
  studentPost: {
    payload: string,
  },
  match: { params: { schoolId: string } },
  schoolProfile: {
    payload: {
      CountryId: string,
    },
  },
  showBackButton: boolean
};

class AddStudentPage extends React.Component {
  props: AllStudentsPageProps;
  render() {
    const schoolId = this.props.match.params.schoolId;
    const studentFuzzySearchParams = {
      SchoolId: schoolId,
      Term: '',
    };

    const isEFCStaff = authorizeRole(this.props.role,roles.SUBSET_EFC_STAFF);

    return (
      <Page className="AddStudentPage" title="Add Student">
        <PageHeader>
          <PageTitle inline>Add New Student</PageTitle>
          { 
            !this.props.showBackButton ?
            null :
            <div>
              <Link to={`/app/school-app/${schoolId}/students/all`}>
                <BackButton>Back to All Students</BackButton>
              </Link>
            </div>
          }

        </PageHeader>
        <PageBody center wide={isEFCStaff}>
          <FormWrapper className={ isEFCStaff ? 'wide' : '' }>
            <StateProvinceMasterContainer>
              <StudentFormContainer
                dispatchActionOnCloseParams={this.props.studentPost.payload}
                redirectOnSuccessWithReturnedId={`/app/school-app/${schoolId}/students/detail/${
                  this.props.studentPost.payload
                }/summary`}
              >
                  {
                    authorizeRole(this.props.role,roles.SUBSET_EFC_STAFF) ?
                    <div style={{ borderRadius: '4px', width: '100%', padding: '16px'}}>
                      <AddSchoolStudentRapidForm
                        schoolId={schoolId}
                        userId={this.props.token.payload.UserId}
                        schoolProfile={this.props.schoolProfile}
                      /> 
                    </div>:
                    <AddSchoolStudentForm
                      schoolId={schoolId}
                      userId={this.props.token.payload.UserId}
                      schoolProfile={this.props.schoolProfile}
                      showBackButton={true}
                    />
                  }
              </StudentFormContainer>
            </StateProvinceMasterContainer>
          </FormWrapper>
        </PageBody>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    studentPost: state.student.studentPost,
    schoolProfile: state.school.profile,
    role: state.token.payload.Role,
  };
};

export default connect(
  AddStudentPage,
  mapStateToProps
);
