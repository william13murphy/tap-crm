import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  studentPlanStudentsFetch,
  studentPlanStudentsResetState,
} from 'src/redux/actionCreators/student/planStudents';

const payloadDisplayName = 'Student PlanStudents';

class StudentPlanStudentsContainer extends React.Component {
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
    data: state.student.planStudents,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(studentPlanStudentsFetch(id));
    },
    dispatchResetState: () => {
      dispatch(studentPlanStudentsResetState());
    },
  };
};

export default connect(
  StudentPlanStudentsContainer,
  mapStateToProps,
  mapDispatchToProps
);
