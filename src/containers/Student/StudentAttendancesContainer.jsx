import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  studentAttendancesFetch,
  studentAttendancesResetState,
} from 'src/redux/actionCreators/student/attendances';

const payloadDisplayName = 'Student Attendances';

class StudentAttendancesContainer extends React.Component {
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
    data: state.student.attendances,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(studentAttendancesFetch(id));
    },
    dispatchResetState: () => {
      dispatch(studentAttendancesResetState());
    },
  };
};

export default connect(
  StudentAttendancesContainer,
  mapStateToProps,
  mapDispatchToProps
);
