import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from 'containers/GenericFetchContainer';
import {
  schoolClassStudentsEnrolledFetch,
  enrolledResetState,
} from 'src/redux/actionCreators/school/studentsEnrolled';

const payloadDisplayName = 'Students Enrolled';

class StudentsEnrolledContainer extends React.Component {
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
    data: state.school.studentsEnrolled,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolClassStudentsEnrolledFetch(id));
    },
    dispatchResetState: () => {
      dispatch(enrolledResetState());
    },
  };
};

export default connect(
  StudentsEnrolledContainer,
  mapStateToProps,
  mapDispatchToProps
);
