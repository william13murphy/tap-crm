import React from 'react';
import { Route } from 'react-router-dom';
import connect from 'src/redux/connect';

import Module from 'components/Layout/Module';

import StudentPlanEnrollmentContainer from 'containers/Student/StudentPlanEnrollmentContainer';
import NewPlanRedirect from './NewPlanRedirect';

type AAddPlanModuleProps = {
  match: { params: { schoolId: string } },
  token: {
    payload: {
      SchoolId: string,
      UserId: string,
    },
  },
};

/* AddPlanPage:
 * This page dispatches a plan creation endpoint, then redirects to that plan's detail page.
 */

class AddPlanModule extends React.Component {
  props: AddPlanModuleProps;
  render() {
    const schoolId = this.props.match.params.schoolId;
    const studentId = this.props.match.params.studentId;
    return (
      <Module className="AddPlanDetail">
        <Route
          path="/app/school-app/:schoolId/students/plans/add"
          render={() => (
            <StudentPlanEnrollmentContainer dispatchFetchParams={schoolId}>
              <NewPlanRedirect
                schoolId={schoolId}
                studentId={studentId}
                studentPlanId={this.props.studentPlanEnrollment.payload}
              />
            </StudentPlanEnrollmentContainer>
          )}
        />
      </Module>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    studentPlanEnrollment: state.student.planEnrollment,
  };
};

export default connect(
  AddPlanModule,
  mapStateToProps
);
