import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  cumulativeAttendanceFetch,
  cumulativeAttendanceResetState,
} from 'src/redux/actionCreators/report/cumulativeAttendance';

const alwaysFetch = false;

const payloadDisplayName = 'Report';

class CumulativeAttendanceContainer extends React.Component {
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
    data: state.report.cumulativeAttendance,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(cumulativeAttendanceFetch(id));
    },
    dispatchResetState: () => {
      dispatch(cumulativeAttendanceResetState());
    },
  };
};

export default connect(
  CumulativeAttendanceContainer,
  mapStateToProps,
  mapDispatchToProps
);
