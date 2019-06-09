import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  enrollmentByProgramFetch,
  enrollmentByProgramResetState,
} from 'src/redux/actionCreators/report/enrollmentByProgram';

const alwaysFetch = false;

const payloadDisplayName = 'Report';

class EnrollmentByProgramContainer extends React.Component {
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
    data: state.report.enrollmentByProgram,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(enrollmentByProgramFetch(id));
    },
    dispatchResetState: () => {
      dispatch(enrollmentByProgramResetState());
    },
  };
};

export default connect(
  EnrollmentByProgramContainer,
  mapStateToProps,
  mapDispatchToProps
);
