import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  attendanceByProgramFetch,
  attendanceByProgramResetState,
} from 'src/redux/actionCreators/report/attendanceByProgram';

const alwaysFetch = false;

const payloadDisplayName = 'Report';

class AttendanceByProgramContainer extends React.Component {
  props: {
    id: string,
    dispatchFetchParams: {
      schoolId: string,
    },
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchReset: any,
    options?: {},
  };
  render() {
    return (
      <GenericFetchContainer
        alwaysFetch={alwaysFetch}
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.report.attendanceByProgram,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(attendanceByProgramFetch(id));
    },
    dispatchResetState: () => {
      dispatch(attendanceByProgramResetState());
    },
  };
};

export default connect(
  AttendanceByProgramContainer,
  mapStateToProps,
  mapDispatchToProps
);
