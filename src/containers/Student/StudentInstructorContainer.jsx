import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  instructorFetch,
  instructorResetState,
} from 'src/redux/actionCreators/student/instructor';

const payloadDisplayName = 'Student Instructor Detail';

class StudentInstructorContainer extends React.Component {
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
    data: state.student.instructor,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(instructorFetch(id));
    },
    dispatchResetState: () => {
      dispatch(instructorResetState());
    },
  };
};

export default connect(
  StudentInstructorContainer,
  mapStateToProps,
  mapDispatchToProps
);
