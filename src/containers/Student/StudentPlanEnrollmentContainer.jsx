import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  studentPlanEnrollmentFetch,
  studentPlanEnrollmentResetState,
} from 'src/redux/actionCreators/student/planEnrollment';

const payloadDisplayName = 'Student Plan';

class StudentPlanEnrollmentContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: string,
    options?: {},
  };
  render() {
    return (
      <GenericFetchContainer
        alwaysFetch={true}
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.student.planEnrollment,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(studentPlanEnrollmentFetch(id));
    },
    dispatchResetState: () => {
      dispatch(studentPlanEnrollmentResetState());
    },
  };
};

export default connect(
  StudentPlanEnrollmentContainer,
  mapStateToProps,
  mapDispatchToProps
);
